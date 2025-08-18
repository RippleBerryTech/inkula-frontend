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

    importErrors: [] as Array<{ row: number; attribute: string; errors: string[] }>,
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
    async importSectors(file: FormData) {
      this.loading = true;
      this.error = '';
      this.importErrors = []; // Clear previous errors
      try {
        const res = await api.post('/sectors/import', file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          //clear previous sectors
          this.sectors = [];
          //set new sectors
          this.sectors = res.data.data.sectors;
          return res.data.success;
        } else {
          this.error = res.data.message;
          this.importErrors = res.data.errors || []; // Store errors
          return false;
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to import sectors';
        this.importErrors = err.response?.data?.errors || [];
        return false;
      } finally {
        this.loading = false;
      }
    },
    async downloadTemplate() {
      this.loading = true;
      this.error = '';
      try {
        const response = await api.get('/sectors/download-import-template', {
          responseType: 'blob', // important for file download
        });

        // Create a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sector_template.xlsx'); // file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to download template';
        return false;
      } finally {
        this.loading = false;
      }
    }
  },
});
