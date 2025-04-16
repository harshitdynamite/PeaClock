import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import timezones from "../data/timezones";

const MotionBox = motion(Box);

interface TimezoneDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TimezoneDropdown = ({ value, onChange }: TimezoneDropdownProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtered timezone list
  const filtered = timezones.filter((tz) =>
    tz.label.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdown on outside click
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

  return (
    <Box ref={containerRef} position="relative">
      {/* Trigger Input */}
      <Input
        size="sm"
        placeholder="Search timezones..."
        onFocus={() => setIsOpen(true)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown Panel */}
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
                setQuery(tz.label); // show selected label
                setIsOpen(false); // close dropdown
              }}
            >
              {tz.label}
            </Box>
          ))}

          {filtered.length === 0 && (
            <Text fontSize="xs" color="gray.500" p="2">
              No timezones found
            </Text>
          )}
        </MotionBox>
      )}
    </Box>
  );
};

export default TimezoneDropdown;
