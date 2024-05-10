import type { HTMLAttributes } from 'react';

type ClassNames<T extends string | number | symbol> = Record<
    T,
    HTMLAttributes<HTMLElement>['className']
>;

type ClassNamesObject<T extends string | number | symbol> = Partial<
    ClassNames<T>
>;

export type WithClassNames<T extends string | number | symbol> = {
    classNames?: ClassNamesObject<T>;
};
