"use client";

import { useEffect, useState } from "react";
import { auth, database } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";


export default function StudentsPage() {
  const [user, loading] = useAuthState(auth);
  const [students, setStudents] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");


  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState<any | null>(null);

  
  useEffect(() => {
    const loadStudents = async () => {
      const colRef = collection(database, "students");
      const snaps = await getDocs(colRef);

      const list: any[] = [];
      snaps.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));

      setStudents(list);
      setFetching(false);
    };

    loadStudents();
  }, []);

   
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(database, "students", id));
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

   
  const startNew = () => {
    setNewStudent({ name: "", dob: "", gender: "", grade: "" });
    setEditingId(null); 
  };

   
  const saveNewStudent = async () => {
    if (!newStudent.name) return alert("Name is required");

    const id = Math.random().toString(36).slice(2); 
    await setDoc(doc(database, "students", id), newStudent);

    setStudents((prev) => [...prev, { id, ...newStudent }]);
    setNewStudent(null);
  };


  const saveEdit = async (updatedStudent: any) => {
    await setDoc(doc(database, "students", updatedStudent.id), updatedStudent);
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setEditingId(null);
  };

  
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Checking Login...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
          <p className="text-lg mt-2 text-base-content/70">
            You do not have access to view this page.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold text-center text-base-content">All Students</h1>

      {fetching ? (
        <p className="mt-6 text-center text-lg">Loading students...</p>
      ) : (
        <div className="overflow-x-auto mt-8 max-w-4xl mx-auto">
            <div className="flex justify-center mt-6 text-base-content">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>

          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="text-base-content align-middle">
                {/* NEW STUDENT ROW */}
                {newStudent && (
                    <tr className="bg-base-300">
                    <td>
                        <input
                        className="input input-bordered input-sm w-full"
                        value={newStudent.name}
                        onChange={(e) =>
                            setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <input
                        className="input input-bordered input-sm w-full"
                        value={newStudent.dob}
                        onChange={(e) =>
                            setNewStudent({ ...newStudent, dob: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <input
                        className="input input-bordered input-sm w-full"
                        value={newStudent.gender}
                        onChange={(e) =>
                            setNewStudent({ ...newStudent, gender: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <input
                        className="input input-bordered input-sm w-full"
                        value={newStudent.grade}
                        onChange={(e) =>
                            setNewStudent({ ...newStudent, grade: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <button
                        className="btn btn-success btn-sm"
                        onClick={saveNewStudent}
                        >
                        Save
                        </button>
                    </td>
                    </tr>
                )}

                {/* EXISTING STUDENTS */}
                {students
                    .filter((s) =>
                    s.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((s) => {
                    const isEditing = editingId === s.id;
                    const editingData = { ...s };

                    return (
                        <tr key={s.id}>
                        {/* Name */}
                        <td>
                            {isEditing ? (
                            <input
                                className="input input-bordered input-sm w-full"
                                defaultValue={s.name}
                                onChange={(e) => (editingData.name = e.target.value)}
                            />
                            ) : (
                            s.name
                            )}
                        </td>
                        {/* DOB */}
                        <td>
                            {isEditing ? (
                            <input
                                className="input input-bordered input-sm w-full"
                                defaultValue={s.dob}
                                onChange={(e) => (editingData.dob = e.target.value)}
                            />
                            ) : (
                            s.dob
                            )}
                        </td>
                        {/* Gender */}
                        <td>
                            {isEditing ? (
                            <input
                                className="input input-bordered input-sm w-full"
                                defaultValue={s.gender}
                                onChange={(e) => (editingData.gender = e.target.value)}
                            />
                            ) : (
                            s.gender
                            )}
                        </td>
                        {/* Grade */}
                        <td>
                            {isEditing ? (
                            <input
                                className="input input-bordered input-sm w-full"
                                defaultValue={s.grade}
                                onChange={(e) => (editingData.grade = e.target.value)}
                            />
                            ) : (
                            s.grade
                            )}
                        </td>
                        {/* Actions */}
                        <td className="flex gap-2">
                            {isEditing ? (
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => saveEdit(editingData)}
                            >
                                Save
                            </button>
                            ) : (
                            <>
                                <button
                                className="btn btn-info btn-sm"
                                onClick={() => setEditingId(s.id)}
                                >
                                Edit
                                </button>

                                <button
                                className="btn btn-error btn-sm"
                                onClick={() => handleDelete(s.id)}
                                >
                                Delete
                                </button>
                            </>
                            )}
                        </td>
                        </tr>
                    );
                    })}
                </tbody>

          </table>
        </div>
      )}

      <div className="mt-6 flex gap-4 justify-center">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>

        <button onClick={startNew} className="btn btn-secondary">
          Add New Student
        </button>
      </div>
    </div>
  );
}
