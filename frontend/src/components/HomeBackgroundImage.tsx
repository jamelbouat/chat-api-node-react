import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../utils/useWindowDimensionsHook';

const HomeBackgroundImage: React.FC<any> = () => {
    const { width, height } = useWindowDimensions();
    const [ imgUrl, setImgURL ] = useState('');

    useEffect(() => {
        const url = `https://picsum.photos/${ width }/${ height } `;
        setImgURL(url);
    }, []);

    return(
        <div>
            <img src={ imgUrl } alt='No image'/>
        </div>
    );
};

export default HomeBackgroundImage;
