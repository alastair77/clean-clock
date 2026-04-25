import { CheckInControl } from "./components/CheckInControl";
import AdminDashboard from "./components/AdminDashboard";
import PinForm from "./components/PinForm";
import { useAuth } from "./hooks/useAuth";
import { IncidentButtonsModal } from "./components/IncidentButtonsModal";

function App() {
  const { state } = useAuth();
  

  return (
    <>
      <header className="bg-slate-500 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Gestion de personal
        </h1>
      </header>
      {state.currentUser?.role === "admin" ? (
        <AdminDashboard />
      ) : state.currentUser?.role === "employee" ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          {state.modal ? <IncidentButtonsModal /> : <CheckInControl />}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          <PinForm />
        </div>
      )}
    </>
  );
}

export default App;
