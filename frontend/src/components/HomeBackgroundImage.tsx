import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../utils/useWindowDimensionsHook';
import Spinner from './Spinner';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        spinner: {
            position: 'absolute',
            top: '50vh',
            left: '50vw'
        }
    }),
);

const HomeBackgroundImage: React.FC = () => {
    const classes = useStyles();
    const { width, height } = useWindowDimensions();
    const [ isLoading, setLoading ] = useState(true);
    const [ src, setSrc ] = useState('');
    const url = `https://picsum.photos/${ width }/${ height }`;

    useEffect(() => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            setSrc(url);
            setLoading(false);
        };
    }, [url]);

    return(
        <div>
            {
                isLoading ? <Spinner className={ classes.spinner }/> :
                    <img
                        src={ src }
                        alt='Image not loaded'
                    />
            }
        </div>
    );
};

export default HomeBackgroundImage;
