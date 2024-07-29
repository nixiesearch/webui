export type Leave = {
  docBase: number
  fields: any[]
  numDeletedDocs: number
  numDocs: number
  ord: number
}

export type Index = {
  leaves: Leave[]
}
