import { auth } from '@/auth';
import { isAdmin, isOwner } from '@/lib/utils';
import { Worker } from '@/types/worker';

export const useRole = async (workers: Worker[]) => {
    const session = await auth();

    const loggedInWorker = workers.find(
        (worker) => worker.email === session?.user?.email
    );

    return {
        isOwner: loggedInWorker && isOwner(loggedInWorker?.role),
        isAdmin: loggedInWorker && isAdmin(loggedInWorker?.role),
        isUser: !isAdmin && !isOwner,
    };
};
