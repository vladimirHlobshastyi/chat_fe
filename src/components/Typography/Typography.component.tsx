import { cn } from '@/utils/styles';
import { TextProps } from './Typography.types';

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
};

export const Text = ({
  weight = 'normal',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <p className={cn('text-base', weightStyles[weight], className)} {...rest}>
      {children}
    </p>
  );
};

export const H1 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h1
      className={cn('text-gray-800', weightStyles[weight], className)}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const H2 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h2
      className={cn('text-gray-800', weightStyles[weight], className)}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const H3 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h3
      className={cn('text-gray-800', weightStyles[weight], className)}
      {...rest}
    >
      {children}
    </h3>
  );
};

export const H4 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h4
      className={cn('text-gray-800', weightStyles[weight], className)}
      {...rest}
    >
      {children}
    </h4>
  );
};

export const H5 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h5 className={cn(weightStyles[weight], className)} {...rest}>
      {children}
    </h5>
  );
};

export const H6 = ({
  weight = 'bold',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <h6 className={cn(weightStyles[weight], className)} {...rest}>
      {children}
    </h6>
  );
};

export const Span = ({
  weight = 'normal',
  className,
  children,
  ...rest
}: TextProps) => {
  return (
    <span
      className={cn('text-gray-700', weightStyles[weight], className, {
        ...rest,
      })}
    >
      {children}
    </span>
  );
};
