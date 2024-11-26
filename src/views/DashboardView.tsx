import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/api/ProjectAPI'
import { Card, Badge, ButtonGroup } from '@/components/shared'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { ExcludesNullish } from "@/types/index"
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'
import { useTranslation } from 'react-i18next'
import { PlusCircleIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function DashboardView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  useEffect(() => {
    setBreadcrumbs([])
  }, [setBreadcrumbs])

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading && authLoading) return (<p>Loading...</p>)
  if (data && user) return (
    <>
      <div className='flex justify-between mb-6'>
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {t('projects')}
          </h1>
          <p className="mt-1 text-gray-500">
            {t('manage_projects')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((project) => (
          <Card
            key={project._id}
            title={project.projectName}
            header={
              <Badge
                text={project.clientName}
                onClick={(e: React.MouseEvent) => {e.stopPropagation(); window.open(project.clientUrl, '_blank', 'noopener,noreferrer')}}
              />
            }
            content={
              <>
                { project.description && (
                  <p className="text-lg mt-4">
                    {project.description}
                  </p>
                )}

                {
                  isManager(project.manager, user._id)
                    ? <Badge text={t('manager')} variant="purple" />
                    : <Badge text={t('collaborator')} variant="orange" />
                }
              </>
            }
            actions={
              <ButtonGroup items={[
                {
                  Icon: EyeIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(`/projects/${project._id}`)}
                },
                isManager(project.manager, user._id) && {
                  Icon: PencilIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(`/projects/${project._id}/edit`)}
                },
                isManager(project.manager, user._id) && {
                  Icon: TrashIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(location.pathname + `?deleteProject=${project._id}`)}
                }
              ].filter(Boolean as unknown as ExcludesNullish)} />
            }
            onClick={() => navigate(`/projects/${project._id}`)}
          />
        ))}

        <div
          className="flex place-content-center items-center justify-center rounded-md border-2 border-dashed border-gray-200 hover:border-blue-700 bg-stone-50 text-gray-400 hover:text-blue-600 p-6 h-[180px] cursor-pointer"
          onClick={() => navigate('/projects/create')}
        >
          <div className='max-w-m'>
            <PlusCircleIcon className='h-[24px] w-[24px] m-auto' />
            {t('create_new_project')}
          </div>
        </div>
      </div>

      <DeleteProjectModal />
    </>
  )
}
