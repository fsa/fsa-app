import { createFileRoute } from "@tanstack/react-router"
import StoreTree from "@/widgets/StoreTree";
import { PrivateRoute } from "@/providers";


export const Route = createFileRoute('/_layout/store')({
  component: StorePage,
  head: () => ({
    meta: [
      {
        title: 'Товары',
      },
      {
        name: 'description',
        content: 'Список товаров',
      },
    ],
  }),

});

function StorePage() {
  return (
    <PrivateRoute>
      <StoreTree />
    </PrivateRoute>
  );
}
