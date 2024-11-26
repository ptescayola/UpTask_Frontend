import { Dialog as HeadlessDialog, DialogPanel } from '@headlessui/react'
import clsx from 'clsx'

type DialogProps = {
  isOpen: boolean
  icon?: React.ReactNode
  title?: string
  subtitle?: string
  content?: React.ReactNode
  actions?: React.ReactNode
  onClose: () => void
}

export const Dialog = ({
  isOpen,
  icon,
  title,
  subtitle,
  content,
  actions,
  onClose
}: DialogProps) => {
  return (
    <HeadlessDialog
      open={isOpen}
      as="div"
      onClose={onClose}
      transition
      className={clsx(
        'fixed inset-0 w-screen items-center justify-center',
        'backdrop-blur-sm bg-black/10 transition-opacity duration-500 ease-out data-[enter]:opacity-0 data-[closed]:opacity-0'
      )}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx(
              'relative w-full max-w-md block rounded-lg shadow-xl shadow-gray-400 bg-white p-6',
              'transition-all duration-800 ease-out data-[enter]:-translate-y-5 data-[closed]:-translate-y-15 data-[leave]:-translate-y-10 data-[enter]:opacity-0 data-[closed]:opacity-0'
            )}
          >
            {icon && (
              <div className="absolute -top-[24px]">
                <div className="w-[54px] h-[54px] shadow-sm shadow-gray-300 bg-white rounded-lg flex items-center justify-center mx-auto">
                  {icon}
                </div>
              </div>
            )}
            {title && (
              <h3 className="mt-6 text-xl font-bold text-gray-900 sm:text-3xl">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-gray-500 mb-6">
                {subtitle}
              </p>
            )}
            {content && (
              <div className="mt-4">
                {content}
              </div>
            )}
            {actions && (
              <div className="flex justify-between mt-6">
                {actions}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  )
}
