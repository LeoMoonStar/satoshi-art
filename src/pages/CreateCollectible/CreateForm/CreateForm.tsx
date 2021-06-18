import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, IconButton, Input, FormControlLabel, FormControl, Switch } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useDispatch, useSelector } from 'react-redux';
import text from '../../../constants/content';
import { Close } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { LogoIcon, PlusCircle } from 'components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { VAlID_IMAGES_TYPES, VALID_FILE_TYPES, ALL_SUPPORTED_TYPES } from '../../../constants/supportedFileTypes';
import * as yup from 'yup';
import Popup from 'components/widgets/Popup';
import moment from 'moment';

import { useAPIError } from '../../../hooks/useApiError';
// import { Satoshi721ABI, useSmartContractNetworkData } from 'utils/erc721';
// import { addTransaction, TokenType } from 'state/transactions/actions';
import { percentageToBasicPoints, convertEthToUsd } from 'utils/helpers';
// import {
//   Engine1155ABI,
//   Satoshi1155ABI,
//   use1155EngineSmartContractNetworkData,
//   use1155SmartContractNetworkData,
// } from 'utils/erc1155';
import { uploadFile, uploadMetaData, updateMetaData, MetaDataType } from 'apis/createItem';
import Preview from '../Preview';
import ProgressModal from '../ProgressModal';
import useStyles from './CreateForm.style';
import { AppState } from 'state';
import { ethToUsdRateSelector } from 'state/app/selectors';
import { updateTransactionInMintingProcess } from 'state/app/actions';

import web3Contract from 'abis/web3contract';
import {
  createCollection,
  createCollectible,
  putOnAuction,
  getCollectibleByTokenId,
  transferCollectibles,
} from 'apis/collectibles';
import { getUserInfo } from 'apis/users';
import { readCookie } from '../../../apis/cookie';
import classNames from 'classnames';
import web3contract from 'abis/web3contract';

const FILE_SIZE = 31457280;
const schema = yup.object().shape({
  name: yup.string().required('You need to enter the name'),
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File is required', value => value && value.hasOwnProperty(0))
    .test(
      'fileSize',
      'The file is too big. You need to upload a smaller one',
      value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      value => value && value.hasOwnProperty(0) && ALL_SUPPORTED_TYPES.includes(value[0].type)
    ),
  cover: yup.mixed().when('file', {
    is: (file: FileList) => {
      return file && file.hasOwnProperty(0) && VALID_FILE_TYPES.includes(file[0].type);
    },
    then: yup
      .mixed()
      .required('A file is required')
      .test('fileRequired', 'Cover is required', value => value && value.hasOwnProperty(0))
      .test(
        'fileSize',
        'The file is too big. You need to upload a smaller one',
        value => value && value.hasOwnProperty(0) && value[0].size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        value => value && value.hasOwnProperty(0) && VAlID_IMAGES_TYPES.includes(value[0].type)
      ),
  }),
  royalties: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .typeError('You need to enter number')
    .required('Royalties must be less than or equal to 10'),
  copiesCount: yup.number().typeError('You need to enter number'),
  // properties: yup.object().shape({
  //   name: yup.string().required('You need to enter the start date'),
  //   value: yup.string().required('You need to enter the end date'),
  // }),
});

type PreviewType = { file: string; cover?: string; type: string; base64: string; imagetype: string };
type TempTokenData = {
  id: string;
  authToken: string;
  payload: {
    copiesCount?: number;
    royalties: number;
    description: string;
    file: string;
    name: string;
    cover?: string;
  };
};
interface ICollectibleForm {
  id: any;
  file: string;
  cover: string;
  onSale: boolean;
  onAuction: boolean;
  instantPrice: boolean;
  price: number;
  unlock: boolean;
  unlockContent?: string;
  copiesCount?: number;
  collection: string;
  name: string;
  description: string;
  royalties: number;
  // properties: { name: string; value: string };
}

