<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[658px] lg:flex-row lg:gap-10 xl:gap-0"
            >
                <div
                    class="relative hidden w-full items-center justify-center bg-primary p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
                >
                    <div
                        class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"
                    ></div>
                    <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                        <!-- <router-link to="/" class="w-48 block lg:w-72 ms-10">
                            <img src="/assets/images/auth/logo-white.svg" alt="Logo" class="w-full" />
                        </router-link>
                        <div class="mt-24 hidden w-full max-w-[430px] lg:block">
                            <img src="/assets/images/auth/login.svg" alt="Cover Image" class="w-full" />
                        </div> -->
                    </div>
                </div>
                <div class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div class="w-full max-w-[440px] lg:mt-16">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="submit">
                            <div :class="{ 'has-error': $v.form.email.$error, 'has-success': isSubmitForm && !$v.form.email.$error }">
                                <label for="Email">Email</label>
                                <div class="relative text-white-dark">
                                    <input id="Email" v-model="form.email" placeholder="Enter Email" class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconMail :size="20" stroke-width="1.5" />
                                    </span>
                                </div>
                                <template v-if="isSubmitForm && !$v.form.email.$error">
                                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                </template>
                                <template v-if="isSubmitForm && $v.form.email.$error">
                                    <p v-for="error in $v.form.email.$errors" :key="error.$uid" class="text-danger mt-1">
                                        <span v-if="error.$validator === 'required'">Email is required</span>
                                        <span v-else-if="error.$validator === 'email'">Please enter a valid email</span>
                                    </p>
                                </template>
                            </div>
                            <div :class="{ 'has-error': $v.form.password.$error, 'has-success': isSubmitForm && !$v.form.password.$error }">
                                <label for="Password">Password</label>
                                <div class="relative text-white-dark">
                                    <input id="Password" v-model="form.password" type="password" placeholder="Enter Password" class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">    
                                        <IconLock :size="20" stroke-width="1.5" />
                                    </span>
                                </div>
                                <template v-if="isSubmitForm && !$v.form.password.$error">
                                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                </template>
                                <template v-if="isSubmitForm && $v.form.password.$error">
                                    <p v-for="error in $v.form.password.$errors" :key="error.$uid" class="text-danger mt-1">
                                        <span v-if="error.$validator === 'required'">Password is required</span>
                                        <span v-else-if="error.$validator === 'minLength'">Password must be at least 6 characters</span>
                                    </p>
                                </template>
                            </div>
                            <div class="text-right dark:text-white">
                                <router-link to="/forgot-password" class="text-primary underline transition hover:text-black dark:hover:text-white">
                                    Forgot Password?
                                </router-link>
                            </div>
                            
                            <button
                                type="submit"
                                class="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] flex items-center justify-center gap-2"
                                :disabled="auth.loading"
                                >
                                <span v-if="auth.loading" class="loader border-white border-2 border-t-transparent w-5 h-5 rounded-full animate-spin"></span>
                                <span>{{ auth.loading ? 'Signing in...' : 'Sign in' }}</span>
                            </button>
                            <div v-if="auth.error" class="text-red-500 bg-red-100 px-4 py-2 rounded">
                                {{ auth.error }}
                            </div>
                        </form>

                        <div class="relative my-7 text-center md:mb-9">
                            <span class="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                            <span class="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                        </div>
                        <div class="text-center dark:text-white">
                            Don't have an account ?
                            <router-link to="/register" class="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                SIGN UP
                            </router-link>
                        </div>
                    </div>
                    <p class="absolute bottom-6 w-full text-center dark:text-white">© {{ new Date().getFullYear() }}.Inkula All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { IconLock, IconMail } from '@tabler/icons-vue';
import useVuelidate from '@vuelidate/core';
import { email as emailRule, minLength, required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../composables/use-meta';
import { useAuthStore } from '../../stores/auth';


useMeta({ title: 'Register' });
const form = reactive({
    email: '',
    password: '',
})

// Validation rules
const rules = {
  form: {
    email: { required, email: emailRule },
    password: { required, minLength: minLength(6) },
  },
};


const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })


const auth = useAuthStore();


const submit = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

    if (!$v.value.$invalid) {
        var res = await auth.login(form)
        if (res) {
            //reset form
            form.email = ''
            form.password = ''
            //reset validation
            $v.value.$reset()
            isSubmitForm.value = false
            if(auth.token != ''){
                await appRouter.push('/');
                toast.success("Login Successfully");
            } else {
                await appRouter.push('/otp');
                toast.success(auth.message);
            }
        } else {
            toast.error(auth.error);
        }
    } else {
        toast.error('Validation Failed')
    }
}

</script>
