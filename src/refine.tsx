import { RefineProps } from "@refinedev/core"
import dataProvider from "@refinedev/simple-rest";
import { IconChartBar, IconContainer, IconHome, IconSettings } from '@tabler/icons-react';

export const resources: RefineProps['resources'] = [
  {
    name: "overview",
    list: "/",
    meta: {
      label: "Overview",
      icon: <IconHome />,
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
  },
]

export const refineOptions: RefineProps['options'] = {
  syncWithLocation: true,
  warnWhenUnsavedChanges: true,
  useNewQueryKeys: true,
  disableTelemetry: true
}

const defaultDataProvider = {
  ...dataProvider("https://demo.nixiesearch.ai"),
  getOne: async ({ resource, id, meta }: { resource: string, id: string, meta: any }) => {
    const apiURL = defaultDataProvider.getApiUrl()
    const path = resources.find((r) => r.name === resource)?.show as string
    const response = await defaultDataProvider.custom({
      url: `${apiURL}${path.replace(":id", id)}`,
      method: "get",
      meta,
      query: meta.params
    })
  
    return response.data
  },
  getMany: async ({ resource, ids, meta }: { resource: string, ids: string[], meta: any }) => {
    const data = await Promise.all(ids.map((id) => defaultDataProvider.getOne({ resource, id, meta })))
    return { data }
  }
}
export const dataProviders = {
  default: defaultDataProvider
}
