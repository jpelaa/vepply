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
  useToast,
} from "@chakra-ui/core";
import { checkCredentials } from "../../services/login";
import { StateContext } from "context";
import { useHistory } from "react-router-dom";

const Login: React.SFC = () => {
  const [show, setShow] = React.useState<Boolean>(false);
  const [loginDetails, setLogin] = React.useState({
    userName: "",
    password: "",
  });

  const history = useHistory();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState({
    userName: false,
    password: false,
  });
  const { dispatch } = React.useContext(StateContext);
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const handleChange = (e: any, name: string) =>
    setLogin({ ...loginDetails, [name]: e.target.value });

  const handleLogin = async () => {
    try {
      if (loginDetails.userName.length === 0) {
        setError({
          ...error,
          userName: true,
        });
        return;
      }
      if (loginDetails.password.length === 0) {
        setError({
          ...error,
          password: true,
        });
        return;
      }
      setLoading(true);
      const logInAPI = await checkCredentials(loginDetails);
      dispatch({
        userName: logInAPI.userName,
        hasAccess: logInAPI.hasAccess,
      });
      localStorage.hasLogin = true;
      history.push("/1");
      setLoading(false);
    } catch (err) {
      toast({
        title: "Login Failed",
        position: "top-right",
        description: "Incorrect username or password",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      localStorage.hasLogin = undefined;

      setLoading(false);
    }
  };

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
            value={loginDetails.userName}
            onChange={(e: any) => handleChange(e, "userName")}
            isInvalid={error.userName}
            errorBorderColor="red.300"
            placeholder="Enter Username"
          />

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              isInvalid={error.password}
              errorBorderColor="red.300"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e: any) => handleChange(e, "password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            variantColor="primary"
            loadingText="loading"
            isLoading={isLoading}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
