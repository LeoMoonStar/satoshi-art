import React from 'react'
import {
    Button,
    FormControl,
    FormControlLabel,
    Input,
    Switch,
} from '@material-ui/core'
import { LogoIcon, PlusCircle } from 'shared/icons'

import useStyles from './CreateForm.style'

type PropertyType = {
    name: string
    value: string
}

type CollectibleType = {
    file: string
    settings: {
        onSale: boolean
        price: boolean
        unlock: boolean
    }
    collection: string
    fields: {
        name: string
        description: string
        royalties: string
        properties: Array<PropertyType>
    }
}

type CreateFormProps = {
    onChange: (field: string, value: string | boolean) => void
    collectible: CollectibleType
}

const CreateForm = ({
    onChange,
    collectible,
}: CreateFormProps): JSX.Element => {
    const classes = useStyles()
    const {
        file,
        settings,
        collection,
        fields: { description, royalties, properties },
    } = collectible
    const change = (field: string, value: string | boolean) => {
        console.log({ field, value })
        console.log(value)
    }
    return (
        <div className={classes.settings}>
            <div className={classes.upload}>
                <div className={classes.subtitle}>Upload file</div>
                <div className={classes.uploadWrapper}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        value={file}
                        hidden
                    />
                    <div>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</div>
                    <label htmlFor="contained-button-file">
                        <Button component="span" className={classes.chooseBtn}>
                            Choose File
                        </Button>
                    </label>
                </div>
            </div>
            <FormControl className={classes.controls}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.onSale}
                            onChange={(e) =>
                                onChange('settings.onSale', e.target.checked)
                            }
                            name="onSale"
                        />
                    }
                    classes={{
                        root: classes.switchLabel,
                    }}
                    labelPlacement="start"
                    label={
                        <span>
                            <span className={classes.onSale}>Put on sale</span>
                            <span>You’ll receive bids on this item</span>
                        </span>
                    }
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.price}
                            onChange={(e) =>
                                onChange('settings.price', e.target.checked)
                            }
                            name="price"
                        />
                    }
                    classes={{
                        root: classes.switchLabel,
                    }}
                    labelPlacement="start"
                    label={
                        <span>
                            <span className={classes.price}>
                                Instant sale price
                            </span>
                            <span>
                                Enter the price for which the item will be
                                instantly sold
                            </span>
                        </span>
                    }
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.unlock}
                            onChange={(e) =>
                                onChange('settings.price', e.target.checked)
                            }
                            name="unlock"
                        />
                    }
                    classes={{
                        root: classes.switchLabel,
                    }}
                    labelPlacement="start"
                    label={
                        <span>
                            <span className={classes.unlock}>
                                Unlock once purchased
                            </span>
                            <span>
                                Content will be unlocked after successful
                                transaction
                            </span>
                        </span>
                    }
                />
            </FormControl>
            <div className={classes.collectionType}>
                <div className={classes.subtitle}>Choose collection</div>
                <div className={classes.cards}>
                    <Button className={classes.card}>
                        <PlusCircle />
                        <span className={classes.cardName}>Create</span>
                        <span className={classes.cardDscr}>ERC-721</span>
                    </Button>
                    <Button className={classes.card}>
                        <LogoIcon />
                        <span className={classes.cardName}>Satoshi.ART</span>
                        <span className={classes.cardDscr}>SART</span>
                    </Button>
                </div>
            </div>
            <div className={classes.propertiesWrapper}>
                <div className={classes.input}>
                    <div className={classes.label}>Name</div>
                    <Input
                        placeholder="e. g. “Redeemable T-Shirt with logo”"
                        name=""
                        inputProps={{ 'aria-label': 'description' }}
                        required
                        disableUnderline
                    />
                </div>
                <div className={classes.input}>
                    <div className={classes.label}>Description</div>
                    <Input
                        placeholder="e. g. “After purchasing you’ll be able to get the real Tee”"
                        inputProps={{ 'aria-label': 'description' }}
                        disableUnderline
                    />
                    <span>With preserved line-breaks</span>
                </div>
                <div className={classes.input}>
                    <div className={classes.label}>Royalties</div>
                    <Input
                        defaultValue="10"
                        inputProps={{ 'aria-label': 'description' }}
                        disableUnderline
                        required
                        endAdornment={<span>%</span>}
                    />
                    <span>Suggested: 10%, 20%, 30%</span>
                </div>
                <div className={classes.input}>
                    <div className={classes.label}>
                        Properties<span>(Optional)</span>
                    </div>
                    <div className={classes.sizes}>
                        <Input
                            placeholder="e. g. Size"
                            inputProps={{
                                'aria-label': 'description',
                            }}
                            disableUnderline
                        />
                        <Input
                            placeholder="e. g. M"
                            inputProps={{
                                'aria-label': 'description',
                            }}
                            disableUnderline
                        />
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <Button>Create item</Button>
                <div>Unsaved changes</div>
            </div>
        </div>
    )
}

export default CreateForm
