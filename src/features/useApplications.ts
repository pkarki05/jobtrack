import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import type { ApplicationInput, ApplicationStatus, JobApplication } from "./types";

export function useApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setApplications([]); setLoading(false); return; }
    const q = query(collection(db, "users", user.uid, "applications"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setApplications(snap.docs.map(d => {
        const x = d.data();
        const createdAt = typeof x.createdAt === "number" ? x.createdAt : Date.now();
        return {
          id: d.id, company: String(x.company ?? ""), title: String(x.title ?? ""),
          status: (x.status ?? "Applied") as ApplicationStatus, appliedDate: String(x.appliedDate ?? ""),
          followUpDate: String(x.followUpDate ?? ""), interviewDate: String(x.interviewDate ?? ""),
          deadline: String(x.deadline ?? ""), notes: String(x.notes ?? ""), createdAt,
          updatedAt: typeof x.updatedAt === "number" ? x.updatedAt : createdAt,
        };
      }));
      setError(""); setLoading(false);
    }, err => { console.error(err); setError("Could not load applications. Check Firestore setup and Security Rules."); setLoading(false); });
  }, []);
  function userId() { const uid = auth.currentUser?.uid; if (!uid) throw new Error("Please sign in first."); return uid; }
  async function addApplication(input: ApplicationInput) {
    const uid = userId(), now = Date.now();
    await addDoc(collection(db, "users", uid, "applications"), { ...input, createdAt: now, updatedAt: now, updatedServerAt: serverTimestamp() });
  }
  async function updateApplication(id: string, input: ApplicationInput) {
    const uid = userId();
    await updateDoc(doc(db, "users", uid, "applications", id), { ...input, updatedAt: Date.now(), updatedServerAt: serverTimestamp() });
  }
  async function updateStatus(id: string, status: ApplicationStatus) {
    const uid = userId();
    await updateDoc(doc(db, "users", uid, "applications", id), { status, updatedAt: Date.now(), updatedServerAt: serverTimestamp() });
  }
  async function deleteApplication(id: string) { const uid = userId(); await deleteDoc(doc(db, "users", uid, "applications", id)); }
  return { applications, loading, error, addApplication, updateApplication, updateStatus, deleteApplication };
}
