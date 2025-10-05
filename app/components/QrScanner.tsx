import './QrScanner.css';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import QrCodeEdit from './QrCodeEdit';
import { Typography } from '@mui/material';
import { useNewQrCode } from '~/hooks/useNewQrCode';
import type { QrCodeRegister } from '~/services/qrCodeService';

function QrScanner() {
  const [decodedResults, setDecodedResults] = useState('');
  const [qrCodeDescription, setQrCodeDescription] = useState<QrCodeRegister>();
  const { mutate } = useNewQrCode();

  const onScanCode = (result: IDetectedBarcode[]) => {
    const text = result[0].rawValue;
    const format_name = result[0].format;

    setDecodedResults(text);

    mutate(
      { text, format_name },
      {
        onSuccess: (data) => {
          setQrCodeDescription(data);
        },
      }
    );
  }

  return (
    <>
      <div className='qr-scanner'>
        <Scanner onScan={onScanCode} />
      </div>
      <Typography sx={{ wordBreak: 'break-word' }}>{decodedResults}</Typography>
      {qrCodeDescription && <QrCodeEdit qrCode={qrCodeDescription} />}
    </>
  );
}

export default QrScanner;