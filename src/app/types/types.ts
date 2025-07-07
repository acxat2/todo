import { status } from "../services/tasks.service"

export type taskForm = {
  title: string,
  description: string,
  status: status
}
