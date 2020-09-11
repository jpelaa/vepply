import * as React from "react";
import { Box, Text } from "@chakra-ui/core";

const PageNotFound: React.SFC = () => {
  return (
    <Box>
      <Text fontWeight="bold">404</Text>
      <Text fontWeight="bold">Page Not found </Text>
    </Box>
  );
};

export default PageNotFound;
