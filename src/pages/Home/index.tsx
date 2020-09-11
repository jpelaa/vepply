import * as React from "react";
import { Box } from "@chakra-ui/core";
import Header from "./Header";
import Body from "./Body";
import { StateContext } from "context";

const Home: React.SFC = () => {
  const { state } = React.useContext(StateContext);
  return (
    <Box>
      <Header userName={state.userName} />
      <Body />
    </Box>
  );
};

export default Home;
