import { Tabs } from "@chakra-ui/react";
import DigitalClock from "./DigitalClock";
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
        <Tabs.Trigger value="tab-1">Clocks</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Settings</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab-1">
        <DigitalClock />
      </Tabs.Content>

      <Tabs.Content value="tab-2">
        <Setting />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabView;
