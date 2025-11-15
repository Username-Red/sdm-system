// This is the Landing Page of the Student Data Management System.
// Users will see this page first and can navigate to the "Add Student" page.

// "Link" is imported from next/link because Next.js uses this component
// for client-side navigation between pages.
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

      {/* Page title */}
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Student Data Management System
      </h1>

      {/* Simple description */}
      <p className="text-lg text-gray-700 mb-10 text-center max-w-xl">
        Welcome! Use this system to manage students' information easily.
        Click the button below to add a new student.
      </p>

      {/* Navigation Button to Add Student Page */}
      <Link 
        href="/add_student" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add a Student
      </Link>
    </main>
  );
}
