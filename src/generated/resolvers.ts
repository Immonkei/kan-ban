import type { GraphQLResolveInfo } from 'graphql';
import type { User, Board, Task, Role, TaskStatus } from '@prisma/client';
import type { GraphQLContext } from '../graphql/context';
import { AuthPayload, CreateBoardInput, CreateTaskInput, LoginInput, LogoutPayload, Maybe, MutationAssignTaskArgs, MutationCreateBoardArgs, MutationCreateTaskArgs, MutationDeleteBoardArgs, MutationDeleteTaskArgs, MutationDeleteUserArgs, MutationLoginArgs, MutationRefreshTokenArgs, MutationRegisterArgs, MutationUpdateBoardArgs, MutationUpdateTaskArgs, MutationUpdateTaskStatusArgs, MutationUpdateUserArgs, QueryBoardArgs, QueryTaskArgs, QueryTasksArgs, QueryUserArgs, RefreshTokenPayload, RegisterInput, Scalars, SortOrder, TaskConnection, TaskFilterInput, TaskSortField, UpdateBoardInput, UpdateTaskInput, UpdateUserInput } from './schema';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Board: ResolverTypeWrapper<Board>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBoardInput: CreateBoardInput;
  CreateTaskInput: CreateTaskInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LogoutPayload: ResolverTypeWrapper<LogoutPayload>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RefreshTokenPayload: ResolverTypeWrapper<RefreshTokenPayload>;
  RegisterInput: RegisterInput;
  Role: Role;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskConnection: ResolverTypeWrapper<Omit<TaskConnection, 'data'> & { data: Array<ResolversTypes['Task']> }>;
  TaskFilterInput: TaskFilterInput;
  TaskPriority: TaskPriority;
  TaskSortField: TaskSortField;
  TaskStatus: TaskStatus;
  UpdateBoardInput: UpdateBoardInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Board: Board;
  Boolean: Scalars['Boolean']['output'];
  CreateBoardInput: CreateBoardInput;
  CreateTaskInput: CreateTaskInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LogoutPayload: LogoutPayload;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  RefreshTokenPayload: RefreshTokenPayload;
  RegisterInput: RegisterInput;
  String: Scalars['String']['output'];
  Task: Task;
  TaskConnection: Omit<TaskConnection, 'data'> & { data: Array<ResolversParentTypes['Task']> };
  TaskFilterInput: TaskFilterInput;
  UpdateBoardInput: UpdateBoardInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type BoardResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LogoutPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LogoutPayload'] = ResolversParentTypes['LogoutPayload']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  assignTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationAssignTaskArgs, 'taskId' | 'userId'>>;
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'input'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  deleteBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['LogoutPayload'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['RefreshTokenPayload'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'token'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'id' | 'input'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id' | 'input'>>;
  updateTaskStatus?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskStatusArgs, 'id' | 'status'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardArgs, 'id'>>;
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType, Partial<QueryTasksArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RefreshTokenPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RefreshTokenPayload'] = ResolversParentTypes['RefreshTokenPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RoleResolvers = EnumResolverSignature<{ ADMIN?: any, MANAGER?: any, USER?: any }, ResolversTypes['Role']>;

export type TaskResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['TaskPriority'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TaskConnectionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TaskConnection'] = ResolversParentTypes['TaskConnection']> = {
  data?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type TaskPriorityResolvers = EnumResolverSignature<{ HIGH?: any, LOW?: any, MEDIUM?: any }, ResolversTypes['TaskPriority']>;

export type TaskStatusResolvers = EnumResolverSignature<{ DONE?: any, IN_PROGRESS?: any, REVIEW?: any, TODO?: any }, ResolversTypes['TaskStatus']>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Board?: BoardResolvers<ContextType>;
  LogoutPayload?: LogoutPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshTokenPayload?: RefreshTokenPayloadResolvers<ContextType>;
  Role?: RoleResolvers;
  Task?: TaskResolvers<ContextType>;
  TaskConnection?: TaskConnectionResolvers<ContextType>;
  TaskPriority?: TaskPriorityResolvers;
  TaskStatus?: TaskStatusResolvers;
  User?: UserResolvers<ContextType>;
};

