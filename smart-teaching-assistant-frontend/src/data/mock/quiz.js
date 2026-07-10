export const quiz = {
    questions: Array.from({ length: 20 }, (_, i) => ({
        id: `q${i + 1}`,
        question: `Sample auto-generated OS MCQ Question ${i + 1}`,
        options: [
            `Option A for Question ${i + 1}`,
            `Option B for Question ${i + 1}`,
            `Option C for Question ${i + 1}`,
            `Option D for Question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        difficulty: i < 5 ? "Easy" : i < 15 ? "Medium" : "Hard",
        marks: i < 5 ? 1 : i < 15 ? 2 : 5,
        explanation: `This is a generated explanation for Question ${i + 1}. The correct option provides the expected runtime behavior.`
    }))
};
// Make the first 3 questions realistic
quiz.questions[0] = {
    id: "q1",
    question: "Which component of an OS manages memory allocation?",
    options: ["Process Manager", "Memory Manager", "File System", "Device Manager"],
    correctAnswer: 1,
    difficulty: "Easy",
    marks: 2,
    explanation: "The Memory Manager tracks which parts of memory are currently in use and allocates memory to processes."
};
quiz.questions[1] = {
    id: "q2",
    question: "What is a system call?",
    options: ["A hardware interrupt", "The interface between user application and OS kernel", "A regular function call in C", "A network request"],
    correctAnswer: 1,
    difficulty: "Medium",
    marks: 4,
    explanation: "System calls provide an essential interface between a process and the operating system."
};
