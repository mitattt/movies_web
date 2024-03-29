import {Video} from './Video';
import {IVideo} from '../types/Video';

export const VideoList = ({list}: {list: IVideo[]}) => {
  return (
    <ul>
      {list.map((video, index) => (
        <Video video={video} key={index}></Video>
      ))}
      ;
    </ul>
  );
};
