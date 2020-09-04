import * as React from "react";
import { Box, Heading, Flex, Text, Badge, Grid } from "@chakra-ui/core";
import AddNewSection from "./AddNewSection";
import Category from "../../../components/Category";

import { INVENTORY_TYPES } from "../../../static/types";

export interface BodyProps {}

const Body: React.SFC<BodyProps> = () => {
  return (
    <Box p="10" bg="primary.200">
      <Heading textAlign="center" fontStyle="bold" color="grey.800">
        Inventory Board
      </Heading>
      <AddNewSection />
      <Box py="5" textAlign="center">
        <Box
          py="2"
          display="grid"
          gridGap={2}
          gridAutoFlow="column"
          gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        >
          {Object.keys(INVENTORY_TYPES).map((data: string) => (
            <Category text={INVENTORY_TYPES[data]} isSelected={false} />
          ))}
        </Box>
        <Box>
          <Grid
            templateColumns="repeat(5, 1fr)"
            templateRows="auto"
            gap={6}
            bg="gray.200"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.500"
            px="2"
            py="1"
            my="3"
          >
            <Text fontWeight="bold">Amount</Text>
            <Text fontWeight="bold">Bill No.</Text>
            <Text fontWeight="bold">Model</Text>
            <Text fontWeight="bold">Created Date</Text>
            <Text fontWeight="bold">Comments</Text>
          </Grid>

          <Grid
            templateColumns="repeat(5, 1fr)"
            templateRows="auto"
            gap={6}
            bg="gray.200"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.500"
            px="2"
            py="1"
          >
            <Text fontWeight="bold">Amount</Text>
            <Text fontWeight="bold">Bill No.</Text>
            <Text fontWeight="bold">Model</Text>
            <Text fontWeight="bold">Created Date</Text>
            <Text fontWeight="bold">Comments</Text>
          </Grid>
        </Box>
        <Flex>
          <Box ml="3">
            <Text fontWeight="bold">
              SE-0000001
              <Badge ml="1" variantColor="green">
                Service
              </Badge>
            </Text>
            <Badge ml="1" variantColor="green">
              In Completed
            </Badge>
            <Text fontSize="sm">Sss</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Body;
