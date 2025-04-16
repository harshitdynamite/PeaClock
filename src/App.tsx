import { Grid, GridItem } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
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
      <text>Breakpoint: {currentLayout}</text>
      <GridItem area="nav" bg="coral" padding="4">
        Nav
      </GridItem>
      {/* <GridItem area="aside" bg="black" padding="4">
        Aside
      </GridItem> */}
      <GridItem area="main" bg="blue" padding="4">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
