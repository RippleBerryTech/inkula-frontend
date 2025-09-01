<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add Macro Economic Data</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-8" @submit.prevent="submitForm">
              <!-- Investment Funds -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Investment Funds</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <!-- mpile_high_yield_debt_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_high_yield_debt_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_high_yield_debt_fund.$error }">
                    <label for="mpile_high_yield_debt_fund">Mpile High Yield Debt Fund</label>
                    <input id="mpile_high_yield_debt_fund" type="text" placeholder="Enter Mpile High Yield Debt Fund"
                      class="form-input" v-model="form.mpile_high_yield_debt_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_high_yield_debt_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_high_yield_debt_fund.$error">
                      <p v-for="error in $v.form.mpile_high_yield_debt_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals
                        </span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_money_market_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_money_market_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_money_market_fund.$error }">
                    <label for="mpile_money_market_fund">Mpile Money Market Fund</label>
                    <input id="mpile_money_market_fund" type="text" placeholder="Enter Mpile Money Market Fund"
                      class="form-input" v-model="form.mpile_money_market_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_money_market_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_money_market_fund.$error">
                      <p v-for="error in $v.form.mpile_money_market_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_local_equity_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_local_equity_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_local_equity_fund.$error }">
                    <label for="mpile_local_equity_fund">Mpile Local Equity Fund</label>
                    <input id="mpile_local_equity_fund" type="text" placeholder="Enter Mpile Local Equity Fund"
                      class="form-input" v-model="form.mpile_local_equity_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_local_equity_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_local_equity_fund.$error">
                      <p v-for="error in $v.form.mpile_local_equity_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_offshore_equity_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_offshore_equity_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_offshore_equity_fund.$error }">
                    <label for="mpile_offshore_equity_fund">Mpile Offshore Equity Fund</label>
                    <input id="mpile_offshore_equity_fund" type="text" placeholder="Enter Mpile Offshore Equity Fund"
                      class="form-input" v-model="form.mpile_offshore_equity_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_offshore_equity_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_offshore_equity_fund.$error">
                      <p v-for="error in $v.form.mpile_offshore_equity_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_property_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_property_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_property_fund.$error }">
                    <label for="mpile_property_fund">Mpile Property Fund</label>
                    <input id="mpile_property_fund" type="text" placeholder="Enter Mpile Property Fund"
                      class="form-input" v-model="form.mpile_property_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_property_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_property_fund.$error">
                      <p v-for="error in $v.form.mpile_property_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Stock Market Indices -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Stock Market Indices</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- luse_free_float_index -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.luse_free_float_index.$error, 'has-success': isSubmitForm && !$v.form.luse_free_float_index.$error }">
                    <label for="luse_free_float_index">Luse Free Float Index</label>
                    <input id="luse_free_float_index" type="text" placeholder="Enter Luse Free Float Index"
                      class="form-input" v-model="form.luse_free_float_index" />
                    <template v-if="isSubmitForm && !$v.form.luse_free_float_index.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.luse_free_float_index.$error">
                      <p v-for="error in $v.form.luse_free_float_index.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <!-- luse_all_share_index -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.luse_all_share_index.$error, 'has-success': isSubmitForm && !$v.form.luse_all_share_index.$error }">
                    <label for="luse_all_share_index">Luse All Share Index</label>
                    <input id="luse_all_share_index" type="text" placeholder="Enter Luse All Share Index"
                      class="form-input" v-model="form.luse_all_share_index" />
                    <template v-if="isSubmitForm && !$v.form.luse_all_share_index.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.luse_all_share_index.$error">
                      <p v-for="error in $v.form.luse_all_share_index.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Economic Indicators -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Economic Indicators</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.stanbic_bank_zambia_composite_pmi.$error, 'has-success': isSubmitForm && !$v.form.stanbic_bank_zambia_composite_pmi.$error }">
                    <label for="stanbic_bank_zambia_composite_pmi">Stanbic Bank Zambia Composite PMI</label>
                    <input id="stanbic_bank_zambia_composite_pmi" type="text"
                      placeholder="Enter Stanbic Bank Zambia Composite PMI" class="form-input"
                      v-model="form.stanbic_bank_zambia_composite_pmi" />
                    <template v-if="isSubmitForm && !$v.form.stanbic_bank_zambia_composite_pmi.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.stanbic_bank_zambia_composite_pmi.$error">
                      <p v-for="error in $v.form.stanbic_bank_zambia_composite_pmi.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.money_market_liquidity.$error, 'has-success': isSubmitForm && !$v.form.money_market_liquidity.$error }">
                    <label for="money_market_liquidity">Money Market Liquidity</label>
                    <input id="money_market_liquidity" type="text" placeholder="Enter Money Market Liquidity"
                      class="form-input" v-model="form.money_market_liquidity" />
                    <template v-if="isSubmitForm && !$v.form.money_market_liquidity.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.money_market_liquidity.$error">
                      <p v-for="error in $v.form.money_market_liquidity.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.average_zmw_per_usd.$error, 'has-success': isSubmitForm && !$v.form.average_zmw_per_usd.$error }">
                    <label for="average_zmw_per_usd">Average ZMW Per USD</label>
                    <input id="average_zmw_per_usd" type="text" placeholder="Enter Average ZMW Per USD"
                      class="form-input" v-model="form.average_zmw_per_usd" />
                    <template v-if="isSubmitForm && !$v.form.average_zmw_per_usd.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.average_zmw_per_usd.$error">
                      <p v-for="error in $v.form.average_zmw_per_usd.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.inflation.$error, 'has-success': isSubmitForm && !$v.form.inflation.$error }">
                    <label for="inflation">Inflation</label>
                    <input id="inflation" type="text" placeholder="Enter Inflation" class="form-input"
                      v-model="form.inflation" />
                    <template v-if="isSubmitForm && !$v.form.inflation.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.inflation.$error">
                      <p v-for="error in $v.form.inflation.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Interest Rates -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Interest Rates</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.treasury_bill_rate_91_day.$error, 'has-success': isSubmitForm && !$v.form.treasury_bill_rate_91_day.$error }">
                    <label for="treasury_bill_rate_91_day">Treasury Bill Rate 91 Day</label>
                    <input id="treasury_bill_rate_91_day" type="text" placeholder="Enter Treasury Bill Rate 91 Day"
                      class="form-input" v-model="form.treasury_bill_rate_91_day" />
                    <template v-if="isSubmitForm && !$v.form.treasury_bill_rate_91_day.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.treasury_bill_rate_91_day.$error">
                      <p v-for="error in $v.form.treasury_bill_rate_91_day.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.treasury_bill_rate_364_day.$error, 'has-success': isSubmitForm && !$v.form.treasury_bill_rate_364_day.$error }">
                    <label for="treasury_bill_rate_364_day">Treasury Bill Rate 364 Day</label>
                    <input id="treasury_bill_rate_364_day" type="text" placeholder="Enter Treasury Bill Rate 364 Day"
                      class="form-input" v-model="form.treasury_bill_rate_364_day" />
                    <template v-if="isSubmitForm && !$v.form.treasury_bill_rate_364_day.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.treasury_bill_rate_364_day.$error">
                      <p v-for="error in $v.form.treasury_bill_rate_364_day.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_5_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_5_year.$error }">
                    <label for="government_bond_rate_5_year">Government Bond Rate 5 Year</label>
                    <input id="government_bond_rate_5_year" type="text" placeholder="Enter Government Bond Rate 5 Year"
                      class="form-input" v-model="form.government_bond_rate_5_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_5_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_5_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_5_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_10_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_10_year.$error }">
                    <label for="government_bond_rate_10_year">Government Bond Rate 10 Year</label>
                    <input id="government_bond_rate_10_year" type="text"
                      placeholder="Enter Government Bond Rate 10 Year" class="form-input"
                      v-model="form.government_bond_rate_10_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_10_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_10_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_10_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_15_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_15_year.$error }">
                    <label for="government_bond_rate_15_year">Government Bond Rate 15 Year</label>
                    <input id="government_bond_rate_15_year" type="text"
                      placeholder="Enter Government Bond Rate 15 Year" class="form-input"
                      v-model="form.government_bond_rate_15_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_15_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_15_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_15_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Commodities -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Commodities</h3>
                <div class="flex-1"
                  :class="{ 'has-error': $v.form.copper_prices_usd_per_ton.$error, 'has-success': isSubmitForm && !$v.form.copper_prices_usd_per_ton.$error }">
                  <label for="copper_prices_usd_per_ton">Copper Prices USD Per Ton</label>
                  <input id="copper_prices_usd_per_ton" type="text" placeholder="Enter Copper Prices USD Per Ton"
                    class="form-input" v-model="form.copper_prices_usd_per_ton" />
                  <template v-if="isSubmitForm && !$v.form.copper_prices_usd_per_ton.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                  <template v-if="isSubmitForm && $v.form.copper_prices_usd_per_ton.$error">
                    <p v-for="error in $v.form.copper_prices_usd_per_ton.$errors" :key="error.$uid"
                      class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                      <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                        decimals</span>
                    </p>
                  </template>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link to="/economic-and-capital-market-information/macro-economic-data/list" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!economicSubmissionStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="economicSubmissionStore.addEconomicSubmissionError">
                {{ economicSubmissionStore.addEconomicSubmissionError }}
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { appRouter } from '@/router';
import { useMacroEconomicDataStore } from '@/stores/economic-and-capital-market-information/macro-economic-data';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
useMeta({ title: 'Add Macro Economic Data' });
// Reactive form data
const form = reactive({
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

const floatValidator = helpers.regex(/^\d+(\.\d{1,2})?$/);
// Validation rules
const rules = {
  form: {
    mpile_high_yield_debt_fund: { required, floatValidator },
    mpile_money_market_fund: { required, floatValidator },
    mpile_local_equity_fund: { required, floatValidator },
    mpile_offshore_equity_fund: { required, floatValidator },
    mpile_property_fund: { required, floatValidator },
    luse_free_float_index: { required, floatValidator },
    luse_all_share_index: { required, floatValidator },
    stanbic_bank_zambia_composite_pmi: { required, floatValidator },
    copper_prices_usd_per_ton: { required, floatValidator },
    money_market_liquidity: { required, floatValidator },
    average_zmw_per_usd: { required, floatValidator },
    treasury_bill_rate_91_day: { required, floatValidator },
    treasury_bill_rate_364_day: { required, floatValidator },
    government_bond_rate_5_year: { required, floatValidator },
    government_bond_rate_10_year: { required, floatValidator },
    government_bond_rate_15_year: { required, floatValidator },
    inflation: { required, floatValidator },
  },
}

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })

