import React from 'react'
import { downloadPDF } from './PDFReceiptDownload'
import { FaDownload, FaReceipt } from 'react-icons/fa'

function Vouchers({booking}) {
  return (
    <div className="flex justify-between items-center flex-wrap mt-3">
    <button
    title='download voucher'
        onClick={() => downloadPDF(booking)}
        className="text-blue-500  rounded-lg"
      >
        <FaDownload />
      </button>
      <a
          title="view receipt"
          href={booking.receipt}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          <FaReceipt />
        </a>
    </div>
  )
}

export default Vouchers
