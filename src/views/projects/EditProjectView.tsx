import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/api/ProjectAPI'
import EditProjectForm from '@/components/projects/EditProjectForm'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function EditProjectView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading, isError } = useQuery({
      queryKey: ['editProject', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
  })

  useEffect(() => {
    if (data) {
      setBreadcrumbs([
        { label: t('projects'), onClick: () => navigate('/')},
        { label: `${t('edit')} ${data.projectName}` }
      ])
    }
  }, [data, setBreadcrumbs])

  if (isLoading) return (<p>Loading...</p>)
  if (isError) return <Navigate to='/404' />
  if (data) return <EditProjectForm data={data} projectId={projectId} />
}
