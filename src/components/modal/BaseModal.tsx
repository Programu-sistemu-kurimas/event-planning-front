'use client';
import { ModalKeys } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useEffect, useCallback, FunctionComponent } from 'react';

type BaseModalProps = {
    title: string;
    children: React.ReactNode;
    modalKey: ModalKeys;
};
const BaseModal: FunctionComponent<BaseModalProps> = ({
    title,
    children,
    modalKey,
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const modalRef = useRef<null | HTMLDialogElement>(null);

    const isModalVisible = searchParams.get(modalKey);

    const closeModal = useCallback(() => {
        router.push(pathname, {
            scroll: false,
        });
        modalRef.current?.close();
    }, [pathname, router]);

    useEffect(() => {
        if (isModalVisible) {
            modalRef.current?.showModal();

            return;
        }

        closeModal();
    }, [isModalVisible, closeModal]);

    if (!isModalVisible) {
        return null;
    }

    return (
        <dialog
            ref={modalRef}
            onClick={(e) =>
                e.target === modalRef.current && router.push(pathname)
            }
            className="z-10 flex items-center justify-center backdrop:backdrop-blur-sm bg-transparent w-full"
        >
            <div className="relative rounded-xl shadow-md bg-white w-full text-black max-w-2xl px-16 py-10">
                <button
                    onClick={closeModal}
                    className="absolute right-12 text-2xl top-6 font-bold text-black"
                >
                    X
                </button>
                <div className="flex flex-col w-full gap-10">
                    <span className="text-center text-3xl font-bold uppercase">
                        {title}
                    </span>
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default BaseModal;
