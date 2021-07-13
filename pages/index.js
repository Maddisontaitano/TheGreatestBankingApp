import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'

import SectionA from '../components/Index/SectionA'
import SectionB from '../components/Index/SectionB'
import SectionC from '../components/Index/SectionC'
import SectionD from '../components/Index/SectionD'
import SectionE from '../components/Index/SectionE'

import styles from '../styles/pages/Index/Index.module.css'

import { useIsLoggedIn } from '@/lib/swr-hooks'


export default function IndexPage() {
  // const { users, isLoad } = useUsers()
  // console.log(users)

  const {loggedin, userId} = useIsLoggedIn();
  
  return (
    <div className="no-overflow-y">
      <SectionA />
    </div>
  )
}
