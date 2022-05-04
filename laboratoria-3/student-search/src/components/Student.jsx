import { useParams } from "react-router-dom";
import { StudentsContext } from "../context/information.js";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

const Student = (props) => {
    return (
        <main style={{ padding: "1rem" }}>
           <p>
            {props.name}
            </p>
            {props.tags.map((item, index) =>
                <p key={index}> {item}</p>
            )}
          <p>
            {props.name}: {props.number}
          </p>
            {props.subjects.map((item, index) =>
                <p key={index}> {item}</p>
            )}
             <p>
            {props.description}
            </p>
            <img src={props.image} alt="student" /> 
        </main>
      );
}

export default Student;