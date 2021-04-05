import React from 'react'
import { Input } from '@material-ui/core'
import cx from 'clsx'
import { useTranslation } from 'react-i18next'

import useStyles from './Search.style'

import { SearchIcon } from 'shared/icons'

type SearchProps = {
    className?: string
    placeholder?: string
}

const Search = ({ className = '', placeholder }: SearchProps): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <label
            htmlFor="searchField"
            className={cx(classes.searchWrapper, className)}
        >
            <Input
                id="searchField"
                type="search"
                placeholder={placeholder || t('search')}
                classes={{
                    root: classes.searchInput,
                }}
                disableUnderline
            />
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
        </label>
    )
}

export default Search
