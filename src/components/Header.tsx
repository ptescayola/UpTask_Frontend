import { Fragment } from 'react'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import type { User } from '@/types/index'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RectangleStackIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { Avatar, Breadcrumb } from '@/components/shared'

type HeaderProps = {
  user: User
}

export default function Header({user}: HeaderProps) {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('JWT_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-3">
            <a className="block text-teal-600" onClick={() => navigate('/')}>
              <div className="w-[42px] h-[42px] border border-gray-200 rounded-lg flex items-center justify-center mx-auto">
                <RectangleStackIcon className="w-[18px] h-[18px] text-blue-600" />
              </div>
            </a>
            <Breadcrumb />
          </div>

          <div className="md:flex md:items-center md:gap-12">

            <Menu
              as="div"
              className="relative"
            >
              <MenuButton>
                <div className="hidden md:relative md:block">
                  <Avatar firstName={user.name} lastName={user.lastname} image={user.profileImage} />
                </div>
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
                <MenuItems className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    <a
                      onClick={() => navigate('/profile')}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      {t('profile')}
                    </a>

                    <a
                      onClick={() => navigate('/')}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      {t('projects')}
                    </a>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => logout()}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      role="menuitem"
                    >
                      <ArrowUturnLeftIcon className='w-[18px] h-[18px]' />

                      {t('log_out')}
                    </button>
                  </div>
                  
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}
