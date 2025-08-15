<template>
  <div class="custom-file-container" data-upload-id="myFirstImage">
    <div class="label-container">
      <label>Upload</label>
      <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
    </div>
    <label class="custom-file-container__custom-file">
      <input
        type="file"
        class="custom-file-container__custom-file__custom-file-input"
        accept=".csv, .xls, .xlsx"
        @change="handleFileChange"
      />
      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
      <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
    </label>
    <div class="custom-file-container__image-preview"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FileUploadWithPreview from 'file-upload-with-preview';
import { toast } from 'vue3-toastify';

const emit = defineEmits(['file-selected']);
const uploadInstance = ref<FileUploadWithPreview | null>(null);

onMounted(() => {
  uploadInstance.value = new FileUploadWithPreview('myFirstImage', {
    images: { baseImage: '/assets/images/file-preview.svg', backgroundImage: '' },
    dragDrop: true,
    onFileAdded: (file) => {
      const allowedTypes = [
        'text/csv',
        'application/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only CSV, XLS, XLSX files are allowed!');
        uploadInstance.value?.removeFileByFile(file);
      } else {
        emit('file-selected', file); // Emit the file to the parent
      }
    }
  });
});

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    emit('file-selected', file); // Emit the file on input change
  }
};

// Expose clearPreview method if needed
defineExpose({
  clearPreview: () => uploadInstance.value?.clearPreview()
});
</script>

<style lang="scss" scoped>
.custom-file-container__image-preview {
  width: 120px;
  height: 120px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>