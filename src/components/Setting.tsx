import { Box, Text, Input } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import TimezoneDropdown from "./TimezoneDropdown";
import AddClockButton from "./AddClockButton";
import DeleteClockButton from "./DeleteClockButton";

const Settings = () => {
  const [clocks, setClocks] = useState<{ name: string; timezone: string }[]>(
    []
  );
  const lastClockInputRef = useRef<HTMLInputElement | null>(null);
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
          p="3"
          mb="3"
          borderRadius="lg"
          border="1px solid"
          bg="brand.50"
          borderColor="brand.100"
          minH="100px"
          position="relative"
          transition="all 0.2s ease"
          _hover={{
            borderColor: "brand.300",
            boxShadow: "md",
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
          <Text fontWeight="semibold" color="brand.700" mb="2">
            Clock {index + 1}
          </Text>

          <Box mb="2">
            <Input
              ref={index === clocks.length - 1 ? lastClockInputRef : null}
              placeholder="Name your clock"
              value={clock.name}
              size="sm"
              borderRadius="md"
              border="1px solid"
              borderColor="brand.100"
              _focus={{
                borderColor: "brand.400",
                boxShadow: "0 0 0 1px var(--colors-brand-400)",
              }}
              bg="white"
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
          onClick={() => {
            const updated = [...clocks, { name: "", timezone: "UTC" }];
            setClocks(updated);
            setTimeout(() => {
              lastClockInputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              lastClockInputRef.current?.focus();
            }, 100);
          }}
        />
      </Box>
    </Box>
  );
};

export default Settings;
