"use client";

import React, { useState, useEffect } from 'react';

interface studentRecord{
    name: string;
    dob: Date;
    gender: string;
    grade: string;
}

interface EditStudentProps {
    student: studentRecord;
}

export default function EditStudent({ student }: EditStudentProps) {

        const [name, setName] = useState(student.name);
        const [dob, setDob] = useState(student.dob);
        const [gender, setGender] = useState(student.gender);
        const [grade, setGrade] = useState(student.grade);  

    
// Submission Handler
    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Record Updated!");
    }; 

    return (
    <form onSubmit={handleEditSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="date" value={dob.toDateString()} onChange={(e) => setDob(new Date(e.target.value))} />
            <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
            <input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
            <button type="submit">Update Record</button>
    </form>
);
            
}


