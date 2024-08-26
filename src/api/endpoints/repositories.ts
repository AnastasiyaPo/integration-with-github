export interface GetRepositoriesList {
  sort?: "stars" | string
  order?: "desc" | "asc"
  q?: string
}

export function getRepositoriesList(params: GetRepositoriesList = {}) {
  const searchParams = new URLSearchParams({
    ...params,
    q: 'language:typescript',
  }).toString()

  return fetch(`https://api.github.com/search/repositories?${searchParams}`, {
    method: "get",
  })
}
