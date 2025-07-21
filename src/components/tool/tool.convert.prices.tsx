// /components/ConvertButton.js
'use client'
import { useState } from 'react';
import { convertPricesToEth } from '../../services/service.product';

export default function ConvertPrices() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setStatus('');

    const res = await convertPricesToEth();

    if (res.status === '200') {
      setStatus('✅ Giá đã được đổi sang ETH thành công!');
    } else {
      setStatus(`❌ Lỗi: `);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded shadow space-y-4 my-5">
      <h1 className='text-xl font-bold'>Convert price</h1>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? 'Đang xử lý...' : 'Chuyển giá sang ETH'}
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
