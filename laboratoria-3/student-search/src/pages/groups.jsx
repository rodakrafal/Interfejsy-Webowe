import { useContext, useState } from "react";
import { NavLink, Outlet, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { InformationGroupsContext } from "../data/informationGroupsContext";


export default function Groups() {
  const [groups, setGroups] = useContext(InformationGroupsContext);

  let [search, setSearch] = useState("");

  return (
    <>
      <div style={{ display: "flex" }}>
        <h1> groups </h1> 
          {
             <NavLink
             style={({ isActive }) => ({
               display: "block",
               margin: "1rem 0",
               color: isActive ? "red" : "",
             })}
             to={`/add-group`}
           > Add new listing!
           </NavLink>
          }
      </div>
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
          {groups
            .filter((group) => {
              if (!search) return true;
              let groupName = group.name.toLowerCase().split(" ");
              let groupTags = group.tags;
              let groupSubjects = group.subjects;
              let groupDescription = group.description.toLowerCase().split(" ");

              let regexDescription = /\{(.*?)\}/g;
              let regexTags = /\[(.*?)\]/g;
              let regexSubject = /\((.*?)\)/g;
              let regexName = /\"(.*?)\"/g;
              let filteredDescription = regexDescription.exec(search);
              let filteredTags = regexTags.exec(search);
              let filteredSubject = regexSubject.exec(search);
              let filteredName = regexName.exec(search);
              let desc, tags, subjects, name;
              
              if(filteredDescription){
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
                (desc === null ? true : (desc.every(item => groupDescription.some((description) => description.includes(item.toLowerCase()))))) &&
                (tags === null ? true : (tags.every(item => groupTags.some((tag) => tag.includes(item.toLowerCase()))))) &&
                (subjects === null ? true : (subjects.every(item => groupSubjects.some((subject) => subject.includes(item.toLowerCase()))))) &&
                (name === null ? true : (name.every(item => groupName.some((name) => name.includes(item.toLowerCase())))))
              ) {return group.name;}
            })
            .map((group) => (
              <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/groups/${group.number}`}
                key={group.number}
              >
                {group.name}
              </NavLink>  
            ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
