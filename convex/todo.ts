import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todo").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.insert("todo", {
      text: args.text,
      isCompleted: false,
    });
    return todo;
  },
});

// Update Todo
export const toggleTodoStatus = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
    return todo;
  },
});

// Delete Todo
export const deleteTodo = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.delete(args.id);
    return todo;
  },
});

// Update Todo Text
export const updateTodoText = mutation({
  args: { id: v.id("todo"), text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(args.id, { text: args.text });
    return todo;
  },
});

// Clear all Todos
export const clearTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todo").collect();
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return { count: todos.length };
  },
});
