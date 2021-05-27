import React, { useState } from 'react';
import { FormControl, FormHelperText, Input, Select, MenuItem, TextField, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import text from '../../constants/content';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import nftImage from 'components/images/supportForm/nft.png';
import Layout from 'components/layout';
import Button from 'components/button';
import { LeftArrowIcon } from 'components/icons';

import { VAlID_IMAGES_TYPES, VALID_FILE_TYPES } from 'constants/supportedFileTypes';
const FILE_SIZE = 31457280;
import useStyles from './Support.style';

const ISSUES_THEMES = [
  'brokenImageOrVideo',
  'itemNotDisplayed',
  'other',
  'questionOrComment',
  'securityVulnerability',
  'verificationIssueOrQuestion',
];

const schema = yup.object().shape({
  email: yup.string().required('Your e-mail is required'),
  issue: yup.string().required('Please select your issue'),
  issueSubject: yup.string().required('Please describe your issue in one-line description'),
  yourAddress: yup.string().required('Please provide your address'),
  describe: yup.string().required('Please further explain your issue'),
  files: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .test(
        'fileSize',
        'The files are too big. You need to upload a smaller ones',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
});

interface SupportForm {
  email?: string;
  issue?: string;
  issueSubject?: string;
  yourAddress?: string;
  describe?: string;
  files?: string;
}

export default function Support() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'djfkldsjflkdsjf',
      issue: 'djfldskjflsdjf',
      issueSubject: 'issue subject',
      yourAddress: 'your address',
      describe: 'dsjfkdsjf sljfl jfslajf sdlafj dsf',
    },
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(e.target.files as FileList);

    setFiles(prevFiles => [...newFiles, ...prevFiles]);
  };
  const submit = async (data: SupportForm) => {
    alert(JSON.stringify(data));
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.leftCol}>
          <Link className={classes.goBack} to='/'>
            <LeftArrowIcon /> {text['backToHomePage']}
          </Link>
          <div className={classes.supportText}>
            In case of any questions or issues with the app, please contact us at
            <a href='mailto:support@satoshi.art'>support@satoshi.art</a>.
          </div>
          <h2 className={classes.mainTitle}>{text['submitARequest']}</h2>
          <form className={classes.form} onSubmit={handleSubmit(submit)}>
            <FormControl className={classes.fieldGroup}>
              <label htmlFor='email'>{text['yourEmailAddress']}</label>
              <Input id='email' name='email' />
              <small className={classes.inputError}>{text['fieldIsRequired']}</small>
            </FormControl>

            <FormControl className={classes.fieldGroup}>
              <label htmlFor='issue'>{text['whatDoYouNeedToHelpWith']}</label>
              <Select id='issue' name='issue'>
                {ISSUES_THEMES.map((issue: string, index: number) => (
                  <MenuItem value={index} key={index}>
                    {text[issue]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select your issue above</FormHelperText>
            </FormControl>

            <FormControl className={classes.fieldGroup}>
              <label htmlFor='issueSubject'>Issue Subject</label>
              <Input id='issueSubject' name='issueSubject' />
              <FormHelperText>{text['pleaseProvideAOneLineDescriptionIssue']}</FormHelperText>
            </FormControl>

            <FormControl className={classes.fieldGroup}>
              <label htmlFor='yourAddress'>{text['yourAddress']}</label>
              <Input id='yourAddress' name='yourAddress' />
            </FormControl>

            <FormControl className={classes.fieldGroup}>
              <label htmlFor='describe'>{text['pleaseDescribeTheProblemInAsMuchDetailAs']}</label>
              <TextField multiline id='describe' name='describe' className={classes.textField} />
            </FormControl>
            <FormControl className={classes.fieldGroup}>
              <label htmlFor='files'>{text['attachmentsOptional']}</label>
              <label htmlFor='files' className={classes.filesLabel}>
                <span>{text['addOrDropFilesHere']}</span>
                <input multiple id='files' name='files' type='file' onChange={handleFilesChange} />
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
            <Button variantCustom='action' type='submit'>
              {text['submit']}
            </Button>
            <div className={classes.recaptchaWrapper}>
              <ReCAPTCHA sitekey='SomeKey' />
            </div>
          </form>
        </div>
        <div className={classes.rightCol}>
          <img src={nftImage} className={classes.nftLabel} alt='' />
        </div>
      </section>
    </Layout>
  );
}
