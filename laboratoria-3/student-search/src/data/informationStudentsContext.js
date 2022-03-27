import React, { useState, createContext } from "react";

export const InformationStudentsContext = createContext();

export const InformationStudentsProvider = (props) => {
  const [students, setStudents] = useState([
    {
      name: "Jan Kowalski",
      number: 1,
      description: "Testowy tekst poszukiwania grupy",
      tags: ["python", "backend", "flask"],
      subjects: ["Inżynieria obrazów", "Projektowanie i programowanie gier"],
      email: "test@mail.com",
    },
    {
      name: "Adam Kowalski",
      number: 2,
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      tags: ["js", "jquery", "frontend", "python"],
      subjects: ["PIWo", "Projektowanie interesów webowych 'O"],
      email: "test2@mail.com",
    },
    {
      name: "Cariusz Daban",
      number: 3,
      description: "lorem ipsum, text, testowy",
      tags: ["vhdl", "bash", "linux"],
      subjects: ["SO2", "UCISW"],
      email: "test3@mail.com",
    },
    {
      name: "Parek Miasecki",
      number: 4,
      description: "lorem ipsum, text, testowy",
      tags: ["c++", "c", "visual studio"],
      subjects: ["PP", "Podstawy programowania"],
      email: "test3@mail.com",
    },
  ]);

  const [groups, setGroups] = useState([
    {
      name: "Grupa 1",
      number: 1,
      description: "Testowy tekst poszukiwania grupy",
      tags: ["python", "backend", "flask"],
      subjects: ["Inżynieria obrazów", "Projektowanie i programowanie gier"],
      people: [
        {
          name: "Jan Kowalski",
          email: "jankowalski@gmail.com",
        },
        {
          name: "Adam Kowalski",
          email: "addaaam@test.com",
        },
        {
          name: "Magda Magda",
          email: "kaban@urw.not.pwr.pl",
        },
      ],
    },
    {
      name: "Grupa 2",
      number: 2,
      description:
        "Zaskakująco inteligentna grupa w której na pewno nie ma prowadzących",
      tags: ["backend", "devOps", "flask", "SI"],
      subjects: ["SI", "Projektowanie i programowanie sieci neuronowych"],
      people: [
        {
          name: "John Biernat",
          email: "ak2@nieDlaCiebieStudencie.com",
        },
        {
          name: "Parek Miasecki",
          email: "cppIsTheBest@real.com",
        },
        {
          name: "Cariusz Daban",
          email: "kaban@urw.not.pwr.pl",
        },
        {
          name: "Piter Cruasant",
          email: "help@urw.pl",
        },
        {
          name: "Ted Tomczak",
          email: "kartaGraficznahahaBrrr@nienawidzeAK.pl",
        },
      ],
    },
    {
      name: "Grupa 3",
      number: 3,
      description: "Nie mam pojęcia co robimy, ale chyba idzie to dobrze?",
      tags: ["pomocy", "tag", "student"],
      subjects: ["Flanki", "PIWo"],
      people: [
        {
          name: "Pan Student",
          email: "student1@gmail.com",
        },
        {
          name: "Pan Student tylko że 2",
          email: "student2@gmail.com",
        },
        {
          name: "Nie dziekan",
          email: "naPrawde@jaNieKłamie.com",
        },
        {
          name: "Rektor",
          email: "rektor@prawdziwyRektor.eu",
        },
      ],
    },
  ]);
  
  return (
    <InformationStudentsContext.Provider
      value={[students, setStudents]}
    >
       {props.children}
     </InformationStudentsContext.Provider>
  );
};
