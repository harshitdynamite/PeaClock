import { Text, Box, Flex } from "@chakra-ui/react";
import AnimatedPeaClock from "../components/AnimatedPeaClock";

const NavBar = () => {
  return (
    <Box>
      <Flex
        px={3}
        py={2}
        gap={3} // Replaces spacing in HStack
        align="center"
        justify="flex-start"
      >
        {/* Peacock Icon (larger size) */}
        <Box boxSize="60px">
          <AnimatedPeaClock />
        </Box>

        {/* PeaClock Title */}
        <Text fontSize="2xl" fontWeight="bold" color="brand.800">
          PeaClock
        </Text>
      </Flex>
      <Box
        height="4px"
        mx="auto"
        my={2}
        borderRadius="full"
        bg="green.700" // dark green tone
        boxShadow="md" // subtle shadow
      />
    </Box>
  );
};

export default NavBar;
