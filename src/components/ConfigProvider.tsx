import { useApiUrl, useCustom } from "@refinedev/core";
import { Config } from "../types/config";
import { createContext, useContext } from "react";

const ConfigContext = createContext<Config>({} as Config)

export const useConfig = () => useContext(ConfigContext)

export const ConfigProvider = ({ children }: { children: any }) => {
  const apiUrl = useApiUrl()
  const { data, isLoading } = useCustom<Config>({
    url: `${apiUrl}/_config`,
    method: "get"
  })

  if (isLoading || !data?.data.schema) return null

  return (
    <ConfigContext.Provider value={data?.data}>
      { children }
    </ConfigContext.Provider>
  )
}
