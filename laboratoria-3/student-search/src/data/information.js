let students = [
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
];

export function getStudents() {
  return students;
}

export function getStudent(number) {
  return students.find((student) => student.number === number);
}

export function addStudent(number) {
  students.add(number[0])
}
