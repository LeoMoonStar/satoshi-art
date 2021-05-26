import React from 'react';
import Loader from 'components/widgets/Loader';
import FollowersUser from '../FollowersUser';
import FollowersGallery from '../FollowersGallery';
import useStyles from './FollowersList.style';

type UserType = {
  id: number;
  name: string;
  images?: { id: number; src: string }[];
};

const FollowersList = ({ users }: { users: Array<UserType> }): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      {users.map(user => (
        <div key={user.id} className={classes.row}>
          <FollowersUser name={user.name} />
          {user.images && <FollowersGallery images={user.images} />}
        </div>
      ))}
    </div>
  );
};

export default FollowersList;
