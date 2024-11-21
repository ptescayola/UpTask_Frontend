import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFullProject } from '@/api/ProjectAPI'
import { Button } from '@factorialco/factorial-one'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TasksList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { Add, People } from '@factorialco/factorial-one/icons/app'
import { Widget } from '@factorialco/factorial-one/dist/experimental'
import { isManager } from '@/utils/policies'
import { useAuth } from '@/hooks/useAuth'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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
        { label: t('projects'), href: '/' },
        { label: data.projectName, href: `/projects/${projectId}` }
      ])
    }
  }, [data, setBreadcrumbs])

  const canEdit = useMemo(() => data?.manager === user?._id , [data, user])

  if (isLoading && authLoading) return <Widget.Skeleton />
  if (isError) return <Navigate to='/404' />
  if (data && user) return (
    <div className="space-y-2">
      <div className='flex justify-between mb-8'>
        <h1 className="text-2xl text-f1-background-bold">
          {t('tasks')}
        </h1>
        <div className='flex gap-2'>
          <Button
            icon={Add}
            label={t('add_task')}
            variant="default"
            size="lg"
            onClick={() => navigate(location.pathname + '?newTask=true')}
          />
          {isManager(data.manager, user._id) && (
            <Button
              icon={People}
              label={t('collaborators')}
              variant="neutral"
              size="lg"
              onClick={() => navigate('team')}
            />
          )}
        </div>
      </div>

      <TasksList tasks={data.tasks} canEdit={canEdit}/>

      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </div>
  )
}
