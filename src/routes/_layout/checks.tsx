import { createFileRoute } from "@tanstack/react-router"
import { FnsChecksList } from "@/widgets/FnsChecksList";
import { PrivateRoute } from "@/providers";

export const Route = createFileRoute('/_layout/checks')({
  component: Component,
  head: () => ({
    meta: [
      {
        title: 'Чеки',
      },
      {
        name: 'description',
        content: 'Список чеков',
      },
    ],
  }),
});

function Component() {
  return (
    <PrivateRoute>
      <FnsChecksList />
    </PrivateRoute>
  )
}
