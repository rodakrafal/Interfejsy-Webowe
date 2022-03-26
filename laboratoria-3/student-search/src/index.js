import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import Students from "./pages/students";
import Student from './pages/student';
import Groups from './pages/groups';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem" }}>
              <p>Select an option</p>
            </main>
          }
        />
        <Route path="groups" element={<Groups />} />
        <Route path="students" element={<Students />}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a student!</p>
              </main>
            }
            />
          <Route path=":studentId" element={<Student />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);