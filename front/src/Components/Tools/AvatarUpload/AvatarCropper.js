import React, {useState, useCallback} from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';
import {getCroppedImg} from './canvasUtils'
import ArrowBack from '@mui/icons-material/ArrowBack';
import {
    Avatar,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel
} from "@mui/material";
import {LoadingButton} from "@mui/lab";


const useStyles = makeStyles(theme => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16,
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    sliderLabel: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 65,
        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
}))


export default function AvatarCropper({
                                        imageSrc,
                                        handleSave,
                                        open,
                                        handleClose,
                                        isBp
                                    }) {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isForGroup, setIsForGroup] = useState(false)
    const classes = useStyles()

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    async function handleCloseWithReset(isToSave) {
        handleClose()
        if (isToSave) {
            setIsLoading(true)
            await handleSave(croppedImage, isForGroup)
            setIsLoading(false)
        }
        setCroppedImage(null)
        setZoom(1)
        setRotation(0)
    }


    if (!!croppedImage) {
        return (
            <Dialog open={!!croppedImage} fullWidth maxWidth={"lg"}>
                <DialogTitle>
                    Preview
                </DialogTitle>
                <DialogContent style={{
                    background: "lightgray"
                }}>
                    <div style={{
                        position: 'relative',
                        flex: 1,
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{ width: 380, height: 380 }} src={croppedImage} alt={'cropped preview'}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<ArrowBack/>} variant={"contained"} style={{marginRight: "auto"}} color={"primary"} onClick={() => {
                        setCroppedImage('')
                    }}>
                        Back
                    </Button>
                    {isBp &&
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isForGroup}
                                    onChange={() => {
                                        setIsForGroup(!isForGroup)
                                    }}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Apply to the whole group"
                        />
                    }
                    <Button variant={"contained"} color={"secondary"} onClick={() => {
                        handleCloseWithReset(false)
                    }}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        onClick={() => {
                            handleCloseWithReset(true)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <Dialog open={open} fullWidth maxWidth={"lg"} >
            <DialogTitle>Update photo</DialogTitle>
            <div className={classes.cropContainer}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    restrictPosition={false}
                    cropSize={{width: 380, height: 380}}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    minZoom={0.1}
                    cropShape={'round'}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{root: classes.sliderLabel}}
                    >
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={0.1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        classes={{root: classes.slider}}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{root: classes.sliderLabel}}
                    >
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        classes={{root: classes.slider}}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </div>
                <Button
                    onClick={() => handleCloseWithReset(false)}
                    variant="contained"
                    color={"secondary"}
                    classes={{root: classes.cropButton}}
                >
                    Cancel
                </Button>
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{root: classes.cropButton}}
                >
                    Show Result
                </Button>
            </div>
        </Dialog>
    )
}