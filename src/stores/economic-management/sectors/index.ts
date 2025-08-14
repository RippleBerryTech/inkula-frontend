import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useSectorStore = defineStore('sector', {
  state: () => ({
    sectors: [] as Array<{ 
      id: number;
      name: string,
    }>,
    
    loading: false,

    error: '',
    addSectorError : '',
    editSectorError : '',
    deleteSectorError: '',

    /* NEW - cache flag */
    hasFetchedSectors: false
  }),

  actions: {
    async fetchSectors(force = false) {
      if (this.hasFetchedSectors && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/sectors/list'); // assuming your endpoint is /roles
        this.sectors = res.data.data;
        this.hasFetchedSectors = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view sectors.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch sectors';
        }
      } finally {
            this.loading = false;
      }
    },

    // add sector
    async addSector(data) {
      this.addSectorError = '';
      this.loading = true;
      try {
        const res = await api.post('/sectors/store', data);
        if (res.data.success) {
          this.sectors.push(res.data.data.sectors);
          return res.data.success;
        } else {
          this.addSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addSectorError = err.response?.data?.message || 'Failed to add sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit sector
    async editsector(id) {
      this.editSectorError = '';
      this.loading = true;
      try {
        const res = await api.get(`/sectors/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editSectorError = err.response?.data?.message || 'Failed to edit sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update sector
    async updateSector(data) {
      this.editSectorError = '';
      this.loading = true;
      try {
        const res = await api.put(`/sectors/update/${data.id}`, data);
        console.log(res);
        if (res.data.success) {
          this.sectors = this.sectors.map((role) => {
            if (role.id === data.id) {
              return res.data.data.sector;
            }
            return role;
          });
          return res.data.success;
        } else {
          this.editSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editSectorError = err.response?.data?.message || 'Failed to update sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete sector
    async deleteSector(id) {
      this.deleteSectorError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/sectors/delete/${id}`);
        if (res.data.success) {
          this.sectors = this.sectors.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deleteSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteSectorError = err.response?.data?.message || 'Failed to delete sector';
        return false;
      } finally {
            this.loading = false;
      }
    },
  },
});
