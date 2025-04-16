import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

interface DeleteClockButtonProps {
  onClick: () => void;
}
const MotionIconButton = motion(IconButton);

const DeleteClockButton = ({ onClick }: DeleteClockButtonProps) => {
  return (
    <Tooltip label="Delete this clock" hasArrow placement="top">
      <span>
        <MotionIconButton
          aria-label="Delete clock"
          size="xs"
          bg="red.500"
          _hover={{ bg: "red.600" }}
          borderRadius="full"
          onClick={onClick}
          minW="auto"
          height="20px"
          width="20px"
          whileHover={{ scale: 1.2 }} // ✅ zoom-in effect
          transition={{ type: "spring", stiffness: 300 }} // smooth bounce
        >
          <FaTrash color="white" size="0.6em" />
        </MotionIconButton>
      </span>
    </Tooltip>
  );
};

export default DeleteClockButton;
