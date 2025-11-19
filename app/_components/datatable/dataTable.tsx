"use client";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DataTable({
  columns,
  fetchData,
  useOptions = false,
}: DataTableProps): JSX.Element {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {});
  return (
    <>
      <div className="border">
        <table>
          <thead>
            <tr></tr>
          </thead>
        </table>
      </div>
    </>
  );
}
