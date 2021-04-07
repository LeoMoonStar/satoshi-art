import React, { useEffect, useState } from 'react'
import { getTokens, Token } from 'api/tokens'
// import { Button, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Modal from 'shared/Modal'
import Works from 'shared/Works'
import Button from 'shared/Button'
// import { FilterIcon } from 'shared/icons'

import useStyles from './PopularWorks.style'

// const categories = ['creator', 'collectible', 'collection']

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isExistNewTokens, setExistNewTokens] = useState<boolean>(false)

    useEffect(() => {
        // todo: We should implement error handling
        getTokens().then((res) => {
            setTokens(res)
            setLoading(false)
        })
    }, [])

    return (
        <section className={classes.container}>
            <h3 className={classes.title}>{t('madeByTheArtists')}</h3>
            <h2 className={classes.subTitle}>{t('forTheArtists')}</h2>
            {/*    <div className={classes.filters}>
                <nav className={classes.navigation}>
                    {categories.map((category) => (
                        <Button key={category}>{t('category')}</Button>
                    ))}
                </nav>
                <IconButton className={classes.filterButton}>
                    <FilterIcon />
                </IconButton>
            </div>*/}
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
