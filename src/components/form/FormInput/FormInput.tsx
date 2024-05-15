import { FunctionComponent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { WithClassNames } from '@/types/classNames';

interface FormInputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        WithClassNames<'container' | 'error'> {
    name: string;
    displayErrors?: boolean;
    label?: string;
}

const FormInput: FunctionComponent<FormInputProps> = ({
    name,
    label,
    className,
    classNames,
    displayErrors = true,
    ...inputProps
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
            <input
                className={cn(
                    'font-normal text-xl w-full px-8 py-4 rounded-full text-white border-0 bg-primary autofill:bg-primary outline-none',
                    'placeholder:text-center placeholder:text-xl placeholder:lg:text-3xl placeholder:text-secondaryLight',
                    className
                )}
                {...register(name)}
                {...inputProps}
            />

            {displayErrors && errors && (
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

export default FormInput;
