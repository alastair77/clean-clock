import { useState, useMemo } from "react";
import { users } from "../source/users";
import { assignments } from "../source/assignments";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../hooks/useAuth";


export default function PinForm() {
  const { dispatch } = useAuth();
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const maxPinLength = useMemo(() => {
    return pin.length > 3;
  }, [pin]);

  //Obtener el usuario del Pin ingresado
  
  const getUserByPin = (pin: string) => {

    const userFound = users.find((user) => user.pin === pin);    
    return userFound ? userFound : null;
  };

  const getAssignmentsByUserId = (userId: string) => {
    const assignmentsFound = assignments.filter(assignment => 
        userId === assignment.employeeId && !assignment.realEndTime)
        return assignmentsFound.length > 0 ? assignmentsFound : []     
  }

  const handleSubmit = () => {
    //Buscar el usuario en users con el pin
    //si existe, busque en assignments con el user.id
    const user = getUserByPin(pin);

    if (user === null) {
      setError("Usuario no encontrado");
      return;
    }
        
    dispatch({ type: "show-modal-user", payload: {user} });

    const userAssignments = getAssignmentsByUserId(user.id) 
    userAssignments.length > 0 && dispatch({ type: "show-assignments", payload: {userAssignments} }) 
    
  };

  const handleDelete = () => setPin(pin.slice(0, -1));
  const handleClear = () => setPin("");

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["C", "0", "⌫"], // C = Clear, ⌫ = delete
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-gray-800 p-6 rounded-xl w-80 text-center">
        <h1 className="text-white text-xl mb-4">Ingresar PIN</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <input
          type="text"
          value={pin}
          readOnly
          className="w-full mb-4 p-3 text-2xl text-center rounded bg-gray-100 text-black"
          placeholder="••••"
        />
        <div className="grid grid-cols-3 gap-2">
          {buttons.flat().map((b) => (
            <button
              key={b}
              onClick={() => {
                if (b === "C") handleClear();
                else if (b === "⌫") handleDelete();
                else setPin(pin + b);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-2xl py-4 rounded disabled:bg-gray-200"
              disabled={maxPinLength && b !== "C" && b !== "⌫"}
            >
              {b}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-4 rounded text-xl"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
