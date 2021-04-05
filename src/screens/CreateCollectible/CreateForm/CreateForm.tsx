import React, { useState } from 'react'
import clsx from 'clsx'
import {
    Button,
    // FormControl,
    // FormControlLabel,
    // Switch,
    IconButton,
    Input,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
    useTranslation,
    // Trans
} from 'react-i18next'
import {
    // Controller,
    useForm,
} from 'react-hook-form'
// import { LogoIcon, PlusCircle } from 'shared/icons'
import Preview from '../Preview'
import ProgressModal from '../ProgressModal'

import useStyles from './CreateForm.style'

type PropertyType = {
    name: string
    value: string
}

type PreviewType = {
    fileSrc: string
    coverSrc?: string
    type: string
}

interface ICollectibleForm {
    file: string
    cover: string
    onSale: boolean
    instantPrice: boolean
    price?: number
    unlock: boolean
    unlockContent?: string
    copiesCount?: number
    collection: string
    name: string
    description: string
    royalties: number
    properties: Array<PropertyType>
}

const VAlID_COVER_TYPES = 'image/png,image/jpeg,image/gif,image/webp'
const VALID_FILE_TYPES = 'video/mp4,video/webm,audio/mp3,audio/webm,audio/mpeg,'.concat(
    VAlID_COVER_TYPES
)

{
    /* TODO: Refactoring:
        - Move upload input into separate component e.g Uploder
        - Move switch buttons into separate component e.g Settings
        - Implement validation/onSubmit when integrating with the backend
        - add comments to help other devs
    */
}

