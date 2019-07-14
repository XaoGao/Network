export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPage: number;
}

export class PaginatednResult<T> {
    result: T;
    pagintion: Pagination;
}
