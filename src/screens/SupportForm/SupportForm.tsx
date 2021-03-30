import React, { useState } from 'react'
import {
    FormControl,
    FormHelperText,
    Input,
    Select,
    MenuItem,
    TextField,
    IconButton,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import nftImage from 'shared/images/supportForm/nft.png'
import Layout from 'shared/Layout'
import Button from 'shared/Button'
import { LeftArrowIcon } from 'shared/icons'

import useStyles from './SupportForm.style'

export default function SupportForm(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const { register, handleSubmit, watch, errors } = useForm()
    const [files, setFiles] = useState<any[]>([])

    const handleFilesChange = (e: any) => {
        setFiles((prevFiles) => [...Array.from(e.target.files), ...prevFiles])
    }

    return (
        <Layout>
            <section className={classes.container}>
                <div className={classes.leftCol}>
                    <Link className={classes.goBack} to="/">
                        <LeftArrowIcon /> Back to home pgae
                    </Link>
                    <h2 className={classes.mainTitle}>Submit a Request</h2>
                    <form action="" className={classes.form}>
                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="emailAddress">
                                Your Email Address
                            </label>
                            <Input
                                id="emailAddress"
                                name="emailAddress"
                                ref={register}
                            />
                        </FormControl>

                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="issue">
                                What do you need help with?
                            </label>
                            <Select id="issue" name="issue" ref={register}>
                                <MenuItem>Broken Image/Video</MenuItem>
                                <MenuItem>Item Not Displayed</MenuItem>
                                <MenuItem>Other</MenuItem>
                                <MenuItem>Question/Comment</MenuItem>
                                <MenuItem>Security Vulnerability</MenuItem>
                                <MenuItem>Verification Issue/Question</MenuItem>
                            </Select>
                            <FormHelperText>
                                Please select your issue above
                            </FormHelperText>
                        </FormControl>

                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="issueSubject">Issue Subject</label>
                            <Input
                                id="issueSubject"
                                name="issueSubject"
                                ref={register}
                            />
                            <FormHelperText>
                                Please provide a one-line description of the
                                issue you`re currently facing.
                            </FormHelperText>
                        </FormControl>

                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="yourAddress">Your Address</label>
                            <Input
                                id="yourAddress"
                                name="yourAddress"
                                ref={register}
                            />
                        </FormControl>

                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="describe">
                                Please describe the problem in as much detail as
                                possible.
                            </label>
                            <TextField
                                multiline
                                id="describe"
                                name="describe"
                                className={classes.textField}
                                ref={register}
                            />
                        </FormControl>
                        <FormControl className={classes.fieldGroup}>
                            <label htmlFor="files">
                                Attachments (optional)
                            </label>
                            <label
                                htmlFor="files"
                                className={classes.filesLabel}
                            >
                                <span>Add or drop files here</span>
                                <input
                                    multiple
                                    id="files"
                                    name="files"
                                    type="file"
                                    onChange={handleFilesChange}
                                />
                            </label>
                            {files.map((file: any, index: number) => (
                                <div key={index} className={classes.fileItem}>
                                    {file.name}
                                    <IconButton>
                                        <Close />
                                    </IconButton>
                                </div>
                            ))}
                        </FormControl>
                        <Button variantCustom="action">Submit</Button>
                        <div className={classes.recaptchaWrapper}>
                            <ReCAPTCHA sitekey="Your client site key" />
                        </div>
                    </form>
                </div>
                <div className={classes.rightCol}>
                    <img src={nftImage} className={classes.nftLabel} alt="" />
                </div>
            </section>
        </Layout>
    )
}
