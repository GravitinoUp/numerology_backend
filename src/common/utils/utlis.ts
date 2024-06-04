export function toEntries<T>(a: T[]) {
  return a.map((value, index) => [index, value] as const)
}

export function capitalize(query: string) {
  return query[0].toUpperCase() + query.slice(1).toLowerCase()
}
