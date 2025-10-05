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
        <Scanner onScan={onScanCode} formats={[
          'aztec',
          'code_128',
          'code_39',
          'code_93',
          'codabar',
          'databar',
          'databar_expanded',
          'data_matrix',
          'dx_film_edge',
          'ean_13',
          'ean_8',
          'itf',
          'maxi_code',
          'micro_qr_code',
          'pdf417',
          'qr_code',
          'rm_qr_code',
          'upc_a',
          'upc_e',
          'linear_codes',
          'matrix_codes',
          'unknown']} />
      </div>
      <Typography sx={{ wordBreak: 'break-word' }}>{decodedResults}</Typography>
      {qrCodeDescription && <QrCodeEdit qrCode={qrCodeDescription} />}
    </>
  );
}

export default QrScanner;