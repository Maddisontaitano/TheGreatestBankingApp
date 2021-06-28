import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useUsers() {
  const { data, error } = useSWR('/api/get-users', fetcher)
  console.log(data)

  return {
    users: data,
    isLoad: !error && !data,
    isError: error,
  }
}

export function useAccounts(id: string) {
  const { data, error } = useSWR(`/api/get-user-accounts?id=${id}`, fetcher)
  console.log("**** Account Data ****")
  console.log(data)
  console.log("**** Account Data ****")

  return {
    accounts: data,
    isLoad: !error && !data,
    isError: error,
  }
}

export function useTransactions(id: string) {
  const { data, error } = useSWR(`/api/get-account-transactions?id=${id}`, fetcher)
  console.log(data) 

  return {
    transactions: data,
    isLoad: !error && !data,
    isError: error,
  }
}

export function useUser(id: string) {
  const { data, error } = useSWR(`/api/get-user?id=${id}`, fetcher) // this api still needs to be setup
  console.log("**** User Data ****")
  console.log(data)
  console.log("**** User Data ****")
  return {
    user: data,
    isError: error
  }
}


export function useEntries() {
  const { data, error } = useSWR(`/api/get-entries`, fetcher)
  console.log(data)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}