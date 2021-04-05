import React from 'react'
// import {
//     FormControl,
//     FormHelperText,
//     Input,
//     Select,
//     MenuItem,
//     TextField,
//     IconButton,
// } from '@material-ui/core'
// import { Close } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// import ReCAPTCHA from 'react-google-recaptcha'

import nftImage from 'shared/images/supportForm/nft.png'
import Layout from 'shared/Layout'
// import Button from 'shared/Button'
import { LeftArrowIcon } from 'shared/icons'

import useStyles from './SupportForm.style'

// const ISSUES_THEMES = [
//     'brokenImageOrVideo',
//     'itemNotDisplayed',
//     'other',
//     'questionOrComment',
//     'securityVulnerability',
//     'verificationIssueOrQuestion',
// ]

export default function SupportForm(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    // const [files, setFiles] = useState<File[]>([])

    // const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newFiles: File[] = Array.from(e.target.files as FileList)
    //
    //     setFiles((prevFiles) => [...newFiles, ...prevFiles])
    // }

    return (
        <Layout>
            <section className={classes.container}>
                <div className={classes.leftCol}>
                    <Link className={classes.goBack} to="/">
                        <LeftArrowIcon /> {t('backToHomePage')}
                    </Link>
                    <div className={classes.supportText}>
                        In case of any questions or issues with the app, please
                        contact us at{' '}
                        <a href="mailto:support@satoshi.art">
                            support@satoshi.art
                        </a>
                        .
                    </div>
                    {/*<h2 className={classes.mainTitle}>{t('submitARequest')}</h2>*/}
                    {/*<form className={classes.form}>*/}
                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="email">*/}
                    {/*            {t('yourEmailAddress')}*/}
                    {/*        </label>*/}
                    {/*        <Input id="email" name="email" />*/}
                    {/*        <small className={classes.inputError}>*/}
                    {/*            {t('fieldIsRequired')}*/}
                    {/*        </small>*/}
                    {/*    </FormControl>*/}

                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="issue">*/}
                    {/*            {t('whatDoYouNeedToHelpWith')}*/}
                    {/*        </label>*/}
                    {/*        <Select id="issue" name="issue">*/}
                    {/*            {ISSUES_THEMES.map(*/}
                    {/*                (issue: string, index: number) => (*/}
                    {/*                    <MenuItem value={index} key={index}>*/}
                    {/*                        {t(issue)}*/}
                    {/*                    </MenuItem>*/}
                    {/*                )*/}
                    {/*            )}*/}
                    {/*        </Select>*/}
                    {/*        <FormHelperText>*/}
                    {/*            Please select your issue above*/}
                    {/*        </FormHelperText>*/}
                    {/*    </FormControl>*/}

                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="issueSubject">Issue Subject</label>*/}
                    {/*        <Input id="issueSubject" name="issueSubject" />*/}
                    {/*        <FormHelperText>*/}
                    {/*            {t('pleaseProvideAOneLineDescriptionIssue')}*/}
                    {/*        </FormHelperText>*/}
                    {/*    </FormControl>*/}

                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="yourAddress">*/}
                    {/*            {t('yourAddress')}*/}
                    {/*        </label>*/}
                    {/*        <Input id="yourAddress" name="yourAddress" />*/}
                    {/*    </FormControl>*/}

                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="describe">*/}
                    {/*            {t('pleaseDescribeTheProblemInAsMuchDetailAs')}*/}
                    {/*        </label>*/}
                    {/*        <TextField*/}
                    {/*            multiline*/}
                    {/*            id="describe"*/}
                    {/*            name="describe"*/}
                    {/*            className={classes.textField}*/}
                    {/*        />*/}
                    {/*    </FormControl>*/}
                    {/*    <FormControl className={classes.fieldGroup}>*/}
                    {/*        <label htmlFor="files">*/}
                    {/*            {t('attachmentsOptional')}*/}
                    {/*        </label>*/}
                    {/*        <label*/}
                    {/*            htmlFor="files"*/}
                    {/*            className={classes.filesLabel}*/}
                    {/*        >*/}
                    {/*            <span>{t('addOrDropFilesHere')}</span>*/}
                    {/*            <input*/}
                    {/*                multiple*/}
                    {/*                id="files"*/}
                    {/*                name="files"*/}
                    {/*                type="file"*/}
                    {/*                onChange={handleFilesChange}*/}
                    {/*            />*/}
                    {/*        </label>*/}
                    {/*        {files.map((file: any, index: number) => (*/}
                    {/*            <div key={index} className={classes.fileItem}>*/}
                    {/*                {file.name}*/}
                    {/*                <IconButton>*/}
                    {/*                    <Close />*/}
                    {/*                </IconButton>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </FormControl>*/}
                    {/*    <Button variantCustom="action" type="submit">*/}
                    {/*        {t('submit')}*/}
                    {/*    </Button>*/}
                    {/*    <div className={classes.recaptchaWrapper}>*/}
                    {/*        <ReCAPTCHA sitekey="SomeKey" />*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </div>
                <div className={classes.rightCol}>
                    <img src={nftImage} className={classes.nftLabel} alt="" />
                </div>
            </section>
        </Layout>
    )
}
