import ProfileForm from '@/components/profile/ProfileForm'
import { useAuth } from '@/hooks/useAuth'
import { Widget } from '@factorialco/factorial-one/dist/experimental'

export default function ProfileView() {
  const { data, isLoading } = useAuth()
  if (isLoading) return <Widget.Skeleton />
  if (data) return <ProfileForm data={data} />
}
