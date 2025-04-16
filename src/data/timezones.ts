// src/data/timezones.ts

export interface TimezoneOption {
    label: string;       // e.g. "Asia/Kolkata (UTC+05:30)"
    value: string;       // e.g. "Asia/Kolkata"
    offset: number;  // Raw offset in minutes, for sorting
  }
  const zoneNames = [
    "UTC",
    "Asia/Kolkata",
    "Asia/Dubai",
    "Europe/London",
    "America/New_York",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/Berlin",
    "Africa/Johannesburg",
    "America/Los_Angeles",
    "America/Chicago",
    "Asia/Singapore",
    "Pacific/Auckland",
  ];

  function getOffsetMinutes(timezone: string): number {
    const now = new Date();
  
    // Get UTC time
    const utcDate = new Date(
      now.toLocaleString("en-US", { timeZone: "UTC" })
    );
  
    // Get local time in given timezone
    const tzDate = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
  
    // Difference in milliseconds → convert to minutes
    const diff = (tzDate.getTime() - utcDate.getTime()) / 60000;
  
    return diff;
  }
  
  
  
  function formatOffset(offsetMinutes: number): string {
    // 🔧 Round to nearest minute before formatting
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hours = String(Math.floor(abs / 60)).padStart(2, "0");
    const minutes = String(abs % 60).padStart(2, "0");
    return `UTC${sign}${hours}:${minutes}`;
  }
  const timezonedata: TimezoneOption[] = zoneNames.map((zone) => {
    const offset = getOffsetMinutes(zone); // Dynamically calculated offset
    return {
      label: `${zone} (${formatOffset(offset)})`,
      value: zone,
      offset,
    };
  });
  
  // Sort by offset
  timezonedata.sort((a, b) => a.offset - b.offset);
  
  export default timezonedata;
  