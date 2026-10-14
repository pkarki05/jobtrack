import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { STATUSES, type ApplicationInput, type JobApplication } from "../features/types";
type Props = { initial?: JobApplication|null; onClose:()=>void; onSave:(input:ApplicationInput)=>Promise<void> };
const today = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
export default function ApplicationModal({initial,onClose,onSave}:Props) {
  const [form,setForm]=useState<ApplicationInput>(initial?{company:initial.company,title:initial.title,status:initial.status,appliedDate:initial.appliedDate,followUpDate:initial.followUpDate,interviewDate:initial.interviewDate,deadline:initial.deadline,notes:initial.notes}:{company:"",title:"",status:"Applied",appliedDate:today(),followUpDate:"",interviewDate:"",deadline:"",notes:""});
  const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  function set<K extends keyof ApplicationInput>(key:K,value:ApplicationInput[K]){setForm(f=>({...f,[key]:value}));}
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");try{await onSave(form);onClose();}catch(err){setError(err instanceof Error?err.message:"Could not save application.");}finally{setBusy(false);}}
  return <div className="backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><div><span className="eyebrow">OPPORTUNITY DETAILS</span><h2 id="modal-title">{initial?"Edit application":"Add application"}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close"><X/></button></header>
    <form className="form" onSubmit={submit}><div className="form-grid">
      <label>Company *<input required maxLength={120} placeholder="e.g. Atlassian" value={form.company} onChange={e=>set("company",e.target.value)}/></label>
      <label>Job title *<input required maxLength={160} placeholder="e.g. IT Support Analyst" value={form.title} onChange={e=>set("title",e.target.value)}/></label>
      <label>Status<select value={form.status} onChange={e=>set("status",e.target.value as ApplicationInput["status"])}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
      <label>Date applied<input type="date" value={form.appliedDate} onChange={e=>set("appliedDate",e.target.value)}/></label>
      <label>Follow-up date<input type="date" value={form.followUpDate} onChange={e=>set("followUpDate",e.target.value)}/></label>
      <label>Interview date & time<input type="datetime-local" value={form.interviewDate} onChange={e=>set("interviewDate",e.target.value)}/></label>
      <label>Application deadline<input type="date" value={form.deadline} onChange={e=>set("deadline",e.target.value)}/></label>
    </div><label>Notes<textarea rows={3} maxLength={3000} placeholder="Recruiter details, preparation notes, next steps…" value={form.notes} onChange={e=>set("notes",e.target.value)}/></label>
    {error&&<div className="alert error">{error}</div>}<div className="actions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary" disabled={busy}>{busy?"Saving…":initial?"Save changes":"Save application"}</button></div></form>
  </section></div>;
}
