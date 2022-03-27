import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import Students from "./pages/students";
import Student from './pages/student';
import Groups from './pages/groups';
import Group from './pages/group';
import StudentContact from './pages/student-contact';
import GroupContact from './pages/group-contact';
import StudentAdd from './pages/add-student';
import GroupAdd from './pages/add-group';
import { InformationStudentsProvider } from './data/informationStudentsContext';
import { InformationGroupsProvider } from './data/informationGroupsContext';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <InformationGroupsProvider>
    <InformationStudentsProvider>
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
        <Route path="groups" element={<Groups />}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a group!</p>
              </main>
            }
            />
          <Route path=":groupId" element={<Group />} />
        </Route>
        <Route path="groups/:groupId/group-contact" element={<GroupContact />} />
        <Route path="add-group" element={<GroupAdd />} />

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
        <Route path="students/:studentId/student-contact" element={<StudentContact />} />
        <Route path="add-student" element={<StudentAdd />} />
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
    </InformationStudentsProvider>
    </InformationGroupsProvider>
  </BrowserRouter>,
  rootElement
);