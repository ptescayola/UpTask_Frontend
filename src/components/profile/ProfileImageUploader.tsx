import { useRef, useState } from 'react'
import { User } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileImage, deleteProfileImage } from '@/api/ProfileAPI'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type ProfileImageUploaderProps = {
  user: User
}

export default function ProfileImageUploader({ user }: ProfileImageUploaderProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  
  const queryClient = useQueryClient()
  
  const uploadMutation = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      toast(<Notification variant="positive" title={t('profile_image.updated')} />)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setPreviewImage(null)
    },
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      toast(<Notification variant="positive" title={t('profile_image.deleted')} />)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      uploadMutation.mutate(file)
    }
  }

  const handleDeleteImage = () => {
    deleteMutation.mutate()
  }

  const imageUrl = previewImage || (user.profileImage ? `${import.meta.env.VITE_SERVER_URL}/uploads/profiles/${user.profileImage}` : null)

  return (
    <div className="mt-2 flex items-center gap-x-3">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {imageUrl ? (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="h-12 w-12 rounded-full object-cover"
          />
          <button
            onClick={handleDeleteImage}
            className="absolute -top-1 -right-1 text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
      )}
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        )}
      >
        {t('change')}
      </button>
    </div>
  )
}
