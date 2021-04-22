import React from 'react'

import Layout from 'shared/Layout'
import UserList from './UsersList'
import Introduction from './Introduction'

export default function Users(): JSX.Element {
    return (
        <Layout headerVariant="full">
            <Introduction />
            <UserList />
        </Layout>
    )
}
