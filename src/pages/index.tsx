import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
import { api } from '@/utils/client/api'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })

  const { data: todosCompleted = [] } = api.todo.getAll.useQuery({
    statuses: ['completed'],
  })

  const { data: todosPending = [] } = api.todo.getAll.useQuery({
    statuses: ['pending'],
  })

  const sortedItems = [...todos].sort((a, b) => {
    if (a.status === 'pending' && b.status === 'completed') return -1
    if (a.status === 'completed' && b.status === 'pending') return 1
    return 0
  })

  const dataTab = [
    {
      id: 1,
      label: 'All',
      value: 'all',
    },
    {
      id: 2,
      label: 'Pending',
      value: 'pending',
    },
    {
      id: 3,
      label: 'Completed',
      value: 'completed',
    },
  ]

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root defaultValue="all" className="pt-10">
          <Tabs.List aria-label="tabs example" className="flex gap-2">
            {dataTab.map((item) => (
              <Tabs.Trigger
                value={item.value}
                key={item.id}
                className="boder cursor-pointer rounded-full border border-[#E2E8F0] px-6 py-2 aria-selected:bg-[#334155] aria-selected:text-white"
              >
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div className="pt-10">
            <Tabs.Content value="all">
              <TodoList data={sortedItems} />
            </Tabs.Content>
            <Tabs.Content value="pending">
              <TodoList data={todosPending} />
            </Tabs.Content>
            <Tabs.Content value="completed">
              <TodoList data={todosCompleted} />
            </Tabs.Content>
          </div>
        </Tabs.Root>
        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
