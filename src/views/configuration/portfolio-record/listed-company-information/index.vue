<template>
    <div>

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Listed Company Information List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <div>
                    <button class="btn btn-primary" v-if="hasPermission('Add Portfolio Record')" type="button"
                        v-tippy="'Import Portfolio Records'" @click="importPortfolioRecordModal = true;">
                        Import
                    </button>
                </div>
                <!-- <router-link :to="{name: 'listed-company-information-add'}" v-if="hasPermission('Add Portfolio Record')" class="btn btn-primary">Add</router-link> -->

                <button v-if="hasPermission('Add Portfolio Record')" class="btn btn-primary" @click="openAddModal">Add</button>
            </div>

            <div class="datatable">
                <!-- Loading Spinner -->
                <Loader v-if="listedCompanyInformationStore.loading" size="64" color="#4361ee" />
                <!-- Error -->
                <div v-else-if="listedCompanyInformationStore.error" class="text-red-500 text-center py-4">
                    {{ listedCompanyInformationStore.error }}
                </div>

                <div v-else-if="listedCompanyInformationStore.portfolioRecords?.length === 0" class="flex flex-col items-center justify-center text-red-500 py-4">
                    <IconDatabaseOff :size="30" stroke-width="1.5" />
                    <p class="mt-2">No Listed Company Information Found</p>
                </div>
                <!-- DataTable -->
                <vue3-datatable v-else :rows="listedCompanyInformationStore.portfolioRecords" :columns="columns" :totalRows="listedCompanyInformationStore.portfolioRecords?.length"
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
                    <template #website="data">
                        <div class="flex items-center w-max">
                            {{ data.value.website ?? "N/A"}}
                        </div>
                    </template>
                    <template #action="data">
                        <div class="flex items-center">
                            <div>
                                <!-- <router-link v-if="hasPermission('Edit Portfolio Record')" :to="{ name: 'listed-company-information-edit', params: { id: data.value.id } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </router-link> -->
                                <button v-if="hasPermission('Edit Portfolio Record')" 
                                    @click="openEditModal(data.value.id)"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </button>
                            </div>
                            <div>
                                <button v-if="hasPermission('Delete Portfolio Record')" type="button" v-tippy="'Delete'">
                                    <IconTrash :size="20" stroke-width="1.5"  @click="deletePortfolioRecordModal = true; selectPortfolioRecordId = data.value.id"/>
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>

    <!-- Delete Portfolio Record Modal -->
    <TransitionRoot appear :show="deletePortfolioRecordModal" as="template">
        <Dialog as="div" @close="deletePortfolioRecordModal = false" class="relative z-[51]">
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
                                @click="deletePortfolioRecordModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Confirm your action!
                            </div>
                            <div class="p-5">
                                <span class="text-gray-500">Are you sure you want to delete this?</span>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="deletePortfolioRecordModal = false"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="deletePortfolioRecord"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4">Delete</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Import Portfolio Record Modal -->
    <TransitionRoot appear :show="importPortfolioRecordModal" as="template">
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
                                Select File to Import
                            </div>
                            <div class="p-5" v-if="importPortfolioRecordModal">
                                <FileUpload ref="fileUploadRef" :show="importPortfolioRecordModal"
                                    @file-selected="handleFileSelected" />

                                <!-- Error List -->
                                <div v-if="listedCompanyInformationStore.importErrors.length > 0" class="mt-4">
                                    <p class="text-danger font-semibold">Import Errors:</p>
                                    <ul class="list-disc list-inside text-danger">
                                        <li v-for="error in listedCompanyInformationStore.importErrors" :key="error.row">
                                            Row {{ error.row }}: {{ error.errors.join(', ') }}
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="closeModal"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="downloadTemplate"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="listedCompanyInformationStore.loading">
                                        {{ listedCompanyInformationStore.loading ? 'Downloading...' : 'Download Template' }}
                                    </button>
                                    <button type="button" @click="importSector"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="listedCompanyInformationStore.loading">
                                        {{ listedCompanyInformationStore.loading ? 'Importing...' : 'Import' }}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Add Listed Company Information Modal -->
    <TransitionRoot appear :show="addModal" as="template">
    <Dialog as="div" @close="closeAddModal" class="relative z-[51]">
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
                        class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl text-black dark:text-white-dark">
                        <button type="button"
                            class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            @click="closeAddModal">
                            <IconX :size="20" stroke-width="1.5" />
                        </button>
                        <div
                            class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                            Add Listed Company Information
                        </div>
                        <div class="p-5">
                            <!-- Copy the form from your add.vue component here -->
                            <form class="space-y-5" @submit.prevent="submitAddForm">
                                <div class="flex flex-col md:flex-row gap-4">
                                    <!-- Name -->
                                    <div class="flex-1" :class="{
                                      'has-error': $vAdd.form.name.$error || backendErrors.name,
                                      'has-success': isSubmitAddForm && !$vAdd.form.name.$error && !backendErrors.name
                                    }">
                                        <label for="name">Name</label>
                                        <input id="name" type="text" placeholder="Enter Name" class="form-input" v-model="addForm.name" />

                                        <!-- Looks Good -->
                                        <template v-if="isSubmitAddForm && !$vAdd.form.name.$error && !backendErrors.name">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Frontend errors -->
                                        <template v-if="isSubmitAddForm && $vAdd.form.name.$error">
                                            <p v-for="error in $vAdd.form.name.$errors" :key="error.$uid" class="text-danger mt-1">
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
                                      'has-error': $vAdd.form.website.$error || backendErrors.website,
                                      'has-success': isSubmitAddForm && !$vAdd.form.website.$error && !backendErrors.website
                                    }">
                                        <label for="website">Website</label>
                                        <input id="website" type="text" placeholder="Enter website" class="form-input"
                                            v-model="addForm.website" />

                                        <!-- Looks Good -->
                                        <template v-if="isSubmitAddForm && !$vAdd.form.website.$error && !backendErrors.website">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Backend error -->
                                        <template v-if="backendErrors.website">
                                            <p class="text-danger mt-1">{{ backendErrors.website }}</p>
                                        </template>
                                    </div>
                                </div>

                                <div class="flex justify-end items-center mt-8 space-x-4">
                                    <button type="button" class="btn btn-outline-danger" @click="closeAddModal">Cancel</button>

                                    <div>
                                        <span v-if="!listedCompanyInformationStore.loading">
                                            <button type="submit" class="btn btn-primary mt-0">Add</button>
                                        </span>
                                        <span v-else>
                                            <button type="button" class="btn btn-primary mt-0" disabled>
                                                Loading...
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <div class="text-danger mt-1" v-if="listedCompanyInformationStore.addPortfolioRecordError">{{
                                    listedCompanyInformationStore.addPortfolioRecordError }}</div>
                            </form>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="editModal" as="template">
    <Dialog as="div" @close="closeEditModal" class="relative z-[51]">
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
                        class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl text-black dark:text-white-dark">
                        <button type="button"
                            class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            @click="closeEditModal">
                            <IconX :size="20" stroke-width="1.5" />
                        </button>
                        <div
                            class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                            Edit Listed Company Information
                        </div>
                        <div class="p-5">
                            <!-- Copy the form from your edit.vue component here -->
                            <form class="space-y-5" @submit.prevent="submitEditForm">
                                <div class="flex flex-col md:flex-row gap-4">
                                    <!-- Name -->
                                    <div class="flex-1" :class="{
                                      'has-error': $vEdit.form.name.$error || backendErrors.name,
                                      'has-success': isSubmitEditForm && !$vEdit.form.name.$error && !backendErrors.name
                                    }">
                                        <label for="name">Name</label>
                                        <input id="name" type="text" placeholder="Enter Name" class="form-input" v-model="editForm.name" />

                                        <!-- Looks Good -->
                                        <template v-if="isSubmitEditForm && !$vEdit.form.name.$error && !backendErrors.name">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Frontend errors -->
                                        <template v-if="isSubmitEditForm && $vEdit.form.name.$error">
                                            <p v-for="error in $vEdit.form.name.$errors" :key="error.$uid" class="text-danger mt-1">
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
                                      'has-error': $vEdit.form.website.$error || backendErrors.website,
                                      'has-success': isSubmitEditForm && !$vEdit.form.website.$error && !backendErrors.website
                                    }">
                                        <label for="website">Website</label>
                                        <input id="website" type="text" placeholder="Enter website" class="form-input"
                                            v-model="editForm.website" />

                                        <!-- Looks Good -->
                                        <template v-if="isSubmitEditForm && !$vEdit.form.website.$error && !backendErrors.website">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Backend error -->
                                        <template v-if="backendErrors.website">
                                            <p class="text-danger mt-1">{{ backendErrors.website }}</p>
                                        </template>
                                    </div>
                                </div>

                                <div class="flex justify-end items-center mt-8 space-x-4">
                                    <button type="button" class="btn btn-outline-danger" @click="closeEditModal">Cancel</button>

                                    <div>
                                        <span v-if="!listedCompanyInformationStore.loading">
                                            <button type="submit" class="btn btn-primary mt-0">Update</button>
                                        </span>
                                        <span v-else>
                                            <button type="button" class="btn btn-primary mt-0" disabled>
                                                Loading...
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <div class="text-danger mt-1" v-if="listedCompanyInformationStore.editPortfolioRecordError">{{
                                    listedCompanyInformationStore.editPortfolioRecordError }}</div>
                            </form>
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
import { IconDatabaseOff, IconEdit, IconTrash, IconX } from '@tabler/icons-vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { computed, ref, reactive } from 'vue';
import { useMeta } from '../../../../composables/use-meta';

