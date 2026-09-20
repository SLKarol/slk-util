import React from "react";
import { configure } from "mobx";
import { createRoot } from "react-dom/client";

import { App } from "./ui/App";

/** mobx configure */
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.body);
root.render(<App />);
