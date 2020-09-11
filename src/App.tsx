import React, { useEffect } from "react";
import { ThemeProvider, CSSReset, Spinner, Flex } from "@chakra-ui/core";
import { customTheme } from "./theme";
import Routes from "./routes";
import { getAllStaticData } from "services/static";
import { StateContext } from "context";
import { API_STATUS } from "static/types";

function App() {
  const { state, dispatch } = React.useContext(StateContext);
  useEffect(() => {
    if (!localStorage.getItem("isStaticDataLoaded")) {
      loadStaticData();
    }
  }, []);

  async function loadStaticData() {
    try {
      dispatch({
        staticLoadingStatus: API_STATUS.progress,
      });
      await getAllStaticData();
      dispatch({
        staticLoadingStatus: API_STATUS.done,
      });
    } catch (err) {
      dispatch({
        staticLoadingStatus: API_STATUS.error,
        errorMessage: err.message,
      });
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      {state.staticLoadingStatus === API_STATUS.progress && (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
      {state.staticLoadingStatus === API_STATUS.done && <Routes />}
    </ThemeProvider>
  );
}

export default App;
