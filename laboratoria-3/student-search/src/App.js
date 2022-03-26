import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Search For Help!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/students">Students</Link> |{" "}
        <Link to="/groups">Groups</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
