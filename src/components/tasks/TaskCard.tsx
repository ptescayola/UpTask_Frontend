import { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDraggable } from '@dnd-kit/core'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { Ellipsis, EyeVisible, Delete, Pencil } from '@factorialco/factorial-one/icons/app'
import { Icon } from '@factorialco/factorial-one'
import { RawTag, Menu as MenuOptions } from '@factorialco/factorial-one/dist/experimental'
import { TaskProject, ExcludesNullish } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'
import { formatDate } from '@/utils/index'
import Card from '@/components/shared/Card'
import Notification from '@/components/shared/Notification'

type TaskCardProps = {
  task: TaskProject
  canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {

  const [isHovered, setIsHovered] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    disabled: isHovered
  })

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    rotate: '-3deg'
  } : undefined

  return (
    <>
      <div 
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <Card
          title={task.name}
          content={
            <>
              <p>{task.description}</p>
              <RawTag text={formatDate(task.createdAt)} />
            </>
          }
          actions={
            <Menu
              as="div"
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <MenuButton>
                <Icon icon={Ellipsis} size="md" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 rounded-md px-3 pt-3 shadow-lg bg-f1-background">
                  <MenuOptions
                    tree={[
                      {
                        title: "Root",
                        items: [
                          {
                            label: "View",
                            icon: EyeVisible,
                            onClick: () => navigate(location.pathname + `?viewTask=${task._id}`)
                          },
                          canEdit && {
                            label: "Edit",
                            icon: Pencil,
                            onClick: () => navigate(location.pathname + `?editTask=${task._id}`)
                          },
                          canEdit && {
                            label: "Delete",
                            icon: Delete,
                            onClick: () => mutate({ projectId, taskId: task._id })
                          }
                        ].filter(Boolean as unknown as ExcludesNullish),
                        isRoot: true
                      }
                    ]}
                  />
                </MenuItems>
              </Transition>
            </Menu>
          }
        />
      </div>
    </>
  )
}
