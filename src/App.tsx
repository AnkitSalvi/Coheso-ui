import React from "react";
import { RequestTypeProvider } from "./Context/RequestTypeContext";
import AppRouter from "./Router";
import { UserProvider } from "./Context/UserContext";

const App: React.FC = () => {
  return (
    <RequestTypeProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </RequestTypeProvider>
  );
};

export default App;
