import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load student data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading student profiles…</p>;
  }

  return (
    <>
    <Header />
    <main className="introductions-page" style={{ padding: "20px" }}>
      <h1>ITIS 3135 — Student Introductions</h1>

      {students.map((student) => (
        <div
          key={student.prefix}
          style={{
            background: "#f5f5f5",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h2 style={{ marginBottom: "5px" }}>
            {student.name.first} {student.name.middleInitial}{" "}
            {student.name.last}
          </h2>
          {student.name.preferred && (
            <p>
              <strong>Preferred Name:</strong> {student.name.preferred}
            </p>
          )}

          <p>
            <strong>Mascot:</strong> {student.mascot}
          </p>

          {student.media?.hasImage && (
            <img
              src={`https://dvonb.xyz${student.media.src}`}
              alt={student.media.caption}
              style={{
                maxWidth: "200px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
          )}

          <h3>Background</h3>
          <p>
            <strong>Personal:</strong> {student.backgrounds.personal}
          </p>
          <p>
            <strong>Professional:</strong> {student.backgrounds.professional}
          </p>
          <p>
            <strong>Academic:</strong> {student.backgrounds.academic}
          </p>

          {student.personalStatement && (
            <>
              <h3>Personal Statement</h3>
              <p>{student.personalStatement}</p>
            </>
          )}

          {student.quote?.text && (
            <p>
                <strong>Quote:</strong>{" "}
                {student.quote.text} <em>{student.quote.author && `— ${student.quote.author}`}</em>
            </p>
          )}

          {student.funFact && (
            <p>
              <strong>Fun Fact:</strong> {student.funFact}
            </p>
          )}

          <h3>Links</h3>
          <ul>
            {Object.entries(student.links || {}).map(([key, value]) => (
              <li key={key}>
                <a href={value} target="_blank">
                  {key.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>

          <h3>Courses</h3>
          <ul>
            {student.courses.map((course, idx) => (
              <li key={idx}>
                {course.code} — {course.name}  
                <br />
                Reason: {course.reason}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
    <Footer />
    </>
  );
}