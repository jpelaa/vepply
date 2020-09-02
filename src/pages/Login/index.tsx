import * as React from "react";
import {
  Button,
  Stack,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  Box,
} from "@chakra-ui/core";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  const [show, setShow] = React.useState<Boolean>(false);
  const [userName, setUserName] = React.useState("");
  const handleClick = () => setShow(!show);
  const handleChange = (e: any) => setUserName(e.target.value);
  return (
    <Flex
      align="center"
      m={2}
      justify="center"
      direction="column"
      height="100vh"
    >
      <Flex align="center" m={2} justify="center" direction="column">
        <Stack
          spacing={4}
          bg="white"
          p={8}
          boxShadow="2xl"
          borderRadius="lg"
          border="1px"
          borderColor="gray.300"
        >
          <Box textAlign="center">
            <Avatar
              name="vepply"
              size="xl"
              src="https://github.com/jpelaa/images/blob/master/vepply1.png?raw=true"
            />
          </Box>

          <Input
            value={userName}
            onChange={handleChange}
            placeholder="Enter Username"
          />

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button variantColor="primary">Login</Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
