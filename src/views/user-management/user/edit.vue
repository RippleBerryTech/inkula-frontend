<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Edit User</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <!-- Name -->
              <div :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
                <label for="name">Name</label>
                <input id="name" type="text" placeholder="Enter name" class="form-input" v-model="form.name" />
                <template v-if="isSubmitForm && !$v.form.name.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.name.$error">
                  <p class="text-danger mt-1">Please enter name</p>
                </template>
              </div>

              <!-- Email -->
              <div :class="{ 'has-error': $v.form.email.$error, 'has-success': isSubmitForm && !$v.form.email.$error }">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter email" class="form-input" v-model="form.email" />
                <template v-if="isSubmitForm && !$v.form.email.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.email.$error">
                  <p class="text-danger mt-1">Please enter email</p>
                </template>
              </div>

              <!-- Password -->
              <div
                :class="{ 'has-error': $v.form.password.$error, 'has-success': isSubmitForm && !$v.form.password.$error }">
                <label for="password">Password</label>
                <input id="password" type="text" placeholder="Enter password" class="form-input"
                  v-model="form.password" />
                <template v-if="isSubmitForm && !$v.form.password.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.password.$error">
                  <p class="text-danger mt-1">Please enter password</p>
                </template>
              </div>

              <!-- Select role -->
              <div :class="{ 'has-error': $v.form.role.$error, 'has-success': isSubmitForm && !$v.form.role.$error }">
                <label for="role">Role</label>
                <Multiselect id="role" v-model="form.role" :options="roleOptions" class="custom-multiselect"
                  :searchable="true" placeholder="Select role"
                  :show-labels="false" />

                <template v-if="isSubmitForm && !$v.form.role.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.role.$error">
                  <p class="text-danger mt-1">Please select role</p>
                </template>
              </div>

              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link to="/users/list" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!userStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Update</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="userStore.updateUserError">{{ userStore.updateUserError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Multiselect from '@suadelabs/vue3-multiselect';

import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useUserStore } from '../../../stores/user-management/user';
useMeta({ title: 'Add User' });
// Reactive form data
const form = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  role: '',
})


// Validation rules
const rules = {
  form: {
    name: { required },
    email: { required },
    password: {minLength: minLength(6) },
    role: { required },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Form submit handler



const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

   if ($v.value.$invalid) {
    toast.error('Validation Failed')
    return
  }
    const ok= await userStore.updateUser({
      id: form.id,
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })
    if (ok) {
      await router.push('/users/list')
      toast.success("User updated successfully");
    } else {
      toast.error(userStore.updateUserError);
    }

}

const userStore = useUserStore();


const roleOptions = computed(() =>
  userStore.roles.map(r => r.name)   // 👉 ["SuperAdmin", "Editor", ...]
)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const userId = route.params.id
  userStore.updateUserError = '';

  if (!userStore.roles.length) {
    await userStore.fetchRoles()
  }

  // fetch the role directly from API
  const user = await userStore.editUser(userId)

  if (user) {
    console.log('user', user)
    form.id = user.id.toString()
    form.name = user.name
    form.email = user.email
    form.role = user.roles[0].name
  } else {
    router.push('/users/list')
    toast.error(userStore.updateUserError || 'User not found')
  }
})


</script>
