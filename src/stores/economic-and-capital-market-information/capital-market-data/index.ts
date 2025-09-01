import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useCapitalMarketDataStore = defineStore('capital-market-data', {
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
    async fetchCapitalMarketData(force = false) {
      if (this.hasFetchedEconomicSubmissions && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/economic-and-capital-market-information/capital-market-data/list'); // assuming your endpoint is /roles
        this.economicSubmissions = res.data.data;
        this.hasFetchedEconomicSubmissions = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view capital market data.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch capital market data';
        }
      } finally {
            this.loading = false;
      }
    },

    // add capital market data
    async addCapitalMarketData(data) {
      this.addEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.post('/economic-and-capital-market-information/capital-market-data/store', data);
        if (res.data.success) {
          this.economicSubmissions.push(res.data.data.macroEconomicData);
          return res.data.success;
        } else {
          this.addEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addEconomicSubmissionError = err.response?.data?.message || 'Failed to add capital market data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit capital market data
    async editCapitalMarketData(id) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.get(`/economic-and-capital-market-information/capital-market-data/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to edit capital market data';
        return false;
      } finally {
            this.loading = false;
      }
    },
    //show capital market data
    async showCapitalMarketData(id) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.get(`/economic-and-capital-market-information/capital-market-data/show/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to show capital market data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update capital market data
    async updateCapitalMarketData(data) {
      this.showEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.put(`/economic-and-capital-market-information/capital-market-data/update/${data.id}`, data);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.map((role) => {
            if (role.id === data.id) {
              return res.data.data.capitalMarketData;
            }
            return role;
          });
          return res.data.success;
        } else {
          this.showEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.showEconomicSubmissionError = err.response?.data?.message || 'Failed to update capital market data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete capital market data
    async deleteCapitalMarketData(id) {
      this.deleteEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/economic-and-capital-market-information/capital-market-data/delete/${id}`);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deleteEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteEconomicSubmissionError = err.response?.data?.message || 'Failed to delete capital market data';
        return false;
      } finally {
            this.loading = false;
      }
    },

    async importCapitalMarketData(file: FormData) {
      this.loading = true;
      this.error = '';
      this.importErrors = []; // Clear previous errors
      try {
        const res = await api.post('/economic-and-capital-market-information/capital-market-data/import', file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          // clear previous records and set new ones
          this.economicSubmissions = [];
          this.economicSubmissions = res.data.data.capitalMarketData;
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
        const response = await api.get('/economic-and-capital-market-information/capital-market-data/download-import-template', {
          responseType: 'blob', // important for file download
        });

        // Create a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'capital-market-data_template.xlsx'); // file name
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
