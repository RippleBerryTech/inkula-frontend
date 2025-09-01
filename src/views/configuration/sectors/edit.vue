<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Edit Sector</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="flex flex-col md:flex-row gap-4">
                <!-- Name -->
                <div class="flex-1"
                  :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
                  <label for="name">Sector Name</label>
                  <input id="name" type="text" placeholder="Enter Sector Name"
                    class="form-input" v-model="form.name" />
                  <template v-if="isSubmitForm && !$v.form.name.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                  <template v-if="isSubmitForm && $v.form.name.$error">
                    <p v-for="error in $v.form.name.$errors" :key="error.$uid"
                      class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Sector Name is required</span>
                    </p>
                  </template>
                </div>

              </div>


              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link :to="{name: 'sector-list'}" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!sectorStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Update</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="sectorStore.editSectorError">{{
                sectorStore.editSectorError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { useSectorStore } from '@/stores/economic-and-capital-market-information/sectors';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
useMeta({ title: 'Edit Sector' });

const route = useRoute()
const router = useRouter()
// Reactive form data
const form = reactive({
  id: '',
  name: '',
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

// Form submit handler

const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {

    const ok = await sectorStore.updateSector({
    id: Number(form.id),
    name: form.name,
  })

  if (ok) {
    await appRouter.push('/economic-and-capital-market-information/sectors/list')
    toast.success('Sector updated successfully')
  } else {
    toast.error(sectorStore.editSectorError)
  }

  } else {
    toast.error('Validation Failed')
  }
}

const sectorStore = useSectorStore();

onMounted(async () => {
  const sectorId = route.params.id
  sectorStore.editSectorError = ''

  // fetch the role directly from API
  const sector = await sectorStore.editsector(sectorId)

  if (sector) {
    form.id = sector.id.toString()
    form.name = sector.name
  } else {
    await router.push('/economic-and-capital-market-information/sectors/list')
    toast.error(sectorStore.editSectorError || 'Sector not found')
  }
})


</script>
