interface Subtask {
  id: number;
  sectionId: string;
  todoId: number;
  subtaskTitle: string;
  isCompleted: boolean;
}
interface Todo {
  id: number;
  sectionId: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  due: '';
  note: "";
  subtasks: Subtask[];
}
interface Data {
  name: string;
  todos: Todo[];
}
interface _id {
  id: number;
  sectionId: string;
}

export type { Data, Todo, Subtask, _id };
