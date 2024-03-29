import React, { useState, useEffect } from 'react';
import web3Contract from 'abis/web3contract';
import { useParams } from 'react-router-dom';

import { getCelebrityInfo, getDropOfTheDay } from 'apis/users';

import Layout from 'components/layout';
import DropOfTheDayInDetails from './DropOfTheDayInDetails';
import DropOfTheDayWorkCards from './DropOfTheDayWorkCards';
import SpecialEdition from './SpecialEdition';
import LaunchTime from './LaunchTime';
import TopSeries from './TheSeries';
import Introduction from './Introduction';

import bradImage from 'components/images/dropOfTheDay/bradPit.png';
import rihanna from 'components/images/dropOfTheDay/rihanna.png';
import specialEditionImage from 'components/images/dropOfTheDay/specialEdition.png';

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

export default function DropOfTheDay(props: any): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('Brad Pitt');
  const [introContent, setIntroContent] = useState(
    'William Bradley Pitt (born December 18, 1963) is an American ' +
      'actor and film producer. He has received multiple awards, ' +
      'including two Golden Globe Awards and an Academy Award for ' +
      'his acting, in addition to another Academy Award, another ' +
      'Golden Globe Award and a Primetime Emmy Award as producer ' +
      'under his production company, Plan B Entertainment.'
  );
  const [avatar, setAvatar] = useState(bradImage); // bradImage
  const [seriesContent, setSeriesContent] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Etiam iaculis, nulla eu sodales sagittis, lorem felis ' +
      'pellentesque nibh, in varius ipsum orci et est. Aliquam ' +
      'posuere purus mi, vitae luctus justo luctus ac. Nulla ' +
      'pulvinar sed nisl eget eleifend. Mauris viverra finibus ' +
      'tortor id vestibulum. Etiam nec nulla sit amet tortor.'
  );
  const [sliderImagePreview, setSlideImagePreview] = useState(''); // rihanna
  const [launchTimeContent, setLaunchTimeContent] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Etiam iaculis, nulla eu sodales sagittis, lorem felis ' +
      'pellentesque nibh, in varius ipsum orci et est.'
  );
  //const [nextActionDate, setNextActionDate] = useState()
  const [specialEdition, setSpecialEdition] = useState({
    image: specialEditionImage,
    title: 'I’m Jack’s wasted life NFT (1-of-1)',
    year: '2021',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing ' +
      'elit. Etiam iaculis, nulla eu sodales sagittis, ' +
      'lorem felis pellentesque nibh, in varius ipsum orci ' +
      'et est. Aliquam posuere purus mi, vitae luctus justo ' +
      'luctus ac. Nulla pulvinar sed nisl eget eleifend. ' +
      'Mauris viverra finibus tortor id vestibulum.',
    items: [
      'Lorem ipsum dolor sit amet',
      'Etiam iaculis nulla eu sodales sagittis',
      'Felis pellentesque nibh, in varius ipsum orci et',
      'Aliquam posuere purus mi, vitae luctus justo',
      'Nulla pulvinar sed nisl',
    ],
    addContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, nulla eu sodales sagittis.',
  });

  const [specialEd, setSpecialEd]: any = useState({
    image: '',
    endTime: '',
    tokenId: '',
    ownerMetamaskId: '',
    productId: '',
  });
  const [collectibles, setCollectibles]:any = useState([])
  useEffect(() => {
    if (id) {
      getCelebrityInfo(id)
        .then(({ data }) => {
          console.log('!!!!!!!!!!!!!', data);
          const specialEdition = data.specialEdition;
          const newSpecialEdition = {
            image: specialEdition.imageUrl,
            title: specialEdition.introduction,
            content: specialEdition.header,
            year: specialEdition.date.split('.')[0],
            items: specialEdition.bulletPoints,
            addContent: specialEdition.conclusion,
          };

          setSeriesContent(data.theSeries);
          //setNextActionDate(month[specialEdition.date.split(".")[1]] + " : " + specialEdition.date.split(".")[2])
          setSpecialEdition(newSpecialEdition);
        })
        .catch(err => console.log(err.message));

      getDropOfTheDay()
        .then(({ data }) => {
          const current = data.filter((item: any) => item.status == 'onAuction');
          console.log('current data', current);
          web3Contract.checkCollectibleStatus(current[0].ownerMetamaskId, current[0].tokenId).then((res: any) => {
            console.log(res[2].toNumber());
            const time = res[2].toNumber();
            setSpecialEd({
              image: current[0].thumbnailUrl,
              endTime: current[0].endTime,
              startTime: current[0].startTime,
              tokenId: current[0].tokenId,
              ownerMetamaskId: current[0].ownerMetamaskId,
              productId: current[0].id,
            });
          });
          
        })
        .catch(err => console.log(err.message));
    
        // getDropOfTheDay().then(({ data }) => {
    
        //   const filter = data.filter((item:any)=>item.creatorUserId == id)
        //   console.log('filter data,',filter)
        //   console.log('name celebrity id',id)
        //   setCollectibles(filter)
        // }).catch(err=>console.log(err.message));
    }
  }, []);

  return (
    <Layout
      hasHeaderDivider={false}
      containerPaddingTop={0}
      headerBackground='transparent'
      inverseHeader
      positionHeader='absolute'
    >
      <Introduction name={name} content={introContent} avatar={avatar} />
      <TopSeries content={seriesContent} sliderPreview={sliderImagePreview} />
      <LaunchTime
        content={launchTimeContent}
        nextActionDate={`2021-06-22`}
        endTime={specialEd.endTime}
        startTime={specialEd.startTime}
        ownerMetamaskId={specialEd.ownerMetamaskId}
        tokenId={specialEd.tokenId}
      />
      <SpecialEdition
        image={specialEd.image}
        title={specialEdition.title}
        year={specialEdition.year}
        content={specialEdition.content}
        contentList={specialEdition.items}
        addContent={specialEdition.addContent}
        productId={specialEd.productId}
      />
      <DropOfTheDayWorkCards contentList={specialEdition.items} userId={id} />
      <DropOfTheDayInDetails />
    </Layout>
  );
}
