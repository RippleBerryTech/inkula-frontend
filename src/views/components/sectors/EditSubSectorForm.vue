<template>
  <div class="p-6">
    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Edit Sub Sector</h5>

    <form class="space-y-5" @submit.prevent="submitForm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Sub Sector Name -->
        <div class="flex-1"
          :class="{ 'has-error': $v.form.name.$error, 'has-success': isSubmitForm && !$v.form.name.$error }">
          <label for="name">Sub Sector Name</label>
          <input id="name" type="text" placeholder="Enter Sub Sector Name" class="form-input" v-model="form.name" />
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
            <button type="submit" class="btn btn-primary mt-0">Update</button>
          </span>
          <span v-else>
            <button type="button" class="btn btn-primary mt-0" disabled>
              Loading...
            </button>
          </span>
        </div>
      </div>

      <div class="text-danger mt-1" v-if="subSectorStore.editSubSectorError">
        {{ subSectorStore.editSubSectorError }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors'

const props = defineProps<{
  sectorId: string | number
  subSector: any
}>()

const emit = defineEmits(['saved', 'cancel'])

const subSectorStore = useSubSectorStore()

// Reactive form data
const form = reactive({
  name: '',
  id: 0,
  sector_id: 0
})

// Validation rules
const rules = {
  form: {
    name: { required }
  }
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Initialize form with existing data
onMounted(() => {
  form.name = props.subSector.name
  form.id = Number(props.subSector.id) // Convert to number
  form.sector_id = Number(props.sectorId) // Convert to number
})

// Submit handler
const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {
    // Your store method expects a single object with id, sector_id, and name
    const res = await subSectorStore.updateSubSector({
      id: form.id,
      sector_id: form.sector_id,
      name: form.name
    })

    if (res) {
      // Notify parent
      emit('saved')
      toast.success('Sub Sector updated successfully')
    }
  } else {
    toast.error('Validation Failed')
  }
}

// Cancel handler
const cancelForm = () => {
  form.name = props.subSector.name // Reset to original value
  form.id = Number(props.subSector.id) // Convert to number
  form.sector_id = Number(props.sectorId) // Convert to number
  $v.value.$reset()
  isSubmitForm.value = false
  subSectorStore.editSubSectorError = ''
  emit('cancel')
}
</script>