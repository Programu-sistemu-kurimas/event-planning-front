import { Button, Container } from '@/components/common';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const HomePage = () => {
    return (
        <Container>
            <div className="flex flex-col gap-20 mt-32">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Renginių planavimo programėlė
                    </h1>
                    <p className="text-xl xl:text-3xl max-w-2xl xl:max-w-4xl">
                        Mūsų programėlė suteikia viską, ko reikia lengvam ir
                        maloniam renginių planavimui. Tik keletas paspaudimų –
                        ir jūsų šventė bus tobulai suplanuota!
                    </p>
                </div>
                <div className="flex gap-x-10 gap-y-5 w-full items-center sm:flex-row flex-col">
                    <Link href={ROUTES.AUTH.LOGIN} className="w-full sm:w-auto">
                        <Button variant="secondary" className="w-full">
                            Prisijungti
                        </Button>
                    </Link>
                    <Link
                        href={ROUTES.AUTH.REGISTER}
                        className="w-full sm:w-auto"
                    >
                        <Button variant="primary" className="w-full">
                            Registruotis
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
