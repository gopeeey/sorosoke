import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Post from './posts';
import htmlToImage from 'html-to-image';
import download from 'downloadjs';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '95vh',
        [theme.breakpoints.up('sm')]: {
            height: '90vw'
        },
        [theme.breakpoints.up('md')]: {
            height: '80vw'
        },
        [theme.breakpoints.up('lg')]: {
            height: '50vw'
        },
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    postHolder: {
        width: '100%',
        height: '110vw',
        [theme.breakpoints.up('sm')]: {
            width: '80%',
            height: '60vw',
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
            height: '50vw'
        },
        [theme.breakpoints.up('lg')]: {
            width: '40%',
            height: '35vw'
        }
    },
    button: {
        padding: theme.spacing(2),
        width: '100%',
        marginTop: theme.spacing(3)
    },
    closeicon: {
        position: 'absolute',
        top: '2%',
        right: '2%'
    }
}));

export default function PopUp(props) {
    const classes = useStyles();

    const [loading, changeLoading] = React.useState(false);

    const handleClick = () => {
        changeLoading(true);
        if (document) {
            htmlToImage.toJpeg(
                document.getElementById('sorosoke_post'), { quality: 1 }
            )
                .then(function (dataUrl) {
                    download(dataUrl, 'sorosoke.jpg');
                    changeLoading(false);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        }

    }

    return (
        <div className={classes.root}>
            <IconButton
                className={classes.closeicon}
                onClick={() => { props.close() }}>
                <CloseIcon />
            </IconButton>
            <div className={classes.postHolder}>
                <Post
                    image={props.image}
                    content={props.content} />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClick}>
                    {loading ? (<CircularProgress color="secondary" size={25} />) : ("Download")}
                </Button>

            </div>

        </div>
    )
}