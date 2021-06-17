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
  handleTransferToken: any;
  celebrity: any;
};

const Preview = ({ isSingle, fileSrc, fields, handleTransferToken, celebrity }: PreviewProps): JSX.Element => {
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
              {/*<div className={classes.references}>
                                <Avatar size={26} image={avatar} alt="John" />
                                <Avatar size={26} image={avatar} alt="John" />
                                <Avatar size={26} image={avatar} alt="John" />
                            </div>
                            <div className={classes.previewImgWrapper}>
                                {fileSrc && <img src={fileSrc} alt="preview-image" />}
                            </div>
                            <div className={classes.previewDscr}>
                                <div>{fields.name}</div>
                                <div>
                                    {fields.price
                                        ? fields.price
                                        : 'Not for sale'}{' '}
                                    {isSingle ? (
                                        <span>1 of 1</span>
                                    ) : (
                                        <span>
                                            {fields.copiesCount
                                                ? `${fields.copiesCount} of ${fields.copiesCount}`
                                                : '0 in stock'}
                                        </span>
                                    )}
                                </div>
                                <div> {t('noBidsYet')}</div>
                            </div>*/}
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
      {celebrity && (
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
      )}
    </div>
  );
};

export default Preview;
