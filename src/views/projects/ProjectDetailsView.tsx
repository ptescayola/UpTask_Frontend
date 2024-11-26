import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFullProject } from '@/api/ProjectAPI'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TasksList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { isManager } from '@/utils/policies'
import { useAuth } from '@/hooks/useAuth'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/shared'
import { PlusIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function ProjectDetailsView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()
  const { data: user, isLoading: authLoading } = useAuth()

  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false
  })

  useEffect(() => {
    if (data) {
      setBreadcrumbs([
        { label: t('projects'), onClick: () => navigate('/') },
        { label: data.projectName, onClick: () => navigate(`/projects/${projectId}`)}
      ])
    }
  }, [data, setBreadcrumbs])

  const canEdit = useMemo(() => data?.manager === user?._id , [data, user])

  if (isLoading && authLoading) return (<p>Loading...</p>)
  if (isError) return <Navigate to='/404' />
  if (data && user) return (
    <>
      <div className='flex justify-between mb-6'>
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          {t('tasks')}
        </h1>
        <nav className='flex gap-2'>
          <Button
            Icon={PlusIcon}
            label={t('add_task')}
            onClick={() => navigate(location.pathname + '?newTask=true')}
          />
          {isManager(data.manager, user._id) && (
            <Button
              Icon={UsersIcon}
              label={t('collaborators')}
              variant="neutral"
              onClick={() => navigate('team')}
            />
          )}
        </nav>
      </div>

      <TasksList tasks={data.tasks} canEdit={canEdit}/>

      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
