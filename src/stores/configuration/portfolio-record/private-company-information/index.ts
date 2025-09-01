import { defineStore } from 'pinia';
import api from '../../../../plugins/axios'; // your Axios instance

export const usePrivateCompanyInformationStore = defineStore('private-company-information', {

  state: () => ({
    portfolioRecords: [] as Array<{ 
      id: number;
      name: string,
      description: string,
    }>,
    
    loading: false,

    error: '',
    addPortfolioRecordError : '',
    editPortfolioRecordError : '',
    deletePortfolioRecordError: '',

    addPortfolioRecordFieldErrors: {} as Record<string, string[]>,
    editPortfolioRecordFieldErrors: {} as Record<string, string[]>,

    importErrors: [] as Array<{ row: number; attribute: string; errors: string[] }>,
    /* NEW - cache flag */
    hasFetchedPortfolioRecords: false
  }),

  actions: {
    async fetchPrivateCompanyInformation(force = false) {
      if (this.hasFetchedPortfolioRecords && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/configuration/portfolio-record/private-company-information/list'); // assuming your endpoint is /roles
        this.portfolioRecords = res.data.data;
        this.hasFetchedPortfolioRecords = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view portfolio records.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch portfolio records';
        }
      } finally {
            this.loading = false;
      }
    },

    // add portfolio record
    async addPrivateCompanyInformation(data) {
      this.addPortfolioRecordError = '';
      this.addPortfolioRecordFieldErrors = {};
      this.loading = true;

      try {
        const res = await api.post('/configuration/portfolio-record/private-company-information/store', data);
        if (res.data.success) {
          this.portfolioRecords.push(res.data.data.privateCompanyInformation);
          return true;
        } else {
          this.addPortfolioRecordError = res.data.message;
          if (res.data.errors) {
            this.addPortfolioRecordFieldErrors = res.data.errors;
          }
          return false;
        }
      } catch (err: any) {
        this.addPortfolioRecordError = err.response?.data?.message || 'Failed to add portfolio record';
        if (err.response?.data?.errors) {
          this.addPortfolioRecordFieldErrors = err.response.data.errors;
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    //edit sector
    async editPrivateCompanyInformation(id) {
      this.editPortfolioRecordError = '';
      this.loading = true;
      try {
        const res = await api.get(`/configuration/portfolio-record/private-company-information/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editPortfolioRecordError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editPortfolioRecordError = err.response?.data?.message || 'Failed to edit portfolio record';
        return false;
      } finally {
            this.loading = false;
      }
    },

    async updatePrivateCompanyInformation(data) {
      this.editPortfolioRecordError = '';
      this.editPortfolioRecordFieldErrors = {};
      this.loading = true;

      try {
        const res = await api.put(`/configuration/portfolio-record/private-company-information/update/${data.id}`, data);
        if (res.data.success) {
          this.portfolioRecords = this.portfolioRecords.map((record) => {
            if (record.id === data.id) {
              return res.data.data.privateCompanyInformation;
            }
            return record;
          });
          return true;
        } else {
          this.editPortfolioRecordError = res.data.message;
          if (res.data.errors) {
            this.editPortfolioRecordFieldErrors = res.data.errors;
          }
          return false;
        }
      } catch (err: any) {
        this.editPortfolioRecordError = err.response?.data?.message || 'Failed to update portfolio record';
        if (err.response?.data?.errors) {
          this.editPortfolioRecordFieldErrors = err.response.data.errors;
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    //delete portfolio record
    async deletePrivateCompanyInformation(id) {
      this.deletePortfolioRecordError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/configuration/portfolio-record/private-company-information/delete/${id}`);
        if (res.data.success) {
          this.portfolioRecords = this.portfolioRecords.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deletePortfolioRecordError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deletePortfolioRecordError = err.response?.data?.message || 'Failed to delete portfolio record';
        return false;
      } finally {
            this.loading = false;
      }
    },

    async importPrivateCompanyInformation(file: FormData) {
      this.loading = true;
      this.error = '';
      this.importErrors = []; // Clear previous errors
      try {
        const res = await api.post('/configuration/portfolio-record/private-company-information/import', file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          // clear previous records and set new ones
          this.portfolioRecords = [];
          this.portfolioRecords = res.data.data.privateCompanyInformation;
          return res.data.success;
        } else {
          this.error = res.data.message;
          this.importErrors = res.data.errors || []; // Store errors
          return false;
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to import portfolio records';
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
        const response = await api.get('/configuration/portfolio-record/private-company-information/download-import-template', {
          responseType: 'blob', // important for file download
        });

        // Create a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'portfolio_record_template.xlsx'); // file name
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
