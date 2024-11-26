export enum RoutesEnum {
  DASHBOARD = '/',
  CREATE_PROJECT = '/projects/create',
  PROJECT_DETAILS = '/projects/:projectId',
  EDIT_PROJECT = '/projects/:projectId/edit',
  PROJECT_TEAM = '/projects/:projectId/team',
  PROFILE = '/profile',
  CHANGE_PASSWORD = '/profile/password',
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  CONFIRM_EMAIL = '/auth/confirm-email',
  CONFIRM_ACCOUNT = '/auth/confirm-account',
  REQUEST_CODE = '/auth/request-code',
  FORGOT_PASSWORD = '/auth/forgot-password',
  NEW_PASSWORD = '/auth/new-password',
  NOT_FOUND = '*'
}
