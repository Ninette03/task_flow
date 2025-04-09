// Define user roles
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

// Define permissions
export enum Permission {
  VIEW_TASKS = 'view_tasks',
  CREATE_TASKS = 'create_tasks',
  EDIT_TASKS = 'edit_tasks',
  DELETE_TASKS = 'delete_tasks',
  MANAGE_USERS = 'manage_users',
  VIEW_REPORTS = 'view_reports',
}

// Define role-permission mapping
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    Permission.VIEW_TASKS,
    Permission.CREATE_TASKS,
    Permission.EDIT_TASKS,
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_TASKS,
    Permission.CREATE_TASKS,
    Permission.EDIT_TASKS,
    Permission.DELETE_TASKS,
    Permission.VIEW_REPORTS,
  ],
  [UserRole.ADMIN]: [
    Permission.VIEW_TASKS,
    Permission.CREATE_TASKS,
    Permission.EDIT_TASKS,
    Permission.DELETE_TASKS,
    Permission.MANAGE_USERS,
    Permission.VIEW_REPORTS,
  ],
};

// Helper function to check if a user has a specific permission
export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Helper function to check if a user has any of the specified permissions
export const hasAnyPermission = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

// Helper function to check if a user has all of the specified permissions
export const hasAllPermissions = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission));
}; 