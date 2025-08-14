import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useEconomicSubmissionStore = defineStore('economic-submission', {
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
    deleteEconomicSubmissionError: '',

    /* NEW - cache flag */
    hasFetchedEconomicSubmissions: false
  }),

  actions: {
    async fetchEconomicSubmissions(force = false) {
      if (this.hasFetchedEconomicSubmissions && !force) return
      this.loading = true;
      this.error = '';

      try {
        const res = await api.get('/economic-submissions/list'); // assuming your endpoint is /roles
        this.economicSubmissions = res.data.data;
        this.hasFetchedEconomicSubmissions = true     
      } catch (err: any) {
        if (err.response?.status === 401) {
            this.error = 'You are not authorized to view economic submissions.';
        } else {
            this.error = err.response?.data?.message || 'Failed to fetch economic submissions';
        }
      } finally {
            this.loading = false;
      }
    },

    // add economic submission
    async addEconomicSubmission(data) {
      this.addEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.post('/economic-submissions/store', data);
        if (res.data.success) {
          this.economicSubmissions.push(res.data.data.economicSubmissions);
          return res.data.success;
        } else {
          this.addEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.addEconomicSubmissionError = err.response?.data?.message || 'Failed to add economic submission';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //edit economic submission
    async editEconomicSubmission(id) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.get(`/economic-submissions/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to edit economic submission';
        return false;
      } finally {
            this.loading = false;
      }
    },

    // update economic submission
    async updateEconomicSubmission(data) {
      this.editEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.put(`/economic-submissions/update/${data.id}`, data);
        console.log(res);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.map((role) => {
            if (role.id === data.id) {
              return res.data.data.economicSubmission;
            }
            return role;
          });
          return res.data.success;
        } else {
          this.editEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.editEconomicSubmissionError = err.response?.data?.message || 'Failed to update economic submission';
        return false;
      } finally {
            this.loading = false;
      }
    },

    //delete economic submission
    async deleteEconomicSubmission(id) {
      this.deleteEconomicSubmissionError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/economic-submissions/delete/${id}`);
        if (res.data.success) {
          this.economicSubmissions = this.economicSubmissions.filter((role) => role.id !== id);
          return res.data.success;
        } else {
          this.deleteEconomicSubmissionError = res.data.message;
          return res.data.success;
        }
      } catch (err: any) {
        this.deleteEconomicSubmissionError = err.response?.data?.message || 'Failed to delete economic submission';
        return false;
      } finally {
            this.loading = false;
      }
    },
  },
});
