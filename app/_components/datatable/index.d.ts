import { IconType } from "react-icons";

interface DataTableProps {
  columns: DataTableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (queryParams?: FetchDataQueryParams) => Promise<Record<string, any>[]>;
  useOptions?: boolean;
  options?: DataTableOption[];
  selectedData?: (data: Record<string, unknown>) => void;
  refreshKey?: number;
}

interface DataTableColumn {
  header: string;
  field: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableCellComponent?: (data: T extends Record<string, any> ? T : Record<string, unknown>) => JSX.Element;
}

interface DataTableOption {
  label: string;
  icon: IconType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: T extends Record<string, any> ? T : Record<string, unknown>) => void;
}

interface FetchDataQueryParams {
  [key: string]: string | number;
}