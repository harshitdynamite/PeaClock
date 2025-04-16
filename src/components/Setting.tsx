import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

import TimezoneDropdown from "./TimezoneDropdown";

const Settings = () => {
  const [numClocks, setNumClocks] = useState(0);
  const [clocks, setClocks] = useState<{ name: string; timezone: string }[]>(
    []
  );

  // Load saved settings from chrome.storage
  useEffect(() => {
    chrome.storage.local.get(["clockSettings"], (result) => {
      if (result.clockSettings) {
        setClocks(result.clockSettings);
        setNumClocks(result.clockSettings.length);
      }
    });
  }, []);

  const saveToStorage = (updatedClocks: typeof clocks) => {
    chrome.storage.local.set({ clockSettings: updatedClocks });
  };

  const handleClockCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, parseInt(e.target.value) || 0);
    setNumClocks(count);

    const updated = [...clocks];
    while (updated.length < count) {
      updated.push({ name: "", timezone: "UTC" });
    }
    updated.length = count;
    setClocks(updated);
    saveToStorage(updated);
  };

  const updateClock = (
    index: number,
    field: "name" | "timezone",
    value: string
  ) => {
    const updated = [...clocks];
    updated[index][field] = value;
    setClocks(updated);
    saveToStorage(updated);
  };

  return (
    <Box px="3" py="2" fontSize="sm">
      <Box mb="3">
        <Text mb="1">No of Clocks</Text>
        <input
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          type="number"
          value={numClocks}
          onChange={handleClockCountChange}
          placeholder="Enter number"
        />
      </Box>

      {clocks.map((clock, index) => (
        <Box
          key={index}
          p="2"
          mb="3"
          bg="gray.50"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          fontSize="sm"
          minH="100px"
          transition="all 0.2s ease"
          _hover={{
            borderColor: "blue.300",
            boxShadow: "sm",
            bg: "white",
          }}
        >
          <Text fontWeight="semibold" mb="2">
            Clock {index + 1}
          </Text>

          <Box mb="2">
            <Input
              placeholder="Name your clock"
              value={clock.name}
              size="sm"
              onChange={(e) => updateClock(index, "name", e.target.value)}
            />
          </Box>

          <Box>
            <TimezoneDropdown
              value={clock.timezone}
              onChange={(newTz) => updateClock(index, "timezone", newTz)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Settings;
