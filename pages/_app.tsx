import {AppProps} from 'next/app';
import {Layout} from '../components/Layout';
import {UserContextProvider} from '../components/Context';
import '../styles/404.css';
import '../styles/global.css';
import React, {useEffect, useState} from 'react';
import gsap from 'gsap';

export default function App({Component, pageProps}: AppProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const detectDeviceType = () => {
      const userAgent = navigator.userAgent;
      setIsDesktop(!/Mobi|Android/i.test(userAgent));
    };

    detectDeviceType();

    const handleResize = () => {
      detectDeviceType();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.set('.ball', {xPercent: -50, yPercent: -50});

    const xTo = gsap.quickTo('.ball', 'x', {duration: 0.6, ease: 'power3'});
    const yTo = gsap.quickTo('.ball', 'y', {duration: 0.6, ease: 'power3'});

    const handleMouseMove = e => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isDesktop]);

  return (
    <UserContextProvider>
      <Layout>
        {isDesktop && (
          <div
            className="ball border-[3px] border-white border-width-3 w-[50px] h-[50px] fixed top-0 left-0 rounded-full z-[9999]"
            style={{pointerEvents: 'none'}}></div>
        )}
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
