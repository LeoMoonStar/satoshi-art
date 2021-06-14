import React from 'react';
import { Link } from 'react-router-dom';
import { Token } from 'apis/token';

import Avatar from 'components/avatar';
import preview from 'components/images/artist/work.jpg';
import TokenPreview from 'components/widgets/TokenPreview';
import useStyles from './TokenCard.style';

type TokensSliderProps = {
  token: any
  renderContent: (token: any) => JSX.Element;
};

export default function TokenCard({ token, renderContent: RenderContent }: TokensSliderProps): JSX.Element {
  const classes = useStyles();

  return (
    <Link to={`/edit-collectible/${token.id}`} className={classes.card} key={token.id}>
      <div className={classes.topWrapper}>
        <TokenPreview className={classes.tokenPreview} src={token.thumbnailUrl} alt="" />
      </div>
      <Avatar className={classes.avatar} image={preview} size={60} />
      <RenderContent token={token} />
    </Link>
  );
}
