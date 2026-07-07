import taskRepository from "./task.repository.js";
import taskService from "./task.service.js";

import type { Resolvers } from "../../generated/resolvers.js";

import {
  requireAuth,
  requireRole,
} from "../../utils/auth.js";

import {
  ForbiddenError,
  NotFoundError,
} from "../../utils/errors.js";

import type { TaskFilter } from "./task.types.js";

export const taskResolvers: Pick<
  Resolvers,
  "Query" | "Mutation" | "Task"
> = {
  Query: {
    tasks: (_parent, { filter }, context) => {
      const user = requireAuth(context);

      return taskRepository.findAllAccessible(
        user.id,
        user.role,
        (filter ?? {}) as TaskFilter
      );
    },

    task: async (_parent, { id }, context) => {
      const user = requireAuth(context);

      const task =
        await taskRepository.findAccessibleById(
          id,
          user.id,
          user.role
        );

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      return task;
    },
  },

  Mutation: {
    createTask: (_parent, { input }, context) => {
      requireRole(context, ["ADMIN", "MANAGER"]);

      return taskService.createTask(input);
    },

    updateTask: (_parent, { id, input }, context) => {
      const user = requireAuth(context);

      if (
        user.role !== "ADMIN" &&
        user.role !== "MANAGER"
      ) {
        throw new ForbiddenError(
          "You do not have permission"
        );
      }

      return taskService.updateTask(
        id,
        input,
        user
      );
    },

    deleteTask: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);

      await taskService.deleteTask(id);

      return true;
    },

    updateTaskStatus: (
      _parent,
      { id, status },
      context
    ) => {
      const user = requireAuth(context);

      if (
        user.role !== "ADMIN" &&
        user.role !== "MANAGER"
      ) {
        throw new ForbiddenError(
          "You do not have permission"
        );
      }

      return taskService.updateStatus(
        id,
        status
      );
    },

    assignTask: (
      _parent,
      { taskId, userId },
      context
    ) => {
      const user = requireRole(context, [
        "ADMIN",
        "MANAGER",
      ]);

      return taskService.assignTask(
        taskId,
        userId,
        user
      );
    },
  },

  Task: {
    board: (parent, _args, context) =>
      context.loaders.boardLoader.load(
        parent.boardId
      ),

    assignee: (parent, _args, context) =>
      context.loaders.taskAssigneeLoader.load(
        parent.assigneeId
      ),
  },
};