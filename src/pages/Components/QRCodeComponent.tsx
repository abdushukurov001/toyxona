import React, { useState, useEffect } from 'react';
import client from '../../services';

// QR kod uchun interfeys
interface QRCode {
  id: number;
  url: string;
  image: string;
}

const QRCodeComponent: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // QR kodni olish
  const fetchQRCode = async () => {
    try {
      const response = await client.get<QRCode[]>('/uz/api/v1/dashboard/get_qr_code/');
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setQrCode(data[0]);
        setUrl(data[0].url);
      } else {
        console.warn('QR kod ma’lumotlari topilmadi');
      }
    } catch (err) {
      setError('QR kodni olishda xato yuz berdi');
      console.error('QR kodni olishda xato:', err);
    }
  };

  // Komponent yuklanganda QR kodni tekshirish
  useEffect(() => {
    fetchQRCode();
  }, []);

  // Yangi QR kod yaratish
  const handleCreateQRCode = async () => {
    if (!url) {
      setError('URL kiritish majburiy!');
      return;
    }

    try {
      const response = await client.post<QRCode>('/uz/api/v1/dashboard/create_qr_code/', { url });
      setQrCode(response.data);
      setUrl(response.data.url);
      setError('');
    } catch (err) {
      setError('QR kod yaratishda xato yuz berdi');
      console.error(err);
    }
  };

  // QR kodni tahrirlash
  const handleUpdateQRCode = async () => {
    if (!url) {
      setError('URL kiritish majburiy!');
      return;
    }

    if (!qrCode) {
      setError('QR kod topilmadi');
      return;
    }

    try {
      await client.patch<QRCode>(
        `/uz/api/v1/dashboard/update_qr_code/${qrCode.id}/`,
        { url }
      );
      await fetchQRCode();
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('QR kodni tahrirlashda xato yuz berdi');
      console.error(err);
    }
  };

  // QR kodni yuklab olish
  const downloadQRCode = async () => {
    if (!qrCode?.image) {
      setError('Yuklab olish uchun QR kod rasmi topilmadi');
      return;
    }

    try {
      const response = await client.get(qrCode.image, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('QR kodni yuklab olishda xato yuz berdi');
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold text-orange-500 mb-4 text-center">
          {isEditing ? 'QR Kodni Tahrirlash' : 'QR Kod Yaratish'}
        </h2>

        {/* URL kiritish maydoni */}
        <div className="flex flex-col">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 mb-4 border border-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 text-sm sm:text-base peer"
            disabled={!!qrCode && !isEditing}
            required
          />
          <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
        </div>

        {/* Xato xabari */}
        {error && <p className="text-red-500 text-sm sm:text-base mb-4 text-center">{error}</p>}

        {/* Buttonlar */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!qrCode ? (
            <button
              onClick={handleCreateQRCode}
              className="w-full sm:w-auto min-h-[40px] px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm sm:text-base"
            >
              QR Kod Yaratish
            </button>
          ) : isEditing ? (
            <button
              onClick={handleUpdateQRCode}
              className="w-full sm:w-auto min-h-[40px] px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm sm:text-base"
            >
              Saqlash
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto min-h-[40px] px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm sm:text-base"
            >
              Tahrirlash
            </button>
          )}
          {qrCode?.image && (
            <button
              onClick={downloadQRCode}
              className="w-full sm:w-auto min-h-[40px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm sm:text-base flex items-center justify-center"
            >
              Yuklab olish
            </button>
          )}
        </div>

        {/* QR kod rasmi */}
        {qrCode?.image && (
          <div className="mt-6 flex justify-center">
            <img
              src={qrCode.image}
              alt="QR Code"
              className="w-40 h-40 sm:w-48 sm:h-48 border border-orange-500 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeComponent;