import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import App from "@/App";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/** AuthProvider란? : 사용자 인증 상태를 관리하는 컨텍스트 */}
    <AuthProvider>
      {/** UIProvider란? : UI 상태를 관리하는 컨텍스트 */}
      <UIProvider>
        <App />
      </UIProvider>
    </AuthProvider>
  </StrictMode>
);
