import dataProvider from "@refinedev/simple-rest"
import { resources } from "../resources"

const defaultDataProvider = {
  ...dataProvider((window as any).nixie_host || "https://demo.nixiesearch.ai"),
  getOne: async ({ resource, id, meta }: { resource: string, id: string, meta: any }) => {
    const apiURL = defaultDataProvider.getApiUrl()
    const path = resources!.find((r) => r.name === resource)?.show as string
    const response = await defaultDataProvider.custom({
      url: `${apiURL}${path.replace(":id", id)}`,
      method: "get",
      meta,
      query: meta.params
    })
  
    return response
  },
  getMany: async ({ resource, ids, meta }: { resource: string, ids: string[], meta: any }) => {
    const res = await Promise.all(ids.map((id) => defaultDataProvider.getOne({ resource, id, meta })))
    return {
      data: res.map((r) => r.data),
    }
  }
}

export const providers = {
  default: defaultDataProvider
}
