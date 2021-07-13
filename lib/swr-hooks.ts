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
  const { data, error } = useSWR(`/api/accounts/get-user-accounts?id=${id}`, fetcher)
  // console.log("**** Account Data ****")
  // console.log(data)
  // console.log("**** Account Data ****")

  return {
    accounts: data,
    isLoad: !error && !data,
    isError: error,
  }
}

export function useAccountsTransactionTable(id: string) {
  const { data, error } = useSWR(`/api/accounts/get-user-accounts-transaction-table?id=${id}`, fetcher)
  console.log("**** Account Data ****")
  console.log(data)
  console.log("**** Account Data ****")

  function getData(data) {
    if(data) {
      console.log(data[0].accountId)
      return data[0].accountId
    }
  }
  const defaultValue = getData(data)
  console.log(defaultValue)

  return {
    data: data,
    defaultValue: defaultValue,
    isLoad: !error && !data,
    isError: error,
  }
}

// Get's all users transactions
export function useUserTransactions(id: string) {
  const { data, error } = useSWR(`/api/transactions/get-user-transactions?id=${id}`, fetcher)
  console.log("**** User All Transaction Data ****")
  // console.log(data)
  console.log("**** User All Transaction Data ****")

  // Getting user transaction data Step #2
  return {
    userData: data,
    isLoad: !error && !data,
    isError: error,
  }
}

// Get's transactions from account
export function useAccountTransactions(id: string) {
  const { data, error } = useSWR(`/api/transactions/get-account-transactions?id=${id}`, fetcher)
  // console.log(data) 

  return {
    transactions: data,
    isLoad: !error && !data,
    isError: error,
  }
}

// Get all user transactions date from to
export function useUserTransactionsDates(id: string, startDate: string, endDate: string) {
  console.log(`${id} ${startDate} ${endDate}`)
  console.log(`/api/transactions/get-user-transactions-date-from-to?id=${id}&startDate=${startDate}&endDate=${endDate}`)
  const { data, error } = useSWR(`/api/transactions/get-user-transactions-date-from-to?id=${id}&startDate=${startDate}&endDate=${endDate}`, fetcher)
  console.log(data) 

  return {
    data: data,
    isLoad: !error && !data,
    isError: error,
  }
}

// export function useForgotPassword(email: string) {
//   const { data, error } = useSWR(`/api/forgot-password?email=${email}`, fetcher);

//   console.log(data)

//   return {
//     data
//   }
// }

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

export function useAccount(id: string) {
  const { data, error } = useSWR(`/api/accounts/get-account?id=${id}`, fetcher) // this api still needs to be setup
  console.log("**** User Data ****")
  console.log(data)
  console.log("**** User Data ****")
  return {
    account: data,
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

export function useIsLoggedIn() {
  if (typeof window !== 'undefined') {
    if (document.cookie && document.cookie.split('; ').find(row => row.startsWith('user='))) {
      const UserCookie = document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
      if (UserCookie !== '') {
        return {
          loggedin: true,
          userId: UserCookie
        }
     }
   } else {
    return {
      loggedin: false,
      userId: null
    }
   }
  } else {
    return {
      loggedin: false,
      userId: null
    }
  }
  

//  return true;
}
export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}