<template>
    <div>

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Sectors List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <div>
                    <button class="btn btn-primary" v-if="hasPermission('Add Sector')" type="button"
                        v-tippy="'Import Sectors'" @click="importSectorModal = true;">
                        Import via CSV
                    </button>
                </div>
                <router-link to="/economic-management/sectors/add" v-if="hasPermission('Add Sector')"
                    class="btn btn-primary" v-tippy="'Add Sector'">Add Sector</router-link>
            </div>

            <div class="datatable">
                <!-- Loading Spinner -->
                <Loader v-if="sectorStore.loading" size="64" color="#4361ee" />
                <!-- Error -->
                <div v-else-if="sectorStore.error" class="text-red-500 text-center py-4">
                    {{ sectorStore.error }}
                </div>
                <!-- DataTable -->
                <vue3-datatable v-else :rows="sectorStore.sectors" :columns="columns" :totalRows="sectorStore.sectors?.length"
                    :sortable="true" sortColumn="id" :search="search" skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" /></svg>'
                    lastArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-6l4 5l-4 5h6l4 -5z" /></svg>'
                    previousArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6l-6 6l6 6v-12" /></svg>'
                    nextArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 18l6 -6l-6 -6v12" /></svg>'>
                    <template #id="data">
                        <div class="flex items-center w-max">
                            {{rows.findIndex(r => r.id === data.value.id) + 1}}
                        </div>
                    </template>
                    <template #name="data">
                        <div class="flex items-center w-max">
                            {{ data.value.name }}
                        </div>
                    </template>
                    <template #action="data">
                        <div class="flex items-center">
                            <div>
                                <router-link v-if="hasPermission('Edit Sector')"
                                    :to="{ name: 'sector-edit', params: { id: data.value.id } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </router-link>
                            </div>
                            <div>
                                <button v-if="hasPermission('Delete Sector')" type="button" v-tippy="'Delete'">
                                    <IconTrash :size="20" stroke-width="1.5"
                                        @click="deleteSectorModal = true; selectSectorId = data.value.id" />
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>

    <!-- Delete Sector Modal -->
    <TransitionRoot appear :show="deleteSectorModal" as="template">
        <Dialog as="div" @close="deleteSectorModal = false" class="relative z-[51]">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="deleteSectorModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Confirm your action!
                            </div>
                            <div class="p-5">
                                <span class="text-gray-500">Are you sure you want to delete this sector?</span>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="deleteSectorModal = false"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="deleteSector"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4">Delete</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Import Sector Modal -->
    <TransitionRoot appear :show="importSectorModal" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-[51]">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="closeModal">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Select File to Import Sectors Data
                            </div>
                            <div class="p-5" v-if="importSectorModal">
                                <FileUpload ref="fileUploadRef" :show="importSectorModal"
                                    @file-selected="handleFileSelected" />

                                <!-- Error List -->
                                <div v-if="sectorStore.importErrors.length > 0" class="mt-4">
                                    <p class="text-danger font-semibold">Import Errors:</p>
                                    <ul class="list-disc list-inside text-danger">
                                        <li v-for="error in sectorStore.importErrors" :key="error.row">
                                            Row {{ error.row }}: {{ error.errors.join(', ') }}
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="closeModal"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="downloadTemplate"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="sectorStore.loading">
                                        {{ sectorStore.loading ? 'Downloading...' : 'Download Template' }}
                                    </button>
                                    <button type="button" @click="importSector"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="sectorStore.loading">
                                        {{ sectorStore.loading ? 'Importing...' : 'Import' }}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


</template>
<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { computed, ref } from 'vue';
import { useMeta } from '../../../composables/use-meta';

import { usePermissions } from '@/composables/usePermissions';
import { useSectorStore } from '@/stores/economic-management/sectors';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import FileUpload from '../../components/file-upload.vue';

import Loader from '../../components/loader.vue';

const { hasRole, hasPermission } = usePermissions()

useMeta({ title: 'Sectors' });
const search = ref('');
const columns =
    ref([
        { field: 'id', title: '#' },
        { field: 'name', title: 'Name' },
        { field: 'action', title: 'Action', sort: false },
    ]) || [];


const sectorStore = useSectorStore();

onMounted(() => {
    sectorStore.fetchSectors();
});
const rows = computed(() =>
    sectorStore.sectors.map((r, i) => ({ ...r, sn: i + 1 }))
);
const deleteSectorModal = ref(false)
const importSectorModal = ref(false);
const selectSectorId = ref(0);

const deleteSector = async () => {
    var res = await sectorStore.deleteSector(selectSectorId.value);
    deleteSectorModal.value = false;

    if (res) {
        toast.success("Sector deleted successfully");
    } else {
        toast.error(sectorStore.deleteSectorError);
    }

}
// Import function
const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null);
const selectedFile = ref<File | null>(null);


const handleFileSelected = (file: File) => {
    selectedFile.value = file;
    sectorStore.importErrors = []; // Clear errors when a new file is selected
};

const importSector = async () => {
    if (!selectedFile.value) {
        toast.error('Please select a file first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const res = await sectorStore.importSectors(formData);

    if (res) {
        toast.success('Sectors imported successfully');
        importSectorModal.value = false;
        fileUploadRef.value?.clearPreview();
        selectedFile.value = null;
        sectorStore.importErrors = []; // Clear errors on success
    } else {
        toast.error(sectorStore.error || 'Failed to import sectors');
        // Errors are already stored in sectorStore.importErrors
        fileUploadRef.value?.clickClearBtn();
        selectedFile.value = null;
    }
};

const closeModal = () => {
    importSectorModal.value = false;
    sectorStore.importErrors = []; // Clear errors when closing modal
    selectedFile.value = null; // Clear selected file
};

const downloadTemplate = async () => {
    const res = await sectorStore.downloadTemplate();
    if (res) {
        toast.success('Template downloaded successfully');
    } else {
        toast.error(sectorStore.error || 'Failed to download template');
    }
}

</script>

<style></style>
