import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddMemberModal from '@/components/team/AddMemberModal'
import { getProjectTeam, removeUserFromProject } from '@/api/TeamAPI'
import { toast } from 'react-toastify'
import type { TeamMember } from '@/types/index'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Notification, Card, Button } from '@/components/shared'
import { useTranslation } from 'react-i18next'

export default function ProjectTeamView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError} = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }
  })

  if (isLoading) return (<p>Loading...</p>)
  if (isError) return <Navigate to={'/404'} />
  if (data) return (
    <>
      <div className='flex justify-between mb-6'>
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {t('team_manager')}
          </h1>
        </div>
        <nav className='flex gap-2'>
          <Button
            label={t('add_collaborator')}
            onClick={() => navigate(location.pathname + '?addMember=true')}
          />
          <Button
            label={t('cancel')}
            onClick={() => navigate(`/projects/${projectId}`)}
            variant="neutral"
          />
        </nav>
      </div>

      {data.length ? (
        data?.map((member: TeamMember) => (
          <Card
            key={member._id}
            title={member.name}
            content={
              <p>{member.email}</p>
            }
            actions={
              <Button
                label=""
                Icon={TrashIcon}
                variant="neutral"
                onClick={() => mutate({projectId, userId: member._id})}
              />
            }
          />
        ))
      ) : (
        <p className='text-center py-20 text-lg text-gray-400'>{t('no_members_team')}</p>
      )}

      <AddMemberModal />
    </>
  )
}
