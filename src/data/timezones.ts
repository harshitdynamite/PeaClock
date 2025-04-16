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
  
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const parts = formatter.formatToParts(now);
  
    const hourPart = parts.find((p) => p.type === "hour");
    const minutePart = parts.find((p) => p.type === "minute");
  
    const localHours = hourPart ? parseInt(hourPart.value) : 0;
    const localMinutes = minutePart ? parseInt(minutePart.value) : 0;
  
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
  
    const offset =
      (localHours * 60 + localMinutes) - (utcHours * 60 + utcMinutes);
  
    // Handle wrap-around (e.g. UTC is 23:50 and local is 00:20)
    const adjustedOffset = ((offset + 1440) % 1440) - (offset > 720 ? 1440 : 0);
  
    return adjustedOffset;
  }
  
  
  function formatOffset(offsetMinutes: number): string {
    // 🔧 Round to nearest minute before formatting
  const rounded = Math.round(offsetMinutes);

  const sign = rounded >= 0 ? "+" : "-";
  const abs = Math.abs(rounded);
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
  