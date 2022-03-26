import { useParams } from "react-router-dom";
import { getStudent } from "../data/information";

export default function Student() {
    let params = useParams();
    let student = getStudent(parseInt(params.studentId, 10));
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
        </main>
      );
}