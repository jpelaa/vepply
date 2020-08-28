import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "./theme";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
