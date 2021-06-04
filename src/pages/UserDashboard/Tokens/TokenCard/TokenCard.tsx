import React from 'react';
import { Link } from 'react-router-dom';
import { Token } from 'apis/token';

import Avatar from 'components/avatar';
import preview from 'components/images/artist/work.jpg';
import TokenPreview from 'components/widgets/TokenPreview';
import useStyles from './TokenCard.style';

type TokensSliderProps = {
  token: Token;
  renderContent: (token: any) => JSX.Element;
};

export default function TokenCard({ token, renderContent: RenderContent }: TokensSliderProps): JSX.Element {
  const classes = useStyles();
  const {
    payload: { cover, file, description },
    thumbnail,
  } = token?.metadata;

  return (
    <Link to={`/edit-collectible/${token.id}`} className={classes.card} key={token.id}>
      <div className={classes.topWrapper}>
        <TokenPreview className={classes.tokenPreview} src='/static/media/work.f8ed0952.jpg' alt={description} />
      </div>
      <Avatar className={classes.avatar} image={preview} size={60} />
      <RenderContent token={token} />
    </Link>
  );
}
