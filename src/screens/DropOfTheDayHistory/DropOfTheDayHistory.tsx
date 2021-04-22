import React from 'react'

import Layout from 'shared/Layout'
import History from './History'
import Introduction from './Introduction'

export default function DropOfTheDayHistory(): JSX.Element {
    return (
        <Layout headerVariant="full">
            <Introduction />
            <History />
        </Layout>
    )
}