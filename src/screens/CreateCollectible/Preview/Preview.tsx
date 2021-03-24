import React from 'react'
import useStyles from './Preview.style'

const Preview = (): JSX.Element => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.preview}>
                <div className={classes.subtitle}>Preview</div>
                <div className={classes.previewArea}>
                    <div className={classes.info}>
                        Preview of your new collectible
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview
