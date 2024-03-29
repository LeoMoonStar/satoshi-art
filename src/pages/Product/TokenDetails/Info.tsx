import React from 'react';
import { Typography } from '@material-ui/core';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import useStyles from './Info.style';
import { CollectibleInfo } from 'apis/collectibles';
import { shortAddress } from 'utils/helpers';

export const Info = ({ info, collection }: any): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        {/*collectible.walletHash && (
          <div className={classes.ownerContainer}>
            <div className={classes.imageWrapper}>
              <Avatar size={48} alt='Profile photo' status='premium' image='https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240'/>
            </div>
            <div className={classes.artistInfo}>
              <Typography variant='subtitle1' className={classes.artistRole}>{text['owner']}</Typography>
              <a target='_blank' rel='noreferrer' href={`https://ropsten.etherscan.io/address/${collectible.walletHash}`}>
                <Typography variant='h3'>{shortAddress(collectible.walletHash)}</Typography>
              </a>
            </div>
          </div>
        )}
        {collectible.walletHash && (
          <div className={classes.creatorContainer}>
            <div className={classes.imageWrapper}>
              <Avatar size={48} alt='Profile photo' status='premium' image='https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240'/>
            </div>
            <div className={classes.artistInfo}>
              <Typography variant='subtitle1' className={classes.artistRole}>{text['creator']}</Typography>
              <a target='_blank' rel='noreferrer' href={`https://ropsten.etherscan.io/address/${collectible.walletHash}`}>
                <Typography variant='h3'>{shortAddress(collectible.walletHash)}</Typography>
              </a>
            </div>
          </div>
        )*/}
      </div>
      <div className={classes.divider} />
      {console.log("info.tsx: ", info)}
      {info.map((data: any, index: number) => (
        <div key={index} className={classes.collectionContainer}>
          <Avatar size={48} alt='Profile photo' image={data.avatarUrl}/>
          <div className={classes.artistInfo}>
            {console.log(data)}
            <Typography variant='subtitle1' className={classes.artistRole}>{data.header}</Typography>
            <Typography variant='h3'>{data.name}</Typography>
          </div>
        </div>
      ))}

      <div className={classes.divider} />

      <div className={classes.collectionContainer}>
        <Avatar size={48} alt='Profile photo' image={collection.avatarUrl}/>
        <div className={classes.artistInfo}>
          <Typography variant='subtitle1' className={classes.artistRole}>Collection</Typography>
          <Typography variant='h3'>{collection.name}</Typography>
        </div>
      </div>
    </div>
  );
};
