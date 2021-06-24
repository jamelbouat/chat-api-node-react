import React, { useEffect, useState } from 'react';

import useWindowDimensions from '../utils/useWindowDimensionsHook';
import Spinner from './Spinner';

const HomeBackgroundImage: React.FC = () => {
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
        image.onerror = () => {
            setSrc('');
            setLoading(false);
        };
    }, [url]);

    return(
        <div>
            {
                isLoading ? <Spinner /> :
                    <img
                        src={ src }
                        alt='Image not loaded'
                    />
            }
        </div>
    );
};

export default HomeBackgroundImage;
