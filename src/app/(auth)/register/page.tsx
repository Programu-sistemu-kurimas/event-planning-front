import { RegisterForm } from '@/components/auth';
import { Button } from '@/components/common/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/common/Card';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const RegisterPage = async () => {
    return (
        <Card className="max-w-[540px] w-full">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Enter the following information to register
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <CardFooter>
                <div className="text-sm">
                    <span className="text-muted-foreground">
                        Already have an account?
                    </span>
                    <Button asChild variant="link" size="sm" className="pl-1">
                        <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default RegisterPage;
