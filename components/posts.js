import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';



export default function Post(props) {
    const useStyles = makeStyles(theme => ({
        root: props => ({
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundImage: `url('${props.image}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }),
        screen: {
            width: '100%',
            height: '100%',
            position: 'absolute'
        },
        toolbar: {
            position: 'absolute',
            width: '100%',
        },
        logoHolder: {
            width: '12%'
        },
        logo: {
            maxWidth: '100%'
        },
        textbox: {
            width: '100%',
            backgroundColor: theme.palette.transBlack.main,
            borderRadius: '0.5em',
            padding: theme.spacing(2),
            color: 'white',
            height: '50%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        textBoxHolder: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: '0%',
            padding: theme.spacing(1),
            display: 'flex',
            alignItems: 'flex-end'
        },
        text: {
            fontWeight: 'bold'
        },
        siteLink: {
            position: 'absolute',
            bottom: '2%',
        }
    }))

    const classes = useStyles(props);

    return (
        <div className={classes.root} id="sorosoke_post">
            <div className={classes.screen}></div>
            <Toolbar className={classes.toolbar}>
                <div className={classes.logoHolder}>
                    <img src="/icon.png" alt="logo" className={classes.logo} />
                </div>
            </Toolbar>
            <div className={classes.textBoxHolder}>
                <div className={classes.textbox}>
                    <Typography variant="h5" className={classes.text}>
                        {props.content}
                    </Typography>
                    <Typography variant="body2" className={classes.siteLink}>
                        sorosoke.xyz
                    </Typography>
                </div>
            </div>

        </div>
    )
}

