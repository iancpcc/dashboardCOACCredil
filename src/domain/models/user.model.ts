export interface UserModel {
  username?: string;
  password?: string;
  idagency?: (string|number);
  email?: string;
  createdAt?: (string | Date);
  passwordChangeAt?: (string | Date);
  haschangedPassword?: boolean;
  daysToChangePassword?: number;
  hasBlocked?: boolean;
  canAccessToSystem?: boolean;
  isActive?: boolean;
}
