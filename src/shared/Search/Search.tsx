import React from 'react'
import { Input } from '@material-ui/core'

import useStyles from './Search.style'

import { SearchIcon4 } from 'shared/icons'

const Search = (): JSX.Element => {
    const classes = useStyles()

    return (
        <div className={classes.searchWrapper}>
            <Input
                type="search"
                placeholder="Search by creator, collectible or collection"
                classes={{
                    root: classes.searchInput,
                }}
                disableUnderline
            />
            <div className={classes.searchIcon}>
                <SearchIcon4 />
            </div>
        </div>
    )
}

export default Search
