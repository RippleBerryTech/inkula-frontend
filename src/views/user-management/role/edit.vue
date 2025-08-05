<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Edit Role</h5>
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
                    <button type="submit" class="btn btn-primary mt-0">Update</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="roleStore.editRoleError">{{ roleStore.editRoleError }}</div>
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
import { useRoleStore } from '../../../stores/user-management/role';

useMeta({ title: 'Edit Role' })

const roleStore = useRoleStore()
const route = useRoute()
const router = useRouter()



// ✨ Reactive form structure
const form = reactive({
  id: '',
  name: '',
  description: '',
  permissions: [],  // we store permission names to match multiselect's reduce
})


// ✅ Validation rules
const rules = {
  form: {
    id: { required },
    name: { required },
    description: {},
    permissions: {
      required,
      minLength: minLength(1)
    }
  }
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// 🧠 Submit form for editing
const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if ($v.value.$invalid) {
    toast.error('Validation Failed')
    return
  }

  const permissionNames = (form.permissions as Array<string | { name: string }>).map(
    p => typeof p === 'string' ? p : p.name
  )


  const ok = await roleStore.updateRole({
    id: Number(form.id),
    name: form.name,
    description: form.description,
    permissions: permissionNames
  })

  if (ok) {
    toast.success('Role updated successfully')
  }
}



const permissionOptions = computed(() =>
  roleStore.permissions.map(p => ({
    id: p.id,      // 📌 let the component track the item
    name: p.name,    //    and show this as the label
  }))
)


onMounted(async () => {
  const roleId = route.params.id
  roleStore.editRoleError = ''

  // ensure we have permission list (for multiselect)
  if (!roleStore.permissions.length) {
    await roleStore.fetchPermissions()
  }

  // fetch the role directly from API
  const role = await roleStore.editRole(roleId)

  if (role) {
    form.id = role.id.toString()
    form.name = role.name
    form.description = role.description
    form.permissions = role.permissions,
    console.log('permissions', form.permissions)
  } else {
    router.push('/roles/list')
    toast.error(roleStore.editRoleError || 'Role not found')
  }
})


</script>
