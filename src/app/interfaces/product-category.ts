export interface ProductCategory {
  id: number,
  name: string,
  name_en?: string,
  name_hy?: string,
  name_ru?: string,
  displayName?: string,
  selected?: boolean,
  items: any[],
}
