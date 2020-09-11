import * as React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Badge,
  Grid,
  ButtonGroup,
  Button,
  Spinner,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  Select,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/core";
import AddNewSection from "./AddNewSection";
import Category from "../../../components/Category";

import { INVENTORY_TYPES, API_STATUS } from "../../../static/types";
import { StateContext } from "context";
import { getListData } from "../../../services/list";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { getColorByStatus } from "utils";

const Body: React.SFC = () => {
  const { state, dispatch } = React.useContext(StateContext);
  const { page } = useParams();
  const history = useHistory();
  const initialFocusRef = React.useRef<HTMLElement>(null);

  const loadPagination = async (page: number, selectedCategory: string) => {
    dispatch({
      pageStatus: API_STATUS.progress,
    });
    const data = await getListData(selectedCategory, page);
    dispatch({
      list: data.list,
      pageStatus: API_STATUS.done,
      totalCount: data.totalCount.aggregate.totalCount,
    });
  };
  React.useEffect(() => {
    loadPagination(page - 1, state.selectedCategory);
  }, [page, state.selectedCategory]);

  return (
    <Box p="10" bg="primary.200">
      <Heading textAlign="center" fontStyle="bold" color="grey.800">
        Inventory Board
      </Heading>
      <AddNewSection />
      <Box py="5" textAlign="center">
        {state.pageStatus === API_STATUS.done && state.list.length > 0 && (
          <>
            <Box
              py="2"
              display="grid"
              gridGap={2}
              gridAutoFlow="column"
              gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            >
              {Object.keys(INVENTORY_TYPES).map((data: string) => (
                <Category
                  key={data}
                  text={INVENTORY_TYPES[data]}
                  isSelected={INVENTORY_TYPES[data] === state.selectedCategory}
                  onClick={() =>
                    dispatch({
                      selectedCategory: INVENTORY_TYPES[data],
                      list: [],
                    })
                  }
                />
              ))}
            </Box>
            <Box>
              <Grid
                templateColumns="repeat(7, 1fr)"
                templateRows="auto"
                gap={6}
                bg="gray.300"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.400"
                p="2"
              >
                <Text fontWeight="bold">Amount</Text>
                <Text fontWeight="bold">Bill No.</Text>
                <Text fontWeight="bold">
                  {state.selectedCategory === INVENTORY_TYPES.service
                    ? "Model"
                    : "Order Name"}
                </Text>

                <Text fontWeight="bold">Status</Text>
                <Text fontWeight="bold">Created Date</Text>
                <Text fontWeight="bold">Comments</Text>
                <Text fontWeight="bold">Action</Text>
              </Grid>

              {state.list.map((data: any, index: number) => (
                <Grid
                  templateColumns="repeat(7, 1fr)"
                  templateRows="auto"
                  gap={6}
                  bg="gray.100"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.400"
                  p="2"
                  key={index}
                >
                  <Text>{data.amount}</Text>
                  <Text color="gray.500">{`${state.selectedCategory.slice(
                    0,
                    1
                  )}-${data.bill_no}`}</Text>
                  <Text>{data.name}</Text>
                  <Box>
                    {data.status && (
                      <Badge
                        variantColor={getColorByStatus(
                          state.selectedCategory,
                          data.status
                        )}
                      >
                        {data.status}
                      </Badge>
                    )}
                  </Box>
                  <Text>
                    {new Intl.DateTimeFormat("en-IN").format(
                      new Date(data.created_date)
                    )}
                  </Text>
                  <Text>{data.comments} </Text>
                  <Box>
                    <Popover placement="left">
                      <PopoverTrigger>
                        <Button variantColor="green" size="xs">
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        zIndex={4}
                        bg="gray.300"
                        borderColor="primary.800"
                      >
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                          Change Status
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Select>
                            <option value="ss">SS</option>
                          </Select>
                        </PopoverBody>
                        <PopoverFooter
                          border="0"
                          d="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          pb={4}
                        >
                          <ButtonGroup size="sm">
                            <Button variant="solid">Cancel</Button>
                            <Button variantColor="blue">Save</Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Grid>
              ))}
            </Box>
          </>
        )}
        {state.pageStatus === API_STATUS.done && state.list.length === 0 && (
          <Box bg="primary.100" w="100%" p={4} color="gray.500">
            <p>No Data</p>
          </Box>
        )}

        {state.pageStatus === API_STATUS.progress && (
          <Box bg="primary.100" w="100%" p={4} color="gray.500">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
        <Flex justifyContent="space-between" my="2">
          <Text>{state.totalCount} results </Text>
          <Flex justifyContent="flex-end">
            <ButtonGroup spacing={4}>
              <Button
                variantColor="gray"
                size="xs"
                isDisabled={page == 1}
                onClick={() => history.push(`/${Number(page) - 1}`)}
              >
                Previous
              </Button>
              <Button
                variantColor="gray"
                size="xs"
                onClick={() => history.push(`/${Number(page) + 1}`)}
                isDisabled={state.totalCount < 10}
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default withRouter(Body);
