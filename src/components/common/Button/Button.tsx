import { cva, VariantProps } from 'class-variance-authority';
import { FC, HTMLProps } from 'react';

const buttonVariantStyles = cva(
    'flex items-center justify-center text-white shrink-0 font-normal rounded-full hover:bg-opacity-80',
    {
        variants: {
            variant: {
                primary: 'bg-primary',
                secondary: 'bg-secondary',
                green: 'bg-success',
                darkGreen: 'bg-successDark',
                red: 'bg-errorLight',
                custom: '',
            },
            size: {
                sm: 'px-2 py-1 text-lg xl:text-2xl',
                md: 'px-4 py-2 text-lg xl:text-3xl',
                lg: 'px-8 py-4 text-lg xl:text-3xl',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'lg',
        },
    }
);

interface ButtonProps
    extends Omit<HTMLProps<HTMLButtonElement>, 'size'>,
        VariantProps<typeof buttonVariantStyles> {
    type?: 'button' | 'submit';
    className?: string;
}

const Button: FC<ButtonProps> = ({
    type = 'button',
    children,
    variant,
    size,
    className,
    ...buttonProps
}) => {
    return (
        <button
            type={type}
            className={buttonVariantStyles({
                variant,
                size,
                className,
            })}
            {...buttonProps}
        >
            {children}
        </button>
    );
};

export default Button;
