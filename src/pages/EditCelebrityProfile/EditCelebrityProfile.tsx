import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Button, FormControl, FormHelperText, Input, Select, MenuItem, TextField, IconButton } from '@material-ui/core';
import text from 'constants/content';
import { useForm } from 'react-hook-form';
import { VAlID_IMAGES_TYPES, VALID_FILE_TYPES, ALL_SUPPORTED_TYPES } from 'constants/supportedFileTypes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from 'components/layout';
import useStyles from './EditCelebrityProfile.style';
import { CalendarIcon } from 'components/icons/dashboard';
import { AngleDownIcon, RoundedAngleLeftIcon } from 'components/icons';
import DatePicker from 'react-datepicker';
import { Close } from '@material-ui/icons';
import { updateCelebrityProfile } from 'apis/users';

const FILE_SIZE = 31457280;
const schema = yup.object().shape({
  background: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .required('A background is required')
      .test('fileRequired', 'Background is required', value => value && value.hasOwnProperty(0))
      .test(
        'fileSize',
        'The background is too big. You need to upload a smaller one',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
  imageUrl: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .required('An image is required')
      .test('fileRequired', 'Image is required', value => value && value.hasOwnProperty(0))
      .test(
        'fileSize',
        'The image is too big. You need to upload a smaller one',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
  bar: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .required('An image is required')
      .test('fileRequired', 'Image is required', value => value && value.hasOwnProperty(0))
      .test(
        'fileSize',
        'The image is too big. You need to upload a smaller one',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
  avatar: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .required('An image is required')
      .test('fileRequired', 'Image is required', value => value && value.hasOwnProperty(0))
      .test(
        'fileSize',
        'The image is too big. You need to upload a smaller one',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
  theSeries: yup.string().required('Enter the series'),
  theHeader: yup.string().required('Enter the header'),
  year: yup.string().required('Enter a year'),
  month: yup.string().required('Enter a month'),
  date: yup.string().required('Enter a date'),
  introduction: yup.string().required('Introduction is required'),
  conclusion: yup.string().required('conclusion is required'),
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const convertDateToSting = (date: Date): string => {
  if (!date) return '';

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function EditCelebrityProfile() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      theSeries: 'this is the series',
      theHeader: 'this is the header',
      year: '',
      month: '',
      date: '',
      introduction: 'this is the introduction',
      conclusion: 'this is conclusion',
    },
  });
  const [images, setImages] = useState({
    background: '',
    backgroundBase64: '',
    backgroundImagetype: '',
    imageUrl: '',
    imageUrlBase64: '',
    imageUrlImagetype: '',
    bar: '',
    barBase64: '',
    barImagetype: '',
    avatar: '',
    avatarBase64: '',
    avatarImagetype: '',
  });
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [colorCode, setColorCode] = useState('');
  const [bulletError, setBulletError] = useState<boolean>(false);

  const isErrors = () => Object.keys(errors).length >= 1;
  const submit = async (data: any) => {
    console.log('edit', data);
    const { theSeries, theHeader, year, month, date, introduction, conclusion } = data;
    const { background, backgroundBase64, backgroundImagetype } = images;
    const { imageUrl, imageUrlBase64, imageUrlImagetype } = images;
	const { bar, barBase64, barImagetype } = images;
	const { avatar, avatarBase64, avatarImagetype } = images;
    const updatedate = year + '.' + month + '.' + date;

    if (bulletPoints.length == 0) {
      setBulletError(true);

      return;
    }

    const profile = {
      background: {
        fileName: 'background.' + backgroundImagetype.split('/')[1],
        mediaType: backgroundImagetype,
        content: backgroundBase64,
      },
      imageUrl: {
        fileName: 'imageurl.' + imageUrlImagetype.split('/')[1],
        mediaType: imageUrlImagetype,
        content: imageUrlBase64,
      },
	  homePageAvatar: {
        fileName: 'homePageAvatar.' + avatarImagetype.split('/')[1],
        mediaType: avatarImagetype,
        content: avatarBase64,
      },
	  homePageBar: {
        fileName: 'homePageBar.' + barImagetype.split('/')[1],
        mediaType: barImagetype,
        content: barBase64,
      },

      theSeries: theSeries,
      header: theHeader,
      date: updatedate,
      introduction: introduction,
      bulletPoints: bulletPoints,
      conclusion: conclusion,
	  colorCode:colorCode
    };
    console.log(profile);
    updateCelebrityProfile(profile)
      .then(res => {
        console.log('success');
        location.replace('/');
      })
      .catch(err => console.log(err));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;

    if (!imageFile) return;

    const file = imageFile[0];
    const src = URL.createObjectURL(file);
    const type = file.type.split('/')[0];

    // convert to base64
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      if (e.target.name == 'background') {
        setImages({
          // update file or cover
          ...images,
          [e.target.name]: src,

          // update type of file or cover
          backgroundBase64: typeof reader.result == 'string' ? reader.result : '',
          backgroundImagetype: typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
        });
      } else if (e.target.name == 'bar') {
        setImages({
          // update file or cover
          ...images,
          [e.target.name]: src,

          // update type of file or cover
          barBase64: typeof reader.result == 'string' ? reader.result : '',
          barImagetype:
            typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
        });
      } else if (e.target.name == 'avatar') {
        setImages({
          // update file or cover
          ...images,
          [e.target.name]: src,

          // update type of file or cover
          avatarBase64: typeof reader.result == 'string' ? reader.result : '',
          avatarImagetype:
            typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
        });
      } else {
        setImages({
          // update file or cover
          ...images,
          [e.target.name]: src,

          // update type of file or cover
          imageUrlBase64: typeof reader.result == 'string' ? reader.result : '',
          imageUrlImagetype: typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
        });
      }
    };
  };
  const addPoints = () => {
    const newPoints = [...bulletPoints, ''];

    setBulletPoints(newPoints);
  };
  const handleColorCode = (color: React.SetStateAction<string>) => {
    console.log(color);
	setColorCode(color);
    
  };

  const deletePoint = (index: number) => {
    bulletPoints.splice(index, 1);

    const newpoints = [...bulletPoints];

    setBulletPoints(newpoints);
  };
  const editPoint = (index: number, value: string) => {
    const newPoints = [...bulletPoints];

    newPoints[index] = value;

    setBulletPoints(newPoints);
  };

  return (
    <Layout headerVariant='full'>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div className={classes.upload}>
            <div className={classes.subtitle}>Upload Background</div>
            <div className={clsx(classes.uploadWrapper)}>
              <input
                accept={ALL_SUPPORTED_TYPES}
                className={classes.input}
                ref={register}
                onChange={handleFileChange}
                id='uploadBackground'
                name='background'
                type='file'
                hidden
              />

              {!images.background ? (
                <div>
                  <label htmlFor='uploadBackground'>
                    <Button component='span' className={classes.chooseBtn}>
                      {text['chooseFile']}
                    </Button>
                  </label>
                </div>
              ) : (
                <div className={classes.uploadPreview}>
                  <img src={images.background} />
                </div>
              )}

              {images.background && (
                <IconButton
                  className={classes.closeBtn}
                  onClick={() => {
                    setImages({ ...images, background: '', backgroundBase64: '', backgroundImagetype: '' });
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </div>
          </div>

          <div className={classes.upload}>
            <div className={classes.subtitle}>Upload Image URL</div>
            <div className={clsx(classes.uploadWrapper)}>
              <input
                accept={ALL_SUPPORTED_TYPES}
                className={classes.input}
                ref={register}
                onChange={handleFileChange}
                id='uploadImageUrl'
                name='imageUrl'
                type='file'
                hidden
              />

              {!images.imageUrl ? (
                <div>
                  <label htmlFor='uploadImageUrl'>
                    <Button component='span' className={classes.chooseBtn}>
                      {text['chooseFile']}
                    </Button>
                  </label>
                </div>
              ) : (
                <div className={classes.uploadPreview}>
                  <img src={images.imageUrl} />
                </div>
              )}

              {images.imageUrl && (
                <IconButton
                  className={classes.closeBtn}
                  onClick={() => {
                    setImages({ ...images, imageUrl: '', imageUrlBase64: '', imageUrlImagetype: '' });
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </div>
          </div>
          {/* homepageBarUrlImage */}
          <div className={classes.upload}>
            <div className={classes.subtitle}>Upload Homepage Image</div>
            <div className={clsx(classes.uploadWrapper)}>
              <input
                accept={ALL_SUPPORTED_TYPES}
                className={classes.input}
                ref={register}
                onChange={handleFileChange}
                id='uploadBarImageUrl'
                name='bar'
                type='file'
                hidden
              />

              {!images.bar ? (
                <div>
                  <label htmlFor='uploadBarImageUrl'>
                    <Button component='span' className={classes.chooseBtn}>
                      {text['chooseFile']}
                    </Button>
                  </label>
                </div>
              ) : (
                <div className={classes.uploadPreview}>
                  <img src={images.bar} />
                </div>
              )}

              {images.bar && (
                <IconButton
                  className={classes.closeBtn}
                  onClick={() => {
                    setImages({ ...images, bar: '', barBase64: '', barImagetype: '' });
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </div>
          </div>
          {/* avatar image url */}
          <div className={classes.upload}>
            <div className={classes.subtitle}>Upload Avatar Image</div>
            <div className={clsx(classes.uploadWrapper)}>
              <input
                accept={ALL_SUPPORTED_TYPES}
                className={classes.input}
                ref={register}
                onChange={handleFileChange}
                id='uploadAvatarImageUrl'
                name='avatar'
                type='file'
                hidden
              />

              {!images.avatar ? (
                <div>
                  <label htmlFor='uploadAvatarImageUrl'>
                    <Button component='span' className={classes.chooseBtn}>
                      {text['chooseFile']}
                    </Button>
                  </label>
                </div>
              ) : (
                <div className={classes.uploadPreview}>
                  <img src={images.avatar} />
                </div>
              )}

              {images.imageUrl && (
                <IconButton
                  className={classes.closeBtn}
                  onClick={() => {
                    setImages({ ...images, avatar: '', avatarBase64: '', avatarImagetype: '' });
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        <FormControl className={classes.fieldGroup}>
          <label htmlFor='theSeries'>The Series</label>
          <TextField multiline id='theSeries' name='theSeries' inputRef={register} className={classes.textField} />
          {errors.theSeries && <small className={classes.inputError}>{errors.theSeries.message}</small>}
        </FormControl>
        <FormControl className={classes.fieldGroup}>
          <label htmlFor='theHeader'>The Header</label>
          <TextField multiline id='theHeader' name='theHeader' inputRef={register} className={classes.textField} />
          {errors.theHeader && <small className={classes.inputError}>{errors.theHeader.message}</small>}
        </FormControl>

        <FormControl>
          <div className={classes.date}>
            <label htmlFor='date'>Date</label>

            <div className={classes.dateRow}>
              <input id='year' name='year' placeholder='YYYY' ref={register} />
              <div>/</div>
              <input id='month' name='month' placeholder='MM' ref={register} />
              <div>/</div>
              <input id='date' name='date' placeholder='DD' ref={register} />
            </div>
          </div>

          {errors.year && (
            <small style={{ marginTop: 10 }} className={classes.inputError}>
              {errors.year.message}
            </small>
          )}
          {errors.month && (
            <small style={{ marginTop: 30 }} className={classes.inputError}>
              {errors.month.message}
            </small>
          )}
          {errors.date && (
            <small style={{ marginTop: 50 }} className={classes.inputError}>
              {errors.date.message}
            </small>
          )}
        </FormControl>

        <FormControl className={classes.fieldGroup}>
          <label htmlFor='introduction'>Introduction</label>
          <TextField
            multiline
            id='introduction'
            name='introduction'
            inputRef={register}
            className={classes.textField}
          />
          {errors.introduction && <small className={classes.inputError}>{errors.introduction.message}</small>}
        </FormControl>

        <FormControl>
          <div className={classes.bulletpoints}>
            <label htmlFor='bulletpoints'>Bullet Point(s)</label>
            <div className={classes.bulletpointsAdd} onClick={addPoints}>
              Add a point
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {bulletPoints.map((point, index) => (
                <div style={{ display: 'flex', flexDirection: 'row', margin: '3px 0' }} key={index}>
                  <input
                    className={classes.bulletpointinput}
                    placeholder={'#' + (index + 1) + ': point'}
                    onChange={e => editPoint(index, e.target.value)}
                    value={point}
                  />
                  <div className={classes.bulletpointdelete} onClick={() => deletePoint(index)}>
                    Delete #{index + 1} point
                  </div>
                </div>
              ))}

              {bulletError && <small className={classes.inputError}>Please add a bullet point</small>}
            </div>
          </div>

		  <div className={classes.bulletpoints}>
            <label htmlFor='color'>Color Code</label>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
			<span>*Do not use # symbol</span>
			<input
                    className={classes.bulletpointinput}
                    placeholder='color code'
                    onChange={e => handleColorCode(e.target.value)}
                    value={colorCode}
                  />
                  
            </div>
          </div>
        </FormControl>

        <FormControl className={classes.fieldGroup}>
          <label htmlFor='conclusion'>Conclusion</label>
          <TextField multiline id='conclusion' name='conclusion' inputRef={register} className={classes.textField} />
		 
          {errors.conclusion && <small className={classes.inputError}>{errors.conclusion.message}</small>}
		 
        </FormControl>

        {isErrors() && (
          <p className={classes.textError}>
            There were some issues. Please see above what you need to fix and try again. The button will be enabled
            after you apply your changes.
          </p>
        )}

        <div className={classes.footer}>
          <Button type='submit'>Update</Button>
        </div>
      </form>
    </Layout>
  );
}
