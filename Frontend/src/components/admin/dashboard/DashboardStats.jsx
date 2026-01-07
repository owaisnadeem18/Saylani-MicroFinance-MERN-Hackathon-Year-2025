import React from 'react'
import StatCard from './StatCard'
import useGetAllLoans from '@/hooks/admin/useGetAllLoans'

const DashboardStats = () => {

    // Here, in this component we are required to call the get API of all loans applications of user 

    const {loading , loans} = useGetAllLoans()

    // We have to send all these stats to our component in props:

    // From the API result we have to get the values and put in the data:

    const totalLoans = loans.length

    const approvedLoans = loans?.filter(loan => loan?.status.toLowerCase == "approved").length
    const pendingLoans = loans?.filter(loan => loan?.status?.toLowerCase() == "pending").length
    const rejectedLoans = loans?.filter(loan => loan?.status?.toLowerCase() == "rejected").length

    const stats = [
        {title : "Total Loans" , value: totalLoans } ,
        {title : "Approved" , value: approvedLoans } ,
        {title : "Pending" , value: pendingLoans } ,
        {title : "Rejected" , value: rejectedLoans } ,
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5' >

            {
                stats.map((stat, index) => <StatCard key={index} title={stat.title} value={stat.value} loading = {loading} />)
            }

        </div>
    )
}

export default DashboardStats
