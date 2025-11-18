const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // rename if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedStudents() {
  const students = [
    {
      name: "Jared",
      dob: 2003,
      gender: "male",
      grade: "A+"
    },
    {
      name: "Emily",
      dob: 2004,
      gender: "female",
      grade: "A"
    },
    {
      name: "Marcus",
      dob: 2002,
      gender: "male",
      grade: "B+"
    },
    {
      name: "Tamsin",
      dob: 2003,
      gender: "female",
      grade: "A-"
    }
  ];

  const collectionRef = db.collection("students");

  for (const student of students) {
    const docRef = await collectionRef.add(student);
    console.log("Created:", docRef.id);
  }

  console.log("🔥 Done seeding!");
}

seedStudents().catch(console.error);
