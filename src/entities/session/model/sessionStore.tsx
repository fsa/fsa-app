import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";

interface SessionState {
  accessToken: string | null;
}

type SessionAction =
  | { type: "SET_TOKEN"; token: string }
  | { type: "CLEAR" };

interface SessionContextValue {
  state: SessionState;
  dispatch: Dispatch<SessionAction>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

function reducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "SET_TOKEN":
      localStorage.setItem("access_token", action.token);
      return { accessToken: action.token };
    case "CLEAR":
      localStorage.removeItem("access_token");
      return { accessToken: null };
    default:
      return state;
  }
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { accessToken: null });

  // при монтировании — подгружаем токен из localStorage
  useEffect(() => {
    const stored = localStorage.getItem("access_token");
    if (stored) {
      dispatch({ type: "SET_TOKEN", token: stored });
    }
  }, []);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

// Хук для удобного доступа
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

// Упрощённые хелперы
export function useAccessToken() {
  const { state } = useSession();
  return state.accessToken;
}

export function useSetToken() {
  const { dispatch } = useSession();
  return (token: string) => dispatch({ type: "SET_TOKEN", token });
}

export function useClearSession() {
  const { dispatch } = useSession();
  return () => dispatch({ type: "CLEAR" });
}
