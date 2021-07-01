import Skeleton from 'react-loading-skeleton'

import React, { useState, useEffect } from 'react';

import Nav from '../components/Nav'
import Container from '../components/Container'
import Users from '../components/users/Users'

// import { useUsers } from '@/lib/swr-hooks'
import { useIsLoggedIn } from '@/lib/swr-hooks'

export default function IndexPage() {
  // const { users, isLoad } = useUsers()
  // console.log(users)
  const {loggedin, userId} = useIsLoggedIn();
  return (
    <div>
      <h2>{loggedin ? "User Logged In" : "No User Logged In"}</h2>
      {/* <Container>
      </Container>
      <Container>
        <Users users={users} />
      </Container> */}
    </div>
  )
}
