import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export function usePermissions() {
    const auth = useAuthStore()
    const { roles, permissions } = storeToRefs(auth)

    const hasRole = (role: string): boolean => {
        return roles.value.includes(role)
    }

    const hasPermission = (permission: string): boolean => {
        return permissions.value.includes(permission)
    }

    return {
        hasRole,
        hasPermission,
    }
}
