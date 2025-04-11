import { useContext } from 'react';
import { SalesDataContext } from '../context/SalesDataContext';

function Index() {
    const {
        loading, paginatedData, sortConfig, setSortConfig,
        currentPage, setCurrentPage, totalPages,
        pageSize, setPageSize, totalRecords, dateRange, statusFilter,
        setDateRange, setStatusFilter
,searchTerm,setSearchTerm    } = useContext(SalesDataContext);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getArrow = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='p-2 bg-white text-black dark:bg-gray-800 dark:text-white min-h-screen'> 
            <h2 className="text-2xl font-semibold mb-2 mt-2">Sales Table</h2>

            <div className="mb-2  gap-3  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:continer  p-4 w-full">
            <div className='mb-3 md:mb-0 md:mr-4'>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
                <input
    id="search"
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-1 rounded w-full md:w-72 dark:bg-gray-700 dark:text-white"
    placeholder="Search by any field"
/>
                </div>
                <div className="mb-3 md:mb-0 md:mr-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value||'')}
                        className="border p-1.5 rounded w-full md:w-64 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div className="mb-3 md:mb-0 md:mr-4">
                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
                    <input
                        id="fromDate"
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="border p-1 rounded w-full md:w-64 dark:bg-gray-700 dark:text-white"
                        placeholder="From Date"
                    />
                </div>

                <div className="mb-3 md:mb-0 md:mr-4">
                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
                    <input
                        id="toDate"
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="border p-1 rounded w-full md:w-64 dark:bg-gray-700 dark:text-white"
                        placeholder="To Date"
                    />
                </div>
            </div>

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                        <th onClick={() => handleSort('sale')} className="cursor-pointer">Invoice No {getArrow('salesId')}</th>
                        <th onClick={() => handleSort('date')} className="cursor-pointer hidden sm:inline">Date {getArrow('dates')}</th>
                        <th onClick={() => handleSort('customerName')} className="cursor-pointer">Customer {getArrow('customerName')}</th>
                        <th onClick={() => handleSort('product')} className="cursor-pointer">Product {getArrow('product')}</th>
                        <th onClick={() => handleSort('quantity')} className="cursor-pointer hidden sm:table-cell">Qty {getArrow('quantity')}</th>
                        <th onClick={() => handleSort('unitPrice')} className="cursor-pointer hidden sm:table-cell">Unit Price {getArrow('unitPrice')}</th>
                        <th onClick={() => handleSort('amount')} className="cursor-pointer hidden sm:table-cell">Total Amount {getArrow('amount')}</th>
                        <th onClick={() => handleSort('status')} className="cursor-pointer hidden sm:inline">Status {getArrow('status')}</th>
                        <th className="cursor-pointer">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(item => (
                        <tr key={item.transactionId}>
                            <td className='text-center'>{item.transactionId}</td>
                            <td className='hidden sm:inline'>{item.date}</td>
                            <td>{item.customerName}</td>
                            <td className=''>{item.product}</td>
                            <td  className='text-center hidden sm:table-cell'>{item.quantity}</td>
                            <td className='text-end hidden sm:table-cell'>{item.unitPrice}</td>
                            <td className='text-end hidden sm:table-cell'>{item.totalAmount}</td>
                            <td className='text-center hidden sm:inline'>{item.status}</td>
                            <td className='txet-center'><a href={`/invoice/${item.transactionId}`} className='text-center text-blue-500'>View</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4 items-center">
                <div>
                    <label>Page Size: </label>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className='dark:bg-gray-700 text-lg'>
                        {[10, 25, 50, 100].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <div className='text-lg'>  
                    Page {currentPage} of {totalPages}
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>⏮</button>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>◀</button>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>▶</button>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>⏭</button>
                </div>

                <div className='text-lg'>Total Records: {totalRecords}</div>
            </div>
        </div>
    );
}

export default Index;
