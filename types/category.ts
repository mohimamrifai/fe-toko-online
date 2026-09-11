export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  parentId: string | null;
}

export interface CategoryResponse {
  data: Category[];
}
