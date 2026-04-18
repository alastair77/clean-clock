import { Pencil, Trash2, X, PackagePlus } from "lucide-react";
import { supplies } from "../source/supplies";
import { useAuth } from "../hooks/useAuth";

export const SuppliesListAdmin = () => {
  const { dispatch } = useAuth();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-mist-700 tracking-wide uppercase">
          Insumos
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-mist-600 hover:bg-mist-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
            <PackagePlus size={16} />
            Nuevo
          </button>
          <button
            onClick={() => dispatch({ type: "admin-view", payload: { adminView: "admin" } })}
            className="text-mist-400 hover:text-mist-600"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-mist-600 text-white">
            <th className="py-3 px-4 font-medium text-sm">Nombre</th>
            <th className="py-3 px-4 font-medium text-sm">Faltantes</th>
            <th className="py-3 px-4 font-medium text-sm text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply) => (
            <tr key={supply.id} className="border-b border-mist-100 hover:bg-mist-50">
              <td className="py-3 px-4 text-gray-600 text-sm">{supply.name}</td>
              <td className="py-3 px-4 text-gray-600 text-sm">{supply.shortage}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-mist-400 hover:text-mist-600 mr-3">
                  <Pencil size={16} />
                </button>
                <button className="text-mist-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};