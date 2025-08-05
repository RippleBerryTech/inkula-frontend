import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | Record<string, any>,
        token: localStorage.getItem('token') || '',
        error: '',
        loading: false,
        message: '',
        emailForOTP: '',
    }),

    actions: {
        async login(credentials: { email: string; password: string }) {
            this.error = '';
            this.loading = true;
            try {
                const res = await api.post('/auth/login', credentials);
                if (res.data.success) {
                    this.message = res.data.message;
                    this.emailForOTP = res.data.data.user.email;
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Login failed';
                return false;
            } finally {
                this.loading = false;
            }
        },

        async register(data: { name: string; email: string; password: string }) {
            this.error = '';
            this.loading = true;
            try {
                const res = await api.post('/auth/register', data);
                if (res.data.success) {
                    this.message = res.data.message;
                    this.emailForOTP = res.data.data.user.email;
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Registration failed';
            } finally {
                this.loading = false;
            }
        },

        async otpVerify(data: { otp: string; email: string }) {
            this.error = '';
            this.loading = true;
            try {
                const res = await api.post('/auth/verify-otp', data);
                if (res.data.success) {
                    this.message = res.data.message;
                    this.token = res.data.data.token;
                    localStorage.setItem('token', this.token);
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Registration failed';
            } finally {
                this.loading = false;
            }
        },

        async forgotPassword(data: { email: string }) {
            this.error = '';
            this.loading = true;
            try {
                const res = await api.post('/auth/password-reset-otp', data);
                if (res.data.success) {
                    this.message = res.data.message;
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Something went wrong';
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                const res = await api.post('/auth/logout');
                if (res.data.success) {
                    this.message = res.data.message;
                    this.token = '';
                    this.user = null;
                    localStorage.removeItem('token');
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Something went wrong';
                return false;
            }
        },

        async fetchUser() {
            try {
                const res = await api.get('/user');
                this.user = res.data;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to fetch user';
            } finally {
                this.loading = false;
            }
        },
    },
});
