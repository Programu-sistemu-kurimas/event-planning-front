import { FunctionComponent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { WithClassNames } from '@/types/classNames';

interface FormTextAreaProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement>,
        WithClassNames<'container' | 'error'> {
    name: string;
    rows?: number;
    cols?: number;
    label?: string;
}

const FormTextArea: FunctionComponent<FormTextAreaProps> = ({
    name,
    label,
    className,
    classNames,
    ...textAreaProps
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div
            className={cn(
                'flex flex-col gap-2 items-center',
                classNames?.container
            )}
        >
            {label && (
                <span className="text-secondaryLight text-xl lg:text-3xl self-start">
                    {label}
                </span>
            )}
            <textarea
                className={cn(
                    'font-normal text-xl w-full px-8 py-6 rounded-full text-white active:outline-secondary border-0 focus:outline-2 focus:outline-secondary bg-primary outline-none',
                    className
                )}
                {...register(name)}
                {...textAreaProps}
            />

            {errors && (
                <div
                    className={cn(
                        'text-xl text-error self-start',
                        classNames?.error
                    )}
                >
                    <ErrorMessage errors={errors} name={name} />
                </div>
            )}
        </div>
    );
};

export default FormTextArea;
