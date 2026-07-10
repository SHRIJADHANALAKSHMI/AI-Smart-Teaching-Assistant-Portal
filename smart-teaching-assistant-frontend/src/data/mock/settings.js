export const defaultSettings = {
    profile: {
        name: "Dr. Jonathan Crane",
        email: "j.crane@university.edu",
        department: "Computer Science",
        designation: "Associate Professor",
        phone: "+1 (555) 123-4567",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Jonathan"
    },
    aiPreferences: {
        model: "gpt-4o",
        quality: "high",
        language: "en-US",
        autoGenerateNotes: true,
        autoGenerateQuiz: true,
        autoGeneratePPT: false,
        autoSave: true,
        confidenceThreshold: 90,
        smartSuggestions: true
    },
    notifications: {
        email: true,
        browser: true,
        assignments: true,
        analysisComplete: true,
        weeklySummary: false,
        systemUpdates: true
    },
    appearance: {
        theme: "light",
        accentColor: "orange",
        fontSize: "medium",
        compactMode: false,
        animations: true
    },
    security: {
        twoFactor: false,
        lastLogin: "2026-07-10T09:12:00Z"
    }
};
