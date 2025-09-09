import { Alert, Avatar, CircularProgress, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "~/api/client";

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
            <Container>
                <List>
                    {movieList && movieList.map((movie) => (
                        <ListItem key={movie.id} divider>
                            <ListItemAvatar>
                                <Avatar alt={movie.name}>
                                    {movie.name[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={movie.name} secondary={`ID: ${movie.id}`} />
                        </ListItem>
                    ))}
                    {loading && <CircularProgress />} 
                    {error && <Alert severity="error">{error}</Alert>}
                </List>
            </Container>
        </>
    );
}

export default MovieList;