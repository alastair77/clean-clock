import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { clients } from "../source/clients";
import type { Assignment } from "../types";
import { Fragment } from "react/jsx-runtime";
import { Dialog, Transition } from "@headlessui/react";
import { IncidentButtonsModal } from "./IncidentButtonsModal";

export const CheckInControl = () => {
  const { state, dispatch } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [workTime, setWorkTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const dateToday = new Date().toLocaleDateString("es-ES");

  const todayAssignments = state.assignments.filter(
    (assignment) => assignment.date === dateToday,
  );

  let nextAssignment: Assignment | null = null;
  let nextClientName = "";

  if (todayAssignments.length > 0) {
    nextAssignment = todayAssignments.reduce((earliest, todayAssignment) =>
      todayAssignment.startTime < earliest.startTime
        ? todayAssignment
        : earliest,
    );
    const nextClient = clients.find(
      (client) => client.id === nextAssignment!.clientId,
    );
    nextClientName = nextClient?.name ?? "Cliente no encontrado";
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    setElapsedTime(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setWorkTime(elapsedTime);
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md w-80 mx-auto text-center">
      <div className="text-sm font-mono mb-4 text-right">
        {formatTime(elapsedTime)}
      </div>
      <h2 className="text-xl font-semibold mb-2">Hola {state.user?.name}</h2>

      {todayAssignments.length === 0 ? (
        <p className="text-sm text-gray-600 mb-4">No tienes tareas asignadas</p>
      ) : (
        <p className="text-sm text-gray-600 mb-4">
          Próxima tarea: <strong>{nextClientName}</strong>
        </p>
      )}

      {workTime > 0 && !isRunning && (
        <p className="text-sm text-gray-600 mb-4">
          Tiempo trabajado: {formatTime(workTime)}
        </p>
      )}

      <div className="flex justify-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded disabled:opacity-40"
          onClick={handleStart}
          disabled={isRunning || todayAssignments.length === 0}
        >
          Inicio
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded disabled:opacity-40"
          onClick={handleStop}
          disabled={!isRunning}
        >
          Finalizar
        </button>
      </div>

      <button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-4 rounded-xl mt-4 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={!isRunning}
        onClick={() => dispatch({ type: "show-modal" })}
      >
        Reportar incidencia
      </button>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch({ type: "close-modal" })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <IncidentButtonsModal />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};