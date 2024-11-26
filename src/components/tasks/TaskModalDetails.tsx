import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getTaskById, updateStatus } from '@/api/TaskAPI'
import { formatTimeAgo } from '@/utils/index'
import { TaskStatus } from '@/types/index'
import { statusTranslations } from '@/locales/en'
import { Notification, Dialog, Button } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { PencilIcon } from '@heroicons/react/24/outline'

export default function TaskModalDetails() {

  const { t } = useTranslation()
  const params = useParams()
  const projectId = params.projectId!
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const isOpen = taskId ? true : false

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
      toast(<Notification variant="danger" title={error.message} />)
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
    toast(<Notification variant="danger" title={error.message}/>, { toastId: 'error' })
    return <Navigate to={`/projects/${projectId}`} />
  }

  if (data) return (
    <Dialog
      isOpen={isOpen}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<PencilIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={data.name}
      subtitle={data.description}
      content={
        <>
          {/* <div className='space-y-2'>
            <label className='font-bold'>{t('status')}</label>
            <Select
              placeholder={t('change_status')}
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
          </div> */}

          {data.completedBy.length && (
            <>
              <p className='mt-3'>{t('change_history')}</p>
              <div className='mt-3'>
                {data.completedBy.map((activityLog) => (
                  <p key={activityLog._id}>
                    {t('status_change_by', {
                      status: statusTranslations[activityLog.status],
                      name:  activityLog.user.name
                    })}
                  </p>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between text-sm pt-4">
            <p>{t('created_at', {date: formatTimeAgo(data.createdAt)})}</p>
            <p>{t('updated_at', {date: formatTimeAgo(data.updatedAt)})}</p>
          </div>
        </>
      }
      actions={
        <>
          <Button
            label={t('cancel')}
            variant="neutral"
            onClick={(e) => {
              e.preventDefault()
              navigate(location.pathname, { replace: true })
            }}
          />
        </>
      }
    />
  )
}