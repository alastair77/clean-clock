import { Pencil, Trash2, X, CalendarPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AssignmentsList() {
  
  const { state, dispatch } = useAuth()

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700 tracking-wide uppercase">
            Asignaciones
          </h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
              <CalendarPlus size={16} />
              Nueva
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "admin-view",
                  payload: { adminView: "admin" },
                })
              }
              className="text-gray-300 hover:text-gray-600"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="py-3 px-4 font-medium text-sm">Fecha</th>
              <th className="py-3 px-4 font-medium text-sm">Cliente</th>
              <th className="py-3 px-4 font-medium text-sm">Empleado</th>
              <th className="py-3 px-4 font-medium text-sm text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {state.assignments.map((assignment) =>  (
               
              <tr
                key={assignment.id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {assignment.date}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {state.clients.find(client => client.id === assignment.clientId)?.name}
                  {/* {assignment.clientId} */}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {state.users.find(user => user.id === assignment.employeeId)?.name}
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-gray-300 hover:text-gray-600 mr-3">
                    <Pencil size={16} />
                  </button>
                  <button className="text-gray-300 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
