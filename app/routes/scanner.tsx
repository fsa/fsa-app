import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";
import "./scanner.css";
import { api } from '../api/client';

function QrCodeScanner() {
  const [decodedResults, setDecodedResults] = useState('Сканируйте код');
  const [editable, setEditable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [codeId, setCodeId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isEnabled, setEnabled] = useState(false);
  const [qrMessage, setQrMessage] = useState("");

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

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then((ignore) => console.log("Scaner stop"))
          .catch((err) => console.log("Scaner error"));
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
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess, undefined );
      setQrMessage("");
    } else {
      qrScanerStop();
    }

    return () => {
      qrScanerStop();
    };
  }, [isEnabled]);

  const handleEditClick = () => {
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
      setEditMode(false);
    }).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedDescription(decodedResults || '');
  };

  return (
    <div className="scaner">
      <div>
        <button className="start-button" onClick={() => setEnabled(!isEnabled)}>
          {isEnabled ? "Выключить" : "Включить"}
        </button>
      </div>
      <div id="qrCodeContainer" />
      {qrMessage && <div className="qr-message">{qrMessage}</div>}
      <div>{errorMessage}</div>
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
            <button onClick={handleSaveDescription}>Сохранить</button>
            <button onClick={handleCancelEdit}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="result-display">
          <p>{decodedResults}</p>
          <p>{editedDescription}</p>
          {editable && (
            <button onClick={handleEditClick}>Редактировать описание</button>
          )}
        </div>
      )}
    </div>
  );
}

export default QrCodeScanner;
