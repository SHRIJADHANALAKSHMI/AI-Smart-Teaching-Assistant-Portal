export const dummyDepartments = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "Information Tech", "AI & Data Science", "Biotechnology", "Automobile", "Aerospace"][i],
    code: ["CSE", "ECE", "MECH", "CIVIL", "EEE", "IT", "AIDS", "BT", "AUTO", "AERO"][i],
    hod: `Dr. ${["Ramesh", "Anitha", "Karthik", "Meena", "Suresh", "Lakshmi", "Rajesh", "Priya", "Kumar", "Shankar"][i]}`,
    professors: Math.floor(Math.random() * 20) + 5,
    students: Math.floor(Math.random() * 400) + 100,
    subjects: Math.floor(Math.random() * 30) + 10,
    status: Math.random() > 0.1 ? "Active" : "Inactive",
}));

export const dummySubjects = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Subject ${i + 1} - ${["Data Structures", "Networks", "Thermodynamics", "Machine Learning", "VLSI Design"][i % 5]}`,
    code: `SUB${100 + i}`,
    department: dummyDepartments[i % 10].code,
    semester: (i % 8) + 1,
    credits: Math.floor(Math.random() * 3) + 2,
    professor: `Dr. Prof ${i + 1}`,
    materialCount: Math.floor(Math.random() * 25),
    status: Math.random() > 0.1 ? "Active" : "Archived",
}));

export const dummyProfessors = Array.from({ length: 35 }).map((_, i) => ({
    id: i + 1,
    name: `Dr. ${["Ramesh", "Anitha", "Karthik", "Meena", "Suresh"][i % 5]} ${i}`,
    department: dummyDepartments[i % 10].code,
    subjects: [dummySubjects[i % 50].name, dummySubjects[(i + 1) % 50].name],
    status: Math.random() > 0.2 ? "Active" : "On Leave",
    email: `prof${i}@college.edu`,
    phone: `+91 9876543${i.toString().padStart(3, '0')}`,
    aiUsage: Math.floor(Math.random() * 100) + "%",
    performance: (Math.random() * 2 + 3).toFixed(1),
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

export const dummyStudents = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    rollNo: `7104${20 + Math.floor(i / 10)}${100 + i}`,
    name: `Student ${i + 1} - ${["Rahul", "Sneha", "Vikram", "Pooja", "Arjun"][i % 5]}`,
    department: dummyDepartments[i % 10].code,
    semester: (i % 8) + 1,
    email: `student${i + 1}@psgct.edu`,
    cgpa: (Math.random() * 4 + 6).toFixed(2),
    attendance: Math.floor(Math.random() * 20 + 80) + "%",
    status: "Active",
    avatar: `https://i.pravatar.cc/150?img=${((i + 35) % 70) + 1}`
}));

export const dummyMaterials = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: `Lecture Material ${i + 1}: ${["Intro", "Advanced", "Summary", "Notes", "Lab Manual"][i % 5]}`,
    subject: dummySubjects[i % 50].name,
    professor: dummyProfessors[i % 35].name,
    department: dummyDepartments[i % 10].code,
    semester: (i % 8) + 1,
    type: ["PDF", "PPTX", "DOCX", "VIDEO"][i % 4],
    size: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

export const dummyQuestions = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    question: `What is the significance of concept ${i + 1} in ${dummySubjects[i % 50].name}?`,
    subject: dummySubjects[i % 50].name,
    difficulty: ["Easy", "Medium", "Hard"][i % 3],
    type: ["MCQ", "Descriptive", "True/False"][i % 3],
    bloomLevel: ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"][i % 6],
    marks: Math.floor(Math.random() * 10) + 2,
}));

export const dummyAssessments = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Continuous Assessment ${i + 1}`,
    subject: dummySubjects[i % 50].name,
    date: new Date(Date.now() + Math.random() * 1000000000).toISOString().split('T')[0],
    duration: `${Math.floor(Math.random() * 60) + 30} mins`,
    totalMarks: Math.floor(Math.random() * 50) + 50,
    status: ["Upcoming", "Completed", "Draft"][i % 3],
    type: "AI Generated"
}));

export const dummyNotifications = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: ["New Professor Joined", "System Report Ready", "Storage Alert", "Curriculum Updated", "Security Update"][i % 5],
    message: `Detail about notification ${i + 1}...`,
    time: `${i + 1} hours ago`,
    type: ["success", "info", "warning", "info", "warning"][i % 5],
    read: Math.random() > 0.5,
}));

export const dummyStats = {
    totalStudents: 2543,
    totalProfessors: 45,
    totalDepartments: 10,
    totalSubjects: 120,
    materialsUploaded: 1432,
    assessmentsGenerated: 256,
    questionPapersGenerated: 412,
    reportsGenerated: 890,
    systemUptime: "99.9%",
    storageUsed: "56%",
};
