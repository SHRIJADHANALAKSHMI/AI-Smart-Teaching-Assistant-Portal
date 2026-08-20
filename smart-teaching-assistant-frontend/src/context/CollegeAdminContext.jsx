/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createDepartment as apiCreateDepartment, deleteDepartment as apiDeleteDepartment, getDepartments, updateDepartment as apiUpdateDepartment } from "../service/departmentService";
import { createSubject as apiCreateSubject, deleteSubject as apiDeleteSubject, getSubjects, updateSubject as apiUpdateSubject } from "../service/subjectService";
import { deleteProfessor as apiCancelProfessorInvite, getProfessors, inviteProfessor as apiInviteProfessor } from "../service/professorService";
import { getCurrentUser } from "../service/authService";
import { getMyCollegeProfile, updateMyCollegeProfile } from "../service/collegeService";

const CollegeAdminContext = createContext(null);

export const useCollegeAdmin = () => {
    const context = useContext(CollegeAdminContext);
    if (!context) throw new Error("useCollegeAdmin must be used within CollegeAdminProvider");
    return context;
};

export function CollegeAdminProvider({ children }) {
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [collegeProfile, setCollegeProfile] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const [departmentData, professorData, collegeData] = await Promise.all([getDepartments(), getProfessors(), getMyCollegeProfile()]);
            const nextDepartments = departmentData ?? [];
            const subjectLists = await Promise.all(nextDepartments.map((department) => getSubjects(department.id)));
            setDepartments(nextDepartments);
            setSubjects(subjectLists.flat());
            setProfessors(professorData ?? []);
            setCollegeProfile(collegeData ?? null);
        } catch (requestError) {
            setError(requestError.message || "Unable to load college data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refresh(); }, [refresh]);

    const addDepartment = async ({ name }) => {
        const created = await apiCreateDepartment({ name });
        setDepartments((current) => [created, ...current]);
        return created;
    };
    const updateDepartment = async ({ id, name }) => {
        const updated = await apiUpdateDepartment(id, { name });
        setDepartments((current) => current.map((department) => department.id === id ? updated : department));
        return updated;
    };
    const deleteDepartment = async (id) => {
        await apiDeleteDepartment(id);
        setDepartments((current) => current.filter((department) => department.id !== id));
        setSubjects((current) => current.filter((subject) => subject.departmentId !== id));
    };
    const addSubject = async ({ departmentId, name }) => {
        const created = await apiCreateSubject(departmentId, { name });
        setSubjects((current) => [created, ...current]);
        return created;
    };
    const updateSubject = async ({ id, departmentId, name }) => {
        const updated = await apiUpdateSubject(departmentId, id, { name });
        setSubjects((current) => current.map((subject) => subject.id === id ? updated : subject));
        return updated;
    };
    const deleteSubject = async (id) => {
        const subject = subjects.find((item) => item.id === id);
        if (!subject) return;
        await apiDeleteSubject(subject.departmentId, id);
        setSubjects((current) => current.filter((item) => item.id !== id));
    };
    const addProfessor = async (invite) => {
        const created = await apiInviteProfessor(invite);
        setProfessors((current) => [created, ...current]);
        return created;
    };
    const deleteProfessor = async (id) => {
        const cancelled = await apiCancelProfessorInvite(id);
        setProfessors((current) => current.map((invite) => invite.id === id ? cancelled : invite));
        return cancelled;
    };

    const updateProfile = async (profile) => {
        const updated = await updateMyCollegeProfile({
            name: profile.name,
            collegeCode: profile.collegeCode ?? profile.code,
            collegeEmail: profile.collegeEmail ?? profile.email,
            location: profile.location,
            address: profile.address,
            phone: profile.phone
        });
        setCollegeProfile(updated);
        return updated;
    };

    const user = getCurrentUser();
    const departmentNames = useMemo(() => Object.fromEntries(departments.map((department) => [department.id, department.name])), [departments]);
    const notifications = professors.map((invite) => ({
        id: invite.id,
        read: invite.status !== "PENDING",
        title: invite.status === "PENDING" ? "Professor invitation pending" : "Professor invitation updated",
        message: `${invite.name} (${invite.email}) is ${invite.status.toLowerCase()}.`,
        time: invite.sentAt ? new Date(invite.sentAt).toLocaleDateString() : ""
    }));
    const value = {
        departments, subjects, professors, loading, error, refresh,
        addDepartment, updateDepartment, deleteDepartment,
        addSubject, updateSubject, deleteSubject,
        addProfessor, deleteProfessor,
        departmentNames,
        profile: collegeProfile ? { ...collegeProfile, code: collegeProfile.collegeCode, email: collegeProfile.collegeEmail } : { name: user?.name || "College administrator", email: user?.email || "" },
        updateProfile, notifications,
        stats: { totalDepartments: departments.length, totalSubjects: subjects.length, totalProfessors: professors.filter((invite) => invite.status === "ACCEPTED").length, pendingInvites: professors.filter((invite) => invite.status === "PENDING").length }
    };
    return <CollegeAdminContext.Provider value={value}>{children}</CollegeAdminContext.Provider>;
}
