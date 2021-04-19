import { MenuItem, SelectProps } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Select from 'shared/Select'
import useStyles from './Introduction.style'
import { ExpandMore } from '@material-ui/icons'

export default function Introduction(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Drop of the day history</h1>
            <div className={classes.resultsCount}>7.943 results</div>
            <Select
                className={classes.select}
                label={t('All items ')}
                defaultValue={t('All items ') as string}
                renderValue={(value: SelectProps['value']) => (
                    <>
                        {value}
                        <ExpandMore />
                    </>
                )}
            >
                <MenuItem value="default">{t('All items ')}</MenuItem>
                <MenuItem value="Option1">Option1</MenuItem>
                <MenuItem value="Option2">Option2</MenuItem>
                <MenuItem value="Option3">Option3</MenuItem>
            </Select>
            <Select
                className={classes.select}
                label={t('sortBy')}
                defaultValue={t('sortBy') as string}
                renderValue={(value: SelectProps['value']) => (
                    <>
                        {value}
                        <ExpandMore />
                    </>
                )}
            >
                <MenuItem value="default">{t('sortBy')}</MenuItem>
                <MenuItem value="Option1">Newest</MenuItem>
                <MenuItem value="Option2">Oldest</MenuItem>
                <MenuItem value="Option3">Expensive</MenuItem>
            </Select>
        </section>
    )
}
