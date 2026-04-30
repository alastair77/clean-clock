import { useState } from "react";
import type { Supplie } from "../types";
import { useAuth } from "../hooks/useAuth";

export const SuppliesListEmployee = () => {
  const { state } = useAuth()
  const [order, setOrder] = useState<Supplie[]>(state.supplies);

  const handleChange = (id: string, value: number) => {
    setOrder(
      order.map((supply) =>
        supply.id === id ? { ...supply, shortage: value } : supply,
      ),
    );
  };

  const handleSubmit = () => {
    const missing = order.filter((supply) => supply.shortage > 0);
    console.log(missing);
  };
 
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Insumos faltantes
      </h2>

      {order.map((supply) => (
        <div
          key={supply.id}
          className="flex items-center justify-between gap-4"
        >
          <span className="text-gray-700 text-lg w-40">{supply.name}</span>
          <input
            type="number"
            min={0}
            value={supply.shortage}
            onChange={(e) => handleChange(supply.id, Number(e.target.value))}
            className="w-20 text-center border border-gray-300 rounded-lg py-2 text-lg"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-4 rounded-xl mt-4"
      >
        Enviar pedido
      </button>
    </div>
  );
};
