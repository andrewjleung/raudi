import { Dispatch, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;
export type State<T> = [T, Setter<T>];
