import Skeleton from 'react-loading-skeleton'

import { useState } from 'react'

import Nav from '../components/Nav'
import Container from '../components/Container'
import Entries from '../components/entries/Entries'
import Users from '../components/users/Users'

import { useEntries, useUsers } from '@/lib/swr-hooks'

export default function IndexPage() {
  const { entries, isLoading } = useEntries()
  const { users, isLoad } = useUsers()
  // console.log(entries)
  // console.log(users)

  if (isLoading || isLoad) {
    return (
      <div>
        <Container>
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    )
  }

  return (
    <div>
      <Container>
        <Users users={users} />
      </Container>
    </div>
  )
}
