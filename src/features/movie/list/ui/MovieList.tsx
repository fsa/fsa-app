import {
  Alert,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMovieList } from "../model/useMovieList";
import { Link } from "@tanstack/react-router";

export const MovieList = () => {
  const { data: movies, isLoading, error } = useMovieList();

  return (
    <Card>
      <CardHeader title="Сериалы" />
      <CardContent>
        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">Ошибка загрузки сериалов</Alert>}

        {!isLoading && !error && movies && (
          <List>
            {movies.map((movie) => (
              <ListItemButton key={movie.id} component={Link} to={`/movie/${movie.url}`}>
                <ListItemAvatar>
                  <Avatar alt={movie.name}>{movie.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={movie.name} secondary={`ID: ${movie.id}`} />
              </ListItemButton>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
