import { Pencil, Trash2, X, UserPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { users } from "../source/users";

export default function EmployeesList() {
  const { dispatch } = useAuth();

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-600 tracking-wide uppercase">
          Empleados
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium px-3 py-2 rounded-lg"
            onClick = {() => dispatch({type:"admin-view", payload: {adminView : "createNewUser"}}) }
          >
            Nuevo
            <UserPlus size={16} />
          </button>
          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "admin" } })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-3 px-4 font-medium text-sm">Nombre</th>
            <th className="py-3 px-4 font-medium text-sm">Fecha de ingreso</th>
            <th className="py-3 px-4 font-medium text-sm text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600 text-sm">{user.name}</td>
              <td className="py-3 px-4 text-gray-600 text-sm">{user.hireDate}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-gray-400 hover:text-blue-500 mr-3">
                  <Pencil size={16} />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}