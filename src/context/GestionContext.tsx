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

type GestionContextProps = {
  state: GestionState;
  dispatch: Dispatch<GestionActions>;
};

type GestionProvideProps = {
  children: ReactNode;
};

export const GestionContext = createContext<GestionContextProps>(null!);

export const GestionProvider = ({ children }: GestionProvideProps) => {
  const [state, dispatch] = useReducer(gestionReducer, {
    ...initialState, 
    users: JSON.parse(localStorage.getItem("users") || '[]')
  });

  // Escribir en localStorage cuando cambia el state.users
  useEffect(() => { localStorage.setItem('users', JSON.stringify(state.users)) , [state.users]})

  return (
    <GestionContext.Provider value={{ state, dispatch }}>
      {children}
    </GestionContext.Provider>
  );
};
