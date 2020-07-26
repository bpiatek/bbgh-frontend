// Common classes and interfaces

export class Pagination {
  public constructor (
    public page: number,
    public size: number
  ) {
    this.page = page
    this.size = size
  }
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export class Sort {
  constructor (
    public name: string,
    public direction: SortDirection
  ) {
    this.name = name
    this.direction = direction
  }
}

export interface PaginatedData<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export class ListSearchParams extends URLSearchParams {
  constructor (pagination: Pagination, sorts: Sort[]) {
    super()
    this.append('page', pagination.page ? pagination.page.toString() : '0')
    this.append('size', pagination.size ? pagination.size.toString() : '20')
    sorts.forEach((s) => { this.append('sort', s.name + ',' + s.direction) })
  }
}
