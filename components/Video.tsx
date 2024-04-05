import {useEffect, useRef, useState} from 'react';
import {IVideo} from '../types/Video';

export const Video = ({video}: {video: IVideo}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);

  useEffect(() => {
    const resizeIframe = () => {
      if (iframeRef.current) {
        const newHeight = (iframeRef.current.offsetWidth * 9) / 16;
        setIframeHeight(newHeight);
      }
    };

    resizeIframe();

    window.addEventListener('resize', resizeIframe);

    return () => {
      window.removeEventListener('resize', resizeIframe);
    };
  }, []);

  return (
    <div>
      <div>
        <h2>title</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        ref={iframeRef}
        width="100%"
        height={iframeHeight || 0}
        title="Video"></iframe>
    </div>
  );
};
