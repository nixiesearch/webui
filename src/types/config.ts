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
        indexer: {
          flush: {
            interval: string
          },
          ram_buffer_size: string,
          merge_policy?: any
        },
        directory: string
      }
    }
  }
}
