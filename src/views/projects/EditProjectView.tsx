import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/api/ProjectAPI'
import EditProjectForm from '@/components/projects/EditProjectForm'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { Widget } from '@factorialco/factorial-one/dist/experimental'

export default function EditProjectView() {

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
        { label: 'Projects', href: '/' },
        { label: `Edit ${data.projectName}` }
      ])
    }
  }, [data, setBreadcrumbs])

  if (isLoading) return <Widget.Skeleton />
  if (isError) return <Navigate to='/404' />
  if (data) return <EditProjectForm data={data} projectId={projectId} />
}
