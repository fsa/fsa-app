import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";
import "./scanner.css";
import { api } from '../api/client';
import { initSession } from "~/api/auth";
import type { Route } from "./+types/scanner";
import Button from '@mui/material/Button';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сканер" },
    { name: "description", content: "Сканер QR-кодов" },
  ];
}

function QrCodeScanner() {
  const [decodedResults, setDecodedResults] = useState('Сканируйте код');
  const [editable, setEditable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [codeId, setCodeId] = useState(null);
  const [description, setDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isEnabled, setEnabled] = useState(false);
  const [qrMessage, setQrMessage] = useState("");

  useEffect(() => {
    (async () => {
      const token = await initSession();
      if (!token) {
        window.location.href = "/login";  // редирект если токен невалиден
      }
    })();
  }, []);

  let qrboxFunction = function (viewfinderWidth: number, viewfinderHeight: number) {
    let minEdgePercentage = 0.9;
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize
    };
  }

  useEffect(() => {
    const config = { fps: 10, qrbox: qrboxFunction, aspectRatio: 1.0 };

    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScannerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then((ignore) => console.log("Scanner stop"))
          .catch((err) => console.log("Scanner error"));
      }
    };

    const qrCodeSuccess = (decodedText: string, decodedResult: any) => {
      setQrMessage(decodedText);
      setErrorMessage('Отправка кода на сервер...')
      api.post('/scan',
        {
          "text": decodedText,
          "format": decodedResult.result.format.format,
          "format_name": decodedResult.result.format.formatName,
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => {
        setErrorMessage('');
        setCodeId(response.data.id);
        setDecodedResults(response.data.data);
        setEditable(response.data.editable);
        setDescription(response.data.description || '');
        setEditedDescription(response.data.description || '');
        setEditMode(false);
      }
      ).catch((error) => {
        setErrorMessage(error.message);
        setEditable(false);
        setEditMode(false);
      }
      );
      setEnabled(false);
    };

    if (isEnabled) {
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess, undefined);
      setQrMessage("");
    } else {
      qrScannerStop();
    }

    return () => {
      qrScannerStop();
    };
  }, [isEnabled]);

  const handleEditClick = () => {
    setEditedDescription(description);
    setEditMode(true);
  };

  const handleDescriptionChange = (e: any) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    setErrorMessage('Сохраняем описание кода...');
    api.post('/scan/update-description',
      {
        id: codeId,
        description: editedDescription
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => {
      setErrorMessage('');
      setDescription(editedDescription);
      setEditMode(false);
    }).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div className="scanner">
      <div>
        <Button variant="contained" className="start-button" onClick={() => setEnabled(!isEnabled)}>
          {isEnabled ? "Выключить" : "Включить"}
        </Button>
      </div>
      <div id="qrCodeContainer" />
      {qrMessage && <div className="qr-message">{qrMessage}</div>}
      {errorMessage && <div className="qr-error-message">{errorMessage}</div>}
      {editMode ? (
        <div className="edit-form">
          <p>{decodedResults}</p>
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            rows={4}
            cols={50}
          />
          <div className="edit-buttons">
            <Button variant="contained" onClick={handleSaveDescription}>Сохранить</Button>
            <Button variant="contained" onClick={handleCancelEdit}>Отмена</Button>
          </div>
        </div>
      ) : (
        <div className="result-display">
          <p>{decodedResults}</p>
          <p>{description}</p>
          {editable && (
            <Button variant="contained" onClick={handleEditClick}>Редактировать описание</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default QrCodeScanner;
