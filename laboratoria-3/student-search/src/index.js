import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import NavigateApp from "./NavigateApp";
import { InformationStudentsProvider } from "./data/informationStudentsContext";
import { InformationGroupsProvider } from "./data/informationGroupsContext";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <InformationGroupsProvider>
        <InformationStudentsProvider>
          <NavigateApp />
        </InformationStudentsProvider>
      </InformationGroupsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
