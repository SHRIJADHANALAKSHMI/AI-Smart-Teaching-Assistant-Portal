/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { dummyDepartments, dummySubjects, dummyProfessors, dummyNotifications, dummyStats } from "../utils/dummyData";

const CollegeAdminContext = createContext();

export const useCollegeAdmin = () => useContext(CollegeAdminContext);

export const CollegeAdminProvider = ({ children }) => {
    const [departments, setDepartments] = useState(() => JSON.parse(localStorage.getItem('coladmin_depts')) || dummyDepartments);
    const [subjects, setSubjects] = useState(() => JSON.parse(localStorage.getItem('coladmin_subjects')) || dummySubjects);
    const [professors, setProfessors] = useState(() => JSON.parse(localStorage.getItem('coladmin_profs')) || dummyProfessors.slice(0, 12));
    const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('coladmin_notifs')) || dummyNotifications);
    const [collegeProfile, setCollegeProfile] = useState(() => JSON.parse(localStorage.getItem('coladmin_profile')) || {
        name: "PSG College of Technology",
        code: "PSGCT",
        location: "Coimbatore, Tamil Nadu",
        website: "www.psgtech.edu",
        phone: "+91 422 257 2177",
        email: "principal@psgtech.edu",
        accreditation: "NAAC A++",
        plan: "Enterprise ERP Plan",
        founded: 1951,
    });

    useEffect(() => localStorage.setItem('coladmin_depts', JSON.stringify(departments)), [departments]);
    useEffect(() => localStorage.setItem('coladmin_subjects', JSON.stringify(subjects)), [subjects]);
    useEffect(() => localStorage.setItem('coladmin_profs', JSON.stringify(professors)), [professors]);
    useEffect(() => localStorage.setItem('coladmin_notifs', JSON.stringify(notifications)), [notifications]);
    useEffect(() => localStorage.setItem('coladmin_profile', JSON.stringify(collegeProfile)), [collegeProfile]);

    const addDepartment = (dept) => setDepartments([{ ...dept, id: Date.now() }, ...departments]);
    const updateDepartment = (dept) => setDepartments(departments.map(d => d.id === dept.id ? dept : d));
    const deleteDepartment = (id) => setDepartments(departments.filter(d => d.id !== id));

    const addSubject = (sub) => setSubjects([{ ...sub, id: Date.now() }, ...subjects]);
    const updateSubject = (sub) => setSubjects(subjects.map(s => s.id === sub.id ? sub : s));
    const deleteSubject = (id) => setSubjects(subjects.filter(s => s.id !== id));

    const addProfessor = (prof) => setProfessors([{ ...prof, id: Date.now() }, ...professors]);
    const updateProfessor = (prof) => setProfessors(professors.map(p => p.id === prof.id ? prof : p));
    const deleteProfessor = (id) => setProfessors(professors.filter(p => p.id !== id));

    const markNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    const markAllNotificationsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
    const deleteNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));

    const globalStats = {
        totalDepartments: departments.length,
        totalSubjects: subjects.length,
        totalProfessors: professors.length,
        reportsGenerated: dummyStats.reportsGenerated
    };

    return (
        <CollegeAdminContext.Provider value={{
            departments, addDepartment, updateDepartment, deleteDepartment,
            subjects, addSubject, updateSubject, deleteSubject,
            professors, addProfessor, updateProfessor, deleteProfessor,
            notifications, markNotificationRead, markAllNotificationsRead, deleteNotification,
            collegeProfile, setCollegeProfile,
            stats: globalStats
        }}>
            {children}
        </CollegeAdminContext.Provider>
    );
};
