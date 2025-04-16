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

  // Load saved clock settings
  useEffect(() => {
    chrome.storage.local.get(
      ["clockSettings"],
      (result: { clockSettings?: ClockConfig[] }) => {
        if (result.clockSettings) {
          setClocks(result.clockSettings);
        }
      }
    );
  }, []);

  // Update time every second
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
      <Box display="flex" flexDirection="column" gap="12px">
        {clocks.map((clock, index) => (
          <Box
            key={index}
            p="2"
            bg="gray.100"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontWeight="bold" fontSize="sm" mb="1">
              {clock.name || `Clock ${index + 1}`}
            </Text>
            <Text fontSize="lg" fontFamily="monospace">
              {times[index] || "Loading..."}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {clock.timezone}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Clock;
