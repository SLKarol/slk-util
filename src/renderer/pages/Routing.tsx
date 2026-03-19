import { MemoryRouter, Route, Routes } from "react-router";

import { HomePage } from "@pages/Home/HomePage";

import { MainLayout } from "@widgets/main-layout/ui/MainLayout";

import { StihiRuRootProvider } from "@renderer/providers/stihi-ru/StihiRuProvider";

export const Routing = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="stihiru"
            element={
              <StihiRuRootProvider>
                <div>St</div>
              </StihiRuRootProvider>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
