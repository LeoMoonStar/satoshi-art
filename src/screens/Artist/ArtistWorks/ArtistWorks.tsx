import React, { useState } from 'react'
import { Button, IconButton } from '@material-ui/core'
import Modal from 'shared/Modal'
import Works from 'shared/Works'
import Followers, { TabVariants } from 'shared/Followers'
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
]

export default function ArtistWorks(): JSX.Element {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(TabVariants.Following)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
        categories[0]
    )

    const openModal = (activeType: number) => {
        setActive(activeType)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setActive(0)
    }

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
                    <Button onClick={() => openModal(TabVariants.Following)}>
                        Following
                    </Button>
                    <Button onClick={() => openModal(TabVariants.Followers)}>
                        Followers
                    </Button>
                </nav>
                <IconButton className={classes.filterButton}>
                    <FilterIcon />
                </IconButton>
            </div>
            <Works />
            <Modal open={open} onClose={closeModal}>
                <Followers active={active} />
            </Modal>
        </div>
    )
}