const CreateForm = ({ isSingle }: { isSingle: boolean }): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { setError } = useAPIError();
  // const erc721NetworkData = useSmartContractNetworkData(chainId);
  // const erc1155NetworkData = use1155SmartContractNetworkData(chainId);
  // const engine1155NetworkData = use1155EngineSmartContractNetworkData(chainId);
  const [OpenSubmitModal, setOpenSubmitModal] = useState<boolean>(false);
  const [createTokenError, setCreateTokenError] = useState<string>('');
  const currency = useSelector<AppState, number>(ethToUsdRateSelector);
  const [tempToken, setTempToken] = useState<TempTokenData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ICollectibleForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      onSale: true,
      onAuction: false,
      instantPrice: true,
      unlock: true,

      unlockContent: '',
      // price: 10,
      collection: '',
      name: '',
      description: '',
      // royalties: 10,
      // copiesCount: 1,
      // properties: {
      //   name: '',
      //   value: '',
      // },
      
      // properties: {
      //   name: '',
      //   value: '',
      // }, -->

    },
  });

  // const [singleContract, setSingleContract] = useState<any>();
  // const [erc1155contract, setErc1155contract] = useState<any>();
  // const [engine1155contract, setEngine1155contract] = useState<any>();

  // const engineAddress = engine1155NetworkData?.address;

  // useEffect(() => {
  //   if (isSingle) {
  //     if (library && erc721NetworkData) {
  //       const address = erc721NetworkData.address;
  //       const singleContract = new Contract(address, Satoshi721ABI, library.getSigner());

  //       setSingleContract(singleContract);
  //     }
  //   }
  // }, [erc721NetworkData, isSingle, library]);

  // useEffect(() => {
  //   if (!isSingle) {
  //     if (library && erc1155NetworkData && engine1155NetworkData) {
  //       const erc1155Address = erc1155NetworkData.address;
  //       const engine1155Contract = new Contract(engine1155NetworkData.address, Engine1155ABI, library.getSigner());
  //       setEngine1155contract(engine1155Contract);
  //       const erc1155Contract = new Contract(erc1155Address, Satoshi1155ABI, library.getSigner());
  //       setErc1155contract(erc1155Contract);
  //     }
  //   }
  // }, [library, chainId, isSingle, erc1155NetworkData, engine1155NetworkData, engineAddress]);

  // const createItem = async (payload: MetaDataType) => {
  //   const royaltiesInBasicPoint = percentageToBasicPoints(payload.royalties);
  //   if (isSingle) {
  //     const singleTokenResponse = await singleContract.createItem(
  //       JSON.stringify(payload),
  //       royaltiesInBasicPoint, //royalties assigned to the token by the creator, in bps
  //       { from: account }
  //     );
  //     return { response: singleTokenResponse, tokenType: TokenType.SINGLE };
  //   }
  //   const multipleTokenResponse = await erc1155contract.createItem(
  //     engine1155contract.address,
  //     payload.copiesCount, //number of copies
  //     royaltiesInBasicPoint, //royalties assigned to the token by the creator, in bps
  //     { from: account }
  //   );
  //   return { response: multipleTokenResponse, tokenType: TokenType.MULTIPLE };
  // };

  const [preview, setPreview] = useState<PreviewType>({ file: '', cover: '', type: '', base64: '', imagetype: '' });
  const tryCreateItem = async (data: TempTokenData) => {
    console.log(data);
    // if (!chainId) return;
    // try {
    // const { response, tokenType } = await createItem(data.payload);
    // await updateMetaData(data.id, response.hash, data.authToken);
    // dispatch(addTransaction({ type: tokenType, hash: response.hash, chainId }));
    // dispatch(updateTransactionInMintingProcess(response.hash));
    //   history.push('/');
    // } catch (err) {
    //   const serverError = err?.data?.message;
    //   const metamaskError = err?.message;
    //   if (serverError || metamaskError) {
    //     setCreateTokenError(serverError || metamaskError);
    //     return;
    //   }
    //   throw err;
    //}
  };
  const [accountAddress, setAccountAddress] = useState('');
  const [showTxHash, setShowTxHash] = useState('');
  const [itemCreated, setItemCreated] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [confirmOnSale, setConfirmOnSale] = useState(false);
  const [confirmOnAuction, setConfirmOnAuction] = useState(false);
  const [celebrity, setCelebrity] = useState(false);
  const [showOptionFailedPopup, setShowOptionFailedPopup] = useState(false);
  const [showNotApproved, setShowNotApproved] = useState(false);
  const [contractTokenIds, setContractTokenIds]: any = useState([]);
  const [onAuction, setOnAuction] = useState(false);
  const tryUploadFiles = async (files: Array<Promise<any>>) => {
    try {
      return await Promise.all(files);
    } catch (e) {
      setError('Upload files', e.data?.data?.errors?.[0].message);
      //setOpenSubmitModal(false)
    }
  };
  useEffect(() => {
    const init = async () => {
      const managerAddress = await web3Contract.requestMetamaskAccess();
      console.log(managerAddress);
      setAccountAddress(managerAddress[0]);
    };

    const checkCelebrity = async () => {
      const userId: any = readCookie('id');
      const { data: userInfo } = await getUserInfo(userId);
      if (userInfo.isCelebrity) {
        setCelebrity(true);
      } else {
        setCelebrity(false);
      }
    };

    init();
    checkCelebrity();
  }, []);
  const onSubmit = async (data: ICollectibleForm) => {
    const { copiesCount, royalties, name, instantPrice, price, unlock, collection, description, onSale, onAuction } =
      data;
    console.log(data);
    console.log(preview);
    const metamaskAddr = readCookie('metamask_address');
    const approval = await web3Contract.isApprovedArtist(metamaskAddr);
    console.log('isAPprovedArtist', approval);

    //check if it celebrity or not
    if (onSale && onAuction) {
      setShowOptionFailedPopup(true);
    } else {
      if (approval) {
        if (celebrity) {
          console.log(celebrity);
          setItemCreated(true);
          const tokenId = await web3contract.etherFunctionCreateItem(copiesCount, royalties);
          setContractTokenIds([...contractTokenIds, tokenId]);
          setItemCreated(false);
          if (tokenId != undefined) {
            console.log('11111 create', tokenId);
            createCollection(collection)
              .then(response => {
                console.log(response);
                const collectible = {
                  status: 'onHold',
                  copies: copiesCount,
                  name: name,
                  tokenIds: tokenId,
                  royalties: royalties,
                  collectionId: response.data.id,
                  price: price,
                  file: {
                    fileName: 'image.' + preview.imagetype.replace('image/', ''),
                    mediaType: preview.imagetype,
                    content: preview.base64,
                  },
                  thumbnail: {
                    fileName: 'image.' + preview.imagetype.replace('image/', ''),
                    mediaType: preview.imagetype,
                    content: preview.base64,
                  },
                };

                createCollectible(collectible)
                  .then(res => {
                    setShowPopup(true);
                  })
                  .catch(error => {
                    setShowFailedPopup(true);
                    console.log(error);
                  });
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        } else {
          //creating on chain
          setItemCreated(true);
          const tokenId = await web3contract.etherFunctionCreateItem(copiesCount, royalties);
          console.log('createForm-259', tokenId);
          setContractTokenIds([...contractTokenIds, tokenId]);
          setItemCreated(false);
          //check if item is on sale or not
          if (onSale) {
            const batchPutOnSale: any = [];
            setOnSale(true);
            setItemCreated(false);
            for (let i = 0; i < tokenId.length; i++) {
              batchPutOnSale.push(web3Contract.marketplacePutOnSaleCollectible(tokenId[i], price.toString()));
            }

            Promise.all(batchPutOnSale)
              .then(resolve => {
                console.log(resolve);
                setOnSale(false);
                setConfirmOnSale(true);

                createCollection(collection)
                  .then(response => {
                    const collectible = {
                      status: 'onSale',
                      copies: copiesCount,
                      name: name,
                      tokenIds: tokenId,
                      royalties: royalties,
                      collectionId: response.data.id,
                      price: price,
                      file: {
                        fileName: 'image.' + preview.imagetype.replace('image/', ''),
                        mediaType: preview.imagetype,
                        content: preview.base64,
                      },
                      thumbnail: {
                        fileName: 'image.' + preview.imagetype.replace('image/', ''),
                        mediaType: preview.imagetype,
                        content: preview.base64,
                      },
                    };

                    createCollectible(collectible)
                      .then(res => {
                        setShowPopup(true);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  })
                  .catch((error: any) => {
                    console.log(error);
                  });
              })
              .catch(error => {
                setOnSale(false);
                console.log(error.message);
              });

            // const buyResult = await web3Contract.marketplacePutOnSaleCollectible(tokenId[0], price.toString());
            // setOnSale(true);
            // setItemCreated(false);
            // buyResult
            //   .wait()
            //   .then((res: any) => {
            //     setOnSale(false);
            //     setConfirmOnSale(true);

            //     // create a collection token and add the collectible to database
            //   })
            //   .catch((err: { message: any }) => {
            //     setOnSale(false);
            //     alert(err.message);
            //     console.log(err.message);
            //   });
          } else if (onAuction) {
            // const startTimeInSec = moment(properties.name).format('x');
            // const endTimeInSec = moment(properties.value).format('X');
            const startTime = Math.floor(new Date().getTime() / 1000); //currentime
            const endTime = Math.floor((new Date().getTime() + 86400000) / 1000); //1 day after/following day
            console.log(startTime, endTime);

            //putOnAuction()
            if (tokenId.length > 0) {
              createCollection(collection)
                .then(response => {
                  const collectible = {
                    status: 'onAuction',
                    copies: copiesCount,
                    name: name,
                    tokenIds: tokenId,
                    royalties: royalties,
                    collectionId: response.data.id,
                    price: price,
                    file: {
                      fileName: 'image.' + preview.imagetype.replace('image/', ''),
                      mediaType: preview.imagetype,
                      content: preview.base64,
                    },
                    thumbnail: {
                      fileName: 'image.' + preview.imagetype.replace('image/', ''),
                      mediaType: preview.imagetype,
                      content: preview.base64,
                    },
                  };

                  createCollectible(collectible)
                    .then(async res => {
                      const collectibleIdsPromise: any = [];
                      const setAsAuctionPromise: any = [];
                      let collectibleIds:any = [];
                      for (let i = 0; i < tokenId.length; i++) {
                        collectibleIdsPromise.push(getCollectibleByTokenId(tokenId[i]));
                      }

                      Promise.all(collectibleIdsPromise)
                        .then(result => {
                          console.log('promise result', result);
                          collectibleIds = result.map((item: any) => item.id);
                          setOnAuction(true)
                          for (let i = 0; i < collectibleIds.length; i++) {
                           
                            const startTime = Math.floor((new Date().getTime() + 300000) / 1000); //currentime
                            const endTime = Math.floor((new Date().getTime() + 86400000) / 1000); //1 day after/following day
                            
                            setAsAuctionPromise.push(web3Contract.setAsAuction(tokenId[i], price, startTime, endTime));
                            
                          }
                        })
                        .catch(err => console.log(err.message));

                      Promise.all(setAsAuctionPromise)
                        .then(async(result) => {
                          
                          console.log('!!!auction promise', result);
                          const auctionData = {
                            price: price,
                            startTime: startTime*1000,
                            endTime:endTime*1000
                          };
                          for (let i = 0; i < collectibleIds.length; i++) {
                            await putOnAuction(collectibleIds[i], auctionData);
                          }
                          setOnAuction(false)
                          setConfirmOnAuction(false)
                        })
                        .catch(err => {setOnAuction(false);console.log(err.message)});
                      //console.log('!!!!!collectible by id ', data);

                      //const response = await web3Contract.setAsAuction(tokenId[0], price, startTime, endTime);
                      //
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch((error: any) => {
                  console.log(error);
                });
            }
          } else {
            //not on sale it should insert into DB
            createCollection(collection)
              .then(response => {
                const collectible = {
                  status: 'onHold',
                  copies: copiesCount,
                  name: name,
                  tokenIds: tokenId,
                  royalties: royalties,
                  collectionId: response.data.id,
                  price: price,
                  file: {
                    fileName: 'image.' + preview.imagetype.replace('image/', ''),
                    mediaType: preview.imagetype,
                    content: preview.base64,
                  },
                  thumbnail: {
                    fileName: 'image.' + preview.imagetype.replace('image/', ''),
                    mediaType: preview.imagetype,
                    content: preview.base64,
                  },
                };

                createCollectible(collectible)
                  .then(res => {
                    setShowPopup(true);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
        }

        // await createCollectible({name:name, royalties:royalties, price:price, tokenIds:tokenId, name:collection, file:{fileName: file[0].name, mediaType: type}});
      } else {
        setShowNotApproved(true);
      }
    }

    /*if (!chainId) return
        if (!account) return

        setOpenSubmitModal(true)

        const fileFormData = new FormData()
        const coverFormData = new FormData()

        fileFormData.append('files', data.file[0])
        const files = [uploadFile(fileFormData)]

        if (data.cover) {
            coverFormData.append('files', data.cover[0])
            files.push(uploadFile(coverFormData))
        }

        const uploadedFiles = await tryUploadFiles(files)

        if (uploadedFiles) {
            const type = isSingle ? TokenType.SINGLE : TokenType.MULTIPLE

            const [fileResponse, coverResponse] = uploadedFiles
            const thumbnail = coverResponse?.[0]?.formats?.medium?.url ?? fileResponse?.[0]?.formats?.medium?.url
            const metadata = { name: data.name, description: data.description, copiesCount: data.copiesCount, royalties: data.royalties, file: fileResponse[0].url, cover: coverResponse ? coverResponse[0].url : undefined }
            const metaResponse: TempTokenData = await uploadMetaData(metadata, account, type, thumbnail)

            //setTempToken(metaResponse)
            //await tryCreateItem(metaResponse)
        }*/
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;

    if (!imageFile) return;

    const file = imageFile[0];
    const src = URL.createObjectURL(file);
    const type = file.type.split('/')[0];

    // convert to base64
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview({
        // update file or cover
        ...preview,
        [e.target.name]: src,

        // update type of file or cover
        type: e.target.name === 'cover' ? preview.type : type,
        base64: typeof reader.result == 'string' ? reader.result : '',
        imagetype: typeof reader.result == 'string' ? reader.result.split(';')[0].replace('data:', '') : '',
      });
    };
  };
  const [showPopup, setShowPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.name, e.target.value.split(/\D/).join(''));
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index = 0;
    setValue(
      e.target.name,
      e.target.value
        .replace(/[^\d.,]/g, '') //replace everything but valid symbols
        .replace(/,/g, '.') // replace comma to dot
        .replace(/\./g, (item: string) => (!index++ ? item : '')) // replace all but the first occurence of dot
    );
  };
  const isErrors = () => Object.keys(errors).length >= 1;
  const previewFields = watch(['name', 'copiesCount', 'unlockContent', 'price']);
  const handleTryAgain = () => {
    if (tempToken) {
      setCreateTokenError('');
      tryCreateItem(tempToken);
    }
  };
  useEffect(() => {
    if (!OpenSubmitModal) {
      setCreateTokenError('');
      setTempToken(null);
    }
  }, [OpenSubmitModal]);

  const { price } = previewFields;
  const ethAmount = price ? price - price * 0.025 : 0;
  const usdAmount = price ? convertEthToUsd(price, currency) : '0.00';

  const handleTransferToken = async (addr: any) => {
    console.log(addr);
    const promise: any = [];
    const collectibleIds: any = [];
    console.log(contractTokenIds);
  const lowerAddr = addr.toLowerCase();
    if(lowerAddr!=''){
      for (let i = 0; i < contractTokenIds.length; i++) {
        collectibleIds.push(getCollectibleByTokenId(contractTokenIds[i]));
      }
      Promise.all(promise)
        .then(result => {
          console.log(result);
          const ids = result.map((item: any) => item.id);
          for (let i = 0; i < ids.length; i++) {
            promise.push(web3Contract.transferCollectible(ids[i], lowerAddr));
          }
        })
        .catch(err => console.log(err.message));
  
      Promise.all(promise)
        .then(async(result) => {
          console.log(result);
          //api
          const allIds = collectibleIds.map((item:any) => item.id)
          for(let i=0; i<allIds.length;i++){

            await transferCollectibles(allIds[i], lowerAddr);
          }
        })
        .catch(err => console.log(err.message));
    }
    }
    

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.settings}>
          <div className={classes.upload}>
            <div className={classes.subtitle}>{text['uploadFile']}</div>
            <div className={clsx(classes.uploadWrapper, { [classes.uploadError]: errors.file })}>
              <input
                accept={ALL_SUPPORTED_TYPES}
                className={classes.input}
                ref={register}
                onChange={handleFileChange}
                id='uploadFile'
                name='file'
                type='file'
                hidden
              />

              {!preview.file ? (
                <div>
                  <div>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</div>
                  <label htmlFor='uploadFile'>
                    <Button component='span' className={classes.chooseBtn}>
                      {text['chooseFile']}
                    </Button>
                  </label>
                </div>
              ) : (
                <div className={classes.uploadPreview}>
                  {preview.type === 'image' && <img src={preview.file} />}
                  {preview.type === 'audio' && <audio src={preview.file} controls />}
                  {preview.type === 'video' && <video src={preview.file} controls />}
                </div>
              )}

              {preview.file && (
                <IconButton
                  className={classes.closeBtn}
                  onClick={() => {
                    setValue('file', null);
                    setPreview({ file: '', cover: '', type: '', base64: '', imagetype: '' });
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </div>
          </div>
          {errors.file && <p className={classes.textError}>{errors.file.message}</p>}
          {(preview.type === 'video' || preview.type === 'audio') && (
            <div className={classes.upload}>
              <div className={classes.subtitle}>{text['uploadCover']}</div>
              <div className={clsx(classes.uploadWrapper, { [classes.uploadError]: errors.cover })}>
                <input
                  accept={VAlID_IMAGES_TYPES}
                  className={classes.input}
                  onChange={handleFileChange}
                  ref={register}
                  name='cover'
                  id='uploadCover'
                  type='file'
                  hidden
                />

                {!preview.cover ? (
                  <div>
                    <div>JPG, PNG, GIF or WEBP. Max 30mb.</div>
                    <label htmlFor='uploadCover'>
                      <Button component='span' className={classes.chooseBtn}>
                        {text['chooseFile']}
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className={classes.uploadPreview}>
                    <img src={preview.cover} />
                  </div>
                )}

                {preview.cover && (
                  <IconButton
                    className={classes.closeBtn}
                    onClick={() => {
                      setValue('cover', null);
                      setPreview({ ...preview, cover: '' });
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </div>
            </div>
          )}
          {errors.cover && <p className={classes.textError}>{errors.cover.message}</p>}
          {!celebrity && (
            <FormControl className={classes.controls}>
              <Controller
                name='onSale'
                control={control}
                render={props => (
                  <FormControlLabel
                    control={
                      <Switch
                        inputRef={register}
                        onChange={e => props.onChange(e.target.checked)}
                        checked={props.value}
                      />
                    }
                    classes={{ root: classes.switchLabel }}
                    labelPlacement='start'
                    label={
                      <span>
                        <span className={classes.onSale}>{text['putOnSale']}</span>
                      </span>
                    }
                  />
                )}
              />
              <Controller
                name='onAuction'
                control={control}
                render={props => (
                  <FormControlLabel
                    control={
                      <Switch
                        inputRef={register}
                        onChange={e => props.onChange(e.target.checked)}
                        checked={props.value}
                      />
                    }
                    classes={{ root: classes.switchLabel }}
                    labelPlacement='start'
                    label={
                      <span>
                        <span className={classes.onSale}>{text['putOnAuction']}</span>
                        <span>{text['youWillReceiveBids']}</span>
                      </span>
                    }
                  />
                )}
              />

              {watch('onSale') && (
                <div>
                  <FormControlLabel
                    control={<Switch inputRef={register} name='unlock' />}
                    classes={{ root: classes.switchLabel }}
                    labelPlacement='start'
                    label={
                      <span>
                        <span className={classes.unlock}>{text['unlockOncePurchased']}</span>
                        <span>{text['unlockOncePurchasedContent']}</span>
                      </span>
                    }
                  />

                  {watch('unlock') && (
                    <div className={classes.input}>
                      <Input
                        placeholder='Digital key, code to redeem or link to a file...'
                        inputRef={register}
                        name='unlockContent'
                        disableUnderline
                      />
                      <span>markDownIsSupported {text['markdownIsSupported']}</span>
                    </div>
                  )}
                </div>
              )}
            </FormControl>
          )}
          <div className={classes.subtitle}>Put your Price</div>
     
          {/* <FormControlLabel
            control={<Switch inputRef={register} name='instantPrice' />}
            classes={{ root: classes.switchLabel }}
            labelPlacement='start'
            label={
              <span>
                <span className={classes.price}>{text['instantSalePrice']}</span>
                <span>{text['enterThePriceForInstantlySold']}</span>
              </span>
            }
          /> */}

          {watch('instantPrice') && (
            <div className={classes.input}>
              <Input
                placeholder='Enter price for one piece'
                onChange={handlePriceInput}
                inputRef={register}
                name='price'
                disableUnderline
              />
              <div className={classes.priceInfo}>
                <span>{'%2.5'}</span>
                {/* <span>{t('youWillReceiveCnt', { count: ethAmount, currency: 'ETH', amount: usdAmount })}</span> */}
              </div>

              {errors.price && <p className={classes.textError}>{errors.price.message}</p>}
            </div>
          )}

          {/*<div className={classes.collectionType}>
                        <div className={classes.subtitle}>{t('chooseCollection')}</div>
                        <div className={classes.cards}>
                            <Controller name="collection" control={control}
                                as={
                                    <Button className={clsx(classes.card, {[classes.cardActive]:watch('collection') === 'new'})}
                                        onClick={() => setValue('collection', 'new')}>
                                        <PlusCircle />
                                        <span className={classes.cardName}>{t('create')}</span>
                                        <span className={classes.cardDscr}>ERC-721</span>
                                    </Button>
                                }
                            />
                            <Controller name="collection" control={control}
                                as={
                                    <Button className={clsx(classes.card, {[classes.cardActive]:watch('collection') === 'sart'})}
                                        onClick={() => setValue('collection', 'sart')}>
                                        <LogoIcon />
                                        <span className={classes.cardName}>Satoshi.ART</span>
                                        <span className={classes.cardDscr}>SART</span>
                                    </Button>
                                }
                            />
                        </div>
                    </div>*/}
          <div className={classes.propertiesWrapper}>
            <div className={classes.input}>
              <label htmlFor='collection' className={classes.label}>
                {/* <Trans i18nKey='Collection' components={{ 1: <span /> }} /> */}
              </label>
              <Input
                id='collection'
                placeholder='e. g. “loren ipsum lormspum loren”'
                inputRef={register}
                name='collection'
                disableUnderline
              />
            </div>
            <div className={clsx(classes.input, { [classes.inputError]: errors.name })}>
              <label htmlFor='name' className={classes.label}>
                {text['name']}
              </label>
              <Input
                id='name'
                placeholder='e. g. “Redeemable T-Shirt with logo”'
                name='name'
                inputRef={register}
                disableUnderline
              />

              {errors.name && <p className={classes.textError}>{errors.name.message}</p>}
            </div>
            <div className={classes.input}>
              <label htmlFor='description' className={classes.label}>
                {/* <Trans i18nKey='descriptionOptional' components={{ 1: <span /> }} /> */}
              </label>
              <Input
                id='description'
                placeholder='e. g. “After purchasing you’ll be able to get the real Tee”'
                inputRef={register}
                name='description'
                disableUnderline
              />
              <span>With preserved line-breaks</span>
            </div>
            <div className={clsx({ [classes.sizes]: !isSingle })}>
              <div className={clsx(classes.input, { [classes.inputError]: errors.royalties })}>
                <label htmlFor='royalties' className={classes.label}>
                  {text['royalties']}
                </label>
                <Input
                  id='royalties'
                  // defaultValue='10'
                  onChange={handleNumberInput}
                  inputRef={register}
                  disableUnderline
                  name='royalties'
                  endAdornment={<span>%</span>}
                />
                <span>Suggested: 20%, 30%</span>
                {errors.royalties && <p className={classes.textError}>{errors.royalties.message}</p>}
              </div>
              {!isSingle && (
                <div className={classes.input}>
                  <label htmlFor='copiesCount' className={classes.label}>
                    {text['numberOfCopies']}
                  </label>
                  <Input
                    id='copiesCount'
                    placeholder='e. g. 10'
                    inputRef={register}
                    onChange={handleNumberInput}
                    disableUnderline
                    name='copiesCount'
                  />
                  {errors.copiesCount && <p className={classes.textError}>{errors.copiesCount.message}</p>}
                </div>
              )}
            </div>
            {/* {watch('onAuction') && (
              <div className={classes.input}>
                <label htmlFor='size' className={classes.label}>
                  {/* <Trans i18nKey='propertiesOptional' components={{ 1: <span /> }} /> }
                  Start and End Date
                </label>
                <div>
                  <div>
                    <Input
                      id='size'
                      placeholder='YYYY-MM-DD HH:MM'
                      disableUnderline
                      inputRef={register}
                      name='properties.name'
                    />
                    {errors.properties && (
                      <p className={classes.textError}>
                        {errors.properties.name ? errors.properties.name.message : ''}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder='YYYY-MM-DD HH:MM'
                      disableUnderline
                      inputRef={register}
                      name='properties.value'
                    />
                    {errors.properties && (
                      <p className={classes.textError}>
                        {errors.properties.value ? errors.properties.value.message : ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )} */}
          </div>
          <div className={classes.footer}>
            <Button disabled={isErrors()} type='submit'>
              {text['createItem']}
            </Button>
            {itemCreated ? <span>Creating item in progress....</span> : ''}
            {onSale && (
              <>
                <span>Item created successfully!</span>
                <span>Putting item on sale in progress...</span>
              </>
            )}
            {onAuction && (
              <>
              <span>Item created successfully!</span>
              <span>Putting item on auction in progress...</span>
            </>
            )}
            {confirmOnAuction ? <span>Item is on auction now!</span> : ''}
            {confirmOnSale ? <span>Item is on sale now!</span> : ''}
          </div>

          {isErrors() && (
            <p className={classes.textError}>
              There were some issues. Please see above what you need to fix and try again. The button will be enabled
              after you apply your changes.
            </p>
          )}
        </div>
      </form>

      <Preview
        fileSrc={preview.type === 'image' ? preview.file : preview.cover}
        fields={previewFields}
        isSingle={isSingle}
        handleTransferToken={handleTransferToken}
        celebrity={celebrity}
      />

      <ProgressModal
        createTokenError={createTokenError}
        onTryAgain={handleTryAgain}
        open={OpenSubmitModal}
        onClose={() => setOpenSubmitModal(!OpenSubmitModal)}
      />

      <Popup
        open={showPopup}
        textheader='Created collectible;;You successfully created a collectible, please check the dashboard'
        onClose={() => {
          setShowPopup(false);
        }}
      ></Popup>
      <Popup
        open={showFailedPopup}
        textheader='Create collectible;;You failed to create a collectible. Please try again'
        onClose={() => setShowFailedPopup(false)}
      ></Popup>
      <Popup
        open={showOptionFailedPopup}
        textheader='Please select one option. Either Put onSale or Put onAuction'
        onClose={() => setShowOptionFailedPopup(false)}
      ></Popup>
      <Popup
        open={showNotApproved}
        textheader='Sorry, you are not approved artist!'
        onClose={() => setShowNotApproved(false)}
      ></Popup>
    </div>
  );
};

export default CreateForm;
function res(res: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}
