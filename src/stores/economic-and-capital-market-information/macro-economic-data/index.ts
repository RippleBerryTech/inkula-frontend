import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useMacroEconomicDataStore = defineStore('macro-economic-data', {
  state: () => ({
    economicSubmissions: [] as Array<{ 
      id: number; 
      mpile_high_yield_debt_fund: number,
      mpile_money_market_fund: number,
      mpile_local_equity_fund: number,

      mpile_offshore_equity_fund: number,
      mpile_property_fund: number,
      luse_free_float_index: number,

      luse_all_share_index: number,
      stanbic_bank_zambia_composite_pmi: number,
      copper_prices_usd_per_ton: number,

      money_market_liquidity: number,
      average_zmw_per_usd: number,
      treasury_bill_rate_91_day: number,

      treasury_bill_rate_364_day: number,
      government_bond_rate_5_year: number,
      government_bond_rate_10_year: number,

      government_bond_rate_15_year: number,
      inflation: number,
    }>,
    
    loading: false,

    error: '',
    addEconomicSubmissionError : '',
    editEconomicSubmissionError : '',
    showEconomicSubmissionError : '',
    deleteEconomicSubmissionError: '',

    importErrors: [] as Array<{ row: number; attribute: string; errors: string[] }>,

    /* NEW - cache flag */
    hasFetchedEconomicSubmissions: false
  }),

  actions: {
    async fetchMacroEconomicData(force = false) {
      if (this.hasFetchedEconomicSubmissions && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/economic-and-capital-market-information/macro-economic-data/list'); // assuming your endpoint is /roles
        this.economicSubmissions = res.data.data;
        this.hasFetchedEconomicSubmissions = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view macro economic data.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch macro economic data';
        }
      } finally {
            this.loading = false;
      }
    },

    // add macro economic data
    async addMacroEconomicData(data) {
      this.addEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.post('/economic-and-capital-market-information/macro-economic-data/store', data);
        if (res.data.success) {
          this.economicSubmissions.push(res.data.data.macroEconomicData);
          return res.data.success;
        } else {
          this.addEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addEconomicSubmissionError = err.response?.data?.message || 'Failed to add macro economic data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit macro economic data
    async editMacroEconomicData(id) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.get(`/economic-and-capital-market-information/macro-economic-data/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to edit macro economic data';
        return false;
      } finally {
            this.loading = false;
      }
    },
    //show macro economic data
    async showMacroEconomicData(id) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.get(`/economic-and-capital-market-information/macro-economic-data/show/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to show macro economic data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update macro economic data
    async updateMacroEconomicData(data) {
      this.showEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.put(`/economic-and-capital-market-information/macro-economic-data/update/${data.id}`, data);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.map((role) => {
            if (role.id === data.id) {
              return res.data.data.macroEconomicData;
            }
            return role;
          });
          return res.data.success;
        } else {
          this.showEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.showEconomicSubmissionError = err.response?.data?.message || 'Failed to update macro economic data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete macro economic data
    async deleteMacroEconomicData(id) {
      this.deleteEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/economic-and-capital-market-information/macro-economic-data/delete/${id}`);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.filter((data) => data.id !== id);
          return res.data.success;
        } else {
          this.deleteEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteEconomicSubmissionError = err.response?.data?.message || 'Failed to delete macro economic data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    async importMacroEconomicData(file: FormData) {
      this.loading = true;
      this.error = '';
      this.importErrors = []; // Clear previous errors
      try {
        const res = await api.post('/economic-and-capital-market-information/macro-economic-data/import', file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          // clear previous records and set new ones
          this.economicSubmissions = [];
          this.economicSubmissions = res.data.data.macroEconomicData;
          return res.data.success;
        } else {
          this.error = res.data.message;
          this.importErrors = res.data.errors || []; // Store errors
          return false;
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to import macro economic data';
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
        const response = await api.get('/economic-and-capital-market-information/macro-economic-data/download-import-template', {
          responseType: 'blob', // important for file download
        });

        // Create a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'macro-economic-data_template.xlsx'); // file name
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
