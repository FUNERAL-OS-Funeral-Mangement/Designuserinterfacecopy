import { cn } from '@/components/ui/utils';

interface SectionHeadingProps {
  pill?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  className?: string;
}

export const SectionHeading = ({
  pill,
  title,
  subtitle,
  center,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn("mb-10", center && "text-center mx-auto max-w-3xl", className)}>
      {pill && <div className={cn("mb-4", center && "flex justify-center")}>{pill}</div>}
      <h2 className={cn("text-4xl sm:text-5xl text-gray-900 mb-4", center && "lg:text-6xl")}>
        {title}
      </h2>
      {subtitle && <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>}
    </div>
  );
};

