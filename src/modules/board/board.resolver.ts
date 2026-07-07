import boardRepository from "./board.repository.js";
import boardService from "./board.service.js";

import type { Resolvers } from "../../generated/resolvers.js";

import {
  requireAuth,
  requireRole,
} from "../../utils/auth.js";

import { ForbiddenError } from "../../utils/errors.js";

export const boardResolvers: Pick<
  Resolvers,
  "Query" | "Mutation" | "Board"
> = {
  Query: {
    boards: (_parent, _args, context) => {
      const user = requireAuth(context);

      return boardRepository.findAllAccessible(
        user.id,
        user.role
      );
    },

    board: async (_parent, { id }, context) => {
      const user = requireAuth(context);

      const board =
        await boardRepository.findAccessibleById(
          id,
          user.id,
          user.role
        );

      if (!board) {
        throw new ForbiddenError(
          "Board not found or access denied"
        );
      }

      return board;
    },
  },

  Mutation: {
    createBoard: (_parent, { input }, context) => {
      const user = requireRole(
        context,
        ["ADMIN", "MANAGER"]
      );

      return boardService.createBoard(
        input.name,
        user.id
      );
    },

    updateBoard: async (_parent, { id, input }, context) => {
      const user = requireAuth(context);

      const board = await boardService.getBoardById(id);

      if (
        user.role !== "ADMIN" &&
        board.ownerId !== user.id
      ) {
        throw new ForbiddenError(
          "You do not have permission"
        );
      }

      return boardService.updateBoard(
        id,
        input.name
      );
    },

    deleteBoard: async (_parent, { id }, context) => {
      const user = requireAuth(context);

      const board = await boardService.getBoardById(id);

      if (
        user.role !== "ADMIN" &&
        board.ownerId !== user.id
      ) {
        throw new ForbiddenError(
          "You do not have permission"
        );
      }

      await boardService.deleteBoard(id);

      return true;
    },
  },

  Board: {
  owner: async (parent, _args, context) => {
    const owner =
      await context.loaders.boardOwnerLoader.load(parent.ownerId);

    if (!owner) {
      throw new Error("Board owner not found");
    }
    return owner;
  },
  tasks: (parent, _args, context) =>
    context.loaders.boardTasksLoader.load(parent.id),
},
};