import * as React from "react";
import { Button } from "@chakra-ui/core";

export interface CategoryProps {
  text: string;
  isSelected: boolean;
}

const Category: React.SFC<CategoryProps> = ({ text, isSelected }) => {
  return (
    <Button
      border="1px"
      borderRadius="md"
      borderColor={isSelected ? "gray.500" : "gray.400"}
      color={isSelected ? "white" : "grey:500"}
      bg={isSelected ? "#319795" : "white"}
      variant={isSelected ? "solid" : "outline"}
      _hover={{ bg: "#319795", color: "white" }}
      _active={{
        bg: "#319795",
        color: "white",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
    >
      {text}
    </Button>
  );
};

export default Category;
