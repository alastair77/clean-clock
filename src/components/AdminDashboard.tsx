import { Users, Clock, Package, AlertTriangle, CheckCircle, LogIn, LogOut, Activity, LayoutDashboard, CalendarDays, Settings } from "lucide-react";

const employees = [
  { id: "1", name: "María López", location: "Planta 1 · Oficinas", initials: "ML", color: "bg-violet-500" },
  { id: "2", name: "Ana García", location: "Planta 2 · Baños", initials: "AG", color: "bg-emerald-500" },
  { id: "3", name: "Rosa Martínez", location: "Zona común", initials: "RM", color: "bg-rose-500" },
  { id: "4", name: "Carmen Soler", location: "Planta 3 · Salas", initials: "CS", color: "bg-amber-500" },
  { id: "5", name: "Lucía Ramos", location: "Exterior", initials: "LR", color: "bg-sky-500" },
];

const recentActivity = [
  { type: "incident", text: "Falta jabón dispensadores", employee: "Rosa Martínez", time: "Hace 5min" },
  { type: "incident", text: "Grifo roto baños P2", employee: "Ana García", time: "Hace 12min" },
  { type: "info", text: "App ClockClean iniciada", employee: "", time: "Hace 20min" },
];

const metrics = [
  { label: "Activas ahora", value: "0", sub: "de 5 empleadas", icon: <Users size={20} />, accent: "text-emerald-500", border: "border-emerald-200" },
  { label: "Horas hoy (total)", value: "0h", sub: "acumulado del día", icon: <Clock size={20} />, accent: "text-slate-400", border: "border-slate-200" },
  { label: "Stock bajo", value: "2", sub: "productos críticos", icon: <Package size={20} />, accent: "text-slate-500", border: "border-slate-200" },
  { label: "Incidencias", value: "1", sub: "pendientes", icon: <AlertTriangle size={20} />, accent: "text-rose-500", border: "border-rose-200" },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* Sidebar */}
      <aside className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold mb-2">CC</div>
        {[LayoutDashboard, Users, CalendarDays, Package, AlertTriangle, CheckCircle, Activity, Settings].map((Icon, i) => (
          <button key={i} className={`p-2 rounded-lg transition-colors ${i === 0 ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}>
            <Icon size={18} />
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">ClockClean</h1>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              EN VIVO
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors">
              📄 Informe PDF
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors">
              📊 Google Sheets
            </button>
            <button className="flex items-center gap-2 text-sm bg-gray-900 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
              + Nueva empleada
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">

          {/* Center content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">

            {/* Metric cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {metrics.map((m, i) => (
                <div key={i} className={`bg-white rounded-xl border ${m.border} p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{m.label}</span>
                    <span className={m.accent}>{m.icon}</span>
                  </div>
                  <div className={`text-3xl font-bold ${m.accent} mb-1`}>{m.value}</div>
                  <div className="text-xs text-gray-400">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Fichajes table */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">📋 Fichajes de hoy</span>
                </div>
                <span className="text-xs text-gray-400">21 abr</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">Empleada</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">Entrada</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">Salida</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">Horas</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${emp.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                            {emp.initials}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{emp.name}</div>
                            <div className="text-xs text-gray-400">{emp.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-400">—</td>
                      <td className="px-5 py-3 text-sm text-gray-400">—</td>
                      <td className="px-5 py-3 text-sm text-gray-400">—</td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">Inactiva</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer buttons */}
              <div className="grid grid-cols-2 gap-3 p-4 border-t border-gray-50">
                <button className="flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 py-2 rounded-lg transition-colors">
                  📥 Exportar CSV
                </button>
                <button className="flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 py-2 rounded-lg transition-colors">
                  📊 Google Sheets
                </button>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <aside className="w-72 bg-white border-l border-gray-100 overflow-y-auto shrink-0 px-4 py-5 flex flex-col gap-5">

            {/* Fichaje rápido */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500">⚡</span>
                <span className="text-sm font-semibold text-gray-800">Fichaje rápido</span>
              </div>
              <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 mb-3 focus:outline-none focus:border-gray-400">
                {employees.map((emp) => (
                  <option key={emp.id}>{emp.name}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 py-2 rounded-lg transition-colors">
                  <LogIn size={15} /> Entrada
                </button>
                <button className="flex items-center justify-center gap-2 text-sm font-medium bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 py-2 rounded-lg transition-colors">
                  <LogOut size={15} /> Salida
                </button>
              </div>
            </div>

            {/* Actividad reciente */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={15} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">Actividad reciente</span>
              </div>
              <div className="flex flex-col gap-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="mt-0.5 shrink-0">{a.type === "incident" ? "⚠️" : "🟢"}</span>
                    <div>
                      <p className="text-xs text-gray-700 leading-snug">
                        {a.type === "incident" && <span className="font-medium">Incidencia: </span>}
                        {a.text}
                        {a.employee && <span className="text-gray-400"> · {a.employee}</span>}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}