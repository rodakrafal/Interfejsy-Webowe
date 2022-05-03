import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Group() {
    let params = useParams();
    
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/data/groups.json")
        .then((response) => {
          setGroups(response.data);
        });
    }, []);

    let group = groups.find((group) => group.number === parseInt(params.groupId, 10));

    return (
        <main style={{ padding: "1rem" }}>
           <p>
            {group.name}
            </p>
            {group.tags.map((item) =>
                <p> {item}</p>
            )}
          <p>
            {group.name}: {group.number}
          </p>
            {group.subjects.map((item) =>
                <p> {item}</p>
            )}
             <p>
            {group.description}
            </p>
            <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/groups/${group.number}/group-contact`}
                key={group.number}
              >
                Wyślij Mail!
            </NavLink>
        </main>
      );
}