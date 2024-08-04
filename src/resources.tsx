import { RefineProps } from "@refinedev/core"
import { IconContainer, IconHome, IconSettings } from '@tabler/icons-react';

export const resources: RefineProps['resources'] = [
  {
    name: "overview",
    list: "/",
    meta: {
      label: "Overview",
      icon: <IconHome />,
      url: '/',
    },
  },
  {
    name: "indexes",
    list: '/indexes',
    meta: {
      icon: <IconContainer />,
    },
  },
  {
    name: "stats",
    show: '/:id/_stats',
  },
  {
    name: "suggest",
    show: '/:id/_suggest',
  },
  {
    name: "mapping",
    show: '/:id/_mapping',
  },
  {
    name: "search",
    show: '/:id/_search',
  },
  {
    name: "metrics",
    show: "/metrics",
  },
  {
    name: "config",
    show: "/_config",
    list: "/_config",
    meta: {
      icon: <IconSettings />,
    }
  },
]
