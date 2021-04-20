import React, { useEffect, useState, useContext, useRef } from 'react'
import { getTokens, Token } from 'api/tokens'
import {
    IconButton,
    Popover,
    // Button
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Modal from 'shared/Modal'
import Works from 'shared/Works'
import Button from 'shared/Button'
import { FilterIcon } from 'shared/icons'

import useStyles from './PopularWorks.style'
import { APIErrorContext } from 'providers/APIErrorProvider'

const sortCases = [
    { sort: 'published_at:desc', title: 'Recently added' },
    { sort: 'published_at:asc', title: 'Oldest' },
]

// const categories = ['creator', 'collectible', 'collection']

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isExistNewTokens, setExistNewTokens] = useState<boolean>(false)
    const [isOpenSorting, setOpenSorting] = useState<boolean>(false)
    const [sortBy, setSortBy] = useState(sortCases[0].sort)
    const { setError } = useContext(APIErrorContext)
    const filterAnchorElementRef: React.RefObject<HTMLButtonElement> = useRef(
        null
    )

    useEffect(() => {
        setLoading(true)
        getTokens({ sort: sortBy })
            .then((res) => {
                setTokens(res)
                setLoading(false)
            })
            .catch((err) => {
                setError(
                    t('tokensLoadingFailed'),
                    JSON.stringify(err.data, null, 2)
                )
            })
    }, [sortBy, setError, t])

    return (
        <section className={classes.container}>
            <h3 className={classes.title}>
                {t('takeTimeToAppreciateTheArtWork')}
            </h3>
            <h2 className={classes.subTitle}>
                {t('youWillBeAbleToBuyItSoon')}
            </h2>
            <div className={classes.filters}>
                {/*<nav className={classes.navigation}>*/}
                {/*    {categories.map((category) => (*/}
                {/*        <Button key={category}>{t('category')}</Button>*/}
                {/*    ))}*/}
                {/*</nav>*/}
                <IconButton
                    ref={filterAnchorElementRef}
                    onClick={() => setOpenSorting(true)}
                    className={classes.filterButton}
                >
                    <FilterIcon />
                </IconButton>

                <Popover
                    anchorEl={filterAnchorElementRef?.current}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={isOpenSorting}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={() => setOpenSorting(false)}
                    disableRestoreFocus
                >
                    <div className={classes.controls}>
                        {sortCases.map((sortCase, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    setSortBy(sortCase.sort)
                                    setOpenSorting(false)
                                }}
                            >
                                {sortCase.title}
                            </Button>
                        ))}
                    </div>
                </Popover>
            </div>
            <Modal
                open={isExistNewTokens}
                onClose={() => setExistNewTokens(false)}
            >
                <div className={classes.newTokensContainer}>
                    <h2 className={classes.newTokensTitle}>Hello</h2>
                    <div className={classes.newTokensContent}>
                        List of tokens was updated
                    </div>
                    <Button variantCustom="action">Refresh</Button>
                    <Button
                        variantCustom="outlined"
                        onClick={() => setExistNewTokens(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
            <Works
                tokens={tokens}
                borderWidth={0}
                isLoading={isLoading}
                variant="rounded"
            />
        </section>
    )
}
