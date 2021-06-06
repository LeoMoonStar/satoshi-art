import React, { useEffect } from 'react'
import Layout from 'components/layout'
import PageDetails from 'components/widgets/PageDetails'
import UserWorks from './UserWorks'

export default function Artist(): JSX.Element {    
    return (
        <Layout>
            <PageDetails/>
            <UserWorks />
        </Layout>
    )
}
