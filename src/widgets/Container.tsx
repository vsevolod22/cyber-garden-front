import { cn } from '@/utils/lib/utils';

interface ContainerProps {
   className?: string;
   children: React.ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => {
   return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
