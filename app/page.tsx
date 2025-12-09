"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { auth, database } from "./firebase/config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

interface Student {
  id: string;
  name: string;
  age?: number;
  course?: string;
}

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signingOut, signOutError] = useSignOut(auth);

  const [searchTerm, setSearchTerm] = useState(""); // For SearchBar
  const [students, setStudents] = useState<Student[]>([]); // All students
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]); // Filtered results

  // Fetch all students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "students"));
        const studentList: Student[] = [];
       querySnapshot.forEach((doc) => {
  studentList.push({ ...(doc.data() as Student), id: doc.id });
        });
        setStudents(studentList);
        setFilteredStudents(studentList); // initial display
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Filter students as user types
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  return (
    <div className="p-4">
      <h1>Welcome to Student Data Management System</h1>
      <p>Manage student records table below</p>

      {/* SearchBar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Display filtered students */}
      <div className="mt-4">
        {filteredStudents.length > 0 ? (
          <ul>
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong>{" "}
                {student.age && `- Age: ${student.age}`}{" "}
                {student.course && `- Course: ${student.course}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
