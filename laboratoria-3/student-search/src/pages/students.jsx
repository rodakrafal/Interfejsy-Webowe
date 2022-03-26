import { useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getStudents } from "../data/information";

export default function Students() {
  let students = getStudents();
  let [search, setSearch] = useState("");

  return (
    <>
      <h1> Students </h1>
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          <input
            type="text"
            value={search}
            placeholder="Please search criteria"
            onChange={(event) => {
              let filter = event.target.value;
              setSearch(filter);
            }}
          />
          {students
            .filter((student) => {
              if (!search) return true;
              let studentName = student.name.toLowerCase().split(" ");
              let studentTags = student.tags;
              let studentSubjects = student.subjects;
              let studentDescription = student.description.toLowerCase().split(" ");

              let regexDescription = /\{(.*?)\}/g;
              let regexTags = /\[(.*?)\]/g;
              let regexSubject = /\((.*?)\)/g;
              let regexName = /\"(.*?)\"/g;
              let filteredDescription = regexDescription.exec(search);
              let filteredTags = regexTags.exec(search);
              let filteredSubject = regexSubject.exec(search);
              let filteredName = regexName.exec(search);
              let desc, tags, subjects, name;
              
              if(filteredDescription && filteredDescription[1].length > 0){
                desc = filteredDescription[1].split(" ");
              }
              if(filteredTags){
                tags = filteredTags[1].split(" ");
              }
              if(filteredSubject){
                subjects = filteredSubject[1].split(" ");
              }
              if(filteredName){
                name = filteredName[1].split(" ");
              }
              
              if(desc === undefined){
                desc = null;
              }
              if(tags === undefined){
                tags = null;
              }
              if(subjects === undefined){
                subjects = null;
              }
              if(name === undefined){
                name = null;
              }

              if (               
                (desc === null ? true : (desc.every(item => studentDescription.some((description) => description.includes(item.toLowerCase()))))) &&
                (tags === null ? true : (tags.every(item => studentTags.some((tag) => tag.includes(item.toLowerCase()))))) &&
                (subjects === null ? true : (subjects.every(item => studentSubjects.some((subject) => subject.includes(item.toLowerCase()))))) &&
                (name === null ? true : (name.every(item => studentName.some((name) => name.includes(item.toLowerCase())))))
              ) {return student.name;}
            })
            .map((student) => (
              <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/students/${student.number}`}
                key={student.number}
              >
                {student.name}
              </NavLink>
            ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
