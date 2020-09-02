import * as React from "react";
import { Box, Heading, Button, ButtonGroup, Stack } from "@chakra-ui/core";
import Header from "./Header";
import Category from "../../components/Category";
import { INVENTORY_TYPES } from "../../static/types";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = ({}) => {
  return (
    <Box>
      <Header userName="false" />
      <Box p="5" bg="primary.200">
        <Heading textAlign="center" fontStyle="bold" color="grey.800">
          Inventory Board
        </Heading>
        <Box py="5" textAlign="center">
          <ButtonGroup spacing={4}>
            {Object.keys(INVENTORY_TYPES).map((data: string) => (
              <Button variantColor="blue">
                Add New {INVENTORY_TYPES[data]}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box py="5" textAlign="center">
          <Box
            display="grid"
            gridGap={2}
            gridAutoFlow="column"
            gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
          >
            <Category text={"All"} isSelected={true} />
            {Object.keys(INVENTORY_TYPES).map((data: string) => (
              <Category text={INVENTORY_TYPES[data]} isSelected={false} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
