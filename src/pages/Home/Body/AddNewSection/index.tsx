import * as React from "react";
import {
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
  Box,
  Select,
  Textarea,
  DrawerFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import AsyncCreatableSelect from "react-select/async-creatable";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { INVENTORY_TYPES } from "../../../../static/types";
import { getModel } from "services/static";
import { insertOrderEntry, insertServiceEntry } from "services/insert";

export interface AddNewSectionProps {}

const AddNewSection: React.SFC<AddNewSectionProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);
  const btnRef = React.useRef(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [statusList, setStatusList] = React.useState<any>([]);

  const [entryData, setAddEntryData] = React.useState({
    order_name: "",
    model: "",
    status: "",
    amount: null,
    comments: "",
    created_date: new Date(),
  });
  const toast = useToast();

  const [timerHandle, setTimerHandle] = React.useState<any>();
  const [isLoading, setLoading] = React.useState<any>(false);

  React.useEffect(() => {
    const statusListFromStorage = localStorage.getItem(
      `${selectedCategory}_status_list`
    );
    if (selectedCategory.length > 0 && statusListFromStorage) {
      setStatusList(JSON.parse(statusListFromStorage));
    }
  }, [selectedCategory]);

  const deferredGetOptions = (inputValues: string) => {
    return new Promise((resolve) => {
      clearTimeout(timerHandle);
      const handle = setTimeout(async () => {
        const modelList = await getModel(inputValues);
        console.log(modelList, " modeList ");
        return resolve(modelList);
      }, 250);
      setTimerHandle(handle);
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (selectedCategory === INVENTORY_TYPES.order) {
        await insertOrderEntry(entryData);
      } else {
        await insertServiceEntry(entryData);
      }
      toast({
        title: "Success",
        position: "top-right",
        description: "Successfully entry added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } catch (err) {
      toast({
        title: "Insert Failed",
        position: "top-right",
        description: "Something went wrong",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box py="5" textAlign="center">
      <ButtonGroup spacing={4}>
        {Object.keys(INVENTORY_TYPES).map((data: string) => (
          <Button
            ref={btnRef}
            variantColor="blue"
            key={data}
            onClick={() => {
              onOpen();
              setSelectedCategory(INVENTORY_TYPES[data]);
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
        isFullHeight
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Add New {selectedCategory}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              {selectedCategory === INVENTORY_TYPES.order && (
                <Box>
                  <FormLabel htmlFor="order_name">Order Name</FormLabel>
                  <Input
                    id="order_name"
                    onChange={(e: any) =>
                      setAddEntryData({
                        ...entryData,
                        order_name: e.target.value,
                      })
                    }
                  />
                </Box>
              )}
              {selectedCategory === INVENTORY_TYPES.service && (
                <Box>
                  <FormLabel htmlFor="model">Model</FormLabel>
                  <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    onChange={(value: any) =>
                      setAddEntryData({ ...entryData, model: value.value })
                    }
                    loadOptions={deferredGetOptions}
                  />
                </Box>
              )}
              <Box>
                <FormLabel htmlFor="order-status">Order Status</FormLabel>
                <Select
                  id="order-status"
                  onChange={(e: any) =>
                    setAddEntryData({ ...entryData, status: e.target.value })
                  }
                >
                  <option value={""} key={"select"}>
                    Select status
                  </option>
                  {statusList.map((data: any) => (
                    <option value={data.value} key={data.value}>
                      {data.label}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <NumberInput
                  id="amount"
                  onChange={(value: any) =>
                    setAddEntryData({ ...entryData, amount: value })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Box>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={entryData.created_date}
                    onChange={(date: any) =>
                      setAddEntryData({ ...entryData, created_date: date })
                    }
                  />
                </Box>
              </Box>
              <Box>
                <FormLabel htmlFor="comments">Comments</FormLabel>
                <Textarea
                  id="comments"
                  onChange={(e: any) =>
                    setAddEntryData({ ...entryData, comments: e.target.value })
                  }
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              variantColor="blue"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AddNewSection;
