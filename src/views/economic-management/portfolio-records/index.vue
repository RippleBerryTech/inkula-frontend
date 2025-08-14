<template>
    <div>

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Portfolio Record List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <router-link to="/economic-management/portfolio-records/add" v-if="hasPermission('Add Sector')" class="btn btn-primary">Add Portfolio Record</router-link>
            </div>

            <div class="datatable">
                <div v-if="portfolioStore.loading">Loading data...</div>
                <vue3-datatable :rows="portfolioStore.portfolioRecords" :columns="columns" :totalRows="portfolioStore.portfolioRecords?.length"
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
                                <router-link v-if="hasPermission('Edit Portfolio Record')" :to="{ name: 'portfolio-record-edit', params: { id: data.value.id } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </router-link>
                            </div>
                            <div>
                                <button v-if="hasPermission('Delete Portfolio Record')" type="button" v-tippy:delete>
                                    <IconTrash :size="20" stroke-width="1.5"  @click="deletePortfolioRecordModal = true; selectPortfolioRecordId = data.value.id"/>
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>

    <!-- Delete Sector Modal -->
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
                                <span class="text-gray-500">Are you sure you want to delete this portfolio record?</span>

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
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useEconomicSubmissionStore } from '../../../stores/economic-management/economic-submissions/index';
import { useSectorStore } from '@/stores/economic-management/sectors';
import { usePortfolioStore } from '@/stores/economic-management/portfolio-record';

const { hasRole, hasPermission } = usePermissions()

useMeta({ title: 'Portfolio Records' });
const search = ref('');
const columns =
    ref([
        { field: 'id', title: '#' },
        { field: 'name', title: 'Name' },
        { field: 'website', title: 'Website' },
        { field: 'action', title: 'Action', sort: false },
    ]) || [];


const portfolioStore = usePortfolioStore();

onMounted(() => {
    portfolioStore.fetchPortfolioRecords();
});
const rows = computed(() =>
    portfolioStore.portfolioRecords.map((r, i) => ({ ...r, sn: i + 1 }))
);
const deletePortfolioRecordModal = ref(false)
const selectPortfolioRecordId = ref(0);

const deletePortfolioRecord = async () => {
    var res = await portfolioStore.deletePortfolioRecord(selectPortfolioRecordId.value);
    deletePortfolioRecordModal.value = false;

    if(res){
        toast.success("Portfolio Record deleted successfully");
    }else {
        toast.error(portfolioStore.deletePortfolioRecordError);
    }

}

</script>

<style></style>
