import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from 'components/widgets/DashboardLayout'

import useStyles from './OrderItem.style'

export default function OrderItem(): JSX.Element {
	const classes = useStyles()
	const { id } = useParams<{ id: string }>()

	return (
		<DashboardLayout>
		</DashboardLayout>
	)
}