const CreateForm = ({ isSingle }: { isSingle: boolean }): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [isSubmitModal, setIsSubmitModal] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        // setValue,
        // control,
        watch,
    } = useForm<ICollectibleForm>({
        defaultValues: {
            onSale: true,
            collection: 'sart',
        },
    })

    const [preview, setPreview] = useState<PreviewType>({
        fileSrc: '',
        coverSrc: '',
        type: '',
    })

    const onSubmit = () => {
        {
            /* todo: will be changed after implement functionality */
        }

        setIsSubmitModal(true)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files

        if (!fileList) return

        const file = fileList[0]

        const src = URL.createObjectURL(file)
        const type = file.type.split('/')[0]
        console.log(e.target.name)
        setPreview({
            ...preview,
            [e.target.name]: src,
            type: e.target.name === 'coverSrc' ? preview.type : type,
        })
    }

    const clearFile = () => {
        setPreview({
            fileSrc: '',
            coverSrc: '',
            type: '',
        })
    }

    const clearCover = () => {
        setPreview({ ...preview, coverSrc: '' })
    }

    const previewFields = watch([
        'name',
        'copiesCount',
        'unlockContent',
        'price',
    ])

    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.settings}>
                    <div className={classes.upload}>
                        <div className={classes.subtitle}>
                            {t('uploadFile')}
                        </div>
                        <div className={classes.uploadWrapper}>
                            <input
                                accept={VALID_FILE_TYPES}
                                className={classes.input}
                                onChange={handleFileChange}
                                ref={register}
                                name="fileSrc"
                                id="uploadFile"
                                type="file"
                                hidden
                            />
                            {!preview.fileSrc ? (
                                <div>
                                    <div>
                                        PNG, GIF, WEBP, MP4 or MP3. Max 30mb.
                                    </div>
                                    <label htmlFor="uploadFile">
                                        <Button
                                            component="span"
                                            className={classes.chooseBtn}
                                        >
                                            {t('chooseFile')}
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
                            <div className={classes.subtitle}>
                                {t('uploadCover')}
                            </div>
                            <div className={classes.uploadWrapper}>
                                <input
                                    accept={VAlID_COVER_TYPES}
                                    className={classes.input}
                                    onChange={handleFileChange}
                                    ref={register}
                                    name="coverSrc"
                                    id="uploadCover"
                                    type="file"
                                    hidden
                                />
                                {!preview.coverSrc ? (
                                    <div>
                                        <div>
                                            JPG, PNG, GIF or WEBP. Max 30mb.
                                        </div>
                                        <label htmlFor="uploadCover">
                                            <Button
                                                component="span"
                                                className={classes.chooseBtn}
                                            >
                                                {t('chooseFile')}
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

                    {/*<FormControl className={classes.controls}>*/}
                    {/*    <Controller*/}
                    {/*        name="onSale"*/}
                    {/*        control={control}*/}
                    {/*        render={(props) => (*/}
                    {/*            <FormControlLabel*/}
                    {/*                control={*/}
                    {/*                    <Switch*/}
                    {/*                        inputRef={register}*/}
                    {/*                        onChange={(e) =>*/}
                    {/*                            props.onChange(e.target.checked)*/}
                    {/*                        }*/}
                    {/*                        checked={props.value}*/}
                    {/*                    />*/}
                    {/*                }*/}
                    {/*                classes={{*/}
                    {/*                    root: classes.switchLabel,*/}
                    {/*                }}*/}
                    {/*                labelPlacement="start"*/}
                    {/*                label={*/}
                    {/*                    <span>*/}
                    {/*                        <span className={classes.onSale}>*/}
                    {/*                            {t('putOnSale')}*/}
                    {/*                        </span>*/}
                    {/*                        <span>*/}
                    {/*                            {t('youWillReceiveBids')}*/}
                    {/*                        </span>*/}
                    {/*                    </span>*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}

                    {/*    {watch('onSale') && (*/}
                    {/*        <div>*/}
                    {/*            <FormControlLabel*/}
                    {/*                control={*/}
                    {/*                    <Switch*/}
                    {/*                        inputRef={register}*/}
                    {/*                        name="instantPrice"*/}
                    {/*                    />*/}
                    {/*                }*/}
                    {/*                classes={{*/}
                    {/*                    root: classes.switchLabel,*/}
                    {/*                }}*/}
                    {/*                labelPlacement="start"*/}
                    {/*                label={*/}
                    {/*                    <span>*/}
                    {/*                        <span className={classes.price}>*/}
                    {/*                            {t('instantSalePrice')}*/}
                    {/*                        </span>*/}
                    {/*                        <span>*/}
                    {/*                            {t(*/}
                    {/*                                'enterThePriceForInstantlySold'*/}
                    {/*                            )}*/}
                    {/*                        </span>*/}
                    {/*                    </span>*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            {watch('instantPrice') && (*/}
                    {/*                <div className={classes.input}>*/}
                    {/*                    <Input*/}
                    {/*                        placeholder="Enter price for one piece"*/}
                    {/*                        inputRef={register}*/}
                    {/*                        name="price"*/}
                    {/*                        disableUnderline*/}
                    {/*                    />*/}
                    {/*                    <span>*/}
                    {/*                        {' '}*/}
                    {/*                        {t('serviceFeeProgress', {*/}
                    {/*                            fee: '2.5',*/}
                    {/*                        })}*/}
                    {/*                    </span>*/}
                    {/*                    <span>*/}
                    {/*                        {t('youWillReceiveCnt', {*/}
                    {/*                            count: 0,*/}
                    {/*                            currency: 'ETH',*/}
                    {/*                            amount: '0,00',*/}
                    {/*                        })}*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    <div>*/}
                    {/*        <FormControlLabel*/}
                    {/*            control={*/}
                    {/*                <Switch inputRef={register} name="unlock" />*/}
                    {/*            }*/}
                    {/*            classes={{*/}
                    {/*                root: classes.switchLabel,*/}
                    {/*            }}*/}
                    {/*            labelPlacement="start"*/}
                    {/*            label={*/}
                    {/*                <span>*/}
                    {/*                    <span className={classes.unlock}>*/}
                    {/*                        {t('unlockOncePurchased')}*/}
                    {/*                    </span>*/}
                    {/*                    <span>*/}
                    {/*                        {t('unlockOncePurchasedContent')}*/}
                    {/*                    </span>*/}
                    {/*                </span>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        {watch('unlock') && (*/}
                    {/*            <div className={classes.input}>*/}
                    {/*                <Input*/}
                    {/*                    placeholder="Digital key, code to redeem or link to a file..."*/}
                    {/*                    inputRef={register}*/}
                    {/*                    name="unlockContent"*/}
                    {/*                    disableUnderline*/}
                    {/*                />*/}
                    {/*                <span>*/}
                    {/*                    markDownIsSupported*/}
                    {/*                    {t('markdownIsSupported')}*/}
                    {/*                </span>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</FormControl>*/}
                    {/*<div className={classes.collectionType}>*/}
                    {/*    <div className={classes.subtitle}>*/}
                    {/*        {t('chooseCollection')}*/}
                    {/*        Choose collection*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.cards}>*/}
                    {/*        <Controller*/}
                    {/*            name="collection"*/}
                    {/*            control={control}*/}
                    {/*            as={*/}
                    {/*                <Button*/}
                    {/*                    onClick={() =>*/}
                    {/*                        setValue('collection', 'new')*/}
                    {/*                    }*/}
                    {/*                    className={clsx(classes.card, {*/}
                    {/*                        [classes.cardActive]:*/}
                    {/*                            watch('collection') === 'new',*/}
                    {/*                    })}*/}
                    {/*                >*/}
                    {/*                    <PlusCircle />*/}
                    {/*                    <span className={classes.cardName}>*/}
                    {/*                        {t('create')}*/}
                    {/*                    </span>*/}
                    {/*                    <span className={classes.cardDscr}>*/}
                    {/*                        ERC-721*/}
                    {/*                    </span>*/}
                    {/*                </Button>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        <Controller*/}
                    {/*            name="collection"*/}
                    {/*            control={control}*/}
                    {/*            as={*/}
                    {/*                <Button*/}
                    {/*                    onClick={() =>*/}
                    {/*                        setValue('collection', 'sart')*/}
                    {/*                    }*/}
                    {/*                    className={clsx(classes.card, {*/}
                    {/*                        [classes.cardActive]:*/}
                    {/*                            watch('collection') === 'sart',*/}
                    {/*                    })}*/}
                    {/*                >*/}
                    {/*                    <LogoIcon />*/}
                    {/*                    <span className={classes.cardName}>*/}
                    {/*                        Satoshi.ART*/}
                    {/*                    </span>*/}
                    {/*                    <span className={classes.cardDscr}>*/}
                    {/*                        SART*/}
                    {/*                    </span>*/}
                    {/*                </Button>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={classes.propertiesWrapper}>
                        <div className={classes.input}>
                            <label htmlFor="name" className={classes.label}>
                                {t('name')}
                            </label>
                            <Input
                                id="name"
                                placeholder="e. g. “Redeemable T-Shirt with logo”"
                                name="name"
                                inputRef={register}
                                required
                                disableUnderline
                            />
                        </div>
                        <div className={classes.input}>
                            <label
                                htmlFor="description"
                                className={classes.label}
                            >
                                {t('description')}
                            </label>
                            <Input
                                id="description"
                                placeholder="e. g. “After purchasing you’ll be able to get the real Tee”"
                                inputRef={register}
                                name="description"
                                disableUnderline
                            />
                            <span>With preserved line-breaks</span>
                        </div>
                        <div className={clsx({ [classes.sizes]: !isSingle })}>
                            <div className={classes.input}>
                                <label
                                    htmlFor="royalties"
                                    className={classes.label}
                                >
                                    {t('royalties')}
                                </label>
                                <Input
                                    id="royalties"
                                    defaultValue="10"
                                    inputRef={register}
                                    disableUnderline
                                    required
                                    name="royalties"
                                    endAdornment={<span>%</span>}
                                />
                                <span>
                                    {t('suggestedPercentages', {
                                        value1: 10,
                                        value2: 20,
                                        value3: 30,
                                    })}
                                </span>
                            </div>
                            {!isSingle && (
                                <div className={classes.input}>
                                    <label
                                        htmlFor="copiesCount"
                                        className={classes.label}
                                    >
                                        {t('numberOfCopies')}
                                    </label>
                                    <Input
                                        id="copiesCount"
                                        placeholder="e. g. 10"
                                        inputRef={register}
                                        disableUnderline
                                        required
                                        name="copiesCount"
                                        endAdornment={<span>%</span>}
                                    />
                                    <span> {t('numberOfCopies')}</span>
                                </div>
                            )}
                        </div>
                        {/*<div className={classes.input}>*/}
                        {/*    <label htmlFor="size" className={classes.label}>*/}
                        {/*        <Trans*/}
                        {/*            i18nKey="propertiesOptional"*/}
                        {/*            components={{ 1: <span /> }}*/}
                        {/*        />*/}
                        {/*    </label>*/}
                        {/*    <div className={classes.sizes}>*/}
                        {/*        <Input*/}
                        {/*            id="size"*/}
                        {/*            placeholder="e. g. Size"*/}
                        {/*            disableUnderline*/}
                        {/*        />*/}
                        {/*        <Input placeholder="e. g. M" disableUnderline />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className={classes.footer}>
                        <Button type="submit">{t('createItem')}</Button>
                        {/*<div>{t('unsavedChanges')}</div>*/}
                    </div>
                </div>
            </form>
            <Preview
                fileSrc={
                    preview.type === 'image'
                        ? preview.fileSrc
                        : preview.coverSrc
                }
                fields={previewFields}
                isSingle={isSingle}
            />
            <ProgressModal
                open={isSubmitModal}
                onClose={() => setIsSubmitModal(!isSubmitModal)}
            />
        </div>
    )
}

export default CreateForm