// Form submit handler

const submitForm = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

  if (!$v.value.$invalid) {

    const res = await economicSubmissionStore.addMacroEconomicData(form)
    if (res) {
      // Reset form
      form.mpile_high_yield_debt_fund = '',
        form.mpile_money_market_fund = '',
        form.mpile_local_equity_fund = '',
        form.mpile_offshore_equity_fund = '',
        form.mpile_property_fund = '',
        form.luse_free_float_index = '',
        form.luse_all_share_index = '',
        form.stanbic_bank_zambia_composite_pmi = '',
        form.copper_prices_usd_per_ton = '',
        form.money_market_liquidity = '',
        form.average_zmw_per_usd = '',
        form.treasury_bill_rate_91_day = '',
        form.treasury_bill_rate_364_day = '',
        form.government_bond_rate_5_year = '',
        form.government_bond_rate_10_year = '',
        form.government_bond_rate_15_year = '',
        form.inflation = '',

        // Reset validation
        $v.value.$reset()
      isSubmitForm.value = false

      await appRouter.push({
        name: 'macro-economic-data-list'
      })
      // Show success message
      toast.success("Macro Economic Data added successfully")
    }
  } else {
    toast.error('Validation Failed')
  }
}

const economicSubmissionStore = useMacroEconomicDataStore();

onMounted(() => {
})



</script>
