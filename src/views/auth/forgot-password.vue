<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[458px] py-20">

                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Recover Password</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">Enter your email to recover your password</p>
                        </div>
                        <form class="space-y-5" @submit.prevent="submit">
                            <div :class="{ 'has-error': $v.form.email.$error, 'has-success': isSubmitForm && !$v.form.email.$error }">
                                <label for="otp" class="dark:text-white">Email</label>
                                <div class="relative text-white-dark">
                                    <input v-model="form.email" id="otp" type="email" placeholder="Enter OTP" class="form-input ps-10 placeholder:text-white-dark" />
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
                            <button
                                type="submit"
                                class="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] flex items-center justify-center gap-2"
                                :disabled="auth.loading"
                                >
                                <span v-if="auth.loading" class="loader border-white border-2 border-t-transparent w-5 h-5 rounded-full animate-spin"></span>
                                <span>{{ auth.loading ? 'Verifying...' : 'Verify' }}</span>
                            </button>
                            <div v-if="auth.error" class="text-red-500 bg-red-100 px-4 py-2 rounded">
                                {{ auth.error }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { useMeta } from '@/composables/use-meta';

import { appRouter } from '@/router';
import { useAuthStore } from '@/stores/auth';
import useVuelidate from '@vuelidate/core';
import { reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';

import { IconMail } from '@tabler/icons-vue';
import { email as emailRule, required } from '@vuelidate/validators';

useMeta({ title: 'Forgot Password' });
const auth = useAuthStore();

const form = reactive({
    email: '',
})

// Validation rules
const rules = {
  form: {
     email: { required, email: emailRule },
  },
};

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })



const submit = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

    if (!$v.value.$invalid) {
        var res = await auth.forgotPassword(form)
        if (res) {
            //reset form
            form.email = ''
            //reset validation
            $v.value.$reset()
            isSubmitForm.value = false
            await appRouter.push('/');
            //show success message
            toast.success(auth.message);
        } else {
            toast.error(auth.error);
        }
    } else {
        toast.error('Validation Failed')
    }
}

</script>
