import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const timezones = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const Setting = () => {
  const [numClocks, setNumClocks] = useState(0);
  const [clocks, setClocks] = useState<{ name: string; timezone: string }[]>(
    []
  );

  const handleClockCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, parseInt(e.target.value) || 0);
    setNumClocks(count);

    const newClocks = [...clocks];
    while (newClocks.length < count) {
      newClocks.push({ name: "", timezone: "UTC" });
    }
    newClocks.length = count; // trim extra clocks if needed
    setClocks(newClocks);
  };

  const updateClock = (
    index: number,
    field: "name" | "timezone",
    value: string
  ) => {
    const updated = [...clocks];
    updated[index][field] = value;
    setClocks(updated);
  };

  //   return (
  //     <Box padding={4}>
  //       <form>
  //         <div className="mb-3">
  //           <label htmlFor="noOfClocks" className="form-label">
  //             No of Clocks
  //           </label>
  //           <input id="noOfClocks" type="number" className="form-control"></input>
  //         </div>
  //       </form>
  //     </Box>
  //   );
  //   <div>⚙️ This is the Settings tab</div>;
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
        >
          <Text fontWeight="semibold" mb="2">
            Clock {index + 1}
          </Text>

          <Box mb="2">
            <Text mb="1">Clock Name</Text>
            <input
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              type="text"
              value={clock.name}
              onChange={(e) => updateClock(index, "name", e.target.value)}
              placeholder="e.g. Dubai Office"
            />
          </Box>

          <Box>
            <Text mb="1">Timezone</Text>
            <select
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              value={clock.timezone}
              onChange={(e) => updateClock(index, "timezone", e.target.value)}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Setting;
