// src/components/AddClockButton.tsx

import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { FaPlus } from "react-icons/fa";

interface AddClockButtonProps {
  onClick: () => void;
}

const AddClockButton = ({ onClick }: AddClockButtonProps) => {
  return (
    <Tooltip label="Add another clock" hasArrow placement="top">
      <span>
        {" "}
        {/* ✅ This wrapper is REQUIRED by Chakra Tooltip to ensure a single child */}
        <IconButton
          aria-label="Add clock"
          size="sm"
          variant="outline"
          colorScheme="blue"
          onClick={onClick}
          mt={2}
          alignSelf="center"
        >
          <FaPlus />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AddClockButton;
