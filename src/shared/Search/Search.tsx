import React from 'react'
import { Input } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import useStyles from './Search.style'

import { SearchIcon4 } from 'shared/icons'

const Search = (): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <label htmlFor="searchField" className={classes.searchWrapper}>
            <Input
                id="searchField"
                type="search"
                placeholder={t('searchByCreatorCollectibleOrCollection')}
                classes={{
                    root: classes.searchInput,
                }}
                disableUnderline
            />
            <div className={classes.searchIcon}>
                <SearchIcon4 />
            </div>
        </label>
    )
}

export default Search
