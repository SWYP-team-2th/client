import { motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/utils/cn';

interface AnimatedLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type: 'bestPick' | 'isPicked';
}

const typeVariants: Record<string, string> = {
  bestPick: 'bg-accent-600 text-gray-100 w-[60px]',
  isPicked: 'bg-primary-500 text-gray-800 w-[46px]',
};

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({
  children,
  type = 'bestPick',
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center !text-label-small h-[20px] overflow-hidden rounded-full',
        typeVariants[type],
      )}
      {...props}
    >
      <motion.div
        className="flex absolute left-0 whitespace-nowrap"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedLabel;
