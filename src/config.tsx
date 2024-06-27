import { RefineProps } from "@refinedev/core"
import { IconChartBar, IconContainer, IconHome, IconSettings } from '@tabler/icons-react';

export const resources: RefineProps['resources'] = [
  {
    name: "overview",
    list: "/",
    meta: {
      icon: <IconHome />,
    },
  },
  {
    name: "indexes",
    list: '/languages',
    meta: {
      icon: <IconContainer />,
    },
  },
  {
    name: "index",
    list: "/languages/:indexId",
    meta: {
      parent: 'indexes',
      hide: true,
    },
  },
  {
    name: "metrics",
    list: "/metrics",
    create: "/metrics/create",
    edit: "/metrics/edit/:id",
    show: "/metrics/show/:id",
    meta: {
      icon: <IconChartBar />,
    },
  },
  {
    name: "config",
    list: "/config",
    meta: {
      icon: <IconSettings />,
    },
  },
]

export const refineOptions: RefineProps['options'] = {
  syncWithLocation: true,
  warnWhenUnsavedChanges: true,
  useNewQueryKeys: true,
  projectId: "maxV4A-VJEa1X-r0QzHE",
}
