import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { getUserInfo } from 'apis/users';
import { getCollectible } from 'apis/collectibles';
import Avatar from 'components/avatar';
import useStyles from './History.style';
import { shortAddress } from 'utils/helpers';
import moment from 'moment'
const month: any = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export const History = ({ list, name, collectibleId }: any): JSX.Element => {
  console.log('*********',list.auctionUserId);

  const [userName, setUserName] = useState();
  const [collectibleName, setCollectibleName] = useState();
  const [createDate, setCreateDate] = useState('');
  //getCollectibleBYID() createDate, creator metamskId
  //creatorUserId to get userProgile  and use name
  //collectibleName createdn byusernamw
  useEffect(() => {
    getCollectible(collectibleId).then(response => {
      console.log(response.data)
      setCollectibleName(response.data.name);
      setCreateDate(moment.unix(response.data.createDate).format("MMM DD"))
      getUserInfo(response.data.creatorUserId).then(res => {
        setUserName(res.data.name);
      });
    });
  });
  const classes = useStyles();
  const displayTime = (createdate: number) => {
    const date = new Date(createdate);

    const dstr = JSON.stringify(date).split('T');
    const thedate = dstr[0].split('-');

    return month[thedate[1]] + ' ' + thedate[2];
  };

  const creator = list.length > 0 ? list[list.length - 1] : null;
  const firsthistory = list.length > 1 ? list[list.length - 2] : null;

  return (
    <div className={classes.container}>
      <div style={{height:'200px', overflow:'scroll'}}>

      
        {list.length > 0 ? (

          list.map((info: any, index: number) => (
            <>
              {info.auctionUserId != undefined  && (
                <div className={classes.collectionContainer}>
                <Avatar size={48} alt='Profile photo' image={info.buyerAvatarUrl} />
                <div className={classes.artistInfo}>
                  <Typography variant='h3'>{info.name}</Typography>
                  <div>
                    bid ${info.price} on {displayTime(parseInt(info.createDate))}
                  </div>
                </div>
              </div>
              )}
              {info.buyerUserId && (
                <div className={classes.collectionContainer}>
                  <Avatar size={48} alt='Profile photo' image={info.buyerAvatarUrl} />
                  <div className={classes.artistInfo}>
                    <Typography variant='h3'>{info.buyerUserName}</Typography>
                    <div>
                      bought for ${info.price} on {displayTime(parseInt(info.createDate))}
                    </div>
                  </div>
                </div>
              )}

              {info.sellerUserId ? (
                index < list.length - 2 ? (
                  <div className={classes.collectionContainer}>
                    <Avatar size={48} alt='Profile photo' image={info.sellerAvatarUrl} />
                    <div className={classes.artistInfo}>
                      <Typography variant='h3'>{info.sellerUserName}</Typography>
                      <div>
                        sold for ${info.price} on {displayTime(parseInt(info.createDate))}
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}
            </>
          ))
        ) : (
          <div>No trading history yet!</div>
        )}

        
        {creator || firsthistory ? (
          <div className={classes.collectionContainer} style={{ marginTop: 50 }}>
            <div className={classes.artistInfo}>
              <div>
                <strong>{name} </strong>
                was created on the ethereum blockchain on {displayTime(parseInt(creator.createDate))}
                {/* {firsthistory
                  ? firsthistory.buyerUserId
                    ? ' and bought by ' + firsthistory.buyerUserName + ' '
                    : ' and sold by ' + firsthistory.sellerUserName + ' '
                  : ' '} */}
                
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.collectionContainer} style={{ marginTop: 50 }}>
            <div className={classes.artistInfo}>
              <div>
                <strong>{collectibleName} </strong>
                
                was created by <strong>{userName}</strong> on {createDate}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
