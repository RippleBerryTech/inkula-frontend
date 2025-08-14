<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add Portfolio Record</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="flex flex-col md:flex-row gap-4">
                <!-- name -->
                <div class="flex-1"
                  :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
                  <label for="name">Name</label>
                  <input id="name" type="text" placeholder="Enter Name"
                    class="form-input" v-model="form.name" />
                  <template v-if="isSubmitForm && !$v.form.name.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                  <template v-if="isSubmitForm && $v.form.name.$error">
                    <p v-for="error in $v.form.name.$errors" :key="error.$uid"
                      class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Name is required</span>
                    </p>
                  </template>
                </div>

                <div class="flex-1"
                  :class="{ 'has-error': $v.form.website.$error, 'has-success': isSubmitForm && !$v.form.website.$error }">
                  <label for="website">Website</label>
                  <input id="website" type="text" placeholder="Enter website"
                    class="form-input" v-model="form.website" />
                  <template v-if="isSubmitForm && !$v.form.website.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                </div>

              </div>


              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link to="/economic-management/economic-submissions/list" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!portfolioStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="portfolioStore.addPortfolioRecordError">{{
                portfolioStore.addPortfolioRecordError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { useEconomicSubmissionStore } from '@/stores/economic-management/economic-submissions';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useSectorStore } from '@/stores/economic-management/sectors';
import { usePortfolioStore } from '@/stores/economic-management/portfolio-record';
useMeta({ title: 'Add Portfolio Record' });
// Reactive form data
const form = reactive({
  name: '',
  website: '',
})

// Validation rules
const rules = {
  form: {
    name: { required },
    website: {},
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Form submit handler

const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {

    const res = await portfolioStore.addPortfolioRecord(form)
    if (res) {
      // Reset form
      form.name = '',
        form.website = ''

        // Reset validation
        $v.value.$reset()
      isSubmitForm.value = false

      await appRouter.push('/economic-management/portfolio-records/list')
      // Show success message
      toast.success("Portfolio Record added successfully")
    }
  } else {
    toast.error('Validation Failed')
  }
}

const portfolioStore = usePortfolioStore();

onMounted(() => {
})



</script>
