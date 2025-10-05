import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQrCodeUpdateDescription } from "~/hooks/useQrCodeUpdateDescription";
import type { QrCodeRegister } from "~/services/qrCodeService";

function QrCodeEdit(props: { qrCode: QrCodeRegister }) {
  const [editMode, setEditMode] = useState(false);
  const [qrCode, setQrCode] = useState(props.qrCode);
  const [description, setDescription] = useState(props.qrCode.description);
  const { mutate, isPending } = useQrCodeUpdateDescription();

  useEffect(() => {
    setQrCode(props.qrCode);
  }, [props.qrCode]);

  const handleSubmit = () => {
    mutate(
      { id: qrCode.id, description: description },
      {
        onSuccess: (data) => {
          setQrCode(data);
          setEditMode(false);
        },
      }
    );
  }

  const handleChange = (value: string) => {
    setDescription(value)
  }

  const handleEdit = () => {
    setDescription(qrCode.description);
    setEditMode(true);
  }

  const handleCancel = () => {
    setEditMode(false);
  }

  if (!editMode) {
    return (
      <Box component="form" sx={{ mb: 2, mt: 2 }}>
        <Typography sx={{ wordBreak: 'break-word' }}>Описание: {qrCode.description}</Typography>
        {qrCode.editable && <Button variant="contained" onClick={handleEdit}>Редактировать</Button>}
      </Box>
    );
  }

  return (
    <Box component="form" sx={{ mb: 2, mt: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Комментарий"
          multiline
          minRows={4}
          value={description}
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit} disabled={isPending}>
            {isPending ? <CircularProgress size={24} /> : "Сохранить"}
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Отмена
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default QrCodeEdit;