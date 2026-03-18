import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { createRoot } from "react-dom/client";
import { configure } from "mobx";

/** mobx configure */
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.body);
root.render(<div>App</div>);
