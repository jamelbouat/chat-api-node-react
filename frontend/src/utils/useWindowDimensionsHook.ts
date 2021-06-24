import { useState, useEffect } from 'react';

interface WindowDimensions {
    width: number,
    height: number
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleWindowResize = () => {
        setWindowDimensions(getWindowDimensions());
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;
