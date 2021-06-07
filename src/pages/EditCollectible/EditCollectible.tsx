import React, { useState, useEffect } from 'react'
import { styled, Grid, FormControl, FormHelperText, Input, Select, MenuItem, TextField, IconButton, Typography, Theme } from '@material-ui/core'
import text from 'constants/content';
import { ExpandIcon, GreySaveIcon, ViewsIcon, LikeIcon, SaveIcon, DotsIcon, LeftArrowIcon } from 'components/icons'
import { VALID_VIDEO_TYPES, VALID_AUDIO_TYPES } from 'constants/supportedFileTypes'
import { getCollectible, putCollectibleOnSale, removeCollectibleFromSale } from 'apis/collectibles'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Layout from 'components/layout'
import Button from 'components/button'
import Avatar from 'components/avatar'

const IconWrapper = styled(Grid)(
    ({ dots, theme }: { dots?: boolean; theme: Theme }) => ({
        width: dots ? 82 : 40,
        height: 40,
        marginRight: dots ? 0 : 13,
        backgroundColor: `${theme.custom.common.blackColor}80`,
        borderRadius: 20,
        display: 'flex',
    })
)

import useStyles from './EditCollectible.style'

const COLLECTION_OPTIONS = ['onSale']

export default function EditCollectible() {
	const classes = useStyles()
	const { id } = useParams<{ id: string }>();
	const [info, setInfo] = useState({
		status: "",
		thumbnailUrl: "",
		name: "",
		price: 0,
	})
	const [priceError, setPriceError] = useState(false)
	const renderSwitch = (url: string) => {
        const extension = url.split('.').pop()

        if (extension) {
            switch (true) {
                case VALID_VIDEO_TYPES.includes(extension):
                    return <video src={url} controls />
                case VALID_AUDIO_TYPES.includes(extension):
                    return <audio src={url} controls />
                default:
                    return <img src={url} />
            }
        }
    }

    useEffect(() => {
    	if (id) {
    		getCollectible(id)
    			.then(({ data }) => {
    				const newInfo = {...info}

    				newInfo.status = data.status
    				newInfo.thumbnailUrl = data.thumbnailUrl ? data.thumbnailUrl : '/collectible-image.jpeg'
    				newInfo.name = data.name
    				newInfo.price = data.price

    				setInfo(newInfo)
    			})
    	}
    }, [])

    const putOnSale = () => {
    	const { status, price } = info
    	const data = { price: price, status: status }

    	if (price) {
    		putCollectibleOnSale(id, data)
	    		.then(() => {
	    			location.replace('/dashboard/user')
	    		})
    	} else {
    		setPriceError(true)
    	}
    }

    const removeFromSale = () => {
    	removeCollectibleFromSale(id)
    		.then(() => {
    			location.replace('/dashboard/user')
    		})
    }

	return (
		<Layout>
			<div className={classes.headers}>
				<Link className={classes.goBack} to="/"><LeftArrowIcon /> {text['backToHomePage']}</Link>
				<Typography variant="h2">Collectible editing</Typography>
			</div>
			<div className={classes.container}>
				<div className={classes.leftCol}>
					<div className={classes.fileWrapper}>
	                    {renderSwitch(info.thumbnailUrl)}
	                </div>
	            </div>
				<div className={classes.rightCol}>
					<div className={classes.rightColContainer}>
						<div className={classes.rightColHeader}>
							<Typography variant="h6" className={classes.artLabel}>ART</Typography>
							<Typography variant="h1">{info.name}</Typography>
						</div>

						{/*<div className={classes.ownerContainer}>
		                    <div className={classes.imageWrapper}>
		                        <Avatar size={48} alt="Profile photo" status="premium" image="https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240"/>
		                    </div>
		                    <div className={classes.artistInfo}>
		                        <Typography variant="subtitle1" className={classes.artistRole}>{text['owner']}</Typography>
		                        <a target="_blank" rel="noreferrer" href={`https://ropsten.etherscan.io/address/djfkdsfjldskjfds`}>
		                            <Typography variant="h3">dsjfkdlsjfldksjf</Typography>
		                        </a>
		                    </div>
		                </div>*/}

						<div className={classes.form}>
							<FormControl className={classes.fieldGroup}>
				                <label htmlFor="type">Collectible current price</label>
				                <Input id="type" name="type" onChange={(e) => {
				                	const newInfo = {...info, price: Number(e.target.value) }

				                	setInfo(newInfo)
				                }} value={info.price}/>
				                {priceError && <small className={classes.inputError}>{text['fieldIsRequired']}</small>}
				                <Button variantCustom="action" type="submit">Change price</Button>
				            </FormControl>

				            <FormControl className={classes.fieldGroup}>
				                <label htmlFor="issue">Collection</label>
				                <Select id="issue" name="issue">
				                    {COLLECTION_OPTIONS.map((issue: string, index: number) => (
				                        <MenuItem value={index} key={index} onClick={() => {
				                        	const newInfo = {...info, status: issue}

				                        	setInfo(newInfo)
				                        }}>{text[issue]}</MenuItem>
				                    ))}
				                </Select>
				                <Button variantCustom="action" type="submit" onClick={() => {

				                	setInfo({...info, status: "remove"})
				                }}>Remove From Sale</Button>
				            </FormControl>
				        </div>
			            <div className={classes.submits}>
			            	<Button variantCustom="action" onClick={() => putOnSale()}>Put on Sale</Button>
			            	<Button variantCustom="action" type="submit">Put on Auction</Button>
			            </div>
			        </div>
		        </div>
	        </div>
		</Layout>
	)
}
