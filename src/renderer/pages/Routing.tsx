import { MemoryRouter, Route, Routes } from "react-router";

import { MainLayout } from "@widgets/main-layout/ui/MainLayout";

export const Routing = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<div>Home</div>} />
          <Route path="stihiru" element={<div>SR</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
