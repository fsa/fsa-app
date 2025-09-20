import { Alert, Avatar, Card, CardContent, CardHeader, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "~/services/api";

interface Movie {
  id: number,
  name: string,
  url: string
}

const MovieList = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.post<Movie[]>('/movie',
      {}
    ).then((response) => {
      setMovieList(response.data);
      setError(null);
    }).catch((error) => {
      setMovieList([]);
      setError('Ошибка при загрузке списка сериалов: ' + error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          title="Сериалы"
          />
        <CardContent>
          <List>
            {movieList && movieList.map((movie) => (
              <ListItemButton key={movie.id} component={Link} to={`/movie/${movie.url}`}>
                <ListItemAvatar>
                  <Avatar alt={movie.name}>
                    {movie.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={movie.name} secondary={`ID: ${movie.url}`} />
              </ListItemButton>
            ))}
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default MovieList;