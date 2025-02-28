import { ButtonProps } from './Button.types';
import { cn } from '@/utils/styles';

const Button = ({
  color = 'primary',
  children,
  className,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const colorStyles = {
    primary: 'bg-primary text-text hover:bg-primary-dark',
    secondary:
      'bg-secondary text-text-secondary hover:bg-secondary-dark focus:ring-neutral-300 ring-1 ring-inset ring-gray-300',
    error: 'bg-red text-text hover:bg-red-dark focus:ring-error-light',
  };

  const variantStyles = disabled
    ? 'disabled-area cursor-not-allowed text-gray-50'
    : colorStyles[color];

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex h-11 w-fit items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition shadow-theme-xs duration-150 cursor-pointer',
        variantStyles,
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
