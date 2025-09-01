import { defineStore } from 'pinia';
import api from '../../../../plugins/axios'; // your Axios instance

export const useSubSectorStore = defineStore('sub-sector', {
  state: () => ({
    sectors: [] as Array<{ 
      id: number;
      name: string,
      sector_id: number,
    }>,
    
    loading: false,

    error: '',
    addSubSectorError : '',
    editSubSectorError : '',
    deleteSubSectorError: '',

    // importErrors: [] as Array<{ row: number; attribute: string; errors: string[] }>,
    /* NEW - cache flag */
    hasFetchedSectors: false
  }),

  actions: {
    async fetchSubSectors(force = false, id: any) {
      if (this.hasFetchedSectors && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/configuration/sectors/'+id+'/sub-sectors/list'); // assuming your endpoint is /roles
        this.sectors = res.data.data;
        this.hasFetchedSectors = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view sub sectors.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch sub sectors';
        }
      } finally {
            this.loading = false;
      }
    },

    // add sector
    async addSubSector(data) {
      this.addSubSectorError = '';
      this.loading = true;
      try {
        const res = await api.post('/configuration/sectors/'+data.sector_id+'/sub-sectors/store', data);
        if (res.data.success) {
          this.sectors.push(res.data.data.sectors);
          return res.data.success;
        } else {
          this.addSubSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addSubSectorError = err.response?.data?.message || 'Failed to add sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit sector
    async editSubSector(id, sub_sector_id) {
      this.editSubSectorError = '';
      this.loading = true;
      try {
        var url = `/configuration/sectors/`+id +`/sub-sectors/edit/${sub_sector_id}`;
        console.log(url);
        const res = await api.get(url);
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editSubSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editSubSectorError = err.response?.data?.message || 'Failed to edit sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update sector
    async updateSubSector(data) {
      this.editSubSectorError = '';
      this.loading = true;
      try {
        const res = await api.put(`/configuration/sectors/`+data.sector_id+`/sub-sectors/update/${data.id}`, data);
        console.log(res);
        if (res.data.success) {
          this.sectors = this.sectors.map((data) => {
            if (data.id === data.id) {
              return res.data.data.sector;
            }
            return data;
          });
          return res.data.success;
        } else {
          this.editSubSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editSubSectorError = err.response?.data?.message || 'Failed to update sub sector';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete sector
    async deleteSubSector(id, sub_sector_id) {
      this.deleteSubSectorError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/configuration/sectors/`+id+`/sub-sectors/delete/${sub_sector_id}`);
        if (res.data.success) {
          this.sectors = this.sectors.filter((data) => data.id !== id);
          return res.data.success;
        } else {
          this.deleteSubSectorError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteSubSectorError = err.response?.data?.message || 'Failed to delete sub sector';
        return false;
      } finally {
            this.loading = false;
      }
    },
  },
});
