<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Configuration /</a>
            </li>
            <li>
                <router-link v-tippy="'Sectors List'" :to="{name: 'sectors-list'}" class="text-primary hover:underline">Sectors</router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Sub Sectors</span>
            </li>
        </ul>

        <!-- Sector Information Card -->
        <div class="panel my-6">
            <div class="flex items-center justify-between mb-4">
                <h5 class="font-semibold text-lg dark:text-white-light">Sector Information</h5>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-baseline gap-2">
    <label class="text-sm text-black-500 dark:text-gray-400">Name:</label>
    <p class="text-sm font-medium dark:text-white">{{ sectorName || 'Loading...' }}</p>
</div>
            </div>
        </div>

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Sub Sectors List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <button v-if="hasPermission('Add Sector')" class="btn btn-primary" @click="addSubSectorModal = true">
                    Add
                </button>
            </div>

            <div class="datatable">
                <!-- Loading Spinner -->
                <Loader v-if="subSectorStore.loading" size="64" color="#4361ee" />
                <!-- Error -->
                <div v-else-if="subSectorStore.error" class="text-red-500 text-center py-4">
                    {{ subSectorStore.error }}
                </div>

                <div v-else-if="subSectorStore.sectors?.length === 0"
                    class="flex flex-col items-center justify-center text-red-500 py-4">
                    <IconDatabaseOff :size="30" stroke-width="1.5" />
                    <p class="mt-2">No Sub Sectors Found</p>
                </div>

                <!-- DataTable -->
                <vue3-datatable v-else :rows="subSectorStore.sectors" :columns="columns"
                    :totalRows="subSectorStore.sectors?.length" :sortable="true" sortColumn="id" :search="search"
                    skin="whitespace-nowrap bh-table-hover"
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
                                <button v-if="hasPermission('Edit Sector')" @click="openEditModal(data.value)"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit Sub-Sector'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </button>

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
                                <span class="text-gray-500">Are you sure you want to delete this?</span>

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

    <!-- Add Sub Sector Modal -->
    <TransitionRoot appear :show="addSubSectorModal" as="template">
        <Dialog as="div" @close="addSubSectorModal = false" class="relative z-[51]">
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
                                @click="addSubSectorModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>

                            <AddSubSectorForm :sector-id="props.id" @saved="handleSubSectorAdded"
                                @cancel="addSubSectorModal = false" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Edit Sub Sector Modal -->
    <TransitionRoot appear :show="editSubSectorModal" as="template">
        <Dialog as="div" @close="editSubSectorModal = false" class="relative z-[51]">
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
                                @click="editSubSectorModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>

                            <EditSubSectorForm v-if="selectedSubSector" :sector-id="props.id"
                                :sub-sector="selectedSubSector" @saved="handleSubSectorUpdated"
                                @cancel="editSubSectorModal = false" />
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
import { computed, ref, onMounted } from 'vue';
import { useMeta } from '../../../../composables/use-meta';

import { usePermissions } from '@/composables/usePermissions';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors';
import { useSectorStore } from '@/stores/configuration/sectors/index'; // Import sector store
import Loader from '../../../components/loader.vue';
import AddSubSectorForm from '../../../components/sectors/AddSubSectorForm.vue';
import EditSubSectorForm from '../../../components/sectors/EditSubSectorForm.vue';

const { hasRole, hasPermission } = usePermissions()
const router = useRouter();

useMeta({ title: 'Sub Sectors' });

const search = ref('');
const columns = ref([
    { field: 'id', title: '#' },
    { field: 'name', title: 'Name' },
    { field: 'action', title: 'Action', sort: false },
]) || [];

const subSectorStore = useSubSectorStore();
const sectorStore = useSectorStore(); // Initialize sector store
const props = defineProps<{
    id: string | number
}>()

// Sector name
const sectorName = ref('Loading...');

onMounted(async () => {
    const sectorId = props.id;
    
    // Fetch sub-sectors
    subSectorStore.fetchSubSectors(true, sectorId);
    
    // Fetch sector information using the editsector method
    await fetchSectorInfo(sectorId);
});

// Function to fetch sector information using the editsector method
const fetchSectorInfo = async (sectorId: string | number) => {
    try {
        // Use the editsector method from your store
        const sector = await sectorStore.editsector(sectorId);
        
        if (sector) {
            sectorName.value = sector.name || 'N/A';
        } else {
            // If sector not found, redirect to sectors list
            await router.push({
                name: 'sectors-list',
            });
            toast.error(sectorStore.editSectorError || 'Sector not found');
        }
    } catch (error) {
        console.error('Failed to fetch sector information:', error);
        sectorName.value = 'Error loading sector';
    }
};

const rows = computed(() =>
    subSectorStore.sectors.map((r, i) => ({ ...r, sn: i + 1 }))
);

const deleteSectorModal = ref(false)
const selectSectorId = ref(0);
const addSubSectorModal = ref(false)
const editSubSectorModal = ref(false)
const selectedSubSector = ref<any>(null)

const deleteSector = async () => {
    var res = await subSectorStore.deleteSubSector(selectSectorId.value, props.id);
    deleteSectorModal.value = false;

    if (res) {
        toast.success("Sub Sector deleted successfully");
    } else {
        toast.error(subSectorStore.deleteSubSectorError);
    }
}

function handleSubSectorAdded() {
    addSubSectorModal.value = false
    subSectorStore.fetchSubSectors(true, props.id) // refresh list
}

function handleSubSectorUpdated() {
    editSubSectorModal.value = false
    subSectorStore.fetchSubSectors(true, props.id) // refresh list
}

const openEditModal = (subSector: any) => {
    selectedSubSector.value = subSector
    editSubSectorModal.value = true
}
</script>
<style></style>