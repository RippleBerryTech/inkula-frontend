<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Edit Sub Sector</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="flex flex-col md:flex-row gap-4">
                <!-- Name -->
                <div class="flex-1"
                  :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
                  <label for="name">Sector Name</label>
                  <input id="name" type="text" placeholder="Enter Sector Name" class="form-input" v-model="form.name" />
                  <template v-if="isSubmitForm && !$v.form.name.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                  <template v-if="isSubmitForm && $v.form.name.$error">
                    <p v-for="error in $v.form.name.$errors" :key="error.$uid" class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Sector Name is required</span>
                    </p>
                  </template>
                </div>

              </div>


              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link :to="{ name: 'sub-sectors-list', params: { id: route.params.id } }" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>


                <div>
                  <span v-if="!subSectorStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Update</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="subSectorStore.editSubSectorError">{{
                subSectorStore.editSubSectorError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../../composables/use-meta';

useMeta({ title: 'Edit Sub-Sector' });

const route = useRoute()
const router = useRouter()

// Reactive form data
const form = reactive({
  id: '',
  name: '',
  sector_id: '' // keep track of parent sector id
})

// Validation rules
const rules = {
  form: {
    id: { required },
    name: { required },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

const subSectorStore = useSubSectorStore()

// Form submit handler
const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {
    const ok = await subSectorStore.updateSubSector({
      id: Number(form.id),
      name: form.name,
      sector_id: Number(form.sector_id)
    })

    if (ok) {
      await appRouter.push({
        name: 'sub-sectors-list',
        params: { id: form.sector_id }
      })
      toast.success('Sub-Sector updated successfully')
    } else {
      toast.error(subSectorStore.editSubSectorError)
    }
  } else {
    toast.error('Validation Failed')
  }
}

onMounted(async () => {
  const sectorId = route.params.id
  const subSectorId = route.params.sub_sector

  console.log('Sector ID:', sectorId);
  console.log('Sub-Sector ID:', subSectorId);
  subSectorStore.editSubSectorError = ''

  // fetch sub-sector from API
  const subSector = await subSectorStore.editSubSector(sectorId, subSectorId)

  if (subSector) {
    form.id = subSector.id.toString()
    form.name = subSector.name
    form.sector_id = sectorId.toString()
  } else {
    await router.push({ name: 'sub-sectors-list', params: { id: sectorId } })
    toast.error(subSectorStore.editSubSectorError || 'Sub-Sector not found')
  }
})
</script>
