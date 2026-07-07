import { Role } from '@prisma/client';
import { TaskStatus } from '@prisma/client';
import { TaskPriority } from '@prisma/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
  tasks: Array<Task>;
  updatedAt: Scalars['String']['output'];
};

export type CreateBoardInput = {
  name: Scalars['String']['input'];
};

export type CreateTaskInput = {
  boardId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignTask: Task;
  createBoard: Board;
  createTask: Task;
  deleteBoard: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthPayload;
  logout: LogoutPayload;
  refreshToken: RefreshTokenPayload;
  register: AuthPayload;
  updateBoard: Board;
  updateTask: Task;
  updateTaskStatus: Task;
  updateUser: User;
};


export type MutationAssignTaskArgs = {
  taskId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBoardArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBoardInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUpdateTaskStatusArgs = {
  id: Scalars['ID']['input'];
  status: TaskStatus;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards: Array<Board>;
  me?: Maybe<User>;
  task?: Maybe<Task>;
  tasks: TaskConnection;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  filter?: InputMaybe<TaskFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  accessToken: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export { Role };

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  board: Board;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TaskConnection = {
  __typename?: 'TaskConnection';
  data: Array<Task>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type TaskFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  page?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<TaskPriority>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<TaskSortField>;
  status?: InputMaybe<TaskStatus>;
};

export { TaskPriority };

export enum TaskSortField {
  CreatedAt = 'CREATED_AT',
  DueDate = 'DUE_DATE',
  Priority = 'PRIORITY',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export { TaskStatus };

export type UpdateBoardInput = {
  name: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  boards: Array<Board>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['String']['output'];
};
