import transactionsStyles from "../../../styles/pages/Transactions.module.css";
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useAccount } from "@/lib/swr-hooks";

const BalanceSkeleton = (props) => {
    // const { account } = useAccount(props.accountId)
    return (
        <div className={`${transactionsStyles.containerB} ${transactionsStyles.containerC}`}>
            <SkeletonTheme color="#a8c4fd" highlightColor="#cfddfc">
                <p><Skeleton width={170}/></p>     
                <h2 className={transactionsStyles.balanceAmount}><Skeleton width={160}/></h2>
                <hr />
                <div className={transactionsStyles.accountBalanceContainer}>
                    <h3 className={transactionsStyles.accountBalance}><Skeleton width={120}/></h3>
                    <p><Skeleton width={40}/></p>
                </div>
                <div className={transactionsStyles.accountBalanceContainer}>
                    <h3 className={transactionsStyles.accountBalance}><Skeleton width={120}/></h3>
                    <p><Skeleton width={40}/></p>
                </div>
            </SkeletonTheme>
        </div>
    )
    
}

export default BalanceSkeleton