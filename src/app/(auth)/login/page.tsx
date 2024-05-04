import { LoginForm } from '@/components/auth';
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

const LoginPage = async () => {
    return (
        <Card className="max-w-[540px] w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login with email and password</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
                <div className="text-sm">
                    <span className="text-muted-foreground">
                        Don&apos;t have an account?
                    </span>
                    <Button asChild variant="link" size="sm" className="pl-1">
                        <Link href={ROUTES.AUTH.REGISTER}>Register</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;
