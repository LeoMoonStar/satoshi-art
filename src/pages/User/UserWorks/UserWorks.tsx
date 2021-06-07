import React, { useState, useEffect } from 'react'
import { Button, IconButton } from '@material-ui/core'
import Modal from 'components/widgets/Modal'
import Works from 'components/widgets/Works'
import Followers, { TabVariants } from 'components/widgets/Followers'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { FilterIcon } from 'components/icons'

import useStyles from './UserWorks.style'
import { Collectible, getOnSaleCollectibles, getUserCollectibles, getLikedCollectibles } from 'apis/collectibles'
import { readCookie } from 'apis/cookie'

type CategoryType = {
    id: number
    title: string
    isEmpty?: boolean
}

const categories: CategoryType[] = [
    { id: 1, title: 'On sale' },
    { id: 2, title: 'Collectibles' },
    { id: 3, title: 'Liked' }
]

export default function UserWorks(): JSX.Element {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(TabVariants.Following)
    const [collectibles, setCollectibles] = useState([])
    const [numCollectibles, setNumCollectibles] = useState<number>(0)
    const [isArtist, setIsArtist] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[1])
    const userId = readCookie("id")
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            getUserCollectibles(id).then((res) => {
                const data = res.data

                setCollectibles(data)
                setNumCollectibles(res.data.length)
            })
        }
    }, [])

    const openModal = (activeType: number) => {
        setActive(activeType)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setActive(0)
    }

    const getCategoryList = (category: CategoryType) => {
        switch (category.title) {
            case 'On sale':
                getOnSaleCollectibles(id).then((res) => {
                    setCollectibles(res.data)
                    setNumCollectibles(res.data.length)
                })

                break
            case 'Collectibles':
                getUserCollectibles(id).then((res) => {
                    setCollectibles(res.data)
                    setNumCollectibles(res.data.length)
                })

                break
            case 'Liked':
                getLikedCollectibles(id).then(({ data }) => {
                  setCollectibles(data)
                  setNumCollectibles(data.length)
                })

                break
            default:
        }

        setSelectedCategory(category)
    }
    
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.navigationRow}>
                <div className={classes.selectedCategory}>{selectedCategory.title} <span>{numCollectibles} Views</span></div>
                <nav className={classes.navigation}>
                    {categories.map((category) => (
                        <Button 
                            key={category.id} disabled={category.isEmpty} 
                            onClick={() => getCategoryList(category)}
                        >
                            {category.title}
                        </Button>
                    ))}
                </nav>

                {/*<IconButton className={classes.filterButton}><FilterIcon /></IconButton>*/}
            </div>
            <Works collectibles={collectibles} isLoading={false} isArtistPage={userId == id} />
            <Modal open={open} onClose={closeModal}><Followers active={active} /></Modal>
        </div>
    )
}
