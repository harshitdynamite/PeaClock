import { Box, Text, chakra } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg="brand.50"
      color="brand.800"
      px={3}
      py={2}
      textAlign="center"
      fontSize="xs"
      fontWeight="medium"
      borderTopRadius="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Text>PeaClock 1.0.0</Text>
      <chakra.a
        href="https://github.com/harshitdynamite/PeaClock"
        target="_blank"
        rel="noopener noreferrer"
        color="brand.600"
        textDecoration="none"
        _hover={{ textDecoration: "underline" }}
      >
        GitHub
      </chakra.a>
    </Box>
  );
};

export default Footer;
