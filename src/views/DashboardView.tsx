import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/api/ProjectAPI'
import { Card, Badge, Button, ButtonGroup } from '@/components/shared'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { ExcludesNullish } from "@/types/index"
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'
import { useTranslation } from 'react-i18next'
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Notification } from '@/components/shared'
import { toast } from 'react-toastify'

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
        <nav>
          <Button
            Icon={PlusIcon}
            label={t('new_project')}
            // onClick={() => navigate('/projects/create')}
            onClick={() => toast(<Notification variant="positive" title='Message Error' />)}
          />
        </nav>
      </div>

      {data.length ? (
        <div className="space-y-2">
          {data.map((project) => (
            <Card
              key={project._id}
              title={project.projectName}
              statusTag={
                isManager(project.manager, user._id)
                   ? <Badge text={t('manager')} variant="purple" />
                   : <Badge text={t('collaborator')} variant="orange" />
              }
              content={
                <>
                  <div className='max-w-fit'>
                    <Badge
                      text={project.clientName}
                      onClick={(e: React.MouseEvent) => {e.stopPropagation(); window.open(project.clientUrl, '_blank', 'noopener,noreferrer')}}
                    />
                  </div>

                  { project.description && (
                    <p className="text-lg mt-4">
                      {project.description}
                    </p>
                  )}
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
        </div>
      ) : (
          'Empty State'
        // <WidgetEmptyState
        //   title={t('welcome')}
        //   content={t('welcome_description')}
        //   buttonLabel={t('welcome_action')}
        //   icon={Coffee}
        //   buttonAction={() => navigate('/projects/create')}
        // />
      )}

      <DeleteProjectModal />
    </>
  )
}
