import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFnsChecks } from "~/hooks/useFnsChecks";
import { FnsCheckDetail } from "./FnsCheckDetail";
import { LoadingIndicator } from "~/shared/LoadingIndicator";

function formatDate(datetime: string) {
  return new Date(datetime).toLocaleString();
}

export function FnsChecksList() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isFetching } = useFnsChecks(page + 1);
  const [selectedCheck, setSelectedCheck] = useState<number | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleCloseDialog = () => {
    setSelectedCheck(null);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <Typography color="error" mt={2}>
        Не удалось загрузить данные чеков.
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography color="info" mt={2}>
        Данные пока недоступны.
      </Typography>
    );
  }

  const { totalRows, rows, checks } = data;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Список чеков (всего {totalRows})
      </Typography>

      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            minWidth: 600,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата и время</TableCell>
              <TableCell>Магазин</TableCell>
              <TableCell>ИНН</TableCell>
              <TableCell align="right">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checks.map((check) => (
              <TableRow
                key={check.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedCheck(check.id)}
              >
                <TableCell>{check.id}</TableCell>
                <TableCell>{formatDate(check.datetime)}</TableCell>
                <TableCell>{check.name}</TableCell>
                <TableCell>{check.store_itn}</TableCell>
                <TableCell align="right">{check.total_sum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rows}
          rowsPerPageOptions={[rows]}
        />
      </TableContainer>

      {isFetching && (
        <LoadingIndicator />
      )}

      {/* 🔹 Модальное окно для деталей чека */}
      <Dialog
        fullScreen
        open={selectedCheck !== null}
        onClose={handleCloseDialog}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Информация о чеке</Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedCheck && <FnsCheckDetail checkId={selectedCheck} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
