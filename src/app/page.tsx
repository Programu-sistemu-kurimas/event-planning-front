import { auth } from '@/auth';

const HomePage = async () => {
    const session = await auth();
    return <main>{JSON.stringify(session, null, 2)}</main>;
};

export default HomePage;
