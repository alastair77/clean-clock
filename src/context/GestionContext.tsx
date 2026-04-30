import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
  useEffect,
} from "react";
import {
  initialState,
  gestionReducer,
  type GestionActions,
  type GestionState,
} from "../reducers/gestion-reducer";
import { getUsers, getAssignments, getClients, getSupplies } from "../supabase";

type GestionContextProps = {
  state: GestionState;
  dispatch: Dispatch<GestionActions>;
};

type GestionProvideProps = {
  children: ReactNode;
};

export const GestionContext = createContext<GestionContextProps>(null!);

export const GestionProvider = ({ children }: GestionProvideProps) => {
  const [state, dispatch] = useReducer(gestionReducer, initialState);
  


  //Llamar las tablas para enviarlas al reducer
  useEffect(() => {
    getUsers().then((users) => {      
      dispatch({ type: "set-users", payload: { users } });
      console.log(users)
    });
    getAssignments().then((assignments) => {
      dispatch({ type: "set-assignments", payload: { assignments } });
      console.log(assignments)
    });
    getClients().then((clients) => {
      dispatch({ type: "set-clients", payload: { clients } });
      console.log(clients)
    });
    getSupplies().then((supplies) => {
      dispatch({ type: "set-supplies", payload: { supplies } });
      console.log(supplies)
    });
  }, []);

  return (
    <GestionContext.Provider value={{ state, dispatch }}>
      {children}
    </GestionContext.Provider>
  );
};
