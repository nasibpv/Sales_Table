import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SalesDataContext } from '../context/SalesDataContext';

function ViewInvoice() {
  const { id } = useParams();
  
  const { salesData } = useContext(SalesDataContext);
    
  const invoice = salesData.find(item => item.transactionId === id);
  console.log(invoice);
  

  if (!invoice) return <p>Invoice not found.</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className=''>
          <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <button
                onClick={() => navigate(-1)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          <div className="space-y-2 border rounded-xl p-3 grid max-w-3xl mx-auto border rounded-lg shadow-md p-6 bg-gray-50 dark:bg-gray-800">
            
            <p className='font-bold text-end'><strong>Invoice ID:</strong> <span className='text-red-700 '>{invoice.transactionId}</span></p>
            <p className='text-end'><strong>Date:</strong> {invoice.date}</p>
            <p className='font-bold'><strong>Customer:</strong> {invoice.customerName}</p>
            <p><strong>Product:</strong> {invoice.product}</p>
            <p><strong>Quantity:</strong> {invoice.quantity}</p>
            <p><strong>Category:</strong> {invoice.productCategory}</p>
            <p><strong>Unit Price:</strong> {invoice.unitPrice}</p>
            <p><strong>Status:</strong> {invoice.status}</p>
            <p><strong>Delivery Date:</strong> {invoice.deliveryDate}</p>
            <p><strong>Shipping Method:</strong> {invoice.shippingMethod}</p>
            <p><strong>Payment Method:</strong> {invoice.paymentMethod}</p>
            <p><strong>Total Amount:</strong> {invoice.totalAmount}</p>
            {invoice.paymentDetails && (
  <div className="space-y-2">
    <p><strong>Final Amount:</strong> {invoice.paymentDetails.finalAmount}</p>
    <p><strong>Sub Total:</strong> {invoice.paymentDetails.name}</p>
    <p><strong>Tax Amount:</strong> {invoice.paymentDetails.taxAmount}</p>
    <p><strong>Tax Rate:</strong> {invoice.paymentDetails.taxRate}</p>
    <p className='font-bold'><strong>Total:</strong> {invoice.paymentDetails.total}</p>
  </div>
)}
            <h5 className='text-xl font-bold text-gray-600'>Sales Representative</h5>
            {invoice.salesRepresentative && (
  <div className="ml-4">
    <p><strong>ID:</strong> {invoice.salesRepresentative.id}</p>
    <p><strong>Name:</strong> {invoice.salesRepresentative.name}</p>
    <p><strong>Department:</strong> {invoice.salesRepresentative.department}</p>
  </div>
)}
            <h5 className='text-xl font-bold text-gray-600'>Store </h5>

            {invoice.store && (
  <div className="ml-4">
    <p><strong>ID:</strong> {invoice.store.storeId}</p>
    <p><strong>Name:</strong> {invoice.store.name}</p>
    <p><strong>Department:</strong> {invoice.store.location}</p>
  </div>
)}
          </div>
      </div>
    </div>
  );
}

export default ViewInvoice;
