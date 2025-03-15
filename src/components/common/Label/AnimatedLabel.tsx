import { motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/utils/cn';

interface AnimatedLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color: 'primary' | 'accent';
  icon?: React.ReactNode;
}

const colorVariants: Record<string, string> = {
  primary: 'bg-primary-500 text-gray-800 w-[46px]',
  accent: 'bg-accent-600 text-gray-100 w-[60px]',
};

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({
  children,
  color = 'primary',
  icon,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center !text-label-small h-[20px] overflow-hidden rounded-full px-2',
        colorVariants[color],
      )}
      {...props}
    >
      {icon && <span className="flex items-center pl-[18px]">{icon}</span>}
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedLabel;
