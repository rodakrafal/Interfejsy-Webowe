import React, { useContext, useState } from 'react';
import { InformationStudentsContext } from "../data/informationStudentsContext";

export default function StudentAdd() {
  const [students, setStudents] = useContext(InformationStudentsContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [subjects, setSubjects] = useState("");
  const [email, setEmail] = useState("");

  const updateName = (event) => {
    setName(event.target.value);
  };
  const updateDescription = (event) => {
    setDescription(event.target.value);
  };
  const updateTags = (event) => {
    setTags(event.target.value);
  };
  const updateSubjects = (event) => {
    setSubjects(event.target.value);
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const addStudent = (event) => {
    event.preventDefault();
    setStudents(prevStudents => [...prevStudents, {
      name: name,
      description: description,
      tags: tags.split(" "),
      subjects: subjects.split(" "),
      email: email,
      number: prevStudents.length + 1,
    }]);
  };

    return (
        <main style={{ padding: "1rem" }}>
           <p>
             hi!
            </p>
            {
              <form>
                <input type="text" placeholder="name" value={name} onChange={updateName}/>
                <input type="text" placeholder="description" value={description} onChange={updateDescription}/>
                <input type="text" placeholder="tags" value={tags} onChange={updateTags}/>
                <input type="text" placeholder="subjects" value={subjects} onChange={updateSubjects}/>
                <input type="text" placeholder="email" value={email} onChange={updateEmail}/>
                <button onClick={addStudent}>Add Student</button>
              </form>
            }
        </main>
    );
}