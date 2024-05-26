import { auth } from '@/auth';
import { UpdateProfileInfoForm } from '@/components/auth';
import { Container } from '@/components/common';
import { getUsersData } from '@/server/getUsersData';

const MyProfilePage = async () => {
    const sessionData = auth();
    const usersData = getUsersData();

    const [users, session] = await Promise.all([usersData, sessionData]);

    const user = users.find((user) => user.email === session?.user?.email);

    if (!user) {
        throw new Error('Klaida gaunant profilio informaciją');
    }

    return (
        <Container>
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-20">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Vartotojo informacija
                    </h1>
                    <UpdateProfileInfoForm
                        currentName={user.userName}
                        currentSurname={user.userSurname}
                        currentEmail={user.email}
                    />
                </div>
            </div>
        </Container>
    );
};

export default MyProfilePage;
