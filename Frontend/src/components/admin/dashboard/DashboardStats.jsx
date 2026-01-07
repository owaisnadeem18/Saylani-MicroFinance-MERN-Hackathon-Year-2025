import { stats } from '@/data/dashboardStats'
import React from 'react'
import StatCard from './StatCard'

const DashboardStats = () => {
return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5' >
        
        {
            stats.map((stat , index) => <StatCard key={index} title={stat.title} value={stat.value} /> )
        }

    </div>
)
}

export default DashboardStats
          