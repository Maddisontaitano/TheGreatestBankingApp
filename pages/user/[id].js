import { useRouter } from 'next/router'
import { useUser, useAccounts } from '@/lib/swr-hooks'

import User from '../../components/users/User'
import Container from '../../components/Container'

import Accounts from '../../components/accounts/Accounts'

export default function EditEntryPage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { user } = useUser(id)
  const { accounts, isLoad } = useAccounts(id)


  if (user) {
  console.log("**** Front Page User")
  console.log(user)
  console.log("**** Front Page User")
  return (
      <>
        <Container>
          <User 
            id={user.userId}   
            pass={user.pass} 
            fname={user.fname} 
            lname={user.lname} 
            email={user.email} 
          />
        </Container>
        <Container>
          <Accounts 
            accounts={accounts} 
            fname={user.fname} 
            lname={user.lname}/>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Container>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
        </Container>
      </>
    )
  }
}