import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    Switch,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Controller, useForm } from 'react-hook-form'
import { LogoIcon, PlusCircle } from 'shared/icons'

import useStyles from './CreateForm.style'

type PropertyType = {
    name: string
    value: string
}

type PreviewType = {
    [key: string]: string | undefined
    coverSrc?: string | undefined
    type: string | undefined
}

interface ICollectibleForm {
    file: string
    cover: string
    onSale: boolean
    price: boolean
    unlock: boolean
    collection: string
    name: string
    description: string
    royalties: string
    properties: Array<PropertyType>
}

const VAlID_COVER_TYPES = 'image/png,image/jpeg,image/gif,image/webp'
const VALID_FILE_TYPES = 'video/mp4,video/webm,audio/mp3,audio/webm,audio/mpeg,'.concat(
    VAlID_COVER_TYPES
)

const CreateForm = (): JSX.Element => {
    const classes = useStyles()
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
    } = useForm<ICollectibleForm>({
        defaultValues: {
            onSale: true,
        },
    })

    useEffect(() => {
        setValue('onSale', true)
    }, [])

    const [preview, setPreview] = useState<PreviewType>({
        fileSrc: undefined,
        coverSrc: undefined,
        type: undefined,
    })

    const onSubmit = (data: ICollectibleForm) => {
        console.log(data)
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        path: string
    ) => {
        const fileList = e.target.files

        if (!fileList) return

        const file = fileList[0]

        const src = URL.createObjectURL(file)
        const type = file.type.split('/')[0]
        setPreview({
            ...preview,
            [path]: src,
            type: path === 'coverSrc' ? preview.type : type,
        })
    }

    const clearFile = () => {
        setPreview({
            fileSrc: undefined,
            coverSrc: undefined,
            type: undefined,
        })
    }

    const clearCover = () => {
        setPreview({ ...preview, coverSrc: undefined })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.settings}>
                <div className={classes.upload}>
                    <div className={classes.subtitle}>Upload file</div>
                    <div className={classes.uploadWrapper}>
                        <input
                            accept={VALID_FILE_TYPES}
                            className={classes.input}
                            onChange={(e) => handleFileChange(e, 'fileSrc')}
                            ref={register}
                            name="file"
                            id="uploadFile"
                            type="file"
                            hidden
                        />
                        {!preview.fileSrc ? (
                            <div>
                                <div>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</div>
                                <label htmlFor="uploadFile">
                                    <Button
                                        component="span"
                                        className={classes.chooseBtn}
                                    >
                                        Choose File
                                    </Button>
                                </label>
                            </div>
                        ) : (
                            <div className={classes.uploadPreview}>
                                {preview.type === 'image' && (
                                    <img src={preview.fileSrc} />
                                )}
                                {preview.type === 'audio' && (
                                    <audio src={preview.fileSrc} controls />
                                )}
                                {preview.type === 'video' && (
                                    <video src={preview.fileSrc} controls />
                                )}
                            </div>
                        )}
                        {preview.fileSrc && (
                            <IconButton
                                className={classes.closeBtn}
                                onClick={clearFile}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </div>
                </div>
                {(preview.type === 'video' || preview.type === 'audio') && (
                    <div className={classes.upload}>
                        <div className={classes.subtitle}>Upload cover</div>
                        <div className={classes.uploadWrapper}>
                            <input
                                accept={VAlID_COVER_TYPES}
                                className={classes.input}
                                onChange={(e) =>
                                    handleFileChange(e, 'coverSrc')
                                }
                                ref={register}
                                name="cover"
                                id="uploadCover"
                                type="file"
                                hidden
                            />
                            {!preview.coverSrc ? (
                                <div>
                                    <div>JPG, PNG, GIF or WEBP. Max 30mb.</div>
                                    <label htmlFor="uploadCover">
                                        <Button
                                            component="span"
                                            className={classes.chooseBtn}
                                        >
                                            Choose File
                                        </Button>
                                    </label>
                                </div>
                            ) : (
                                <div className={classes.uploadPreview}>
                                    <img src={preview.coverSrc} />
                                </div>
                            )}
                            {preview.coverSrc && (
                                <IconButton
                                    className={classes.closeBtn}
                                    onClick={clearCover}
                                >
                                    <Close />
                                </IconButton>
                            )}
                        </div>
                    </div>
                )}

                <FormControl className={classes.controls}>
                    <Controller
                        name="onSale"
                        control={control}
                        render={(props) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        inputRef={register}
                                        onChange={(e) =>
                                            props.onChange(e.target.checked)
                                        }
                                        checked={props.value}
                                    />
                                }
                                classes={{
                                    root: classes.switchLabel,
                                }}
                                labelPlacement="start"
                                label={
                                    <span>
                                        <span className={classes.onSale}>
                                            Put on sale
                                        </span>
                                        <span>
                                            You’ll receive bids on this item
                                        </span>
                                    </span>
                                }
                            />
                        )}
                    />

                    {watch('onSale') && (
                        <FormControlLabel
                            control={
                                <Switch inputRef={register} name="price" />
                            }
                            classes={{
                                root: classes.switchLabel,
                            }}
                            labelPlacement="start"
                            label={
                                <span>
                                    <span className={classes.price}>
                                        Instant sale price
                                    </span>
                                    <span>
                                        Enter the price for which the item will
                                        be instantly sold
                                    </span>
                                </span>
                            }
                        />
                    )}
                    <FormControlLabel
                        control={<Switch inputRef={register} name="unlock" />}
                        classes={{
                            root: classes.switchLabel,
                        }}
                        labelPlacement="start"
                        label={
                            <span>
                                <span className={classes.unlock}>
                                    Unlock once purchased
                                </span>
                                <span>
                                    Content will be unlocked after successful
                                    transaction
                                </span>
                            </span>
                        }
                    />
                </FormControl>
                <div className={classes.collectionType}>
                    <div className={classes.subtitle}>Choose collection</div>
                    <div className={classes.cards}>
                        <Controller
                            name="collection"
                            control={control}
                            as={
                                <Button
                                    onClick={() =>
                                        setValue('collection', 'new')
                                    }
                                    className={clsx(classes.card, {
                                        [classes.cardActive]:
                                            watch('collection') === 'new',
                                    })}
                                >
                                    <PlusCircle />
                                    <span className={classes.cardName}>
                                        Create
                                    </span>
                                    <span className={classes.cardDscr}>
                                        ERC-721
                                    </span>
                                </Button>
                            }
                        />
                        <Controller
                            name="collection"
                            control={control}
                            as={
                                <Button
                                    onClick={() =>
                                        setValue('collection', 'sart')
                                    }
                                    className={clsx(classes.card, {
                                        [classes.cardActive]:
                                            watch('collection') === 'sart',
                                    })}
                                >
                                    <LogoIcon />
                                    <span className={classes.cardName}>
                                        Satoshi.ART
                                    </span>
                                    <span className={classes.cardDscr}>
                                        SART
                                    </span>
                                </Button>
                            }
                        />
                    </div>
                </div>
                <div className={classes.propertiesWrapper}>
                    <div className={classes.input}>
                        <div className={classes.label}>Name</div>
                        <Input
                            placeholder="e. g. “Redeemable T-Shirt with logo”"
                            name="name"
                            inputRef={register}
                            inputProps={{ 'aria-label': 'description' }}
                            required
                            disableUnderline
                        />
                    </div>
                    <div className={classes.input}>
                        <div className={classes.label}>Description</div>
                        <Input
                            placeholder="e. g. “After purchasing you’ll be able to get the real Tee”"
                            inputRef={register}
                            name="description"
                            inputProps={{ 'aria-label': 'description' }}
                            disableUnderline
                        />
                        <span>With preserved line-breaks</span>
                    </div>
                    <div className={classes.input}>
                        <div className={classes.label}>Royalties</div>
                        <Input
                            defaultValue="10"
                            inputProps={{ 'aria-label': 'description' }}
                            inputRef={register}
                            disableUnderline
                            required
                            name="royalties"
                            endAdornment={<span>%</span>}
                        />
                        <span>Suggested: 10%, 20%, 30%</span>
                    </div>
                    <div className={classes.input}>
                        <div className={classes.label}>
                            Properties<span>(Optional)</span>
                        </div>
                        <div className={classes.sizes}>
                            <Input
                                placeholder="e. g. Size"
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                                disableUnderline
                            />
                            <Input
                                placeholder="e. g. M"
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                                disableUnderline
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button type="submit">Create item</Button>
                    <div>Unsaved changes</div>
                </div>
            </div>
        </form>
    )
}

export default CreateForm
