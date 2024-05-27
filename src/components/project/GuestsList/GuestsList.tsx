import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import { Guest } from '@/types/guest';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface GuestsListProps {
    guests: Guest[];
    isEditable?: boolean;
}

const GuestsList: FunctionComponent<GuestsListProps> = ({
    guests,
    isEditable = true,
}) => {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <span className="text-xl lg:text-3xl font-normal">Svečiai</span>
            <div className="min-h-28 max-h-56 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {guests.map(({ id, guestName, guestSurname }) => (
                        <div
                            className="flex items-center gap-2"
                            key={`guest-${id}`}
                        >
                            <p
                                className="text-lg lg:text-2xl font-normal capitalize"
                                key={`guest-${id}`}
                            >
                                {guestName} {guestSurname}
                            </p>
                            {isEditable && (
                                <Link
                                    href={getModalLink(ModalKeys.RemoveGuest, {
                                        guestId: id,
                                    })}
                                    scroll={false}
                                    className="hover:bg-transparent/20 rounded px-2"
                                >
                                    -
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestsList;
