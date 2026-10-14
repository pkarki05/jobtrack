import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import AuthPage from "./components/AuthPage";
import JobTracker from "./features/JobTracker";
import { auth } from "./lib/firebase";
export default function App() {
  const [user,setUser]=useState<User|null>(null); const [checking,setChecking]=useState(true);
  useEffect(()=>onAuthStateChanged(auth,u=>{setUser(u);setChecking(false);}),[]);
  if(checking)return <div className="boot"><div className="brand-icon">JT</div><p>Preparing your workspace…</p></div>;
  return user?<JobTracker key={user.uid}/>:<AuthPage/>;
}
