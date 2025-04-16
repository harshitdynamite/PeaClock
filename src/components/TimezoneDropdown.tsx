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
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    onChange(tz);
    setQuery(timezones.find((t) => t.value === tz)?.label || tz);
    setIsOpen(false);
  };

  return (
    <Box ref={containerRef} position="relative">
      <Input
        size="sm"
        placeholder="Search timezones..."
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        pr="30px" // room for icon
      />

      <Tooltip hasArrow placement="top">
        <IconButton
          aria-label="Auto-detect timezone"
          size="xs"
          position="absolute"
          top="50%"
          right="6px"
          transform="translateY(-50%)"
          onClick={handleAutoDetect}
          title="Detect my timezone"
          variant="ghost"
          colorScheme="blue"
        >
          <FaCompass />
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
          border="1px solid #ccc"
          borderRadius="md"
          p="1"
          bg="white"
          boxShadow="md"
        >
          {filtered.map((tz) => (
            <Box
              key={tz.value}
              px="2"
              py="1"
              fontSize="sm"
              borderRadius="md"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              bg={tz.value === value ? "blue.100" : "transparent"}
              onClick={() => {
                onChange(tz.value);
                setQuery(tz.label);
                setIsOpen(false);
              }}
            >
              {tz.label}
            </Box>
          ))}
          {filtered.length === 0 && (
            <Box px="2" py="1" fontSize="xs" color="gray.500">
              No timezones found
            </Box>
          )}
        </MotionBox>
      )}
    </Box>
  );
};

export default TimezoneDropdown;
