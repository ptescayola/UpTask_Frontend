import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/api/ProjectAPI'
import EditProjectForm from '@/components/projects/EditProjectForm'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { Widget } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

export default function EditProjectView() {

  const { t } = useTranslation()
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
        { label: t('projects'), href: '/' },
        { label: `${t('edit')} ${data.projectName}` }
      ])
    }
  }, [data, setBreadcrumbs])

  if (isLoading) return <Widget.Skeleton />
  if (isError) return <Navigate to='/404' />
  if (data) return <EditProjectForm data={data} projectId={projectId} />
}
