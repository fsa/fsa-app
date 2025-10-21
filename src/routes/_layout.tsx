import { createFileRoute } from '@tanstack/react-router'
import AppLayout from '@/layout/AppLayout'

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
})