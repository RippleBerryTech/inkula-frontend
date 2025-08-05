<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add Role</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <!-- Name -->
              <div :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
                <label for="fullName">Role</label>
                <input id="fullName" type="text" placeholder="Enter Role" class="form-input" v-model="form.name" />
                <template v-if="isSubmitForm && !$v.form.name.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.name.$error">
                  <p class="text-danger mt-1">Please enter role</p>
                </template>
              </div>

              <!-- Description -->
              <div
                :class="{ 'has-error': $v.form.description.$error, 'has-success': isSubmitForm && !$v.form.description.$error }">
                <label for="description">Description</label>
                <input id="description" type="text" placeholder="Enter Description" class="form-input"
                  v-model="form.description" />
                <template v-if="isSubmitForm && !$v.form.description.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
              </div>

              <!-- Multi-select Permissions -->
              <div
                :class="{ 'has-error': $v.form.permissions.$error, 'has-success': isSubmitForm && !$v.form.permissions.$error }">
                <label for="permissions">Permissions</label>
                <multiselect v-model="form.permissions" :options="permissionOptions" :multiple="true" label="name"
                  track-by="id" :reduce="p => p.name" :searchable="false" placeholder="Select permissions" />
                <template v-if="isSubmitForm && !$v.form.permissions.$error">
                  <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                </template>
                <template v-if="isSubmitForm && $v.form.permissions.$error">
                  <p class="text-danger mt-1">Please select at least one permission</p>
                </template>
              </div>

              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link to="/roles/list" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!roleStore.loading">
                    <button type="submit" class="btn btn-gradient mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-gradient mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="roleStore.addRoleError">{{ roleStore.addRoleError }}</div>
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
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useRoleStore } from '../../../stores/user-management/role';
useMeta({ title: 'Add Role' });
// Reactive form data
const form = reactive({
  name: '',
  description: '',
  permissions: [],
})


// Validation rules
const rules = {
  form: {
    name: { required },
    // not required
    description: {},
    permissions: {
      required,
      minLength: minLength(1),
    },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Form submit handler

const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {
    var res = await roleStore.addRole(form)
    if (res) {
      //reset form
      form.name = ''
      form.description = ''
      form.permissions = []
      //reset validation
      $v.value.$reset()
      isSubmitForm.value = false

      //show success message
      toast.success("Role added successfully");
    }
  } else {
    toast.error('Validation Failed')
  }
}

const roleStore = useRoleStore();


const permissionOptions = computed(() =>
  roleStore.permissions.map(p => ({
    id: p.id,      // 📌 let the component track the item
    name: p.name,    //    and show this as the label
  }))
)

onMounted(() => {
  if (!roleStore.permissions.length) {
    roleStore.fetchPermissions()
  }
  roleStore.addRoleError = '';
})



</script>
