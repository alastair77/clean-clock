import { AlertTriangle, PackageX, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { SuppliesListEmployee } from "./SuppliesListEmployee";



export const IncidentButtonsModal = () => {
  const { dispatch, state } = useAuth();
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => dispatch({ type: "close-modal" })}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={28} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-6 mt-4">
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">
              Reportar daño
            </span>
            <button className="w-20 h-20 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed">
              <AlertTriangle size={36} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">
              Reportar faltante
            </span>
            <button className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={()=> dispatch({type:'open-supplies'})}
            >
              <PackageX size={36} />
            </button>
          </div>
        </div>
      </div>
      {state.isShortageSuppliesOpen && <SuppliesListEmployee />}
    </>
  );
};
