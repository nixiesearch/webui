import dataProvider from "@refinedev/simple-rest"
import { resources } from "../resources"

const defaultDataProvider = {
  ...dataProvider("https://demo.nixiesearch.ai"),
  getOne: async ({ resource, id, meta }: { resource: string, id: string, meta: any }) => {
    const apiURL = defaultDataProvider.getApiUrl()
    const path = resources!.find((r) => r.name === resource)?.show as string
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

export const providers = {
  default: defaultDataProvider
}
