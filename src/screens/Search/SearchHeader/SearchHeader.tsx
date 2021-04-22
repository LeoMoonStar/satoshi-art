import React, { useState } from 'react'
import { Divider, Chip, MenuItem } from '@material-ui/core'
import { Close as CloseIcon, ExpandMore } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Select from 'shared/Select'
import useStyles from './SearchHeader.style'
import { SelectProps } from '@material-ui/core/Select'

type TagType = {
    id: number
    title: string
}

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
    { id: 12, title: 'Lady Gaga' },
    { id: 13, title: 'Pop' },
    { id: 14, title: 'Magazine' },
    { id: 15, title: 'R & B' },
    { id: 16, title: 'Celebrity' },
]

{
    /*@TODO: Move tags and select into a separate components */
}

const sliderConfig = {
    dots: false,
    infinite: true,
    speed: 250,
    slidesToShow: 12,
    variableWidth: true,
    arrows: true,
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
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className={classes.crossBtn}
                                >
                                    <CloseIcon />
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
                    <Select
                        className={classes.select}
                        label={t('All items ')}
                        defaultValue={t('All items ') as string}
                        renderValue={(value: SelectProps['value']) => (
                            <>
                                {value}
                                <ExpandMore />
                            </>
                        )}
                    >
                        <MenuItem value="default">{t('All items ')}</MenuItem>
                        <MenuItem value="Option1">Option1</MenuItem>
                        <MenuItem value="Option2">Option2</MenuItem>
                        <MenuItem value="Option3">Option3</MenuItem>
                    </Select>
                    <Select
                        className={classes.select}
                        label={t('sortBy')}
                        defaultValue={t('sortBy') as string}
                        renderValue={(value: SelectProps['value']) => (
                            <>
                                {value}
                                <ExpandMore />
                            </>
                        )}
                    >
                        <MenuItem value="default">{t('sortBy')}</MenuItem>
                        <MenuItem value="Option1">Newest</MenuItem>
                        <MenuItem value="Option2">Oldest</MenuItem>
                        <MenuItem value="Option3">Expensive</MenuItem>
                    </Select>
                </div>
            </div>
            <Divider
                classes={{
                    root: classes.divider,
                }}
            />
            <div className={classes.suggestedTags}>
                <Slider className={classes.tagsSlider} {...sliderConfig}>
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
                </Slider>
            </div>
        </div>
    )
}

export default SearchHeader
