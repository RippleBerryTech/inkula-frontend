<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add Private Company Information</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="flex flex-col md:flex-row gap-4">
                <!-- Name -->
                <div class="flex-1" :class="{
                  'has-error': $v.form.name.$error || backendErrors.name,
                  'has-success': isSubmitForm && !$v.form.name.$error && !backendErrors.name
                }">
                  <label for="name">Name</label>
                  <input id="name" type="text" placeholder="Enter Name" class="form-input" v-model="form.name" />

                  <!-- Looks Good -->
                  <template v-if="isSubmitForm && !$v.form.name.$error && !backendErrors.name">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>

                  <!-- Frontend errors -->
                  <template v-if="isSubmitForm && $v.form.name.$error">
                    <p v-for="error in $v.form.name.$errors" :key="error.$uid" class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Name is required</span>
                    </p>
                  </template>

                  <!-- Backend error -->
                  <template v-if="backendErrors.name">
                    <p class="text-danger mt-1">{{ backendErrors.name }}</p>
                  </template>
                </div>

                <!-- Website -->
                <div class="flex-1" :class="{
                  'has-error': $v.form.website.$error || backendErrors.website,
                  'has-success': isSubmitForm && !$v.form.website.$error && !backendErrors.website
                }">
                  <label for="website">Website</label>
                  <input id="website" type="text" placeholder="Enter website" class="form-input"
                    v-model="form.website" />

                  <!-- Looks Good -->
                  <template v-if="isSubmitForm && !$v.form.website.$error && !backendErrors.website">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>

                  <!-- Backend error -->
                  <template v-if="backendErrors.website">
                    <p class="text-danger mt-1">{{ backendErrors.website }}</p>
                  </template>
                </div>

              </div>


              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link :to="{name: 'private-company-information-list'}" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!privateCompanyInformationStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="privateCompanyInformationStore.addPortfolioRecordError">{{
                privateCompanyInformationStore.addPortfolioRecordError }}</div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { usePrivateCompanyInformationStore } from '@/stores/configuration/portfolio-record/private-company-information';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../../composables/use-meta';
useMeta({ title: 'Add Private Company Information' });
// Reactive form data
const form = reactive({
  name: '',
  website: '',
})

const backendErrors = reactive({
  name: '',
  website: ''
});

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
  isSubmitForm.value = true;

  // Reset backend errors
  Object.keys(backendErrors).forEach(k => backendErrors[k] = '');

  await $v.value.$validate();

  if (!$v.value.$invalid) {
    // 👉 Normalize website field
    if (form.website && !form.website.startsWith("http://") && !form.website.startsWith("https://")) {
      form.website = "https://" + form.website;
    }
    const res = await privateCompanyInformationStore.addPrivateCompanyInformation(form);

    if (res === true) {
      // Reset form
      form.name = '';
      form.website = '';

      // Reset validation
      $v.value.$reset();
      isSubmitForm.value = false;

      toast.success("Private Company Information added successfully");
      await appRouter.push({
        name: 'private-company-information-list',
      });
    } else {
      // Map backend field errors (if Laravel sends them in `errors`)
      for (const field in privateCompanyInformationStore.addPortfolioRecordFieldErrors) {
        backendErrors[field] = privateCompanyInformationStore.addPortfolioRecordFieldErrors[field][0];
      }
    }
  }
};

const privateCompanyInformationStore = usePrivateCompanyInformationStore();

onMounted(() => {
})



</script>
