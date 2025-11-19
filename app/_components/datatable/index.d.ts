interface DataTableProps {
    columns: DataTableColumn[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchData: () => Promise<Record<string, any>[]>
    useOptions?: boolean
}


interface DataTableColumn {
    header: string,
    field: string,
    tableCell: (data: Record<string, unknown>) => JSX.Element
}