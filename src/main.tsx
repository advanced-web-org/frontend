import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from "react-redux"; // Import Redux Provider
import App from "./App.tsx";
import "./index.css";
import store from "./stores/redux.store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_APP_SITE_KEY}>
    <BrowserRouter>
      <Provider store={store}> {/* Add the Redux Provider */}
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} /> {/* Optional DevTools */}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </GoogleReCaptchaProvider>
);
