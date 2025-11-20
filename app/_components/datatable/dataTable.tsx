import { useEffect, useRef, useState } from "react";
import { DataTableProps } from ".";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DataTable({ options = [], ...props }: DataTableProps) {
  //eslint-disable-next-line
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await props.fetchData();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Error, failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.refreshKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuIndex]);

  return (
    <div className="p-6 rounded-md shadow-lg bg-gray-50">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              {props.columns.map((column, index) => (
                <th
                  key={index}
                  className=" max-w-fit px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column.header}
                </th>
              ))}
              {props.useOptions && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              /* State 1: Loading */
              <tr>
                <td colSpan={props.columns.length + 1}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={props.columns.length + 1}>
                  <div className="flex items-center justify-center gap-2">
                    <span>No data found</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-100 transition-colors border-b border-gray-300"
                >
                  {props.columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="max-w-fit px-4 py-3 text-sm "
                    >
                      {column.tableCellComponent ? (
                        column.tableCellComponent(item)
                      ) : (
                        <>{item[column.field]}</>
                      )}
                    </td>
                  ))}

                  {props.useOptions && (
                    <td>
                      <div className="relative">
                        <button
                          className="hover:cursor-pointer relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (openMenuIndex === rowIndex) {
                              setOpenMenuIndex(null);
                            } else {
                              setOpenMenuIndex(rowIndex);
                            }
                          }}
                        >
                          <div className="ring p-0.5 ring-blue-500 rounded-full hover:bg-blue-100">
                            <BsThreeDotsVertical className="text-blue-500" />
                          </div>
                        </button>
                      </div>

                      {openMenuIndex === rowIndex && (
                        <div
                          ref={menuRef}
                          className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 right-10"
                        >
                          {options?.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No options available
                            </div>
                          ) : (
                            <div className="flex flex-col items-start min-w-[150px]">
                              {options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  className="px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:cursor-pointer text-left"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    option.onClick(item);
                                    setOpenMenuIndex(null);
                                  }}
                                >
                                  <div className="flex items-center justify-start gap-2">
                                    {option.icon && <option.icon />}
                                    {option.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
