<template>
  <div class="p-6">
    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Add Sector</h5>

    <form class="space-y-5" @submit.prevent="submitForm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- name -->
        <div
          class="flex-1"
          :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }"
        >
          <label for="name">Sector Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Sector Name"
            class="form-input"
            v-model="form.name"
          />

          <template v-if="isSubmitForm && !$v.form.name.$error">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
          </template>
          <template v-if="isSubmitForm && $v.form.name.$error">
            <p
              v-for="error in $v.form.name.$errors"
              :key="error.$uid"
              class="text-danger mt-1"
            >
              <span v-if="error.$validator === 'required'">Sector Name is required</span>
            </p>
          </template>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end items-center mt-8 space-x-4">
        <button type="button" class="btn btn-outline-danger" @click="cancelForm">
          Cancel
        </button>

        <div>
          <span v-if="!sectorStore.loading">
            <button type="submit" class="btn btn-primary mt-0">Add</button>
          </span>
          <span v-else>
            <button type="button" class="btn btn-primary mt-0" disabled>
              Loading...
            </button>
          </span>
        </div>
      </div>

      <div class="text-danger mt-1" v-if="sectorStore.addSectorError">
        {{ sectorStore.addSectorError }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useSectorStore } from '@/stores/configuration/sectors'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'

// Reactive form data
const form = reactive({
  name: '',
})

// Validation rules
const rules = {
  form: {
    name: { required },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

const sectorStore = useSectorStore()

// Emit events to parent
const emit = defineEmits(['saved', 'cancel'])

// Submit handler
const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {
    const res = await sectorStore.addSector(form)

    if (res) {
      // Reset form
      form.name = ''
      $v.value.$reset()
      isSubmitForm.value = false

      // Notify parent
      emit('saved')

      // Toast success
      toast.success('Sector added successfully')
    }
  } else {
    toast.error('Validation Failed')
  }
}

// Cancel handler
const cancelForm = () => {
  // Reset form and validation
  form.name = ''
  $v.value.$reset()
  isSubmitForm.value = false

  // Reset store error if any
  sectorStore.addSectorError = ''

  // Notify parent
  emit('cancel')
}
</script>
