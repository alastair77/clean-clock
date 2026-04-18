import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import {
  gestionReducer,
  initialState,
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
  const [state, dispatch] = useReducer(gestionReducer, initialState);

  return (
    <GestionContext.Provider value={{ state, dispatch }}>
      {children}
    </GestionContext.Provider>
  );
};
