import { Refine } from "@refinedev/core";
import { RefineThemes, useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { refineOptions, resources } from "./config";

function NixieUI() {
  return (
    <BrowserRouter>
      <MantineProvider
        theme={RefineThemes.Blue}
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider position="top-right">
          <Refine
            notificationProvider={useNotificationProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerBindings}
            resources={resources}
            options={refineOptions}
          >
            <Router />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default NixieUI;
