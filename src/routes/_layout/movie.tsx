import { createFileRoute } from "@tanstack/react-router"
import { PrivateRoute } from "@/providers";
import { MovieList } from "@/features/movie/list";

export const Route = createFileRoute('/_layout/movie')({
  component: MoviePage,
  head: () => ({
    meta: [
      {
        title: 'Сериалы',
      },
      {
        name: 'description',
        content: 'Список сериалов',
      },
    ],
  }),
});

function MoviePage() {
  return (
    <PrivateRoute>
      <MovieList />
    </PrivateRoute>
  );
}
