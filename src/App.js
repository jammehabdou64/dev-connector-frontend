import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUser } from "./features/auth/authSlice";
import { SocketProvider } from "./Provider/Socket";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </Provider>
  );
}

export default App;
