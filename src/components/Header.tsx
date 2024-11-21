import { Fragment } from 'react'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { Workflows } from '@factorialco/factorial-one/icons/modules'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { PageHeader, PersonAvatar, Menu as MenuOptions } from '@factorialco/factorial-one/dist/experimental'
import type { User } from '@/types/index'
import { Person, Folder, Exit } from '@factorialco/factorial-one/icons/app'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  user: User
}

export default function Header({user}: HeaderProps) {

  const { t } = useTranslation()
  const { breadcrumbs} = useBreadcrumb()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('JWT_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <div className='header-wrapper'>
      <PageHeader
        module={{
          href: '/',
          icon: Workflows,
          name: t('company.name')
        }}
        breadcrumbs={breadcrumbs}
      />
      <div className='px-6'>
        <Menu
          as="div"
          className="relative"
        >
          <MenuButton>
            <PersonAvatar
              firstName={user.name}
              lastName={user.lastname}
              size="medium"
            />
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
                        label: t('profile'),
                        icon: Person,
                        onClick: () => navigate('/profile')
                      },
                      {
                        label: t('projects'),
                        icon: Folder,
                        onClick: () => navigate('/')
                      },
                      {
                        label: t('log_out'),
                        icon: Exit,
                        onClick: () => logout()
                      }
                    ],
                    isRoot: true
                  }
                ]}
              />
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
