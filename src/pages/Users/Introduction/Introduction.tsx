import { MenuItem, SelectProps } from '@material-ui/core';
import React from 'react';
import text from '../../../constants/content';
import Select from '../../../components/widgets/Select';
import useStyles from './Introduction.style';
import { ExpandMore } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { FilterIcon } from '../../../components/icons';

export default function Introduction({ numitems, subject, seeAll }: any): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h1 className={classes.title}>{subject}</h1>
        <div className={classes.resultsCount}>{numitems} results</div>
      </div>
      <div className={classes.rightCol}>
        {/*<div className={classes.selectsGroup}>
          <Select
            className={classes.select}
            label={text['All items ']}
            defaultValue={text['All items '] as string}
            renderValue={(value: SelectProps['value']) => (
              <>
                {value}
                <ExpandMore />
              </>
            )}
          >
            <MenuItem value='default'>{text['All items ']}</MenuItem>
            <MenuItem value='Option1'>Option1</MenuItem>
            <MenuItem value='Option2'>Option2</MenuItem>
            <MenuItem value='Option3'>Option3</MenuItem>
          </Select>
          <Select
            className={classes.select}
            label={text['sortBy']}
            defaultValue={text['sortBy'] as string}
            renderValue={(value: SelectProps['value']) => (
              <>
                {value}
                <ExpandMore />
              </>
            )}
          >
            <MenuItem value='default'>{text['sortBy']}</MenuItem>
            <MenuItem value='Option1'>Newest</MenuItem>
            <MenuItem value='Option2'>Oldest</MenuItem>
            <MenuItem value='Option3'>Expensive</MenuItem>
          </Select>
        </div>*/}
        <div className={classes.filterGroup}>
          <div className={classes.tabs}>
            <button type="button" 
                className={subject == "Top Sellers" ? "selected" : ""}
                onClick={() => seeAll("Top Sellers")}
            >Top Sellers</button>
            <button type="button" 
                className={subject == "Top Buyers" ? "selected": ""}
                onClick={() => seeAll("Top Buyers")}
            >Top Buyers</button>
            <button type="button" 
                className={subject == "Top Collectors" ? "selected": ""}
                onClick={() => seeAll("Top Collectors")}
            >Top Collectors</button>
            <button type="button" 
                className={subject == "Top Artists" ? "selected": ""}
                onClick={() => seeAll("Top Artists")}
            >Top Artists</button>
            <button type="button" 
                className={subject == "Largest Collections" ? "selected": ""}
                onClick={() => seeAll("Largest Collections")}
            >Largest Collections</button>
          </div>
          {/*<IconButton className={classes.filterButton}>
            <FilterIcon />
          </IconButton>*/}
        </div>
      </div>
    </section>
  );
}
