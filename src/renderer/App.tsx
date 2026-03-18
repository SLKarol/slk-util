import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { configure } from 'mobx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

/** mobx configure */
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.body);
root.render(
  <MantineProvider>
    <BrowserRouter>
      <div>div</div>
    </BrowserRouter>
  </MantineProvider>,
);
