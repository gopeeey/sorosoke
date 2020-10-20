import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    IconButton,
    TextField,
    Button,
    Typography,
    Modal,
    Fade,
    Backdrop
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { CompressImage } from '../src/compress';
import { useRouter } from 'next/router';
import PopUp from './post_popup';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(3),
        minHeight: '100%'
    },
    imagebox: {
        width: '100%',
        minHeight: '100vw',

        [theme.breakpoints.up('sm')]: {
            minHeight: '60vw',
            maxHeight: '60vw',
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: '40vw',
            maxHeight: '40vw',
        },
        backgroundColor: theme.palette.grey[300],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    textbox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center'
        }
    },
    iconButton: {
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.5s',
    },
    iconButtonHolder: {
        position: 'absolute',

    },
    postImage: {
        maxWidth: '100%'
    },
    submit: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2)
    },
    iconandlabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    modal: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalRoot: {
        outline: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '70%'
        }
    }
}))

export default function CreatePost(props) {
    const classes = useStyles();
    const router = useRouter();
    const post_type = router ? (
        router.query.posttype
    ) : (null);

    const [postImage, changePostImage] = React.useState(null);
    const [content, changeContent] = React.useState(null);
    const [contentError, changeContentError] = React.useState(null);
    const [open, changeOpen] = React.useState(false);

    const imagePreview = (image) => {
        const reader = new FileReader();
        reader.onload = function () {
            changePostImage(reader.result);
        }
        reader.readAsDataURL(image)
    }

    const countContent = (text) => {
        if (text.length) {
            if (post_type === "short") {
                console.log(text.length)
                if (text.length > 90) {
                    changeContentError('Short posts have a maximum of 90 characters')
                } else {
                    changeContentError(null);
                }
            } else {
                if (text.length > 750) {
                    changeContentError('Long posts have a maximum of 750 characters')
                } else {
                    changeContentError(null);
                }
            }
        } else {
            changeContentError('This field cannot be left blank')
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'post_image') {
            if (e.target.files[0]) {
                CompressImage(e.target.files[0], 1500).then(res => {
                    imagePreview(res);
                })
            }
        }
        if (e.target.name === 'content') {
            if (e.target.value) {
                countContent(e.target.value);
                changeContent(e.target.value);
            }
        }
    }

    const handleClose = () => {
        changeOpen(false);
    }

    const handleSubmit = () => {
        changeOpen(true);
    }

    return (
        <div className={classes.root} id="create_root">
            <Modal
                aria-labelledby="post"
                aria-describedby="a_post_panel"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className={classes.modal}
            >
                <Fade in={open}>
                    <div className={classes.modalRoot}>
                        <PopUp
                            post_type={post_type}
                            image={postImage}
                            content={content}
                            close={() => { handleClose() }} />
                    </div>
                </Fade>
            </Modal>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <div
                        className={classes.imagebox}
                    >
                        <input
                            accept="image/*"
                            name="post_image"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                            id="post_image"
                            type="file" />
                        <label htmlFor="post_image" className={classes.iconButtonHolder}>
                            <span className={classes.iconandlabel}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="upload picture"
                                    component="span">
                                    <PhotoCamera color="secondary" />
                                </IconButton>
                                {postImage ? (null) : (
                                    <Typography variant="body1">Background Image</Typography>
                                )}
                            </span>
                        </label>
                        {postImage ? (
                            <img src={postImage} alt="post image" className={classes.postImage} />
                        ) : (null)}

                    </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <div className={classes.textbox}>
                        <TextField
                            error={contentError ? (true) : (false)}
                            id="content"
                            name="content"
                            label="Say something"
                            variant="outlined"
                            fullWidth
                            multiline
                            onChange={handleChange}
                            helperText={contentError}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={(contentError || !content) ? (true) : (false)}
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}