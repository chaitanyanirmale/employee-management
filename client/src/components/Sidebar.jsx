import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { dummyProfileData } from "../assets/assets"
import { CalendarIcon, ChevronRightIcon, DollarSignIcon, FileTextIcon, LayoutGridIcon, LogOutIcon, MenuIcon, SettingsIcon, UserIcon, XIcon } from 'lucide-react'


const Sidebar = () => {
  const {pathname} = useLocation()
  const [userName, setUserName] = useState("")
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(()=>{
    setUserName(dummyProfileData.firstName + "" + dummyProfileData.lastName)
  },[])

  useEffect(()=>{
    setMobileMenu(false)
  },[pathname])

  const role = "" || "EMPLOYEE";

  const navItems = [
    {name: "Dashboard", href:'/dashboard', icon: LayoutGridIcon},
    role === "ADMIN" ? 
    {name: "Employees", href:'/employees', icon: UserIcon} :
    {name: "Attendence", href:'/attendence', icon: CalendarIcon},
    {name: "Leave", href:'/leave', icon: FileTextIcon},
    {name: "Payslips", href:'/payslips', icon: DollarSignIcon},
    {name: "Settings", href:'/settings', icon: SettingsIcon},
  ]

  const handleLogout = () => {
    window.location.href = '/login'
  }

  const sidebarContent = (
    <>
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="text-black size-7"/>
            <div className="">
              <p className="font-semibold text-[13px] text-gray-800 tracking-wide">Employee MS</p>
              <p className="text-[11px] text-slate-600 font-medium">Management System</p>
            </div>
          </div>
          <button onClick={()=>setMobileMenu(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
            <XIcon size={20}/>
          </button>
        </div>
      </div>
      
      {userName && (
          <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
                <span className="text-slate-300 text-xs font-semibold">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-slate-800 truncate">{userName}</p>
                <p className="text-[11px] text-slate-500 truncate">{role === "ADMIN" ? "Administrator" : "Employee"}</p>
              </div>
            </div>
          </div>
      )}

      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">Navigation</p>
      </div>

      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item)=>{
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} to={item.href} className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${isActive ? "bg-white/60 text-gray-700" : "text-gray-700 hover:text-gray-700 hover:bg-white/20"}`}>
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gray-700"/>}
              <item.icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-slate-700' : 'text-slate-800 group-hover:text-slate-700'}`} />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRightIcon className="w-3.5 h-3.5 text-slate-700"/>}
            </Link>
          )
        })}
      </div>

      <div className="p-3 border-t border-white/6">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-800 hover:text-rose-700 hover:bg-rose-500/8 transition-all duration-150">
          <LogOutIcon className="w-[17px] h-[17px]"/>
          <span>Log out</span>
        </button>
      </div>

    </>
  )
  return (
    <>
      <button onClick={() => setMobileMenu(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-gray-600 rounded-lg shadow-lg border border-white/10">
        <MenuIcon size={20}/>
      </button>

      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileMenu(false)}/>
      )}

      <aside className="hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-yellow-300 via-yellow-400 to-yellow-400 text-gray-700 shrink-0 border-r border-white/4">
        {sidebarContent}
      </aside>

      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-yellow-300 via-yellow-400 to-yellow-400 text-gray-700 z-50 flex flex-col transform transition-transform duration-300 ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar