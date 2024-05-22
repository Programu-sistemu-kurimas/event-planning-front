import { Guest } from '@/types/guest';
import { FunctionComponent } from 'react';

interface GuestsListProps {
    guests: Guest[];
}

const GuestsList: FunctionComponent<GuestsListProps> = ({ guests }) => {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <span className="text-xl lg:text-3xl font-normal">Svečiai</span>
            <div className="min-h-28 max-h-56 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {guests.map(({ id, guestName, guestSurname }) => (
                        <p
                            className="text-lg lg:text-2xl font-normal capitalize"
                            key={`guest-${id}`}
                        >
                            {guestName} {guestSurname}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestsList;
