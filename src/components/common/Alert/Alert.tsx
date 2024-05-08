import { VariantProps, cva } from 'class-variance-authority';
import { FunctionComponent, ReactNode } from 'react';

const alertVariantStyles = cva(
    'flex items-center justify-center rounded-full bg-white text-xl border w-full border-black px-4 py-2 text-lg',
    {
        variants: {
            variant: {
                error: 'text-error',
                success: 'text-success',
                information: 'text-primary',
            },
        },
        defaultVariants: {
            variant: 'error',
        },
    }
);

interface AlertProps extends VariantProps<typeof alertVariantStyles> {
    children: ReactNode;
    className?: string;
}

const Alert: FunctionComponent<AlertProps> = ({
    variant,
    className,
    children,
}) => {
    return (
        <div
            className={alertVariantStyles({
                variant,
                className,
            })}
        >
            {children}
        </div>
    );
};

export default Alert;
