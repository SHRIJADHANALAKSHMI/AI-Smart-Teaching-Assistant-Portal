export const analyticsData = {
    overview: {
        booksAnalysed: 45,
        aiAccuracy: "98.2%",
        generatedSlides: 1250,
        generatedQuestions: 4800,
        teachingHoursSaved: 320,
        avgProcessingTime: "1.8s"
    },
    analysisTrends: [
        { month: 'Jan', processed: 4, generated: 120 },
        { month: 'Feb', processed: 6, generated: 180 },
        { month: 'Mar', processed: 10, generated: 250 },
        { month: 'Apr', processed: 8, generated: 210 },
        { month: 'May', processed: 12, generated: 350 },
        { month: 'Jun', processed: 15, generated: 480 },
    ],
    subjectUsage: [
        { subject: 'CS401', value: 45 },
        { subject: 'CS305', value: 30 },
        { subject: 'CS502', value: 15 },
        { subject: 'Other', value: 10 }
    ],
    chapterAnalytics: [
        { id: 1, name: "Process Synchronization", pages: 80, difficulty: "Hard", hours: 4, completion: 100, confidence: 99 },
        { id: 2, name: "Memory Management", pages: 75, difficulty: "Hard", hours: 3.5, completion: 100, confidence: 97 },
        { id: 3, name: "CPU Scheduling", pages: 50, difficulty: "Medium", hours: 2.5, completion: 100, confidence: 98 },
        { id: 4, name: "Virtual Memory", pages: 65, difficulty: "Advanced", hours: 3, completion: 85, confidence: 94 },
    ],
    insights: {
        mostDifficult: "Process Synchronization",
        mostGeneratedPPT: "Memory Management",
        mostGeneratedQuiz: "CPU Scheduling",
        topLearningOutcomes: ["Understand OS Structures", "Analyze Concurrency"],
        productivityIncrease: "35%"
    }
};
