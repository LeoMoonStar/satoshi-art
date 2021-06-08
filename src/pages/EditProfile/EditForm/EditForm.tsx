import React, { useState } from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';
import text from '../../../constants/content';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Modal from 'components/widgets/Modal';
import Popup from 'components/widgets/Popup';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfile, getUserInfo } from 'apis/users';

import { Input, Upload } from 'components/widgets/Form';

import { VAlID_IMAGES_TYPES, VALID_FILE_TYPES } from 'constants/supportedFileTypes';
import useStyles from './EditForm.style';

const VALID_TYPES = VAlID_IMAGES_TYPES.replace('/image/gif', '');

const FILE_SIZE = 31457280;

const schema = yup.object().shape({
  displayName: yup.string().required('You need to enter a display name'),
  customUrl: yup.string().required('You need a url for your artwork'),
  twitterUsername: yup.string().required('Enter your twitter url'),
  personalSite: yup.string().required("What's your personal site"),
  email: yup.string().required('You need to enter your email for marketplace notifications'),
  cover: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup.mixed()
      .required('A file is required')
      .test('fileRequired', 'Cover is required', value => value && value.hasOwnProperty(0))
      .test('fileSize','The file is too big. You need to upload a smaller one',value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE)
      .test('fileFormat','Unsupported Format',value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)),
  }),
  avatar: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup.mixed()
      .required('A file is required')
      .test('fileRequired', 'Avatar is required', value => value && value.hasOwnProperty(0))
      .test('fileSize','The file is too big. You need to upload a smaller one',value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE)
      .test('fileFormat','Unsupported Format',value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)),
  }),
});

type PreviewType = {
  cover: { name: string; type: string; base64: string };
  avatar: { name: string; type: string; base64: string };
};
interface EditProfileForm {
  displayName?: string;
  customUrl?: string;
  twitterUsername?: string;
  personalSite: string;
  email: string;
  cover: { name: string; type: string; base64: string; message: string };
  avatar: { name: string; type: string; base64: string; message: string };
}

