import React, { useState, useEffect } from "react";
import transactionsStyles from "../../styles/pages/Transactions.module.css";
import TransactionHistory from "../../components/transaction/TransactionHistory";
import Balance from "../../components/transaction/Balance";
import Skeleton from 'react-loading-skeleton';
import BalanceSkeleton from "../../components/transaction/Skeletons/BalanceSkeleton";
import FlashMessage from '../../components/flash/FlashMessage'
import router, { useRouter } from 'next/router';
import { useAccounts, useAccountsTransactionTable, useIsLoggedIn, useUser, useUserTransactions } from "@/lib/swr-hooks";

const transactions = () => {      
  const {loggedin, userId} = useIsLoggedIn();
  useEffect(() => {
    !loggedin ? router.push({
                pathname: '/login',
                query: { message: "Login or signup to access bank transactions for free!"}
                }) : ''
  }, [])
  const Router = useRouter()
  const message = Router.query.message?.toString()
  const { userData } = useUserTransactions(userId)
  const { data, isLoad } = useAccountsTransactionTable(userId);
  // console.log(data ? data[0].accountId : null)
  const [account, setAccount ] = useState(null)
  const [ activeButton, setActiveButton ] = useState(null);
  useEffect(()=> {
    data ? setAccount(data[0].accountId) : null
    data ? setActiveButton(data[0].accountId) : null
  }, [data])
  const { user } = useUser(userId);

  const updateAccount = (id) => {
    if(account !== id && activeButton !== id) {
      setAccount(id)
      setActiveButton(id)
    } else return;
  }

  if(userData && user && data && account && activeButton && loggedin) {
  return (
      <div className={transactionsStyles.containerA}>
        { message ? <FlashMessage type="success" message={message} /> : <></>}
        <Balance accountId={account} username={`${user.fname} ${user.lname}`} userId={userId}/>
        <TransactionHistory accounts={data} account={account} activeButton={activeButton} updateAccount={updateAccount} />
      </div>
    );
  } else return (
    <div className={transactionsStyles.containerA}>
      <BalanceSkeleton />
    </div>
  )
};

export default transactions;
