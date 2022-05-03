import { useParams } from "react-router-dom";
import { InformationStudentsContext } from "../data/information.js";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Student() {
    let params = useParams();
    
    const [students, setStudents ] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/data/students.json")
        .then((response) => {
          setStudents(response.data);
        });
    }, []);

    let student = students.find((student) => student.number === parseInt(params.studentId, 10));

    return (
        <main style={{ padding: "1rem" }}>
           <p>
            {student.name}
            </p>
            {student.tags.map((item) =>
                <p> {item}</p>
            )}
          <p>
            {student.name}: {student.number}
          </p>
            {student.subjects.map((item) =>
                <p> {item}</p>
            )}
             <p>
            {student.description}
            </p>
            <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/students/${student.number}/student-contact`}
                key={student.number}
              >
                Wyślij Mail!
            </NavLink>
        </main>
      );
}