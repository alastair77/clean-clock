import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import type { DraftUser } from "../types";
import ErrorForm from "./ErrorForm";

export default function CreateUserForm() {
  const dateToday = new Date().toLocaleDateString("es-ES");  
  const { dispatch } = useAuth();
  const [user, setUser] = useState<DraftUser>({
    name: "",
    role: "employee",
    pin: "",
    hireDate: dateToday,
  });
const [ error, setError] = useState('')


  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    //Validar que todos los campos esten llenos
    if(Object.values(user).includes('')){
      setError('Todos los campos son oblicatorios')
      return error
    }
    dispatch({type:'create-user', payload:{user}})
  };

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-600 tracking-wide uppercase">
            Nuevo empleado
          </h2>
          {error && <ErrorForm>{error}</ErrorForm>}
          <button className="text-gray-400 hover:text-gray-600">
            <X
              size={22}
              onClick={() =>
                dispatch({
                  type: "admin-view",
                  payload: { adminView: "admin" },
                })
              }
            />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ingresa nombre del nuevo usuario"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:border-gray-600"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">PIN</label>
            <input
              placeholder="Ingresar PIN"
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:border-gray-600"
              name="pin"
              value={user.pin}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Rol</label>
            <select
              name="rol"
              id="rol"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:border-gray-600"
              value={user.role}
              onChange={handleChange}
            >
              <option value="employee">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 rounded-lg mt-2 disabled:opacity-40"
            // disabled={!isFormReady}
          >
            Crear usuario
          </button>
        </form>
      </div>
    </>
  );
}
