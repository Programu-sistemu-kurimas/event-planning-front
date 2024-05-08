import { FunctionComponent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const FormInput: FunctionComponent<FormInputProps> = ({
    name,
    className,
    ...inputProps
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="flex flex-col gap-2 items-center">
            <input
                className={cn(
                    'font-normal text-xl w-full px-8 py-4 rounded-full text-white active:outline-secondary border-0 focus:outline-2 focus:outline-secondary bg-primary outline-none',
                    'placeholder:text-center placeholder:text-3xl placeholder:text-secondaryLight',
                    className
                )}
                {...register(name)}
                {...inputProps}
            />

            {errors && (
                <div className="text-xl text-error">
                    <ErrorMessage errors={errors} name={name} />
                </div>
            )}
        </div>
    );
};

export default FormInput;
