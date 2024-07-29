export type Config = {
  searcher: {
    host: string
    port: number
  },
  schema: {
    [key: string]: {
      alias: [],
      name: string,
      config: {
        flush: {
          interval: string
        }
      }
    }
  }
}
