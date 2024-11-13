import { Dialog, Select } from '@factorialco/factorial-one/dist/experimental'
import { Pencil } from '@factorialco/factorial-one/icons/app'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getTaskById, updateStatus } from '@/api/TaskAPI'
import { formatTimeAgo } from '@/utils/index'
import { TaskStatus } from '@/types/index'
import { statusTranslations } from '@/locales/en'
import Notification from '@/components/shared/Notification'

export default function TaskModalDetails() {
  const params = useParams()
  const projectId = params.projectId!
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const show = taskId ? true : false

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  })

  const handleChange = (value: string) => {
    const status = value as TaskStatus
    const data = { projectId, taskId, status }
    mutate(data)
  }

  if (isError) {
    toast(<Notification variant="destructive" title={error.message}/>, { toastId: 'error' })
    return <Navigate to={`/projects/${projectId}`} />
  }

  if (data) return (
    <>
      <Dialog
        open={show}
        header={{
          icon: Pencil,
          title: data.name,
          description: data.description
        }}
        onClose={() => navigate(location.pathname, {replace: true}) }
      >
        <div className='space-y-2'>
          <label className='font-bold'>Status</label>
          <Select
            placeholder="Change status"
            value={data.status}
            options={
              Object.entries(statusTranslations).map(([key, value]) => (
                {
                  value: key,
                  label: value
                }
              ))
            }
            onChange={handleChange}
          />
        </div>

        {data.completedBy.length && (
          <>
            <p className='mt-3'>Change History</p>
            <ul className='mt-3'>
              {data.completedBy.map((activityLog) => (
                <li key={activityLog._id}>
                  <span className='font-bold text-slate-600'>
                      {statusTranslations[activityLog.status]}
                  </span>{' '} by: {activityLog.user.name}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex flex-row-reverse justify-between pt-4 text-f1-foreground-secondary">
          <p className='text-sm'>Created {formatTimeAgo(data.createdAt)}</p>
          <p className='text-sm'>Updated {formatTimeAgo(data.updatedAt)}</p>
        </div>
      </Dialog>
    </>
  )
}