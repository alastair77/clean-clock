import { Pencil, Trash2, X, UserRoundPlus } from "lucide-react";
import { clients } from "../source/clients";
import { useAuth } from "../hooks/useAuth";

export default function ClientsList() {
  const { dispatch } = useAuth();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyan-700 tracking-wide uppercase">
          Clientes
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
            <UserRoundPlus size={16} />
            Nuevo
          </button>
          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "admin" } })}
            className="text-cyan-600 hover:text-cyan-700"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-cyan-700 text-white">
            <th className="py-3 px-4 font-medium text-sm">Nombre</th>
            <th className="py-3 px-4 font-medium text-sm">Dirección</th>
            <th className="py-3 px-4 font-medium text-sm text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-cyan-50 hover:bg-cyan-50">
              <td className="py-3 px-4 text-gray-600 text-sm">{client.name}</td>
              <td className="py-3 px-4 text-gray-600 text-sm">{client.adress}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-cyan-600 hover:text-cyan-700 mr-3">
                  <Pencil size={16} />
                </button>
                <button className="text-cyan-600 hover:text-red-500">
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