import { RouterProvider } from "react-router";
import router from "./routes";
import { useEffect } from "react";
import i18n from "./i18n";
import ReactQueryProvider from "./ReactQueryProvider";
import { SnackbarProvider } from "./components/contextProviders/SnackbarProvider";

const App = () => {
  useEffect(() => {
    const lng = navigator.language || navigator.languages[0];
    i18n.changeLanguage(lng);
  }, []);

  return (
    <SnackbarProvider>
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </SnackbarProvider>
  );
};

export default App;
