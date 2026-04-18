import { useAuth } from "../hooks/useAuth";
import AssignmentsList from "./AssignmentsList";
import ClientsList from "./ClientsList";
import EmployeesList from "./EmployeesList";
import { SuppliesListAdmin } from "./SuppliesListAdmin";
import { Users, ClipboardList, Building2, Package } from "lucide-react";

export default function AdminPanel() {
  const { state, dispatch } = useAuth();

  const menu = {
    admin: <AdminPanel />,
    employees: <EmployeesList />,
    assignments: <AssignmentsList />,
    clients: <ClientsList />,
    supplies: <SuppliesListAdmin />,
  };

  return (
    <>
      {state.adminView != "admin" ? menu[state.adminView] : (
        <div className="flex flex-col gap-3 p-6">
          <h2 className="text-lg font-semibold text-center text-gray-500 tracking-wide uppercase mb-4">
            Panel de administración
          </h2>

          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "employees" } })}
            className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-5 rounded-lg"
          >
            <Users size={18} />
            Empleados
          </button>

          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "assignments" } })}
            className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-5 rounded-lg"
          >
            <ClipboardList size={18} />
            Asignaciones
          </button>

          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "clients" } })}
            className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-5 rounded-lg"
          >
            <Building2 size={18} />
            Clientes
          </button>

          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "supplies" } })}
            className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-5 rounded-lg"
          >
            <Package size={18} />
            Insumos
          </button>
        </div>
      )}
    </>
  );
}