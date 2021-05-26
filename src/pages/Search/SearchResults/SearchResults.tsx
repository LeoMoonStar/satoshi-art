import React, { useState } from 'react';
import SearchHeader from '../SearchHeader';
import Works from 'components/widgets/Works';

import useStyles from './SearchResults.style';
import { Token } from 'apis/token';
import { getCollectibles, Collectible } from 'apis/collectibles';

const tags: TagType[] = [
  { id: 1, title: 'Beyoncé' },
  { id: 2, title: 'Music' },
  { id: 3, title: 'Rihanna' },
  { id: 4, title: 'Lady Gaga' },
  { id: 5, title: 'Pop' },
  { id: 6, title: 'Magazine' },
  { id: 7, title: 'R & B' },
  { id: 8, title: 'Celebrity' },
  { id: 9, title: 'Digital art' },
  { id: 10, title: 'Hip hop' },
  { id: 11, title: 'Black power' },
  { id: 12, title: 'Lady Gaga' },
  { id: 13, title: 'Pop' },
  { id: 14, title: 'Magazine' },
  { id: 15, title: 'R & B' },
  { id: 16, title: 'Celebrity' },
];

type TagType = {
  id: number;
  title: string;
};

type SearchResultsProps = {
  collectibles?: Collectible[];
};

export default function SearchResults({ collectibles }: SearchResultsProps): JSX.Element {
  const classes = useStyles();
  const [selectedTag, setSelectedTag] = useState([tags[0]]);
  const [artistCollectibles, setArtistCollectibles] = useState<Collectible[]>([]);

  const addTag = (tag: TagType) => {
    //setSelectedTag((state) => [...state, tag])
    setSelectedTag([tag]);
    getCollectiblesByName(tag.title);
  };
  const removeTag = (tag: TagType) => {
    const searchtag = selectedTag.length > 0 ? selectedTag[0].title : null;

    setSelectedTag(state => state.filter(item => item.id !== tag.id));

    if (searchtag) {
      getCollectiblesByName(searchtag);
    } else {
      getCollectiblesByName();
    }
  };
  const clearAll = () => {
    setSelectedTag([]);
    getCollectiblesByName();
  };

  const getCollectiblesByName = (title?: string) => {
    getCollectibles(title).then(res => setArtistCollectibles(res.data));
  };

  return (
    <div>
      <SearchHeader selectedTag={selectedTag} addTag={addTag} removeTag={removeTag} clearAll={clearAll} />

      <div className={classes.container}>
        <Works isLoading={false} collectibles={artistCollectibles.length > 0 ? artistCollectibles : collectibles} />
      </div>
    </div>
  );
}
