import { Container } from '@/components/common';
import { TaskCreationForm } from '@/components/task';

const TaskCreationPage = () => {
    return (
        <Container>
            <div className="flex flex-col mt-24 gap-12">
                <h1 className="text-2xl xl:text-4xl font-bold">
                    Naujos užduoties kūrimas
                </h1>
                <TaskCreationForm />
            </div>
        </Container>
    );
};

export default TaskCreationPage;
