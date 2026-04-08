import { RouterProvider } from "react-router/dom";
import "./App.css";
import { router } from "./routes";
import AuthContextProvider from "./context/authContext/authContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
