import React from 'react';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import avatar from 'components/images/artist/avatar.jpg';
import useStyles from './Preview.style';

type PreviewProps = {
  fileSrc?: string;
  fields: { name?: string; copiesCount?: number; unlockContent?: string; price?: number };
  isSingle: boolean;
};

const Preview = ({ isSingle, fileSrc, fields }: PreviewProps): JSX.Element => {
  const classes = useStyles();

  const isFieldsNotEmpty = Object.values(fields).some(field => field);
  return (
    <div className={classes.previewWrapper}>
      <div className={classes.lockableContent}>
        <div className={classes.subtitle}>Preview</div>
        <div className={classes.previewArea}>
          {fileSrc || isFieldsNotEmpty ? (
            <div className={classes.content}>
               <img src={fileSrc} />
              <div className={classes.contentHeader}>Preview of your new collectible</div>
            </div>
          ) : (
            <div className={classes.placeholder}>{text['previewOfYourNewCollectible']}</div>
          )}
        </div>
      </div>
      {!!fields.unlockContent && (
        <div className={classes.unlockableContent}>
          <span>{fields.unlockContent}</span>
        </div>
      )}
    </div>
  );
};

export default Preview;
