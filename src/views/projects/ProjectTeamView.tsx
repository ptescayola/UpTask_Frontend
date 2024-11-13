import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddMemberModal from '@/components/team/AddMemberModal'
import { getProjectTeam, removeUserFromProject } from '@/api/TeamAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Widget } from '@factorialco/factorial-one/dist/experimental'
import { Button } from '@factorialco/factorial-one'
import type { TeamMember } from '@/types/index'
import { Delete } from '@factorialco/factorial-one/icons/app'
import Card from '@/components/shared/Card'

export default function ProjectTeamView() {

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
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }
  })

  if (isLoading) return <Widget.Skeleton />
  if (isError) return <Navigate to={'/404'} />
  if (data) return (
    <>
      <div className='flex flex-row-reverse justify-between'>
        <h1 className="text-2xl text-f1-background-bold">Team manager</h1>

        <div className='flex gap-2'>
          <Button
            label="Add collaborator"
            onClick={() => navigate(location.pathname + '?addMember=true')}
            size="lg"
          />
          <Button
            label="Cancel"
            onClick={() => navigate(`/projects/${projectId}`)}
            variant="neutral"
            size="lg"
          />
        </div>
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
                icon={Delete}
                variant="neutral"
                onClick={() => mutate({projectId, userId: member._id})}
              />
            }
          />
        ))
      ) : (
        <p className='text-center py-20'>There are no members in this team</p>
      )}

      <AddMemberModal />
    </>
  )
}
