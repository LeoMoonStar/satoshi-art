import React, { useState } from 'react'
import { Tab, Tabs, Divider } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FollowersUser from './FollowersUser'
import FollowersGallery from './FollowersGallery'
import useStyles from './Followers.style'

enum TabVariants {
    FOLLOWERS = 0,
    FOLLOWING = 1,
}

const tabs = [
    {
        label: 'Followers',
        value: TabVariants.FOLLOWERS,
    },
    {
        label: 'Following',
        value: TabVariants.FOLLOWING,
    },
]

const Followers = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [tab, selectTab] = useState(TabVariants.FOLLOWERS)

    const handleTab = (_: React.ChangeEvent<unknown>, newValue: number) => {
        selectTab(newValue)
    }
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>
                    <Tabs
                        value={tab}
                        onChange={handleTab}
                        TabIndicatorProps={{
                            style: {
                                display: 'none',
                            },
                        }}
                    >
                        {tabs.map(({ label, value }) => (
                            <Tab
                                key={`${label}_${Math.random()}`}
                                // classes={{
                                //     root: classes.styledTab,
                                //     selected: classes.selectedTab,
                                // }}
                                disableRipple
                                selected={tab === value}
                                value={value}
                                label={t(label)}
                            />
                        ))}
                    </Tabs>
                </div>
                <button className={classes.closeBtn}>x</button>
            </div>
            <div>
                <Divider />
                <div>
                    <FollowersUser />
                    <FollowersGallery />
                </div>
                <Divider />
            </div>
        </div>
    )
}

export default Followers
