import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RoutesEnum } from '@/constants/routes'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import ProjectDetailsView from '@/views/projects/ProjectDetailsView'
import EditProjectView from '@/views/projects/EditProjectView'
import AuthLayout from '@/layouts/AuthLayout'
import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'
import ConfirmEmailView from '@/views/auth/ConfirmEmailView'
import ConfirmAccountView from '@/views/auth/ConfirmAccountView'
import RequestNewCodeView from '@/views/auth/RequestNewCodeView'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView'
import NewPasswordView from '@/views/auth/NewPasswordView'
import ProjectTeamView from '@/views/projects/ProjectTeamView'
import ProfileLayout from '@/layouts/ProfileLayout'
import ProfileView from '@/views/profile/ProfileView'
import ChangePasswordView from '@/views/profile/ChangePasswordView'
import NotFound from '@/views/404/NotFound'

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={RoutesEnum.DASHBOARD} element={<DashboardView />} index />
          <Route path={RoutesEnum.CREATE_PROJECT} element={<CreateProjectView />} />
          <Route path={RoutesEnum.PROJECT_DETAILS} element={<ProjectDetailsView />} />
          <Route path={RoutesEnum.EDIT_PROJECT} element={<EditProjectView />} />
          <Route path={RoutesEnum.PROJECT_TEAM} element={<ProjectTeamView />} />
          <Route element={<ProfileLayout />}>
            <Route path={RoutesEnum.PROFILE} element={<ProfileView />} />
            <Route path={RoutesEnum.CHANGE_PASSWORD} element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={RoutesEnum.LOGIN} element={<LoginView />} />
          <Route path={RoutesEnum.REGISTER} element={<RegisterView />} />
          <Route path={RoutesEnum.CONFIRM_EMAIL} element={<ConfirmEmailView />} />
          <Route path={RoutesEnum.CONFIRM_ACCOUNT} element={<ConfirmAccountView />} />
          <Route path={RoutesEnum.REQUEST_CODE} element={<RequestNewCodeView />} />
          <Route path={RoutesEnum.FORGOT_PASSWORD} element={<ForgotPasswordView />} />
          <Route path={RoutesEnum.NEW_PASSWORD} element={<NewPasswordView />} />
        </Route>

        <Route path={RoutesEnum.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
