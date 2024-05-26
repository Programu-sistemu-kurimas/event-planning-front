import { FunctionComponent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { WithClassNames } from '@/types/classNames';
import { Option } from '@/types/form';

interface FormSelectProps
    extends React.InputHTMLAttributes<HTMLSelectElement>,
        WithClassNames<'container' | 'error'> {
    name: string;
    options: Option[];
    label?: string;
}

const FormSelect: FunctionComponent<FormSelectProps> = ({
    name,
    label,
    options,
    className,
    classNames,
    ...selectProps
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
            <select
                className={cn(
                    'font-normal text-xl w-full px-6 border-primary py-4 rounded-3xl text-white border-x-8 bg-primary outline-none',
                    'placeholder:text-center placeholder:text-xl placeholder:lg:text-3xl placeholder:text-secondaryLight',
                    className
                )}
                {...register(name)}
                {...selectProps}
            >
                {options.map(({ label, value }) => (
                    <option value={value} key={`${name}-${value}`}>
                        {label}
                    </option>
                ))}
            </select>
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

export default FormSelect;
