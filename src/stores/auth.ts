import axios from 'axios';
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
        roles: [] as string[],
        permissions: [] as string[],
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
                    if (res.data.data.token != null) {
                        this.token = res.data.data.token;
                        localStorage.setItem('token', this.token);
                        // 👇 Fetch user info (sets user, roles, permissions in store)
                        await this.fetchUser();
                    }
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
                    // 👇 Fetch user info (sets user, roles, permissions in store)
                    await this.fetchUser();
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
                    this.emailForOTP = data.email;
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

        async validatePasswordResetOtp(data: { otp: string; email: string }) {
            this.error = '';
            this.loading = true;
            try {
                const res = await api.post('/auth/validate-password-reset-otp', data);
                if (res.data.success) {
                    this.message = res.data.message;
                    localStorage.setItem('temp_token', res.data.data.token);
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

        async passwordReset(data: { password: string; confirm_password: string }) {
            this.error = '';
            this.loading = true;
            try {
                // call an api via fetch
                const tempToken = localStorage.getItem('temp_token');
                const url = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.post(
                    `${url}/auth/new-password`, // replace with actual endpoint
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${tempToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
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
            this.loading = true;
            try {
                const res = await api.post('/auth/logout');
                if (res.data.success) {
                    this.message = res.data.message;
                    this.token = '';
                    this.user = null;
                    localStorage.removeItem('token');
                    localStorage.removeItem('roles')
                    localStorage.removeItem('permissions')
                    return res.data.success;
                } else {
                    this.error = res.data.message;
                    return res.data.success;
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Something went wrong';
                return false;
            } finally {
                this.loading = false;
            }
        },

        async fetchUser() {
            if (!this.token) return

            this.loading = true
            try {
                const res = await api.get('/user')
                const { roles, permissions, ...userData } = res.data

                this.user = userData
                this.roles = roles
                this.permissions = permissions
            } catch (err: any) {
                console.error('Failed to fetch user:', err)
                this.user = null
                this.roles = []
                this.permissions = []
                localStorage.removeItem('token')
                this.token = ''
            } finally {
                this.loading = false
            }
        }

    },
});


function safeStringify(obj, space = 2) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  }, space);
}