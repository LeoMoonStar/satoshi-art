import React from 'react';
import text from '../../../public/content';
import term from '../../../public/term';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout';

import { LeftArrowIcon } from 'components/icons';

import useStyles from './InfoPages.style';

export default function Privacy(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const handleGoBack = () => history.push('/');

  return (
    <Layout>
      <div className={classes.container}>
        <Button className={classes.backBtn} onClick={handleGoBack}>
          <LeftArrowIcon /> {text['backToHomePage']}
        </Button>
        <div className={classes.contentContainer}>
          <h1>{term['title']}</h1>
          <div className={classes.lastUpdated}>{term['lastUpdate']}</div>
          <b>{term['warning']}</b>
          <br />
          <br />
          <ul>
            <li>
              <h2>{term['title1']}</h2>
              <p className={classes.whiteSpacePerLine}>{term['text1']}</p>
            </li>

            <li>
              <h2>{term['title2']}</h2>
              <p className={classes.whiteSpacePerLine}>{term['text2']}</p>
            </li>
            <li>
              <h2>{term['title3']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text3'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title4']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text4'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title5']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text5'
                  components={{
                    p: <p />,
                    i: <i />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title6']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text6'
                  components={{
                    p: <p />,
                    i: <i />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title7']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text7'
                  components={{
                    p: <p />,
                    i: <i />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title8']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text8'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title9']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text9'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title10']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text10'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title11']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text11'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title12']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text12'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title13']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text13'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                  }}
                /> */}
              </div>
            </li>
            <li>
              <h2>{term['title14']}</h2>
              <div className={classes.list}>
                {/* <Trans
                  i18nKey='terms:text14'
                  components={{
                    p: <p />,
                    i: <i />,
                    span: <span />,
                    br: <br />,
                    u: <u />,
                  }}
                /> */}
              </div>
            </li>
          </ul>
        </div>
        <div className={classes.centeredTextWithSpace}>
          <b>{text['endOfAgreement']}</b>
        </div>
      </div>
    </Layout>
  );
}
