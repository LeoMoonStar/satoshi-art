import React, { useState, useEffect } from 'react';
import { getBidHistory } from 'apis/users'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import text from '../../../../constants/content';
import useStyles from './BidHistory.style';
type HistoryProp = {
  orderAmount: number;
  date: number;
};

const toHumanDate = (numberDate: string) => {
  return new Date(new Date(parseInt(numberDate)))
}


export default function BidHistory({searchStart, searchEnd}:{searchStart:number,searchEnd:number}): JSX.Element {
  console.log("in bidhistory:",searchStart,searchEnd)
  const classes = useStyles();
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)

  const [JanData, setJanData] = useState(0)
  const [FebData, setFebData] = useState(0)
  const [MarData, setMarData] = useState(0)
  const [AprData, setAprData] = useState(0)
  const [MayData, setMayData] = useState(0)
  const [JunData, setJunData] = useState(0)
  const [JulData, setJulData] = useState(0)
  const [AugData, setAugData] = useState(0)
  const [SepData, setSepData] = useState(0)
  const [OctData, setOctData] = useState(0)
  const [NovData, setNovData] = useState(0)
  const [DecData, setDecData] = useState(0)


  const data = [
    
    {
      name: 'Jan',
      uv: JanData,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Feb',
      uv: FebData,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Mar',
      uv: MarData,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Apr',
      uv: AprData,
      pv: 4300,
      amt: 2100,
    },

    {
      name: 'May',
      uv: MayData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Jun',
      uv: JunData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Jul',
      uv: JulData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Aug',
      uv: AugData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Sep',
      uv: SepData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Oct',
      uv: OctData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Nov',
      uv: NovData,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Dec',
      uv: DecData,
      pv: 9800,
      amt: 2290,
    },
  ];

  const updateData = (st:number, end:number) => {
    getBidHistory(st,end).then((data) => {
      console.log("in the bid history getting request:", data)
      data.data.map((history: any) => {
        console.log("in loop:",toHumanDate(history.createDate))
        switch (toHumanDate(history.createDate).getMonth() + 1) {
          case 1: {
            setJanData(prevState=>{return prevState+1})
            break;
          }
          case 2: {
            setFebData(prevState=>{return prevState+1})
            break;
          }
          case 3: {
            setMarData(prevState=>{return prevState+1})
            break;
          }
          case 4: {
            setAprData(prevState=>{return prevState+1})
            break;
          }
          case 5: {
            setMayData(prevState=>{return prevState+1}) 
            break;
          }
          case 6: {
            console.log("Jun")
            setJunData(prevState=>{return prevState+1})
            break;
          }
          case 7: {
            setJulData(prevState=>{return prevState+1})
            break;
          }
          case 8: {
            setAugData(prevState=>{return prevState+1})
            break;
          }
          case 9: {
            setSepData(prevState=>{return prevState+1})
            break;
          }
          case 10: {
            setOctData(prevState=>{return prevState+1})
            break;
          }
          case 11: {
            setNovData(prevState=>{return prevState+1})
            break;
          }
          case 12: {
            setDecData(prevState=>{return prevState+1})
            break;
          }
          default: {
            //statements; 
            break;
          }
        }
      })
    }).catch(error => console.error(error.message));
  }
  const CustomTooltip = ({ active, separator, displayName, coordinate, trigger, animationEasing }: any) => {
    const classes = useStyles();
    
    if (!active) {
      return null;
    }
  
    return (
      <div></div>
      // <div className={classes.customToolTip}>
      //   {console.log(displayName)}
      //   <b className={classes.customToolTipTitle}>{JunData} Order</b>
      //   <div className={classes.customToolTipDescription}>Oct 18th, 2020</div>
      // </div>
    );
  };
  useEffect(() => {
    setStartDate(searchStart)
    setEndDate(searchEnd)
    updateData(startDate, endDate);
    
    // console.log(JanData,FebData,MarData,AprData,MayData,JunData,JulData,DecData)

  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <div className={classes.intro}>
          <h3 className={classes.mainTitle}>{text['bidHistory']}</h3>
          <div className={classes.helpText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, blanditiis!
          </div>
        </div>
      </div>
      <ResponsiveContainer width='100%' aspect={4}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='70%' stopColor='#FF0099' stopOpacity={1} />
              <stop offset='98%' stopColor='#fff' stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis strokeWidth={0} dataKey='name' />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Tooltip />

          <Area type='monotone' dataKey='uv' strokeWidth={3} stroke='#FF0099' fill='url(#colorUv)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
