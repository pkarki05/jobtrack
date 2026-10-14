import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { auth } from "../lib/firebase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login"|"signup">("login");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [message, setMessage] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      if (mode === "signup") {
        if (password.length < 6) throw new Error("Use a password with at least 6 characters.");
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(result.user, { displayName: name.trim() });
      } else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as {code?:string}).code;
      const map: Record<string,string> = {
        "auth/email-already-in-use":"An account already exists for this email. Try logging in.",
        "auth/invalid-email":"Enter a valid email address.",
        "auth/invalid-credential":"Email or password is incorrect.",
        "auth/weak-password":"Choose a stronger password.",
        "auth/too-many-requests":"Too many attempts. Wait a little and try again.",
        "auth/operation-not-allowed":"Enable Email/Password in Firebase Console > Authentication.",
        "auth/unauthorized-domain":"Add this domain to Firebase Authentication's Authorized domains."
      };
      setError((code && map[code]) || (err instanceof Error ? err.message : "Something went wrong."));
    } finally { setBusy(false); }
  }
  async function reset() {
    setError(""); setMessage("");
    if (!email.trim()) { setError("Enter your email address first."); return; }
    try { await sendPasswordResetEmail(auth,email.trim()); setMessage("Password reset email sent. Check your inbox."); }
    catch (e) { setError((e as Error).message); }
  }
  return <main className="auth">
    <section className="auth-hero"><div className="brand"><span className="brand-icon"><BriefcaseBusiness/></span>Job<span className="teal">Track</span></div>
      <div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> YOUR NEXT CHAPTER STARTS HERE</span><h1>Make your next<br/>career move <em>count.</em></h1><p>One clear view of every application, interview and opportunity. Build momentum and keep your job search moving.</p><div className="steps"><span><b>01</b> Track progress</span><span><b>02</b> Stay prepared</span><span><b>03</b> Land the role</span></div></div><small className="hero-footer">YOUR SEARCH. YOUR STRATEGY. YOUR FUTURE.</small>
    </section>
    <section className="auth-side"><div className="mobile-brand brand"><span className="brand-icon"><BriefcaseBusiness/></span>Job<span className="teal">Track</span></div><div className="auth-card"><span className="eyebrow">WELCOME {mode==="login"?"BACK":"ABOARD"}</span><h2>{mode==="login"?"Good to see you.":"Create your account."}</h2><p className="muted">{mode==="login"?"Sign in to pick up where you left off.":"Your organised job search starts today."}</p>
      <div className="tabs"><button className={mode==="login"?"active":""} onClick={()=>{setMode("login");setError("");setMessage("");}}>Log in</button><button className={mode==="signup"?"active":""} onClick={()=>{setMode("signup");setError("");setMessage("");}}>Sign up</button></div>
      <form onSubmit={submit} className="auth-form">{mode==="signup"&&<label>Full name<div className="input"><Sparkles size={16}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" autoComplete="name" required/></div></label>}
        <label>Email address<div className="input"><Mail size={16}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required/></div></label>
        <label>Password<div className="input"><LockKeyhole size={16}/><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} autoComplete={mode==="login"?"current-password":"new-password"} required/><button type="button" className="eye" onClick={()=>setShow(v=>!v)} aria-label="Toggle password visibility">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
        {mode==="login"&&<button className="link forgot" type="button" onClick={reset}>Forgot password?</button>}
        {error&&<div className="alert error">{error}</div>}{message&&<div className="alert success">{message}</div>}
        <button className="primary full" disabled={busy}>{busy?"Please wait…":mode==="login"?"Log in to JobTrack":"Create account"} <span>↗</span></button>
      </form><p className="privacy">Your applications are private to your account.</p></div><small className="auth-footer">BUILT FOR YOUR NEXT OPPORTUNITY ✳</small></section>
  </main>;
}