import { usePermissions } from '@/composables/usePermissions';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import FileUpload from '../../../components/file-upload.vue';

import { useListedCompanyInformationStore } from '@/stores/configuration/portfolio-record/listed-company-information';
import Loader from '../../../components/loader.vue';

// Add these imports for Vuelidate
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

const { hasRole, hasPermission } = usePermissions()

useMeta({ title: 'Listed Company Information' });
const search = ref('');
const columns = ref([
    { field: 'id', title: '#' },
    { field: 'name', title: 'Name' },
    { field: 'website', title: 'Website' },
    { field: 'action', title: 'Action', sort: false },
]) || [];

const listedCompanyInformationStore = useListedCompanyInformationStore();

onMounted(() => {
    listedCompanyInformationStore.fetchListedCompanyInformation();
});

const rows = computed(() =>
    listedCompanyInformationStore.portfolioRecords.map((r, i) => ({ ...r, sn: i + 1 }))
);

const deletePortfolioRecordModal = ref(false)
const selectPortfolioRecordId = ref(0);

const deletePortfolioRecord = async () => {
    var res = await listedCompanyInformationStore.deleteListedCompanyInformation(selectPortfolioRecordId.value);
    deletePortfolioRecordModal.value = false;

    if(res){
        toast.success("Listed Company Information deleted successfully");
    }else {
        toast.error(listedCompanyInformationStore.deletePortfolioRecordError);
    }
}

