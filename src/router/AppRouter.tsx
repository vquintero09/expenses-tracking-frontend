import { AppLayout } from "@/presentation/layouts/AppLayout";
import { AccountPage } from "@/presentation/pages/accounts/AccountPage";
import { Movements } from "@/presentation/pages/movements";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="estadisticas" element={<h1>Estadísticas</h1>} />
          <Route path="movimientos" element={<Movements />} />
          <Route path="metas" element={<h1>Metas</h1>} />
          <Route path="cuentas" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
