import {useEffect, useRef} from 'react';
import {IVideo} from '../types/Video';

export const Video = ({video}: {video: IVideo}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
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
        title="Video"></iframe>
    </div>
  );
};
