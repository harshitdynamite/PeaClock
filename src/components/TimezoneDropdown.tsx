import { Box, Input, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCompass } from "react-icons/fa";
import timezones from "../data/timezones";
import { Tooltip } from "@chakra-ui/tooltip";

const MotionBox = motion(Box);

interface TimezoneDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TimezoneDropdown = ({ value, onChange }: TimezoneDropdownProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [wasAutoDetected, setWasAutoDetected] = useState(false);
  const MotionIcon = motion(FaCompass);
  //const [isSpinning, setIsSpinning] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = timezones.filter((tz) =>
    tz.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setWasAutoDetected(true); // ✅ Mark it as auto-detected

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    onChange(tz);
    setQuery(timezones.find((t) => t.value === tz)?.label || tz);
    setIsOpen(false);

    setTimeout(() => setIsDetecting(false), 1000);
  };

  return (
    <Box ref={containerRef} position="relative">
      <Input
        size="sm"
        placeholder="Search timezones..."
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        pr="30px"
        border="1px solid"
        borderColor="brand.100"
        _focus={{
          borderColor: "brand.400",
          boxShadow: "0 0 0 1px var(--colors-brand-400)",
        }}
        borderRadius="md"
        bg="white"
      />
      <Tooltip label="Detect your timezone" hasArrow placement="top">
        <IconButton
          aria-label="Auto-detect timezone"
          size="xs"
          p="0"
          minW="24px"
          h="24px"
          position="absolute"
          top="50%"
          right="6px"
          transform="translateY(-50%)"
          onClick={handleAutoDetect}
          title={undefined}
          variant="outline"
          color="brand.500"
          borderRadius="full"
          border="1px solid"
          borderColor="brand.300"
          //bg="transparent"
          bg={wasAutoDetected ? "green.100" : "transparent"}
          _hover={{
            bg: "brand.50",
            borderColor: "brand.400",
          }}
          colorScheme={wasAutoDetected ? "green.100" : "transparent"} // ✅ Dynamic color
        >
          <MotionIcon
            animate={isDetecting ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isDetecting
                ? {
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }
            }
          />
        </IconButton>
      </Tooltip>

      {isOpen && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          position="absolute"
          top="calc(100% + 4px)"
          left={0}
          right={0}
          zIndex={10}
          maxH="150px"
          overflowY="auto"
          border="1px solid"
          borderColor="brand.100"
          borderRadius="lg"
          bg="white"
          boxShadow="lg"
          p="1"
        >
          {filtered.map((tz) => (
            <Box
              key={tz.value}
              px="2"
              py="1"
              fontSize="sm"
              borderRadius="md"
              _hover={{ bg: "white", cursor: "pointer" }}
              bg={tz.value === value ? "blue.100" : "transparent"}
              onClick={() => {
                onChange(tz.value);
                setQuery(tz.label);
                setIsOpen(false);
                setWasAutoDetected(false); // ✅ Clear the green state if user selects manually
              }}
            >
              {tz.label}
            </Box>
          ))}
          {filtered.length === 0 && (
            <Box px="2" py="1" fontSize="xs" color="white">
              No timezones found
            </Box>
          )}
        </MotionBox>
      )}
    </Box>
  );
};

export default TimezoneDropdown;
