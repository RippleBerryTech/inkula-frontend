import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Array<{ id: number; name: string, email: string, roles: Array<{ id: number; name: string }> }>,
    roles: [] as Array<{ id: number; name: string }>,
    loading: false,
    error: '',
    addUserError: '',
    updateUserError: '',
    deleteUserError: '',
    addUserFieldErrors: {} as Record<string, string[]>,
    editUserFieldErrors: {} as Record<string, string[]>,

    /* NEW - cache flag */
    hasFetchedRoles: false
  }),

  actions: {
    async fetchUsers(force = false) {
      if (this.hasFetchedRoles && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/users/list'); // assuming your endpoint is /users
        this.users = res.data.data;
        this.hasFetchedRoles = true
      } catch (err: any) {
        if (err.response?.status === 401) {
          this.error = 'You are not authorized to view users.';
        } else {
          this.error = err.response?.data?.message || 'Failed to fetch users';
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchRoles() {
      try {
        const res = await api.get('/users/add'); // assuming your endpoint is /roles
        this.roles = res.data.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch roles';
      }
    },

    // add user
    async addUser(data) {
      this.addUserError = '';
      this.addUserFieldErrors = {}; // new
      this.loading = true;
      try {
        const res = await api.post('/users/store', data);
        if (res.data.success) {
          this.users.push(res.data.data.user);
          return res.data.success;
        } else {
          this.addUserError = res.data.message;
          this.addUserFieldErrors = res.data.errors || {}; // store field errors
          return res.data.success;
        }
      } catch (err: any) {
        this.addUserError = err.response?.data?.message || 'Failed to add user';
        this.addUserFieldErrors = err.response?.data?.errors || {};
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit user
    async editUser(id) {
      this.updateUserError = '';
      this.loading = true;
      try {
        const res = await api.get(`/users/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.updateUserError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.updateUserError = err.response?.data?.message || 'Failed to edit user';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // update user
    async updateUser(data) {
      this.updateUserError = '';
       this.editUserFieldErrors = {}; // new
      this.loading = true;
      try {
        var res = await api.put(`/users/update/${data.id}`, data);

        if (res.data.success) {
          this.users = this.users.map((user) => {
            if (user.id == data.id) {
              return res.data.data.user;
            }
            return user;
          });
          return res.data.success;
        } else {
          this.editUserFieldErrors = res.data.errors || {}; // store field errors
          this.updateUserError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.updateUserError = err.response?.data?.message || 'Failed to update user';
        this.addUserFieldErrors = err.response?.data?.errors || {};
        return false;
      } finally {
        this.loading = false;
      }
    },


    //delete role
    async deleteUser(id) {
      this.deleteUserError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/users/delete/${id}`);
        if (res.data.success) {
          this.users = this.users.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deleteUserError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteUserError = err.response?.data?.message || 'Failed to delete role';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
