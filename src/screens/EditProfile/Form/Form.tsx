import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from 'shared/Form/Input'
import Upload from 'shared/Form/Upload'

import { VAlID_IMAGES_TYPES } from 'constants/supportedFileTypes'

import { VALID_TYPES, schema, EditProfileForm } from './Form.helpers'
import useStyles from './Form.style'

const Form = (): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()
    const { register } = useForm<EditProfileForm>({
        resolver: yupResolver(schema),
    })

    return (
        <form className={classes.form}>
            <div className={classes.bio}>
                <div className={classes.subtitle}>Upload Cover image</div>
                <div className={classes.input}>
                    <Upload
                        className={classes.upload}
                        accept={VALID_TYPES}
                        id="cover"
                        register={register}
                        label={t('chooseFile')}
                    />
                    <span className={classes.tooltip}>
                        JPG, PNG or WEBP. Max 10mb.
                    </span>
                </div>
                <div className={classes.input}>
                    <Input
                        id="displayName"
                        register={register}
                        placeholder="Enter your display name"
                        label={'Display name'}
                    />
                </div>
                <div className={classes.input}>
                    <Input
                        id="customUrl"
                        register={register}
                        placeholder="Custom URL"
                        label={'Custom URL'}
                        startAdornment={<b>Satoshi.art/</b>}
                    />
                </div>
                <div className={classes.input}>
                    <Input
                        id="twitterUsername"
                        register={register}
                        placeholder="@"
                        label={'Twitter Username'}
                        endAdornment={
                            <Button className={classes.linkBtn}>Link</Button>
                        }
                    />
                </div>
                <div className={classes.input}>
                    <Input
                        id="personalSite"
                        register={register}
                        placeholder="Enter your custom URL"
                        label={'Personal site or portfolio'}
                        startAdornment={<b>Satoshi.art/</b>}
                    />
                </div>
                <div className={classes.input}>
                    <Input
                        id="email"
                        register={register}
                        placeholder="Your email for marketplace notifications"
                        label={'Email'}
                    />
                    <span className={classes.tooltip}>
                        You must sign message to view or manage your email.{' '}
                        <a href="#">Sign message</a>
                    </span>
                </div>
                <div className={classes.verification}>
                    <div className={classes.subtitle}>Verification</div>
                    <div className={classes.verificationContent}>
                        <p>
                            Proceed with verification proccess to get more
                            visibility and gain trust on Rarible Marketplace.
                            Please allow up to several weeks for the proccess
                        </p>
                        <Button className={classes.btn}>Get verifed</Button>
                    </div>
                </div>
                <Button className={classes.submit}>Update profile</Button>
            </div>
            <div className={classes.avatarUpdate}>
                <div className={classes.subtitle}>Profile Picture</div>
                <div className={classes.avatar}>
                    <Upload
                        accept={VAlID_IMAGES_TYPES}
                        id="avatar"
                        register={register}
                    />
                </div>
                <span className={classes.tooltip}>
                    We recommend an image of at least 400x400px. Gifs work too.
                </span>
                <label htmlFor="avatar">
                    <Button className={classes.btn}>{t('chooseFile')}</Button>
                </label>
            </div>
        </form>
    )
}

export default Form
