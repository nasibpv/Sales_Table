import React, { useState } from 'react';

function Index() {
    const data = Array.from({ length: 40 }, (_, index) => {
        const startDate = new Date(2025, 0, 1); 
        const endDate = new Date(2025, 11, 31); 
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate - startDate));

        return {
            salesId:`IN00${index + 1}`,
            Customer: `Cus${index + 1}`,
            quantity: Math.floor(Math.random() * 50) + 1,
            Amount: (Math.floor(Math.random() * 100) + 1) * 10,
            dates: randomDate.toISOString().split('T')[0],
        };
    });

    const [sortedData, setSortedData] = useState(data);
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [sortConfig, setSortConfig] = useState({ key: 'salesId', direction: 'asc' });
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        const sorted = [...filteredData].sort((a, b) => {
            if (key === 'dates') {
                // For date sorting, compare as Date objects
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            if (key === 'Amount' || key === 'quantity' || key === 'salesId') {
                // For numeric fields, compare values directly
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            }
            // For string fields (like Customer or Product)
            return direction === 'asc'
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        });

        setFilteredData(sorted);
        setSortConfig({ key, direction });
    };
    const handleSearchAndFilter = () => {

      const filtered = data.filter(item => {
          const matchesSearchQuery = item.Customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.Product.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesDateRange = (!fromDate || new Date(item.dates) >= new Date(fromDate)) &&
              (!toDate || new Date(item.dates) <= new Date(toDate));

          return matchesSearchQuery && matchesDateRange;
      });
      if(fromDate&&toDate){
        setFilteredData(filtered);
        setFromDate('')
        setToDate('')
      }
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(item =>
        item.Customer.toLowerCase().includes(query) 
    );
    setFilteredData(filtered);
};

    return (
        <div className=''>
            <nav className="fixed w-full top-0">
                <div className="w-full bg-blue-500 p-3">
                    <h3 className="text-gray-100">Dashboard</h3>
                </div>
            </nav>

            <div className=" container mx-auto p-5 pt-20">
            <div className="">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search by Customer</label>
            <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="border p-1 rounded w-full md:w-72"
                placeholder="Search by Customer"
            />
    <div className="flex flex-row md:flex-row items-start md:items-center">
        <div className="mb-4 md:mb-0 md:mr-4">
           
        </div>

        <div className="mb-4 md:mb-0 md:mr-4">
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
            <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-1 rounded w-full md:w-72"
                placeholder="From Date"
            />
        </div>

        <div className="mb-4 md:mb-0 md:mr-4">
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
            <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border p-1 rounded w-full md:w-72"
                placeholder="To Date"
            />
        </div>

        <button
            onClick={handleSearchAndFilter}
            className="border p-1 rounded-xl bg-blue-500 text-white ml-4 w-20 md:w-20 mt-4 md:mt-4"
        >
            Search
        </button>
    </div>
</div>

                <h1 className="text-xl font-bold mb-3 mt-4">Sales Invoice</h1>
                <div className="overflow-x-auto text-sm">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border p-2 cursor-pointer" onClick={() => handleSort('salesId')}>
                                    Invoice No
                                    {sortConfig.key === 'salesId' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                                </th>
                                <th
                                    className="border p-2 cursor-pointer"
                                    onClick={() => handleSort('Customer')}
                                >
                                    Customer Name
                                </th>
                                <th
                                    className="border p-2 cursor-pointer"
                                    onClick={() => handleSort('dates')}
                                >
                                    Date
                                    {sortConfig.key === 'dates' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                                </th>
                                <th
                                    className="border p-2 cursor-pointer hidden sm:block"
                                    onClick={() => handleSort('quantity')}
                                >
                                    Quantity
                                </th>
                                <th
                                    className="border p-2 cursor-pointer"
                                    onClick={() => handleSort('Amount')}
                                >
                                    Amount
                                    {sortConfig.key === 'Amount' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((item) => (
                                <tr key={item.salesId} className="odd:bg-gray-50">
                                    <td className="border p-2">{item.salesId}</td>
                                    <td className="border p-2">{item.Customer}</td>
                                    <td className="border p-2">{item.dates}</td>
                                    <td className="border p-2 hidden sm:block">{item.quantity}</td>
                                    <td className="border p-2">{item.Amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Index;
