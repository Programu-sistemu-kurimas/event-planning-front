import { Container } from '@/components/common';

const ArchivedProjectsPage = () => {
    return (
        <Container>
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-10">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Jūsų archyvuoti projektai:
                    </h1>
                </div>
            </div>
        </Container>
    );
};

export default ArchivedProjectsPage;
