import React, { useState } from 'react'
import {
    TextField,
    Divider,
    Chip,
    Select,
    MenuItem,
    Popper,
    PopperProps,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useTranslation } from 'react-i18next'

import useStyles from './SearchHeader.style'

import { SearchIcon4 } from 'shared/icons'

type TagType = {
    id: number
    title: string
}
const artists = [
    { title: 'rihanna' },
    { title: 'lady gaga' },
    { title: 'miley cyrus' },
    { title: 'billie elish' },
    { title: 'rihanna' },
]

const tags: TagType[] = [
    { id: 1, title: 'Beyoncé' },
    { id: 2, title: 'Music' },
    { id: 3, title: 'Rihanna' },
    { id: 4, title: 'Lady Gaga' },
    { id: 5, title: 'Pop' },
    { id: 6, title: 'Magazine' },
    { id: 7, title: 'R & B' },
    { id: 8, title: 'Celebrity' },
    { id: 9, title: 'Digital art' },
    { id: 10, title: 'Hip hop' },
    { id: 11, title: 'Black power' },
]

const PopperMy = function (props: PopperProps) {
    return (
        <Popper
            {...props}
            style={{ width: '672px' }}
            placement="bottom-start"
        />
    )
}

{
    /*@TODO: Move tags and select into a separate components */
}

const SearchHeader = (): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [selectedTags, setSelectedTags] = useState([tags[0]])

    const addTag = (tag: TagType) => {
        setSelectedTags((state) => [...state, tag])
    }

    const removeTag = (tag: TagType) => {
        setSelectedTags((state) => state.filter((item) => item.id !== tag.id))
    }

    const clearAll = () => {
        setSelectedTags([])
    }

    return (
        <div>
            <Divider
                classes={{
                    root: classes.divider,
                }}
            />
            {/*@TODO: the same input will be on the home page, use a shared*/}
            <div className={classes.searchWrapper}>
                <Autocomplete
                    freeSolo
                    classes={{
                        root: classes.autocomplete,
                        popper: classes.dropdown,
                    }}
                    PopperComponent={PopperMy}
                    disableClearable
                    options={artists.map((option) => option.title)}
                    renderOption={(value) => {
                        console.log({ value })
                        return (
                            <>
                                <SearchIcon4 />
                                {value}
                            </>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                                type: 'search',
                                placeholder: 'beyoncé live',
                                classes: {
                                    root: classes.searchInput,
                                },
                            }}
                        />
                    )}
                />
                <div className={classes.searchIcon}>
                    <SearchIcon4 />
                </div>
            </div>
            <div className={classes.filters}>
                <div className={classes.selectedTagsList}>
                    <div className={classes.resultsCount}>
                        {t('resultsCnt', { cnt: '7.943' })}
                    </div>
                    <div className={classes.tags}>
                        {selectedTags.map((tag, index) => (
                            <div className={classes.chosenTag} key={tag.id}>
                                {index > 0 && (
                                    <Divider orientation="vertical" />
                                )}
                                <span>{tag.title}</span>
                                <button
                                    onClick={() => removeTag(tag)}
                                    className={classes.crossBtn}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    {selectedTags.length >= 1 && (
                        <button onClick={clearAll} className={classes.clearBtn}>
                            {t('clearAll')}
                        </button>
                    )}
                </div>
                <div>
                    {/*@TODO: use const menuProps*/}
                    <Select
                        label="All items"
                        defaultValue="default"
                        classes={{
                            root: classes.select,
                        }}
                        MenuProps={{
                            classes: {
                                paper: classes.paper,
                                list: classes.list,
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            getContentAnchorEl: null,
                        }}
                        disableUnderline
                    >
                        <MenuItem value="default">{t('allItems')}</MenuItem>
                        <MenuItem value="Option1">Option1</MenuItem>
                        <MenuItem value="Option2">Option2</MenuItem>
                        <MenuItem value="Option3">Option3</MenuItem>
                    </Select>
                    <Select
                        label="Sort By"
                        defaultValue="default"
                        classes={{
                            root: classes.select,
                        }}
                        MenuProps={{
                            classes: {
                                paper: classes.paper,
                                list: classes.list,
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            getContentAnchorEl: null,
                        }}
                        disableUnderline
                    >
                        <MenuItem value="default">{t('sortBy')}</MenuItem>
                        <MenuItem value="Option1">Option1</MenuItem>
                        <MenuItem value="Option2">Option2</MenuItem>
                        <MenuItem value="Option3">Option3</MenuItem>
                    </Select>
                </div>
            </div>
            <Divider
                classes={{
                    root: classes.divider,
                }}
            />
            <div className={classes.suggestedTags}>
                {tags.map((tag) => (
                    <Chip
                        key={tag.id}
                        onClick={() => addTag(tag)}
                        classes={{
                            root: classes.tag,
                        }}
                        size="medium"
                        label={tag.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchHeader
