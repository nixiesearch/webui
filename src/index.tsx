import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ConfigProvider } from "./components/ConfigProvider";
import { Refine } from "@refinedev/core";
import { resources } from "./resources";
import routerBindings, { DocumentTitleHandler } from "@refinedev/react-router-v6";
import { Router } from "./Router";
import { useNotificationProvider } from "./refine/notifications";
import { providers } from "./refine/providers";
import { options } from "./refine/options";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/notifications/styles.css';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <ModalsProvider>
          <Refine
            notificationProvider={useNotificationProvider}
            dataProvider={providers}
            routerProvider={routerBindings}
            resources={resources}
            options={options}
          >
            <ConfigProvider>
              <Router />
            </ConfigProvider>
            <DocumentTitleHandler />
            <Notifications />
          </Refine>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
