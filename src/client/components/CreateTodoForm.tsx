import React, { useState } from 'react'

import { api } from '@/utils/client/api'

/**
 * QUESTION 1:
 * -----------
 * Style the "Add" button so that it looks like the design in Figma.
 *
 * NOTE: You must use tailwindcss and className. Do not use other methods (eg.
 * inline styles, separate css files, css modules, etc.) unless absolutely
 * necessary. This applies to all styling-related questions in this assignment.
 *
 * Documentation references:
 *  - https://tailwindcss.com
 *  - https://www.youtube.com/watch?v=mr15Xzb1Ook
 *
 *
 *
 * QUESTION 2:
 * -----------
 * Currently our form is not keyboard accessible. Users cannot hit
 * <Enter> right after typing to submit the form (add new todo). Fix this issue.
 */

export const CreateTodoForm = () => {
  const [todoBody, setTodoBody] = useState('')
  const [checkErr, setCheckErr] = useState(false)

  const apiContext = api.useContext()

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })

  const { mutate: createTodo, isLoading: isCreatingTodo } =
    api.todo.create.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
      onError: () => {
        // Do somthing
      },
    })

  const checkAvailability = (arr: string[], val: string) => {
    return arr.some((arrVal: string) => val === arrVal)
  }

  const handleCreateTodo = () => {
    const temp = todos.map((item) => item.body)
    if (checkAvailability(temp, todoBody)) {
      setCheckErr(true)
      return
    }
    createTodo({
      body: todoBody,
    })
    setTodoBody('')
    setCheckErr(false)
  }

  return (
    <>
      <form
        className={`${
          checkErr
            ? 'border-[#ff0000]'
            : 'border-gray-200 focus-within:border-gray-400'
        } group flex items-center justify-between rounded-12 border py-2 pr-4 `}
      >
        <label htmlFor={TODO_INPUT_ID} className="sr-only">
          Add todo
        </label>

        <input
          id={TODO_INPUT_ID}
          type="text"
          placeholder="Add todo"
          value={todoBody}
          onChange={(e) => {
            setTodoBody(e.target.value)
            setCheckErr(false)
          }}
          className="bg-transparent flex-1 px-4 text-base placeholder:text-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={isCreatingTodo}
          onClick={handleCreateTodo}
          className="rounded-full bg-[#334155] px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {checkErr && (
        <p className="mt-2 text-sm text-[#ff0000]">Todo already exists</p>
      )}
    </>
  )
}

const TODO_INPUT_ID = 'todo-input-id'
