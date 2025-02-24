export interface Pageable<T> {
  data: T[];
  nextCursor: number;
  hasNext: false;
}
