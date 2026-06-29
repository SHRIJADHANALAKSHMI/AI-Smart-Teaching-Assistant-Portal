import React, { useState } from "react";
import {
  FaUsers, FaUserCheck, FaUserClock, FaUserSlash, FaSearch,
  FaPlus, FaEye, FaEdit, FaTrash, FaEnvelope, FaUniversity,
  FaPhone, FaTimes
} from "react-icons/fa";

const initialAdmins = [
  {id:1,name:"shri",college:"ABC Engineering College",email:"john@abc.edu",phone:"9876543210",status:"Active",role:"College Admin",lastLogin:"Today 10:30 AM"},
  {id:2,name:"Priya Sharma",college:"XYZ Institute",email:"priya@xyz.edu",phone:"9123456789",status:"Pending",role:"College Admin",lastLogin:"-"},
  {id:3,name:"Arun Kumar",college:"National College",email:"arun@nc.edu",phone:"9988776655",status:"Inactive",role:"College Admin",lastLogin:"Yesterday"},
];

export default function AdminManagement(){
  const [admins,setAdmins]=useState(initialAdmins);
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("All");
  const [selected,setSelected]=useState(null);
  const [mode,setMode]=useState("");
  const [form,setForm]=useState({name:"",college:"",email:"",phone:"",role:"College Admin",status:"Pending"});

  const filtered=admins.filter(a=>{
    const ok=a.name.toLowerCase().includes(search.toLowerCase())||
      a.email.toLowerCase().includes(search.toLowerCase())||
      a.college.toLowerCase().includes(search.toLowerCase());
    return ok && (status==="All"||a.status===status);
  });

  const stat=(s)=>admins.filter(a=>a.status===s).length;

  const close=()=>{setMode("");setSelected(null);}
  const save=()=>{
    setAdmins([...admins,{id:Date.now(),...form,lastLogin:"-"}]);
    setForm({name:"",college:"",email:"",phone:"",role:"College Admin",status:"Pending"});
    close();
  };
  const update=()=>{
    setAdmins(admins.map(a=>a.id===selected.id?selected:a));
    close();
  };

  return(
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <p className="text-gray-500">Manage college administrators</p>
      </div>
      <button onClick={()=>setMode("add")} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaPlus/>Add Admin</button>
    </div>

    <div className="grid md:grid-cols-4 gap-4 mb-6">
      {[
        ["Total",admins.length,<FaUsers/>,"bg-blue-500"],
        ["Active",stat("Active"),<FaUserCheck/>,"bg-green-500"],
        ["Pending",stat("Pending"),<FaUserClock/>,"bg-yellow-500"],
        ["Inactive",stat("Inactive"),<FaUserSlash/>,"bg-red-500"],
      ].map(([t,v,i,c])=>(
      <div key={t} className={`${c} text-white rounded-xl p-5`}>
        <div className="text-2xl">{i}</div>
        <h2 className="text-3xl font-bold">{v}</h2>
        <p>{t}</p>
      </div>))}
    </div>

    <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-4 text-gray-400"/>
        <input className="w-full border rounded-lg pl-10 p-3" placeholder="Search..."
          value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <select className="border rounded-lg p-3" value={status} onChange={e=>setStatus(e.target.value)}>
        <option>All</option><option>Active</option><option>Pending</option><option>Inactive</option>
      </select>
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      {filtered.map(a=>(
        <div key={a.id} className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between">
            <div><h2 className="font-bold text-xl">{a.name}</h2><p className="text-blue-600">{a.role}</p></div>
            <span className={`px-3 py-1 rounded-full text-white ${a.status==="Active"?"bg-green-500":a.status==="Pending"?"bg-yellow-500":"bg-red-500"}`}>{a.status}</span>
          </div>
          <div className="mt-4 space-y-2 text-gray-600">
            <p className="flex items-center gap-2"><FaUniversity/>{a.college}</p>
            <p className="flex items-center gap-2"><FaEnvelope/>{a.email}</p>
            <p className="flex items-center gap-2"><FaPhone/>{a.phone}</p>
            <p><b>Last Login:</b> {a.lastLogin}</p>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <button onClick={()=>{setSelected(a);setMode("view");}}><FaEye/></button>
            <button onClick={()=>{setSelected({...a});setMode("edit");}}><FaEdit/></button>
            <button onClick={()=>setAdmins(admins.filter(x=>x.id!==a.id))}><FaTrash className="text-red-600"/></button>
          </div>
        </div>
      ))}
    </div>

    {mode && (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-full max-w-lg rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{mode==="add"?"Add":mode==="edit"?"Edit":"View"} Admin</h2>
            <button onClick={close}><FaTimes/></button>
          </div>

          {mode==="view" ? (
            <div className="space-y-2">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>College:</b> {selected.college}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Status:</b> {selected.status}</p>
            </div>
          ):(
            <div className="grid gap-3">
              {["name","college","email","phone"].map(f=>(
                <input key={f} className="border p-3 rounded"
                placeholder={f}
                value={mode==="add"?form[f]:selected[f]}
                onChange={e=>mode==="add"
                  ?setForm({...form,[f]:e.target.value})
                  :setSelected({...selected,[f]:e.target.value})}/>
              ))}
              <select className="border p-3 rounded"
                value={mode==="add"?form.status:selected.status}
                onChange={e=>mode==="add"
                  ?setForm({...form,status:e.target.value})
                  :setSelected({...selected,status:e.target.value})}>
                <option>Active</option><option>Pending</option><option>Inactive</option>
              </select>
              <button onClick={mode=="add"?save:update} className="bg-blue-600 text-white p-3 rounded">
                {mode==="add"?"Save Admin":"Update Admin"}
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>);
}

