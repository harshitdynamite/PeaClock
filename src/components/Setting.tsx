import { Box, Text, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TimezoneDropdown from "./TimezoneDropdown";
import AddClockButton from "./AddClockButton";
import DeleteClockButton from "./DeleteClockButton";

const Settings = () => {
  const [clocks, setClocks] = useState<{ name: string; timezone: string }[]>(
    []
  );

  // Load saved settings from chrome.storage
  useEffect(() => {
    chrome.storage.local.get(["clockSettings"], (result) => {
      if (result.clockSettings && result.clockSettings.length > 0) {
        setClocks(result.clockSettings);
      } else {
        // No saved clocks — add one with detected timezone
        const detectedTimezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone;
        setClocks([{ name: "", timezone: detectedTimezone }]);
      }
    });
  }, []);

  // Save to chrome storage
  const saveToStorage = (updatedClocks: typeof clocks) => {
    chrome.storage.local.set({ clockSettings: updatedClocks });
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
          position="relative"
          transition="all 0.2s ease"
          _hover={{
            borderColor: "blue.300",
            boxShadow: "sm",
            bg: "white",
          }}
        >
          {/* 🗑 Delete button in top-right */}
          <Box position="absolute" top="4px" right="4px" zIndex="1">
            <DeleteClockButton
              onClick={() => {
                const updated = [...clocks];
                updated.splice(index, 1);
                setClocks(updated);
                saveToStorage(updated);
              }}
            />
          </Box>
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

      <Box textAlign="center" mt="2">
        <AddClockButton
          onClick={() =>
            setClocks((prev) => [...prev, { name: "", timezone: "UTC" }])
          }
        />
      </Box>
      {/* Optionally: AddClockButton goes here later */}
    </Box>
  );
};

export default Settings;
