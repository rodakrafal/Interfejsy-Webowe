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
  UsersProvider,
} from "./context/information";


const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <UsersProvider>
        <StudentsProvider>
        <GroupsProvider>
          <NavigateApp />
        </GroupsProvider>
        </StudentsProvider>
        </UsersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
