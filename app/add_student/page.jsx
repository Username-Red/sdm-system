// app/add_student/page.jsx
// -------------------------------------------------------------
// This page contains the full Add Student form for your project.
// It uses React state, form validation, and a Firestore function
// (addStudentToDatabase) to save the student record.
// -------------------------------------------------------------

"use client"; // This makes this file a Client Component (required for form and Firebase)

import { useState } from "react";
import { addStudentToDatabase } from "@/lib/studentDatabase"; // Your Firestore function

export default function AddStudentPage() {
  // -------------------------------------------------------------
  // Form State: Stores all user input data
  // -------------------------------------------------------------
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    class: "",
    enrollmentYear: "",
  });

  // UI state for feedback and loading spinner
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // -------------------------------------------------------------
  // Handle input changes
  // -------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------------------------------------
  // Form Validation
  // -------------------------------------------------------------
  const handleValidation = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "First Name and Last Name are required.";
    }
    if (!form.email.trim()) {
      return "Email is required.";
    }
    if (!form.phone.trim()) {
      return "Phone number is required.";
    }
    if (!form.age.trim() || isNaN(form.age) || form.age <= 0) {
      return "Please enter a valid age.";
    }
    if (!form.gender.trim()) {
      return "Gender is required.";
    }
    if (!form.class.trim()) {
      return "Class is required.";
    }
    if (
      !form.enrollmentYear.trim() ||
      isNaN(form.enrollmentYear) ||
      form.enrollmentYear.length !== 4
    ) {
      return "Please enter a valid enrollment year.";
    }
    return null;
  };

  // -------------------------------------------------------------
  // Handle form submission
  // -------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = handleValidation();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);

    try {
      // Build new student object
      const newStudent = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        otherNames: form.otherNames.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim() || null,
        age: Number(form.age),
        gender: form.gender,
        class: form.class,
        enrollmentYear: Number(form.enrollmentYear),
      };

      // Save to Firestore
      const docId = await addStudentToDatabase(newStudent);

      // Success message
      setMessage({
        type: "success",
        text: `Student added successfully! (ID: ${docId})`,
      });

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        phone: "",
        address: "",
        age: "",
        gender: "",
        class: "",
        enrollmentYear: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage({
        type: "error",
        text: "Failed to add student. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // UI Rendering
  // -------------------------------------------------------------
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">Add New Student</h1>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: First, Last, Other Names */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="otherNames"
            value={form.otherNames}
            onChange={handleChange}
            placeholder="Other Names"
            className="input input-bordered w-full"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Address */}
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="input input-bordered w-full"
        />

        {/* Age, Gender, Class */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="input input-bordered w-full"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            name="class"
            value={form.class}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Class</option>
            <option>Basic 1</option>
            <option>Basic 2</option>
            <option>Basic 3</option>
            <option>Basic 4</option>
            <option>Basic 5</option>
            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>
            <option>SS 1</option>
            <option>SS 2</option>
            <option>SS 3</option>
          </select>
        </div>

        {/* Enrollment Year */}
        <input
          name="enrollmentYear"
          value={form.enrollmentYear}
          onChange={handleChange}
          placeholder="Enrollment Year (e.g., 2024)"
          className="input input-bordered w-full"
          type="number"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Student"}
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                firstName: "",
                lastName: "",
                otherNames: "",
                email: "",
                phone: "",
                address: "",
                age: "",
                gender: "",
                class: "",
                enrollmentYear: "",
              })
            }
            className="btn btn-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
