import { Tabs } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Clock from "./Clock";
import Setting from "./Setting";

const TabView = () => {
  return (
    <Tabs.Root
      variant="enclosed"
      maxW="md"
      fitted
      defaultValue={"tab-1"}
      colorScheme="blue"
    >
      <Tabs.List>
        <Tabs.Trigger value="tab-1">
          <FaClock />
          Clocks
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-2">
          <IoSettings />
          Settings
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab-1">
        <Clock />
      </Tabs.Content>

      <Tabs.Content value="tab-2">
        <Setting />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabView;
