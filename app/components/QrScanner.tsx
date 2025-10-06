import './QrScanner.css';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import QrCodeEdit from './QrCodeEdit';
import { Button, Stack, Typography } from '@mui/material';
import { useNewQrCode } from '~/hooks/useNewQrCode';
import type { QrCodeRegister } from '~/services/qrCodeService';

function QrScanner() {
  const [decodedResults, setDecodedResults] = useState('');
  const [qrCodeDescription, setQrCodeDescription] = useState<QrCodeRegister|null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { mutate } = useNewQrCode();

  const onScanCode = (result: IDetectedBarcode[]) => {
    const text = result[0].rawValue;
    const format_name = result[0].format;

    setDecodedResults(text);
    setQrCodeDescription(null);

    mutate(
      { text, format_name },
      {
        onSuccess: (data) => {
          setQrCodeDescription(data);
        },
      }
    );
  }

  const toggleScanner = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={toggleScanner}>
          {isPaused ? 'Запустить сканирование' : 'Приостановить'}
        </Button>
      </Stack>
      <div className='qr-scanner'>
        <Scanner
          onScan={onScanCode}
          paused={isPaused}
          formats={[
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
            'unknown'
          ]}
        />
      </div>
      <Typography sx={{ wordBreak: 'break-word' }}>{decodedResults}</Typography>
      {qrCodeDescription && <QrCodeEdit qrCode={qrCodeDescription} />}
    </>
  );
}

export default QrScanner;