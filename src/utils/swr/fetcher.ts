export const fetcher = async <T>(url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json()) as T;

export const emptyFetcher = <T>() => [] as T;
