import { createContext, useEffect, useMemo, useState } from 'react';

export const SalesDataContext = createContext();

export const SalesDataProvider = ({ children }) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [filterLogic, setFilterLogic] = useState('AND');  // "AND" or "OR"

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/salesTransactions.json');
                const result = await res.json();
                setSalesData(result);
                setLoading(false);
            } catch (err) {
                console.error('Error loading sales data', err);
            }
        };

        fetchData();
    }, []);

    // Advanced Filtering Logic with AND/OR
    const filteredData = useMemo(() => {
        let filtered = [...salesData];

        if (filterLogic === 'AND') {
            // Apply filters with AND logic
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(item =>
                    Object.values(item).some(val =>
                        String(val).toLowerCase().includes(term)
                    )
                );
            }

            if (statusFilter !== 'All') {
                filtered = filtered.filter(item => item.status === statusFilter);
            }

            if (dateRange.from) {
                filtered = filtered.filter(item => new Date(item.date) >= new Date(dateRange.from));
            }
            if (dateRange.to) {
                filtered = filtered.filter(item => new Date(item.date) <= new Date(dateRange.to));
            }

        } else if (filterLogic === 'OR') {
            // Apply filters with OR logic
            let orFiltered = [];

            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                orFiltered = orFiltered.concat(
                    salesData.filter(item =>
                        Object.values(item).some(val =>
                            String(val).toLowerCase().includes(term)
                        )
                    )
                );
            }

            if (statusFilter !== 'All') {
                orFiltered = orFiltered.concat(
                    salesData.filter(item => item.status === statusFilter)
                );
            }

            if (dateRange.from) {
                orFiltered = orFiltered.concat(
                    salesData.filter(item => new Date(item.date) >= new Date(dateRange.from))
                );
            }
            if (dateRange.to) {
                orFiltered = orFiltered.concat(
                    salesData.filter(item => new Date(item.date) <= new Date(dateRange.to))
                );
            }

            // Remove duplicates, in case the same record matches multiple filters
            filtered = Array.from(new Set(orFiltered.map(a => a.transactionId)))
                .map(id => orFiltered.find(item => item.transactionId === id));
        }

        return filtered;
    }, [salesData, searchTerm, statusFilter, dateRange, filterLogic]);

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Pagination logic
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const contextValue = {
        loading,
        salesData,
        searchTerm, setSearchTerm,
        statusFilter, setStatusFilter,
        dateRange, setDateRange,
        filterLogic, setFilterLogic, // Add logic control to the context
        sortConfig, setSortConfig,
        paginatedData,
        currentPage, setCurrentPage,
        pageSize, setPageSize,
        totalPages,
        totalRecords: sortedData.length
    };

    return (
        <SalesDataContext.Provider value={contextValue}>
            {children}
        </SalesDataContext.Provider>
    );
};
