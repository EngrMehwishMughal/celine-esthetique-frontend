const AdminTable = ({ headers, children }) => {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[22px] border border-[#F1E4E8] bg-white">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] border-collapse font-body text-sm">
          <thead className="bg-[#FAF7F5]">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[1.5px] text-greyText"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F1E4E8]">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;