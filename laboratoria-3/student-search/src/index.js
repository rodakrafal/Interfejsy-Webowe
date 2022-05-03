import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import NavigateApp from "./NavigateApp";
import { ThemeProvider } from "@emotion/react";
import lightTheme from "./styles/Theme/LightTheme";

import {
  GroupsProvider,
  StudentsProvider,
} from "./data/information";


const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <StudentsProvider>
        <GroupsProvider>
          <NavigateApp />
        </GroupsProvider>
        </StudentsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
