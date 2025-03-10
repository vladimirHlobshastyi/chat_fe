import { ButtonProps } from './Button.types';
import { cn } from '@/utils/styles';

const Button = ({
  color = 'primary',
  children,
  className,
  disabled,
  fullScreen,
  onClick,
  ...rest
}: ButtonProps) => {
  const colorStyles = {
    primary: 'bg-primary text-text-primary hover:bg-primary-dark',
    secondary:
      'bg-secondary text-text-secondary hover:bg-secondary-dark focus:ring-neutral-300 ring-1 ring-inset ring-gray-300',
    error:
      'bg-destructive text-text-primary hover:bg-destructive-dark focus:ring-error-light',
  };

  const variantStyles = disabled
    ? 'disabled-area cursor-not-allowed text-gray-50'
    : colorStyles[color];

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex h-11 w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition shadow-theme-xs duration-150 cursor-pointer',
        variantStyles,
        !fullScreen && 'max-w-max',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
