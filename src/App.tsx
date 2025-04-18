import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import TabView from "./components/TabView";
import Footer from "./components/Footer";
// import AnalogClock from "./components/AnalogClock";

// function App(){
//   return <div><AnalogClock /></div>
// }

function App() {
  const currentLayout = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  console.log("Current breakpoint:", currentLayout);
  return (
    <Flex
      direction="column"
      bg="#e8f5ec"
      height="600px" // or 550px, adjust as needed
      width="350px"
      py={2}
      px={3}
      border="1px solid #4b9c7a"
      borderRadius="lg"
      boxShadow="md"
      overflowY="auto"
    >
      <Grid
        templateAreas={{
          base: `"nav " "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateRows={{ base: "auto 1fr", lg: "auto 1fr" }}
        templateColumns={{ base: "1fr", lg: "200px 1fr" }}
        height="400px"
        width="300px"
        gap="1"
      >
        {/* <text>Breakpoint: {currentLayout}</text> */}
        <GridItem area="nav" padding="3">
          <NavBar />
        </GridItem>
        {/* <GridItem area="aside" bg="black" padding="4">
        Aside
      </GridItem> */}
        <GridItem area="main" padding="4">
          <TabView />
        </GridItem>
      </Grid>
      <Footer />
    </Flex>
  );
}

export default App;
