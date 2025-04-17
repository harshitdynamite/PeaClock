import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Utility to get time in specific timezone
const getTimeInTimezone = (timezone: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(new Date());
};

interface ClockConfig {
  name: string;
  timezone: string;
}

const Clock = () => {
  const [clocks, setClocks] = useState<ClockConfig[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  // Load clocks from storage
  const loadClocks = () => {
    chrome.storage.local.get(["clockSettings"], (result) => {
      if (result.clockSettings) {
        setClocks(result.clockSettings);
      } else {
        setClocks([]); // fallback
      }
    });
  };

  // Initial load
  useEffect(() => {
    loadClocks();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.clockSettings) {
        loadClocks();
      }
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  // Update clock display every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = clocks.map((clock) =>
        getTimeInTimezone(clock.timezone)
      );
      setTimes(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [clocks]);

  return (
    <Box px="3" py="2" fontSize="sm">
      {clocks.length === 0 ? (
        <Box
          p="4"
          border="1px dashed"
          borderColor="brand.100"
          borderRadius="md"
          bg="brand.50"
          textAlign="center"
        >
          <Text color="brand.700">No clocks configured.</Text>
          <Text fontSize="xs" color="brand.500">
            Go to the Settings tab to add clocks.
          </Text>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap="12px">
          {clocks.map((clock, index) => (
            <Box
              key={index}
              p="3"
              bg="brand.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="brand.100"
              _hover={{
                borderColor: "brand.300",
                boxShadow: "md",
              }}
            >
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color="brand.800"
                mb="1"
              >
                {clock.name || `Clock ${index + 1}`}
              </Text>
              <Text fontSize="2xl" fontFamily="monospace" color="brand.600">
                {times[index] || "Loading..."}
              </Text>
              <Text fontSize="xs" color="brand.500">
                {clock.timezone}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Clock;
