import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import transactionsStyles from '../../../styles/pages/Transactions.module.css'


const TransactionsTableSkeleton = () => {
    return (
        <SkeletonTheme color="#a8c4fd" highlightColor="#cfddfc">
            <div className={transactionsStyles.containerB}>
                <div className={`${transactionsStyles.tableHeaderA} ${transactionsStyles.tableHeader}`}>
                    <button 
                    className={transactionsStyles.accountSelectButton}>
                        <Skeleton />
                    </button>
                </div>                       
                <div style={{maxHeight: `82vh`}} className={transactionsStyles.tableContainer}>
                    <table className={transactionsStyles.table}>
                        <tbody>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                            <tr>
                                <td className={`${transactionsStyles.typeExpense} ${transactionsStyles.typeExpenseHide}`}><div className="positionRight"><Skeleton circle={true} width={42} height={42} /></div></td>
                                <td><Skeleton width={175}/><br/><span><Skeleton width={72}/></span></td>
                                <td><Skeleton width={55} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
                <div className={transactionsStyles.tableFooter}>
                    <button className={transactionsStyles.extendButton}><Skeleton /></button>
                    <button className={transactionsStyles.extendButton}><Skeleton /></button>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default TransactionsTableSkeleton
