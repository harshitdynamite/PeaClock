import { HStack, Image, Text } from "@chakra-ui/react";
import icon16 from "../assets/peaclock_16x16.png";
import icon32 from "../assets/peaclock_32x32.png";
import icon48 from "../assets/peaclock_48x48.png";
import icon128 from "../assets/peaclock_128x128.png";

const NavBar = () => {
  return (
    <HStack>
      <Image
        boxSize="30px"
        src={icon32} // fallback
        srcSet={`
    ${icon16} 16w,
    ${icon32} 32w,
    ${icon48} 48w,
    ${icon128} 128w
  `}
        sizes="30px"
        alt="PeaClock logo"
      />
      <Text>PeaClock</Text>
    </HStack>
  );
};

export default NavBar;
