import { Tabs } from "@chakra-ui/react";

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
    </Tabs.Root>
  );
};

export default TabView;
