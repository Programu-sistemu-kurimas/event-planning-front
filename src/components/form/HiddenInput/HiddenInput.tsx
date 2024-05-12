import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

interface HiddenInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const HiddenInput: FunctionComponent<HiddenInputProps> = ({
    name,
    ...inputProps
}) => {
    const { register } = useFormContext();

    return <input hidden {...register(name)} {...inputProps} />;
};

export default HiddenInput;
