export const presentation = {
    slides: [
        { id: "slide-1", title: "Introduction to Operating Systems", content: ["What is an Operating System?", "History and Evolution of OS", "Types of Operating Systems (Batch, Time-sharing, Distributed)"], type: "title-and-body" },
        { id: "slide-2", title: "Core Functions of an OS", content: ["Process Management", "Memory Management", "File System Management", "Device Management", "Security & Access Control"], type: "bullets" },
        { id: "slide-3", title: "System Calls architecture", content: ["User mode vs Kernel mode", "How system calls map user requests to kernel tasks", "Examples: read(), write(), fork()"], type: "image-and-text" },
        { id: "slide-4", title: "Process States", content: ["New", "Ready", "Running", "Waiting", "Terminated"], type: "bullets" },
        { id: "slide-5", title: "Process Control Block (PCB)", content: ["Process State", "Program Counter", "CPU Registers", "CPU Scheduling Information", "Memory Management Information"], type: "bullets" },
        { id: "slide-6", title: "Context Switching", content: ["Saving state of old process", "Loading state of new process", "Performance overhead of context switches"], type: "bullets" },
        { id: "slide-7", title: "Interprocess Communication", content: ["Shared Memory", "Message Passing", "Pipes", "Sockets"], type: "bullets" },
        { id: "slide-8", title: "CPU Scheduling Metrics", content: ["CPU Utilization", "Throughput", "Turnaround Time", "Waiting Time", "Response Time"], type: "bullets" },
        { id: "slide-9", title: "Scheduling Algorithms", content: ["FCFS", "SJF", "Priority", "Round Robin", "Multilevel Queue"], type: "bullets" },
        { id: "slide-10", title: "Summary", content: ["OS is a resource allocator", "Manages hardware and software", "Provides User Interface and APIs"], type: "bullets" }
    ]
};
