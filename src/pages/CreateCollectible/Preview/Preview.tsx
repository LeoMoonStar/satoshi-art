import React from 'react';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import avatar from 'components/images/artist/avatar.jpg';
import { Button, Input } from '@material-ui/core';
import useStyles from './Preview.style';

type PreviewProps = {
  fileSrc?: string;
  fields: { name?: string; copiesCount?: number; unlockContent?: string; price?: number };
  isSingle: boolean;
  //handleTransferToken: any;
  celebrity: any;
};

const Preview = ({ isSingle, fileSrc, fields, celebrity }: PreviewProps): JSX.Element => {
  const classes = useStyles();

  const isFieldsNotEmpty = Object.values(fields).some(field => field);
  const [transferAddr, setTransferAddr] = React.useState('');
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
      {/* {celebrity && (
        <div className={classes.transferContainer}>
          <Input
            id='transfer'
            placeholder='Enter address 0x...'
            disableUnderline
            className={classes.transferContainerInputBox}
            onChange={e => setTransferAddr(e.target.value)}
            value={transferAddr}
            name='transferAddr'
          />
          <Button
            type='submit'
            onClick={() => handleTransferToken(transferAddr)}
            className={classes.transferContainerButton}
          >
            Transfer Your Items
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default Preview;
