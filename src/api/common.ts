// Common classes and interfaces

import { AxiosResponse } from 'axios'

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

  static fromString (string: string): Sort {
    const splited = string.split(',')
    if (splited.length === 1) {
      return new Sort(splited[0], SortDirection.asc)
    } else {
      return new Sort(splited[0], splited[1] === 'desc' ? SortDirection.desc : SortDirection.asc)
    }
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

export type ListResponse<T> = Promise<AxiosResponse<PaginatedData<T>>>
