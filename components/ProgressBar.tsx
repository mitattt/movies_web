import {motion} from 'framer-motion';

export const ProgressBar = ({value, max}: {value: number; max: number}) => {
  const percentage = (value / max) * 100;

  return (
    <motion.div
      className="bg-yellow-600 w-full h-4 rounded-sm overflow-hidden"
      initial={{width: 0}}
      animate={{width: `${percentage}%`}}
      transition={{duration: 1, delay: 0.6}}></motion.div>
  );
};
