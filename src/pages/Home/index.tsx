import * as React from "react";
import { Box } from "@chakra-ui/core";
import Header from "./Header";
import Body from "./Body";
export interface HomeProps {}

const Home: React.SFC<HomeProps> = ({}) => {
  return (
    <Box>
      <Header userName="false" />
      <Body />
    </Box>
  );
};

export default Home;
