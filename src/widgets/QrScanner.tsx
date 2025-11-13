import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { QrCodeEdit } from './QrCodeEdit';
import { Box, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useNewQrCode } from '@/hooks/useNewQrCode';
import type { QrCodeRegister } from '@/services/qrCodeService';

export function QrScanner() {
  const [decodedResults, setDecodedResults] = useState('');
  const [qrCodeDescription, setQrCodeDescription] = useState<QrCodeRegister | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { mutate } = useNewQrCode();

  const wasPausedBeforeHidden = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        wasPausedBeforeHidden.current = isPaused;
        setIsPaused(true);
      } else if (document.visibilityState === 'visible') {
        setIsPaused(wasPausedBeforeHidden.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

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
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          maxWidth: 480,
          alignContent: "center"
        }}
      >
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
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={toggleScanner}>
            {isPaused ? 'Запустить сканирование' : 'Приостановить'}
          </Button>
        </Stack>
        {qrCodeDescription && <QrCodeEdit qrCode={qrCodeDescription} />}
        {decodedResults &&
          <Card sx={{ textAlign: "center", width: "100%" }}>
            <CardContent>
              <Typography sx={{ wordBreak: 'break-word' }}>{decodedResults}</Typography>
            </CardContent>
          </Card>
        }
      </Box>
    </>
  );
}
