import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const StatCard = ({title , value , loading}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">
          {
            loading ? <Spinner/>  
          :
            value
          }
            </p>
      </CardContent>
    </Card>
  )
}

export default StatCard
