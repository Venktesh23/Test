import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

const Table = <T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  isLoading = false,
}: TableProps<T>) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-usf-green-600"></div>
        <p className="mt-2 text-usf-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-usf-gray-200 shadow-sm">
        <div className="text-usf-gray-400 text-lg">No data available</div>
        <p className="text-usf-gray-500 text-sm mt-1">Add some items to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-usf-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-usf-gray-200">
          <thead className="bg-usf-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-usf-gray-700 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-left text-xs font-semibold text-usf-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-usf-gray-200">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-usf-gray-25'
                } hover:bg-usf-green-50 transition-colors duration-150`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-usf-gray-900">
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-usf-green-600 hover:text-usf-green-800 font-medium transition-colors duration-150"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors duration-150"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table; 