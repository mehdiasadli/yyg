import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial='initial'
      whileHover='hovered'
      className={cn('relative inline-block overflow-hidden', className)}
      style={{
        lineHeight: 1.4,
      }}
    >
      <div>
        {children.split('').map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: '-100%',
                },
              }}
              transition={{
                ease: 'easeInOut',
                delay,
              }}
              className='inline-block'
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className='absolute inset-0'>
        {children.split('').map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: '100%',
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: 'easeInOut',
                delay,
              }}
              className='inline-block'
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default TextRoll;
