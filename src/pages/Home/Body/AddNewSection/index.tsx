import * as React from "react";
import {
  Heading,
  ButtonGroup,
  useDisclosure,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  FormLabel,
  Stack,
  Input,
  Box,
  Select,
  Textarea,
  DrawerFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";
import AsyncCreatableSelect from "react-select/async-creatable";

import { INVENTORY_TYPES } from "../../../../static/types";

export interface AddNewSectionProps {}

const AddNewSection: React.SFC<AddNewSectionProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);
  const btnRef = React.useRef(null);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  return (
    <Box py="5" textAlign="center">
      <ButtonGroup spacing={4}>
        {Object.keys(INVENTORY_TYPES).map((data: string) => (
          <Button
            ref={btnRef}
            variantColor="blue"
            onClick={() => {
              onOpen();
              setSelectedCategory(data);
            }}
          >
            Add New {INVENTORY_TYPES[data]}
          </Button>
        ))}
      </ButtonGroup>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
        size={"md"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Add New {INVENTORY_TYPES[selectedCategory]}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="model">Model</FormLabel>
                <AsyncCreatableSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={async () => {}}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="order-status">Order Status</FormLabel>
                <Select id="order-status">
                  <option value="segun">Segun Adebayo</option>
                  <option value="kola">Kola Tioluwani</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="process">Process</FormLabel>
              </Box>
              <Box>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <NumberInput id="amount">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box>
                <FormLabel htmlFor="date">Date</FormLabel>
              </Box>
              <Box>
                <FormLabel htmlFor="comments">Comments</FormLabel>
                <Textarea id="comments" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AddNewSection;
