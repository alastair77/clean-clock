import { CheckInControl } from "./components/CheckInControl";
import AdminPanel from "./components/AdminPanel";
import PinForm from "./components/PinForm";
import { useAuth } from "./hooks/useAuth";
import { IncidentButtonsModal } from "./components/IncidentButtonsModal";


function App() {
  const { state } = useAuth();
  const components = {
    admin: <AdminPanel />,
    employee: <CheckInControl />        
  }
  
  return (
    <>
      <header className="bg-slate-500 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Gestion de personal
        </h1>
      </header>
      
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {state.modal ? <IncidentButtonsModal /> : state.user?.role ? components[state.user.role] : <PinForm />}
     </div>
      
      
    </>
  );
}

export default App;
