import {
  Users,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  LogIn,
  LogOut,
  Activity,
  LayoutDashboard,
  CalendarDays,
  Settings,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { clients } from "../source/clients";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-violet-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-sky-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const recentActivity = [
  {
    type: "incident",
    text: "Falta jabón dispensadores",
    employee: "Rosa Martínez",
    time: "Hace 5min",
  },
  {
    type: "incident",
    text: "Grifo roto baños P2",
    employee: "Ana García",
    time: "Hace 12min",
  },
  {
    type: "info",
    text: "App ClockClean iniciada",
    employee: "",
    time: "Hace 20min",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );

  const { state } = useAuth();
  const employees = state.users.filter((user) => user.role === "employee");
  const dateToday = new Date().toLocaleDateString("en-CA");

  const metrics = [
    {
      label: "Activas ahora",
      value: "0",
      sub: `de ${employees.length} empleadas`,
      icon: <Users size={20} />,
      accent: "text-emerald-500",
      border: "border-emerald-200",
    },
    {
      label: "Horas hoy (total)",
      value: "0h",
      sub: "acumulado del día",
      icon: <Clock size={20} />,
      accent: "text-slate-400",
      border: "border-slate-200",
    },
    {
      label: "Stock bajo",
      value: "2",
      sub: "productos críticos",
      icon: <Package size={20} />,
      accent: "text-slate-500",
      border: "border-slate-200",
    },
    {
      label: "Incidencias",
      value: "1",
      sub: "pendientes",
      icon: <AlertTriangle size={20} />,
      accent: "text-rose-500",
      border: "border-rose-200",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold mb-2">
          CC
        </div>
        {[
          LayoutDashboard,
          Users,
          CalendarDays,
          Package,
          AlertTriangle,
          CheckCircle,
          Activity,
          Settings,
        ].map((Icon, i) => (
          <button
            key={i}
            className={`p-2 rounded-lg transition-colors ${i === 0 ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <Icon size={18} />
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
              ClockClean
            </h1>
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
                <div
                  key={i}
                  className={`bg-white rounded-xl border ${m.border} p-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {m.label}
                    </span>
                    <span className={m.accent}>{m.icon}</span>
                  </div>
                  <div className={`text-3xl font-bold ${m.accent} mb-1`}>
                    {m.value}
                  </div>
                  <div className="text-xs text-gray-400">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Fichajes table */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <span className="text-sm font-semibold text-gray-800">
                  📋 fichajes
                </span>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 px-5">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`text-sm font-medium py-3 px-4 border-b-2 transition-colors ${activeTab === "upcoming" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                >
                  Próximos
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`text-sm font-medium py-3 px-4 border-b-2 transition-colors ${activeTab === "history" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                >
                  Historial
                </button>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                      Empleada
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                      Cliente
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                      Fecha
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                      Entrada
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                      Salida prevista
                    </th>
                    {activeTab === "history" ? (
                      <>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                          Salida Real
                        </th>

                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                          Horas Trabajadas
                        </th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                          Horas excedidas
                        </th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                          Incidencias
                        </th>
                      </>
                    ) : (
                      <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                        Acciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...state.assignments]
                    .filter((a) =>
                      activeTab === "upcoming"
                        ? a.date >= dateToday
                        : a.date < dateToday,
                    )
                    .sort((a, b) => {
                      const dateA = new Date(a.date).getTime() + a.startTime;
                      const dateB = new Date(b.date).getTime() + b.startTime;
                      return activeTab === "upcoming"
                        ? dateA - dateB
                        : dateB - dateA;
                    })
                    .map((assignment) => {
                      const employee = state.users.find(
                        (u) => u.id === assignment.employeeId,
                      );
                      const clientName =
                        clients.find((c) => c.id === assignment.clientId)
                          ?.name ?? "—";
                      return (
                        <tr
                          key={assignment.id}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-5 py-3">
                            {employee ? (
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
                                >
                                  {getInitials(employee.name)}
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  {employee.name}
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600">
                            {clientName}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600">
                            {assignment.date}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-400">
                            {new Date(assignment.startTime).toLocaleTimeString(
                              "es-ES",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-400">
                            {assignment.estimatedEndTime
                              ? new Date(
                                  assignment.estimatedEndTime as number,
                                ).toLocaleTimeString("es-ES", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "—"}
                          </td>
                          {activeTab === "history" ? (
                            <>
                              <td className="px-5 py-3 text-sm text-gray-400">
                                {assignment.realEndTime
                                  ? new Date(
                                      assignment.realEndTime,
                                    ).toLocaleTimeString("es-ES", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "—"}
                              </td>

                              <td className="px-5 py-3">
                                <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                                  {assignment.realEndTime &&
                                  assignment.startTime
                                    ? (() => {
                                        const diff =
                                          (assignment.realEndTime as number) -
                                          assignment.startTime;
                                        const hours = Math.floor(
                                          diff / 3600000,
                                        );
                                        const minutes = Math.floor(
                                          (diff % 3600000) / 60000,
                                        );
                                        return `${hours}h ${minutes}m`;
                                      })()
                                    : "—"}
                                </span>
                              </td>
                              <td className="px-5 py-3">
                                {assignment.realEndTime &&
                                assignment.estimatedEndTime
                                  ? (() => {
                                      const diff =
                                        (assignment.realEndTime as number) -
                                        (assignment.estimatedEndTime as number);
                                      if (diff <= 0)
                                        return (
                                          <span className="text-emerald-500">
                                            En tiempo
                                          </span>
                                        );
                                      const hours = Math.floor(diff / 3600000);
                                      const minutes = Math.floor(
                                        (diff % 3600000) / 60000,
                                      );
                                      return (
                                        <span className="text-rose-500">{`+${hours}h ${minutes}m`}</span>
                                      );
                                    })()
                                  : "—"}
                              </td>
                            </>
                          ) : (
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <button className="text-gray-300 hover:text-slate-600 transition-colors">
                                  <Pencil size={15} />
                                </button>
                                <button className="text-gray-300 hover:text-red-500 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
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
                <span className="text-sm font-semibold text-gray-800">
                  Fichaje rápido
                </span>
              </div>
              <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 mb-3 focus:outline-none focus:border-gray-400">
                {employees.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
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
                <span className="text-sm font-semibold text-gray-800">
                  Actividad reciente
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="mt-0.5 shrink-0">
                      {a.type === "incident" ? "⚠️" : "🟢"}
                    </span>
                    <div>
                      <p className="text-xs text-gray-700 leading-snug">
                        {a.type === "incident" && (
                          <span className="font-medium">Incidencia: </span>
                        )}
                        {a.text}
                        {a.employee && (
                          <span className="text-gray-400"> · {a.employee}</span>
                        )}
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
