<template>
    <div>
        <div class="pt-5 space-y-8">
            <div class="grid xl:grid-cols-1 gap-6">
                <!-- Basic -->
                <div class="panel">
                    <div class="flex items-center justify-between mb-5">
                        <h5 class="font-semibold text-lg dark:text-white-light">Macro Economic Data Details</h5>
                    </div>
                    <div class="space-y-8">
                        <!-- Investment Funds -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Investment Funds</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Mpile High Yield Debt Fund</p>
                                    <p class="font-medium">{{ form.mpile_high_yield_debt_fund }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Mpile Money Market Fund</p>
                                    <p class="font-medium">{{ form.mpile_money_market_fund }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Mpile Local Equity Fund</p>
                                    <p class="font-medium">{{ form.mpile_local_equity_fund }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Mpile Offshore Equity Fund</p>
                                    <p class="font-medium">{{ form.mpile_offshore_equity_fund }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Mpile Property Fund</p>
                                    <p class="font-medium">{{ form.mpile_property_fund }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Stock Market Indices -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Stock Market Indices</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Luse Free Float Index</p>
                                    <p class="font-medium">{{ form.luse_free_float_index }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Luse All Share Index</p>
                                    <p class="font-medium">{{ form.luse_all_share_index }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Economic Indicators -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Economic Indicators</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Stanbic Bank Zambia Composite PMI</p>
                                    <p class="font-medium">{{ form.stanbic_bank_zambia_composite_pmi }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Money Market Liquidity</p>
                                    <p class="font-medium">{{ form.money_market_liquidity }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Average ZMW Per USD</p>
                                    <p class="font-medium">{{ form.average_zmw_per_usd }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Inflation</p>
                                    <p class="font-medium">{{ form.inflation }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Interest Rates -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Interest Rates</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Treasury Bill Rate (91 Day)</p>
                                    <p class="font-medium">{{ form.treasury_bill_rate_91_day }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Treasury Bill Rate (364 Day)</p>
                                    <p class="font-medium">{{ form.treasury_bill_rate_364_day }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Govt Bond Rate (5 Year)</p>
                                    <p class="font-medium">{{ form.government_bond_rate_5_year }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Govt Bond Rate (10 Year)</p>
                                    <p class="font-medium">{{ form.government_bond_rate_10_year }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Govt Bond Rate (15 Year)</p>
                                    <p class="font-medium">{{ form.government_bond_rate_15_year }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Commodities -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Commodities</h3>
                            <div>
                                <p class="text-gray-500 text-sm">Copper Prices (USD/Ton)</p>
                                <p class="font-medium">{{ form.copper_prices_usd_per_ton }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end items-center mt-8 space-x-4">
                        <router-link to="/economic-and-capital-market-information/macro-economic-data/list" class="group">
                            <button type="button" class="btn btn-outline-danger">Back</button>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useMacroEconomicDataStore } from '@/stores/economic-and-capital-market-information/macro-economic-data';
useMeta({ title: 'Edit Macro Economic Data' });

const route = useRoute()
const router = useRouter()
// Reactive form data
const form = reactive({
    id: '',
    mpile_high_yield_debt_fund: '',
    mpile_money_market_fund: '',
    mpile_local_equity_fund: '',

    mpile_offshore_equity_fund: '',
    mpile_property_fund: '',
    luse_free_float_index: '',

    luse_all_share_index: '',
    stanbic_bank_zambia_composite_pmi: '',
    copper_prices_usd_per_ton: '',

    money_market_liquidity: '',
    average_zmw_per_usd: '',
    treasury_bill_rate_91_day: '',

    treasury_bill_rate_364_day: '',
    government_bond_rate_5_year: '',
    government_bond_rate_10_year: '',

    government_bond_rate_15_year: '',
    inflation: '',
})



const macroEconomicDataStore = useMacroEconomicDataStore();

onMounted(async () => {
    const economicSubmissionId = route.params.id
    macroEconomicDataStore.showEconomicSubmissionError = ''

    // fetch the role directly from API
    const economicSubmission = await macroEconomicDataStore.showMacroEconomicData(economicSubmissionId)

    if (economicSubmission) {
        form.id = economicSubmission.id.toString()
        form.mpile_high_yield_debt_fund = economicSubmission.mpile_high_yield_debt_fund
        form.mpile_money_market_fund = economicSubmission.mpile_money_market_fund
        form.mpile_local_equity_fund = economicSubmission.mpile_local_equity_fund
        form.mpile_offshore_equity_fund = economicSubmission.mpile_offshore_equity_fund
        form.mpile_property_fund = economicSubmission.mpile_property_fund
        form.luse_free_float_index = economicSubmission.luse_free_float_index
        form.luse_all_share_index = economicSubmission.luse_all_share_index
        form.stanbic_bank_zambia_composite_pmi = economicSubmission.stanbic_bank_zambia_composite_pmi
        form.copper_prices_usd_per_ton = economicSubmission.copper_prices_usd_per_ton
        form.money_market_liquidity = economicSubmission.money_market_liquidity
        form.average_zmw_per_usd = economicSubmission.average_zmw_per_usd
        form.treasury_bill_rate_91_day = economicSubmission.treasury_bill_rate_91_day
        form.treasury_bill_rate_364_day = economicSubmission.treasury_bill_rate_364_day
        form.government_bond_rate_5_year = economicSubmission.government_bond_rate_5_year
        form.government_bond_rate_10_year = economicSubmission.government_bond_rate_10_year
        form.government_bond_rate_15_year = economicSubmission.government_bond_rate_15_year
        form.inflation = economicSubmission.inflation
    } else {
        await router.push({
            name: 'macro-economic-data-list'
        })
        toast.error(macroEconomicDataStore.showEconomicSubmissionError || 'Economic Submission not found')
    }
})


</script>
