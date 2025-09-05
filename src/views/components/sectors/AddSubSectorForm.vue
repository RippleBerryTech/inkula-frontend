<template>
  <div class="p-6">
    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Add Sub Sector</h5>

    <form class="space-y-5" @submit.prevent="submitForm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Sub Sector Name -->
        <div class="flex-1"
          :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Enter Name" class="form-input" v-model="form.name" />
          <template v-if="isSubmitForm && !$v.form.name.$error">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
          </template>
          <template v-if="isSubmitForm && $v.form.name.$error">
            <p v-for="error in $v.form.name.$errors" :key="error.$uid" class="text-danger mt-1">
              <span v-if="error.$validator === 'required'">Sub Sector Name is required</span>
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
          <span v-if="!subSectorStore.loading">
            <button type="submit" class="btn btn-primary mt-0">Add</button>
          </span>
          <span v-else>
            <button type="button" class="btn btn-primary mt-0" disabled>
              Loading...
            </button>
          </span>
        </div>
      </div>

      <div class="text-danger mt-1" v-if="subSectorStore.addSubSectorError">
        {{ subSectorStore.addSubSectorError }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted, defineExpose } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors'

const props = defineProps<{
  sectorId: string | number
}>()

const emit = defineEmits(['saved', 'cancel'])

const subSectorStore = useSubSectorStore()

// Reactive form data
const form = reactive({
  name: '',
  sector_id: props.sectorId
})

// Validation rules
const rules = {
  form: {
    name: { required }
  }
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Reset function
const resetForm = () => {
  form.name = ''
  $v.value.$reset()
  isSubmitForm.value = false
  subSectorStore.addSubSectorError = ''
}

// Call reset when component is unmounted (modal closes)
onUnmounted(() => {
  resetForm()
})

// Expose the reset function to parent component
defineExpose({
  resetForm
})

// Submit handler
const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {
    const res = await subSectorStore.addSubSector(form)
    if (res) {
      // Reset form
      resetForm()

      // Notify parent
      emit('saved')
      toast.success('Sub Sector added successfully')
    }
  } else {
    toast.error('Validation Failed')
  }
}

// Cancel handler
const cancelForm = () => {
  resetForm()
  emit('cancel')
}
</script>