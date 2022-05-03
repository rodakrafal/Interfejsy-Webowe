import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import NavigateApp from "./NavigateApp";
import { ThemeProvider } from "@emotion/react";
import lightTheme from "./styles/Theme/LightTheme";
import { InformationStudentsProvider } from "./data/informationStudentsContext";
import { InformationGroupsProvider } from "./data/informationGroupsContext";

import {
  ListOfGroupsProvider,
  ListOfStudentsProvider,
} from "./data/information";


const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <InformationGroupsProvider>
          <InformationStudentsProvider>
              <ListOfStudentsProvider>
            <ListOfGroupsProvider>
                <NavigateApp />
                </ListOfGroupsProvider>
          </ListOfStudentsProvider>
          </InformationStudentsProvider>
        </InformationGroupsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
