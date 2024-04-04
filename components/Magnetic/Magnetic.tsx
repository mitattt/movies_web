import React, {ReactElement, useEffect, useRef} from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
}

export const Magnetic: React.FC<MagneticProps> = ({children}) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magneticElement = magneticRef.current;
    if (!magneticElement) return;

    const xTo = gsap.quickTo(magneticElement, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    const yTo = gsap.quickTo(magneticElement, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const {clientX, clientY} = e;
      const {width, height, left, top} =
        magneticElement.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.5);
      yTo(y * 0.5);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magneticElement.addEventListener('mousemove', handleMouseMove);
    magneticElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magneticElement.removeEventListener('mousemove', handleMouseMove);
      magneticElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, {ref: magneticRef});
};
