import { FunctionComponent } from 'react';

interface FormErrorProps {
    message?: string;
}

const FormError: FunctionComponent<FormErrorProps> = ({ message }) => {
    if (!message) {
        return null;
    }

    return <span className="text-error text-xl">{message}</span>;
};

export default FormError;
