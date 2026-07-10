export const vivaQuestions = Array.from({ length: 20 }, (_, i) => ({
    q: `Sample Viva Question ${i + 1} regarding process management?`,
    hint: `This is the expected answer or hint that the student should mention for question ${i + 1}.`
}));
vivaQuestions[0] = { q: "Why is a system call needed?", hint: "Discuss context switching and kernel mode." };
vivaQuestions[1] = { q: "Differentiate between multiprogramming and multiprocessing.", hint: "One involves multiple processes sharing CPU concurrently, the other involves multiple CPUs." };
vivaQuestions[2] = { q: "What is a zombie process?", hint: "A process that has completed execution but still has an entry in the process table." };
