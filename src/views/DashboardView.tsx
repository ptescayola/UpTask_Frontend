import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/api/ProjectAPI'
import { Button, Icon } from '@factorialco/factorial-one'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { Ellipsis, EyeVisible, Delete, Pencil, Add, Coffee } from '@factorialco/factorial-one/icons/app'
import Card from '@/components/shared/Card'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { CompanyTag, Menu as MenuOptions, WidgetEmptyState, Widget, StatusTag } from '@factorialco/factorial-one/dist/experimental'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { ExcludesNullish } from "@/types/index"
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

export default function DashboardView() {
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

  if (isLoading && authLoading) return <Widget.Skeleton />
  if (data && user) return (
    <>
      {!!data.length && (
        <div className='flex flex-row-reverse justify-between'>
          <div>
            <h1 className="text-2xl text-f1-background-bold">Projects</h1>
            <p className="text-lg text-f1-foreground-secondary">Manage your projects</p>
          </div>
          <nav>
            <Button
              icon={Add}
              label="New Project"
              onClick={() => navigate('/projects/create')}
              variant="default"
              size="lg"
            />
          </nav>
        </div>
      )}

      {data.length ? (
        <div className="space-y-2">
          {data.map((project) => (
            <Card
              key={project._id}
              title={project.projectName}
              statusTag={
                isManager(project.manager, user._id)
                   ? <StatusTag text="Manager" variant="warning" />
                   : <StatusTag text="Collaborator" variant="info" />
              }
              content={
                <>
                  <div className='max-w-fit'>
                    <CompanyTag
                      companyImageUrl="https://avatars.githubusercontent.com/u/21041797?s=200&v=4"
                      companyName={project.clientName}
                    />
                  </div>
  
                  <p className="text-lg mt-4">
                    {project.description}
                  </p>
                </>
              }
              actions={
                <Menu as="div" className="relative">
                  <MenuButton onClick={(e) => e.stopPropagation()}>
                    <Icon icon={Ellipsis} size="md" />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 rounded-md px-3 pt-3 shadow-lg bg-f1-background">
                      <MenuOptions
                        tree={[
                          {
                            title: "Root",
                            items: [
                              {
                                label: "View",
                                icon: EyeVisible,
                                href: `/projects/${project._id}`
                              },
                              isManager(project.manager, user._id) && {
                                label: "Edit",
                                icon: Pencil,
                                href: `/projects/${project._id}/edit`
                              },
                              isManager(project.manager, user._id) && {
                                label: "Delete",
                                icon: Delete,
                                onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(location.pathname + `?deleteProject=${project._id}`)}
                              }
                            ].filter(Boolean as unknown as ExcludesNullish),
                            isRoot: true
                          }
                        ]}
                      />
                    </MenuItems>
                  </Transition>
                </Menu>
              }
              onClick={() => navigate(`/projects/${project._id}`)}
            />
          ))}
        </div>
      ) : (
        <WidgetEmptyState
          title="Welcome"
          content="Agile project management tool used by teams to plan, track, release and support world-class software with confidence."
          buttonLabel="Create your first project"
          icon={Coffee}
          buttonAction={() => navigate('/projects/create')}
        />
      )}

      <DeleteProjectModal />
    </>
  )
}
