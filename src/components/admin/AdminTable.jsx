const AdminTable = ({ headers, children }) => {
    return (
      <div className="overflow-x-auto rounded-[24px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="border-b text-left text-greyText">
              {headers.map((header, index) => (
                <th key={index} className="pb-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
  
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  };
  
  export default AdminTable;