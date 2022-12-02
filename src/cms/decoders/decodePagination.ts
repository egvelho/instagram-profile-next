export type PaginationData = {
  page: number;
  pageCount: number;
  total: number;
};

export function decodePagination(data: any): PaginationData {
  const {
    page = 0,
    pageCount = 0,
    total = 0,
  } = data && data.posts.meta ? data.posts.meta.pagination : {};

  return {
    page,
    pageCount,
    total,
  };
}