const EditForm = (): JSX.Element => {
  const classes = useStyles();

  const { account } = useWeb3React<Web3Provider>();
  const { register, handleSubmit, formState: { errors }} = useForm<EditProfileForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: 'displayname',customUrl: 'url.com',
      twitterUsername: 'twitterusername',personalSite: 'person.com',
      email: 'email@gmail.com',
    },
  });
  const [preview, setPreview] = useState<PreviewType>({
    cover: { name: '', type: '', base64: '' },
    avatar: { name: '', type: '', base64: '' },
  });
  const [userAvatar, setUserAvatar] = useState('');
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    const file = fileList[0];
    const src = URL.createObjectURL(file);
    const type = file.type.split('/')[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview({
        // update profile or cover
        ...preview,
        [e.target.name]: {
          name: src,
          type: typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
          base64: typeof reader.result == 'string' ? reader.result : '',
        },
      });
    };
  };
  const [showPopup, setShowPopup] = useState(false)
  const [showFailedPopup, setShowFailedPopup] = useState(false)

  const submit = async (data: EditProfileForm) => {
    const { displayName, customUrl, twitterUsername, personalSite, email } = data;
    const { cover, avatar } = preview;
    const profile = {
      name: displayName,
      avatar: {
        fileName: 'image.' + avatar.type.replace('image/', ''),
        mediaType: avatar.type,
        content: avatar.base64,
      },
      cover: {
        fileName: 'image.' + cover.type.replace('image/', ''),
        mediaType: cover.type,
        content: cover.base64,
      },
      customUrl: customUrl,
      twitterUsername: twitterUsername,
      personalSite: personalSite,
      email: email,
    };

    updateProfile(profile).then(() => {
      setShowPopup(true)
    })
    .catch((error) => setShowFailedPopup(true));
  };
  const isErrors = () => Object.keys(errors).length >= 1;

  return (
    <form className={classes.form} onSubmit={handleSubmit(submit)}>
      <div className={classes.bio}>
        <div className={classes.subtitle}>Upload Cover image</div>
        <div className={classes.input}>
          <div className={cx(classes.wrapper, classes.upload)}>
            <input ref={register} accept={VALID_TYPES} onChange={handleFileChange} id='cover' name='cover' type='file' hidden/>
            {preview.cover.name && (
              <div className={classes.coverHolder}>
                <img src={preview.cover.name} />
              </div>
            )}
            <div className={classes.chooseFileHolder}>
              <label htmlFor='cover'>
                <Button className={classes.chooseFile} component='span'>
                  {text['chooseFile']}
                </Button>
              </label>
            </div>
          </div>

          <span className={classes.tooltip}>JPG, PNG or WEBP. Max 10mb.</span>

          {errors.cover && <p className={classes.textError}>{errors.cover.message}</p>}
        </div>
        <div className={classes.input}>
          <Input id='displayName' register={register} placeholder='Enter your display name' name='displayName' label={'Display name'}/>

          {errors.displayName && <p className={classes.textError}>{errors.displayName.message}</p>}
        </div>
        <div className={classes.input}>
          <Input id='customUrl' register={register} placeholder='Custom URL' label={'Custom URL'} name='customUrl' startAdornment={<b>Satoshi.art/</b>}/>

          {errors.customUrl && <p className={classes.textError}>{errors.customUrl.message}</p>}
        </div>
        <div className={classes.input}>
          <Input id='twitterUsername' register={register} placeholder='@' label={'Twitter Username'} name='twitterUsername' endAdornment={<Button className={classes.linkBtn}>Link</Button>}/>

          {errors.twitterUsername && <p className={classes.textError}>{errors.twitterUsername.message}</p>}
        </div>
        <div className={classes.input}>
          <Input id='personalSite' register={register} placeholder='Enter your custom URL' label={'Personal site or portfolio'} name='personalSite' startAdornment={<b>Satoshi.art/</b>}/>

          {errors.personalSite && <p className={classes.textError}>{errors.personalSite.message}</p>}
        </div>
        <div className={classes.input}>
          <Input id='email' register={register} placeholder='Your email for marketplace notifications' name='email' label={'Email'}/>
          <span className={classes.tooltip}>
            You must sign message to view or manage your email. <a href='#'>Sign message</a>
          </span>

          {errors.email && <p className={classes.textError}>{errors.email.message}</p>}
        </div>
        <div className={classes.verification}>
          <div className={classes.subtitle}>Verification</div>
          <div className={classes.verificationContent}>
            <p>Proceed with verification proccess to get more 
            visibility and gain trust on Rarible Marketplace. Please
            allow up to several weeks for the proccess</p>
            <Button className={classes.btn}>Get verifed</Button>
          </div>
        </div>
        <Button className={classes.submit} type='submit'>Update profile</Button>
      </div>
      <div className={classes.avatarUpdate}>
        <div className={classes.subtitle}>Profile Picture</div>
        <div className={classes.avatar}>
          <div className={cx(classes.wrapper)}>
            <input ref={register} accept={VAlID_IMAGES_TYPES} onChange={handleFileChange} id='avatar' name='avatar' type='file' hidden/>
            {preview.avatar.name && (
              <div className={classes.imgHolder}>
                <img src={preview.avatar.name} />
              </div>
            )}
          </div>
        </div>
        <span className={classes.tooltip}>We recommend an image of at least 400x400px. Gifs work too.</span>
        <label htmlFor='avatar'>
          <Button className={classes.btn} component='span'>{text['chooseFile']}</Button>
        </label>
      </div>
      <Popup open={showPopup} textheader="Successfully updated your profile;;" onClose={() => setShowPopup(false)}></Popup>
      <Popup open={showFailedPopup} textheader="Edit profile;;You failed to update your profile. Please try again" onClose={() => setShowFailedPopup(false)}></Popup>
    </form>
  );
};

export default EditForm;
