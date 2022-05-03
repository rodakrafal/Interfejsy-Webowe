import App from "./App";
import Students from "./pages/students";
import Student from './pages/student';
import Groups from './pages/groups';
import Group from './pages/group';
import StudentContact from './pages/student-contact';
import GroupContact from './pages/group-contact';
import StudentAdd from './pages/add-student';
import Info from './pages/info';
import Login from "./pages/login";
import Register from "./pages/register";
import { InformationGroupsContext } from './data/informationGroupsContext';
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import WithRouter from "./pages/withRouter";

  
function NavigateApp() {
  const [groups, setGroups] = useContext(InformationGroupsContext);

    return (
      <>
        <Routes>
          <Route path="/" element={<App />}>
              <Route
              index
              element={<Info/>}
              />
              <Route path="groups" element={<Groups />}>
              <Route path=":groupId" element={<Group />} />
              </Route>
              <Route path="groups/:groupId/group-contact" element={<GroupContact />} />
              <Route path="add-group" element={<WithRouter groups={groups} />} />

              <Route path="students" element={<Students />}>
              <Route path=":studentId" element={<Student />} />
              </Route>
              <Route path="students/:studentId/student-contact" element={<StudentContact />} />
              <Route path="add-student" element={<StudentAdd />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

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

    </>
    );
  }
  
export default NavigateApp;