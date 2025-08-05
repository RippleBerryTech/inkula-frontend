import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [] as Array<{ id: number; name: string, description: string, permissions: Array<{ id: number; name: string }> }>,
    permissions: [] as Array<{ id: number; name: string }>,
    
    loading: false,

    error: '',
    addRoleError : '',
    editRoleError : '',
    deleteRoleError: '',

    /* NEW - cache flag */
    hasFetchedRoles: false
  }),

  actions: {
    async fetchRoles(force = false) {
      if (this.hasFetchedRoles && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/roles/list'); // assuming your endpoint is /roles
        this.roles = res.data.data;
        this.hasFetchedRoles = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view roles.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch roles';
        }
      } finally {
            this.loading = false;
      }
    },

    // add role
    async addRole(data) {
      this.addRoleError = '';
      this.loading = true;
      try {
        const res = await api.post('/roles/store', data);
        if (res.data.success) {
          this.roles.push(res.data.data);
          return res.data.success;
        } else {
          this.addRoleError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addRoleError = err.response?.data?.message || 'Failed to add role';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit role
    async editRole(id) {
      this.editRoleError = '';
      this.loading = true;
      try {
        const res = await api.get(`/roles/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editRoleError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editRoleError = err.response?.data?.message || 'Failed to edit role';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update role
    async updateRole(data) {
      this.addRoleError = '';
      this.loading = true;
      try {
        const res = await api.post(`/roles/update/${data.id}`, data);
        if (res.data.success) {
          this.roles = this.roles.map((role) => {
            if (role.id === data.id) {
              return res.data.data;
            }
            return role;
          });
          return res.data.success;
        } else {
          this.addRoleError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addRoleError = err.response?.data?.message || 'Failed to update role';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete role
    async deleteRole(id) {
      this.deleteRoleError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/roles/delete/${id}`);
        if (res.data.success) {
          this.roles = this.roles.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deleteRoleError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteRoleError = err.response?.data?.message || 'Failed to delete role';
        return false;
      } finally {
            this.loading = false;
      }
    },


    async fetchPermissions() {
      try {
        const res = await api.get('/roles/add'); // assuming your endpoint is /permissions
        this.permissions = res.data.data;
        console.log(this.permissions);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch permissions';
      }
    },
  },
});
