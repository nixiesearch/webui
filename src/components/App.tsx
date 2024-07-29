import { Refine, useApiUrl, useCustom } from "@refinedev/core";
import { RefineThemes, useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { dataProviders, refineOptions, resources } from "../refine";
import { ConfigProvider } from "./ConfigProvider";

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
            dataProvider={dataProviders}
            routerProvider={routerBindings}
            resources={resources}
            options={refineOptions}
          >
            <ConfigProvider>
              <Router />
            </ConfigProvider>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default NixieUI;