const importPortfolioRecordModal = ref(false);

// Import function
const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileSelected = (file: File) => {
    selectedFile.value = file;
    listedCompanyInformationStore.importErrors = []; // Clear errors when a new file is selected
};

const importSector = async () => {
    if (!selectedFile.value) {
        toast.error('Please select a file first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const res = await listedCompanyInformationStore.importListedCompanyInformation(formData);

    if (res) {
        toast.success('Listed Company Information imported successfully');
        importPortfolioRecordModal.value = false;
        fileUploadRef.value?.clearPreview();
        selectedFile.value = null;
        listedCompanyInformationStore.importErrors = []; // Clear errors on success
    } else {
        toast.error(listedCompanyInformationStore.error || 'Failed to import Listed Company Information');
        // Errors are already stored in sectorStore.importErrors
        fileUploadRef.value?.clickClearBtn();
        selectedFile.value = null;
    }
};

const closeModal = () => {
    importPortfolioRecordModal.value = false;
    listedCompanyInformationStore.importErrors = []; // Clear errors when closing modal
    selectedFile.value = null; // Clear selected file
};

const downloadTemplate = async () => {
    const res = await listedCompanyInformationStore.downloadTemplate();
    if (res) {
        toast.success('Template downloaded successfully');
    } else {
        toast.error(listedCompanyInformationStore.error || 'Failed to download template');
    }
};

// Add and Edit Modal Variables
const addModal = ref(false);
const editModal = ref(false);
const selectedRecordId = ref(0);

// Add Form
const addForm = reactive({
  name: '',
  website: '',
});

const addRules = {
  name: { required },
  website: {},
};

const isSubmitAddForm = ref(false);
const $vAdd = useVuelidate(addRules, addForm);

// Edit Form
const editForm = reactive({
  id: '',
  name: '',
  website: '',
});

const editRules = {
  name: { required },
  website: {},
};

const isSubmitEditForm = ref(false);
const $vEdit = useVuelidate(editRules, editForm);

// Backend errors
const backendErrors = reactive({
  name: '',
  website: ''
});

// Modal functions
const openAddModal = () => {
  addModal.value = true;
  resetAddForm();
};

const closeAddModal = () => {
  addModal.value = false;
  resetAddForm();
};

const openEditModal = (id: number) => {
  selectedRecordId.value = id;
  loadRecordForEdit(id);
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
  resetEditForm();
};

const resetAddForm = () => {
  addForm.name = '';
  addForm.website = '';
  isSubmitAddForm.value = false;
  $vAdd.value.$reset();
  Object.keys(backendErrors).forEach(key => backendErrors[key] = '');
  listedCompanyInformationStore.addPortfolioRecordError = '';
};

const resetEditForm = () => {
  editForm.id = '';
  editForm.name = '';
  editForm.website = '';
  isSubmitEditForm.value = false;
  $vEdit.value.$reset();
  Object.keys(backendErrors).forEach(key => backendErrors[key] = '');
  listedCompanyInformationStore.editPortfolioRecordError = '';
};

// Load record for editing
const loadRecordForEdit = async (id: number) => {
  const record = await listedCompanyInformationStore.editListedCompanyInformation(id);
  if (record) {
    editForm.id = record.id.toString();
    editForm.name = record.name;
    editForm.website = record.website;
  } else {
    toast.error(listedCompanyInformationStore.editPortfolioRecordError || 'Record not found');
    closeEditModal();
  }
};

// Form submission functions
const submitAddForm = async () => {
  isSubmitAddForm.value = true;
  Object.keys(backendErrors).forEach(k => backendErrors[k] = '');
  
  await $vAdd.value.$validate();
  
  if (!$vAdd.value.$invalid) {
    if (addForm.website && !addForm.website.startsWith("http://") && !addForm.website.startsWith("https://")) {
      addForm.website = "https://" + addForm.website;
    }
    
    const res = await listedCompanyInformationStore.addListedCompanyInformation(addForm);
    
    if (res === true) {
      toast.success("Listed Company Information added successfully");
      closeAddModal();
      listedCompanyInformationStore.fetchListedCompanyInformation(); // Refresh the list
    } else {
      for (const field in listedCompanyInformationStore.addPortfolioRecordFieldErrors) {
        backendErrors[field] = listedCompanyInformationStore.addPortfolioRecordFieldErrors[field][0];
      }
    }
  }
};

const submitEditForm = async () => {
  isSubmitEditForm.value = true;
  Object.keys(backendErrors).forEach(k => backendErrors[k] = '');
  
  await $vEdit.value.$validate();
  
  if (!$vEdit.value.$invalid) {
    if (editForm.website && !editForm.website.startsWith("http://") && !editForm.website.startsWith("https://")) {
      editForm.website = "https://" + editForm.website;
    }
    
    const ok = await listedCompanyInformationStore.updateListedCompanyInformation({
      id: Number(editForm.id),
      name: editForm.name,
      website: editForm.website
    });
    
    if (ok === true) {
      toast.success('Listed Company Information updated successfully');
      closeEditModal();
      listedCompanyInformationStore.fetchListedCompanyInformation(); // Refresh the list
    } else {
      for (const field in listedCompanyInformationStore.editPortfolioRecordFieldErrors) {
        backendErrors[field] = listedCompanyInformationStore.editPortfolioRecordFieldErrors[field][0];
      }
    }
  }
};
</script>

<style></style>
