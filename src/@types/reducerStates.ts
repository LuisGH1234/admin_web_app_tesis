export interface IBaseState {
    loading: boolean;
    error?: boolean;
    /** Error message */
    message?: string;
}

export interface IListState<T> extends IBaseState {
    data: T[];
}

export interface IListStatePaginated<T> extends IListState<T> {
    totalPages: number;
    totalItems: number;
    page: number;
}

export interface IObjectState<T> extends IBaseState {
    value?: T;
}

export interface IProcessState extends IBaseState {
    success: boolean;
}
