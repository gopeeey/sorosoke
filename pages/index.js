import { NextSeo } from 'next-seo'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import CreatePost from '../components/postcreate';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '93vh',
  },
  bannerRoot: {
    width: '100%',
    height: '93vh',
    backgroundImage: "url('/images/banner_xlarge.jpg')",
    [theme.breakpoints.down('lg')]: {
      backgroundImage: "url('/images/banner_large.jpg')",
    },
    [theme.breakpoints.down('md')]: {
      backgroundImage: "url('/images/banner_nslarge.jpg')",
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: "url('/images/banner_normal.jpg')",
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: "url('/images/banner_normal.jpg')",
    },
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  screen: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.palette.transBlack.light,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(7)
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(10)
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(15)
    }
  },
  bigText: {
    display: 'block',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.transWhite.nslight,
    padding: theme.spacing(2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 1)
    },
    margin: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'center'
  },
  textBox: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '75%',
    },
    [theme.breakpoints.up('md')]: {
      width: '55%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '43%'
    }
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}))

export default function Home() {
  const classes = useStyle();

  const handleClick = () => {
    if (document) {
      document.getElementById('create_root').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
  }
  return (
    <div className={classes.root}>
      <NextSeo
        title="Sorosoke | Speak Up"
        description="Generate short but meaningful picture posts to express your feelings on any topic."
        canonical="https://www.sorosoke.xyz"
        openGraph={{
          url: 'https://www.sorosoke.xyz',
          title: 'Sorosoke',
          description: 'Generate short but meaningful picture posts to express your feelings on any topic.',
          images: [
            {
              url: 'https://www.sorosoke.xyz/logo.png',
              width: 480,
              height: 150,
              alt: 'Sorosoke logo',
            },
          ],
        }}
      />
      <div className={classes.bannerRoot}>
        <div className={classes.screen}>
          <div className={classes.textBox}>
            <Typography variant="h5">Don't keep it in,</Typography>
            <Typography variant="h3" className={classes.bigText}>EXPRESS YOURSELF!</Typography>
            <Typography variant="body1">Generate a sorosoke picture post to air your feelings. Speak up!</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick}>
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <CreatePost />
    </div>
  )
}
