<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add User</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <!-- Name -->
              <div :class="{
                'has-error': $v.form.name.$error || backendErrors.name,
                'has-success': isSubmitForm && !$v.form.name.$error && !backendErrors.name
              }">
                <label for="name">Name</label>
                <input id="name" type="text" placeholder="Enter name" class="form-input" v-model="form.name" />

                <!-- Looks Good -->
                <template v-if="isSubmitForm && !$v.form.name.$error && !backendErrors.name">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>

                <!-- Frontend validation error -->
                <template v-if="isSubmitForm && $v.form.name.$error">
                  <p class="text-danger mt-1">Please enter name</p>
                </template>

                <!-- Backend validation error -->
                <template v-if="backendErrors.name">
                  <p class="text-danger mt-1">{{ backendErrors.name }}</p>
                </template>
              </div>


              <!-- Email -->
              <div :class="{
                'has-error': $v.form.email.$error || backendErrors.email,
                'has-success': isSubmitForm && !$v.form.email.$error && !backendErrors.email
              }">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter email" class="form-input" v-model="form.email" />

                <!-- Looks Good -->
                <template v-if="isSubmitForm && !$v.form.email.$error && !backendErrors.email">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>

                <!-- Frontend validation error -->
                <template v-if="isSubmitForm && $v.form.email.$error">
                  <p v-for="error in $v.form.email.$errors" :key="error.$uid" class="text-danger mt-1">
                    <span v-if="error.$validator === 'required'">Please enter email</span>
                    <span v-else-if="error.$validator === 'email'">Please enter a valid email address</span>
                  </p>
                </template>

                <!-- Backend validation error -->
                <template v-if="backendErrors.email">
                  <p class="text-danger mt-1">{{ backendErrors.email }}</p>
                </template>
              </div>


              <!-- Password -->
              <div :class="{
                'has-error': $v.form.password.$error || backendErrors.password,
                'has-success': isSubmitForm && !$v.form.password.$error && !backendErrors.password
              }">
                <label for="password">Password</label>
                <input id="password" type="text" placeholder="Enter password" class="form-input"
                  v-model="form.password" />

                <!-- Looks Good -->
                <template v-if="isSubmitForm && !$v.form.password.$error && !backendErrors.password">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>

                <!-- Frontend validation errors -->
                <template v-if="isSubmitForm && $v.form.password.$error">
                  <p v-for="error in $v.form.password.$errors" :key="error.$uid" class="text-danger mt-1">
                    <span v-if="error.$validator === 'required'">Password is required</span>
                    <span v-else-if="error.$validator === 'minLength'">Password must be at least 6 characters</span>
                  </p>
                </template>

                <!-- Backend validation error -->
                <template v-if="backendErrors.password">
                  <p class="text-danger mt-1">{{ backendErrors.password }}</p>
                </template>
              </div>


              <!-- Select role -->
              <div :class="{
                'has-error': $v.form.role.$error || backendErrors.role,
                'has-success': isSubmitForm && !$v.form.role.$error && !backendErrors.role
              }">
                <label for="role">Role</label>
                <Multiselect id="role" v-model="form.role" :options="roleOptions" class="custom-multiselect"
                  :searchable="true" placeholder="Select role" :show-labels="false" />

                <!-- Looks Good -->
                <template v-if="isSubmitForm && !$v.form.role.$error && !backendErrors.role">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>

                <!-- Frontend validation -->
                <template v-if="isSubmitForm && $v.form.role.$error">
                  <p class="text-danger mt-1">Please select role</p>
                </template>

                <!-- Backend validation -->
                <template v-if="backendErrors.role">
                  <p class="text-danger mt-1">{{ backendErrors.role }}</p>
                </template>
              </div>


              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link to="/users/list" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!userStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="userStore.addUserError">{{ userStore.addUserError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Multiselect from '@suadelabs/vue3-multiselect';

import { appRouter } from '@/router';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { minLength, required, email as emailRule } from '@vuelidate/validators';
import { computed, onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useUserStore } from '../../../stores/user-management/user';
useMeta({ title: 'Add User' });
// Reactive form data
const form = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
})

const backendErrors = reactive({
  name: '',
  email: '',
  password: '',
  role: ''
})


// Validation rules
const rules = {
  form: {
    name: { required },
    email: { required, email: emailRule }, // 👈 email format check
    password: { required, minLength: minLength(6) },
    role: { required },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Form submit handler



const submitForm = async () => {
  isSubmitForm.value = true;
  Object.keys(backendErrors).forEach(k => backendErrors[k] = ''); // reset

  await $v.value.$validate();

  if (!$v.value.$invalid) {
    const res = await userStore.addUser({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    });

    if (res === true) {
      // reset form
      form.name = '';
      form.email = '';
      form.password = '';
      form.role = '';
      $v.value.$reset();
      isSubmitForm.value = false;
      toast.success("User added successfully");
      await appRouter.push('/users/list');
    } else {
      // Map backend field errors
      for (const field in userStore.addUserFieldErrors) {
        backendErrors[field] = userStore.addUserFieldErrors[field][0];
      }
    }
  }
};

const userStore = useUserStore();


const roleOptions = computed(() =>
  userStore.roles.map(r => r.name)   // 👉 ["SuperAdmin", "Editor", ...]
)


onMounted(async () => {
  if (!userStore.roles.length) {
    await userStore.fetchRoles()
  }
  userStore.addUserError = '';
})



</script>
