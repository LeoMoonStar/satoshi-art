import React, { useState } from 'react'
import { Button, IconButton } from '@material-ui/core'
import Works from 'shared/Works'
import { FilterIcon } from 'shared/icons'

import useStyles from './ArtistWorks.style'

type CategoryType = {
    id: number
    title: string
    isEmpty?: boolean
}

const categories: CategoryType[] = [
    { id: 1, title: 'On sale' },
    { id: 2, title: 'Collectibles' },
    { id: 3, title: 'Created' },
    { id: 4, title: 'Liked', isEmpty: true },
    { id: 5, title: 'Activity', isEmpty: true },
    { id: 6, title: 'Following', isEmpty: true },
]

export default function ArtistWorks(): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
        categories[0]
    )

    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.navigationRow}>
                <div className={classes.selectedCategory}>
                    {selectedCategory.title} <span>55 Views</span>
                </div>

                <nav className={classes.navigation}>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            disabled={category.isEmpty}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.title}
                        </Button>
                    ))}
                </nav>
                <IconButton className={classes.filterButton}>
                    <FilterIcon />
                </IconButton>
            </div>
            <Works />
        </div>
    )
}
