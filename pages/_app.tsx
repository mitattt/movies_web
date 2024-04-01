import {AppProps} from 'next/app';
import {Layout} from '../components/Layout';
import {UserContextProvider} from '../components/Context';
import '../styles/404.css';
import '../styles/global.css';
import React, {useEffect} from 'react';
import gsap from 'gsap';

export default function App({Component, pageProps}: AppProps) {
  useEffect(() => {
    gsap.set('.ball', {xPercent: -50, yPercent: -50, scale: 0});
    let targets = gsap.utils.toArray('.ball');
    window.addEventListener('mousemove', e => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: 'power1.out',
        overwrite: 'auto',
        stagger: 0.02,
        scale: 1.4,
      });
    });
  }, []);

  return (
    <UserContextProvider>
      <Layout>
        <div
          className="ball bg-yellow-500 w-4 h-4 fixed top-0 left-0 rounded-full z-[9999]"
          style={{pointerEvents: 'none'}}></div>
        <div
          className="ball bg-yellow-500 w-4 h-4 fixed top-0 left-0 rounded-full z-[9999]"
          style={{pointerEvents: 'none'}}></div>
        <div
          className="ball bg-yellow-500 w-4 h-4 fixed top-0 left-0 rounded-full z-[9999]"
          style={{pointerEvents: 'none'}}></div>
        <div
          className="ball bg-yellow-500 w-4 h-4 fixed top-0 left-0 rounded-full z-[9999]"
          style={{pointerEvents: 'none'}}></div>
        <div
          className="ball bg-yellow-500 w-4 h-4 fixed top-0 left-0 rounded-full z-[9999]"
          style={{pointerEvents: 'none'}}></div>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
