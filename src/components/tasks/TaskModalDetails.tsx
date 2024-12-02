import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getTaskById, updateStatus } from '@/api/TaskAPI'
import { formatTimeAgo } from '@/utils/index'
import { TaskStatus } from '@/types/index'
import { statusTranslations } from '@/locales/en'
import { Notification, Dialog, Avatar, Badge, Tabs, Select } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { PencilIcon } from '@heroicons/react/24/outline'
import NotesPanel from '../notes/NotesPanel'
import { useState } from 'react'

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

  const [activeTab, setActiveTab] = useState('notes')

  const tabs = [
    { 
      label: t('comments'), 
      name: 'notes',
      active: activeTab === 'notes'
    },
    { 
      label: t('history'), 
      name: 'history',
      active: activeTab === 'history'
    }
  ]

  const handleTabClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const name = e.currentTarget.getAttribute('data-name')
    if (name) setActiveTab(name)
  }

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
      size="xl"
      content={
        <>
          <div className='grid grid-cols-[auto,150px] gap-4'>
          
            <div>
              <div className='mt-6 text-xl font-bold text-gray-900 sm:text-3xl'>
                {data.name}
              </div>

              <div className='mt-1 text-gray-500 mb-6'>
                {data.description}
              </div>

              <Tabs options={tabs} onClick={handleTabClick}/>

              {activeTab === 'history' && data.completedBy.length > 0 && (
                <>
                  {data.completedBy.map((activityLog) => (
                    <div key={activityLog._id} className='flex items-center gap-3 space-y-4'>
                      <Avatar firstName={activityLog.user.name} lastName={activityLog.user.name} image={activityLog.user.profileImage} size="sm"/>
                      <div>
                        <p className='text-sm'>{activityLog.user.name} {activityLog.user.lastname} changed the Status</p>
                        <Badge text={statusTranslations[activityLog.status]} variant="gray"/>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'notes' && (
                <NotesPanel 
                  notes={data.notes}
                />
              )}
            </div>

            <div className='flex flex-col h-full'>
              <div className='space-y-2'>
                <label className='font-bold'>{t('status')}</label>
                <Select
                  placeholder={t('change_status')}
                  value={data.status}
                  options={Object.entries(statusTranslations).map(([key, value]) => ({
                    value: key,
                    label: value
                  }))}
                  onChange={handleChange}
                />
              </div>
              
              <div className='mt-auto'>
                <p className="text-xs text-gray-500 mb-2">{t('created_at', {date: formatTimeAgo(data.createdAt)})}</p>
                <p className="text-xs text-gray-500">{t('updated_at', {date: formatTimeAgo(data.updatedAt)})}</p>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
