<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300">Inkula</span>
                    </router-link>

                    <a href="javascript:;"
                        class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                        @click="store.toggleSidebar()">
                        <icon-menu class="w-5 h-5" />
                    </a>
                </div>
                <!-- <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
                    <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <li>
                            <router-link
                                to="/apps/calendar"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-calendar />
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/apps/todolist"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-edit />
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/apps/chat"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-chat-notification />
                            </router-link>
                        </li>
                    </ul>
                </div> -->
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <!-- <form
                            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
                            :class="{ '!block': search }"
                            @submit.prevent="search = false"
                        >
                            <div class="relative">
                                <input
                                    type="text"
                                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    placeholder="Search..."
                                />
                                <button type="button" class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <icon-search class="mx-auto" />
                                </button>
                                <button
                                    type="button"
                                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                                    @click="search = false"
                                >
                                    <icon-x-circle />
                                </button>
                            </div>
                        </form>

                        <button
                            type="button"
                            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="search = !search"
                        >
                            <icon-search class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                        </button> -->
                    </div>
                    <!-- <div>
                        <a href="javascript:;" v-show="store.theme === 'light'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')">
                            <IconSun :size="20" stroke-width="1.5" />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'dark'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')">
                            <IconMoon :size="20" stroke-width="1.5" />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')">
                            <IconDeviceLaptop :size="20" stroke-width="1.5" />
                        </a>
                    </div> -->



                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                            offsetDistance="8">
                            <button type="button"
                                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <IconBell :size="20" stroke-width="1.5" />

                                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                    <span
                                        class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                </span>
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li>
                                        <div class="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 class="text-lg">Notification</h4>
                                            <template v-if="notifications.length">
                                                <span class="badge bg-primary/80"
                                                    v-text="notifications.length + 'New'"></span>
                                            </template>
                                        </div>
                                    </li>
                                    <template v-for="notification in notifications" :key="notification.id">
                                        <li class="dark:text-white-light/90">
                                            <div class="group flex items-center px-4 py-2">
                                                <div class="grid place-content-center rounded">
                                                    <div class="w-12 h-12 relative">
                                                        <!-- <img class="w-12 h-12 rounded-full object-cover"
                                                            :src="`/assets/images/${notification.profile}`" alt="" /> -->
                                                        <span
                                                            class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                    </div>
                                                </div>
                                                <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                    <div class="ltr:pr-3 rtl:pl-3">
                                                        <!-- <h6 v-html="notification.message"></h6>
                                                        <span class="text-xs block font-normal dark:text-gray-500"
                                                            v-text="notification.time"></span> -->
                                                    </div>
                                                    <!-- <button type="button"
                                                        class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                        @click="removeNotification(notification.id)">
                                                        <icon-x-circle />
                                                    </button> -->
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="notifications.length">
                                        <li>
                                            <div class="p-4">
                                                <button class="btn btn-primary block w-full btn-small"
                                                    @click="close()">Read All Notifications</button>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="!notifications.length">
                                        <li>
                                            <div
                                                class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div
                                                    class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <icon-info-circle :fill="true" class="w-10 h-10" />
                                                </div>
                                                No data available.
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                            class="!block">
                            <button type="button" class="relative group block">
                                <img class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    src="/assets/images/user-profile.jpeg" alt="" />
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div class="flex items-center px-4 py-4">
                                            <div class="flex-none">
                                                <img class="rounded-md w-10 h-10 object-cover"
                                                    src="/assets/images/user-profile.jpeg" alt="" />
                                            </div>
                                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 class="text-base">
                                                    {{ auth.user ? auth.user.name : '' }}
                                                    <!-- <span class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span> -->
                                                </h4>
                                                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                    href="javascript:;">{{ auth.user ? auth.user.user.email : '' }}</a>
                                            </div>
                                        </div>
                                    </li>
                                    <!-- <li>
                                        <router-link to="/users/profile" class="dark:hover:text-white" @click="close()">
                                            <IconUser class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" :size="20"
                                                stroke-width="1.5" />

                                            Profile
                                        </router-link>
                                    </li> -->
                                    <li class="border-t border-white-light dark:border-white-light/10">
                                        <a href="javascript:;" class="text-danger !py-3" @click.prevent="logout" :disabled="auth.loading">
                                            <IconLogout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" :size="20"
                                            stroke-width="1.5" />
                                            {{ auth.loading ? 'Signing out...' : 'Sign out' }}
                                            <span v-if="auth.loading" class="loader border-danger border-2 border-t-transparent w-5 h-5 rounded-full animate-spin mx-3"></span>
                                        </a>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>

            <!-- horizontal menu -->
            <ul
                class="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark">
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-dashboard class="shrink-0" />

                            <span class="px-2">{{ $t('dashboard') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/">{{ $t('sales') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/analytics">{{ $t('analytics') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/finance">{{ $t('finance') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/crypto">{{ $t('crypto') }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-apps class="shrink-0" />

                            <span class="px-2">{{ $t('apps') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/apps/chat">{{ $t('chat') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/apps/mailbox">{{ $t('mailbox') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/apps/todolist">{{ $t('todo_list') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/apps/notes">{{ $t('notes') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/apps/scrumboard">{{ $t('scrumboard') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/apps/contacts">{{ $t('contacts') }}</router-link>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('invoice') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/apps/invoice/list">{{ $t('list') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/apps/invoice/preview">{{ $t('preview') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/apps/invoice/add">{{ $t('add') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/apps/invoice/edit">{{ $t('edit') }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <router-link to="/apps/calendar">{{ $t('calendar') }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-components class="shrink-0" />
                            <span class="px-2">{{ $t('components') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/components/tabs">{{ $t('tabs') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/accordions">{{ $t('accordions') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/modals">{{ $t('modals') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/cards">{{ $t('cards') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/carousel">{{ $t('carousel') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/countdown">{{ $t('countdown') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/counter">{{ $t('counter') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/sweetalert">{{ $t('sweet_alerts') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/timeline">{{ $t('timeline') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/notifications">{{ $t('notifications') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/media-object">{{ $t('media_object') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/list-group">{{ $t('list_group') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/pricing-table">{{ $t('pricing_tables') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/components/lightbox">{{ $t('lightbox') }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-elements class="shrink-0" />
                            <span class="px-2">{{ $t('elements') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/elements/alerts">{{ $t('alerts') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/avatar">{{ $t('avatar') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/badges">{{ $t('badges') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/breadcrumbs">{{ $t('breadcrumbs') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/buttons">{{ $t('buttons') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/buttons-group">{{ $t('button_groups') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/color-library">{{ $t('color_library') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/dropdown">{{ $t('dropdown') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/infobox">{{ $t('infobox') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/jumbotron">{{ $t('jumbotron') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/loader">{{ $t('loader') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/pagination">{{ $t('pagination') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/popovers">{{ $t('popovers') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/progress-bar">{{ $t('progress_bar') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/search">{{ $t('search') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/tooltips">{{ $t('tooltips') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/treeview">{{ $t('treeview') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/elements/typography">{{ $t('typography') }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-datatables class="shrink-0" />
                            <span class="px-2">{{ $t('tables') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/tables">{{ $t('tables') }}</router-link>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('datatables') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/datatables/basic">{{ $t('basic') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/advanced">{{ $t('advanced') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/skin">{{ $t('skin') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/order-sorting">{{ $t('order_sorting') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/columns-filter">{{ $t('columns_filter')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/multi-column">{{ $t('multi_column') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/multiple-tables">{{ $t('multiple_tables')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/alt-pagination">{{ $t('alt_pagination')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/checkbox">{{ $t('checkbox') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/range-search">{{ $t('range_search') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/export">{{ $t('export') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/sticky-header">{{ $t('sticky_header') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/clone-header">{{ $t('clone_header') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/datatables/column-chooser">{{ $t('column_chooser')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-forms class="shrink-0" />
                            <span class="px-2">{{ $t('forms') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/forms/basic">{{ $t('basic') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/input-group">{{ $t('input_group') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/layouts">{{ $t('layouts') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/validation">{{ $t('validation') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/input-mask">{{ $t('input_mask') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/select2">{{ $t('select2') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/touchspin">{{ $t('touchspin') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/checkbox-radio">{{ $t('checkbox_and_radio') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/switches">{{ $t('switches') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/wizards">{{ $t('wizards') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/file-upload">{{ $t('file_upload') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/quill-editor">{{ $t('quill_editor') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/markdown-editor">{{ $t('markdown_editor') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/date-picker">{{ $t('date_and_range_picker') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/forms/clipboard">{{ $t('clipboard') }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-pages class="shrink-0" />
                            <span class="px-2">{{ $t('pages') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li class="relative">
                            <a href="javascript:;">{{ $t('users') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/users/profile">{{ $t('profile') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/users/user-account-settings">{{ $t('account_settings')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <router-link to="/pages/knowledge-base">{{ $t('knowledge_base') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/contact-us-boxed" target="_blank">{{ $t('contact_us_boxed')
                                }}</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/contact-us-cover" target="_blank">{{ $t('contact_us_cover')
                                }}</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/faq">FAQ</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/coming-soon-boxed" target="_blank">{{ $t('coming_soon_boxed')
                                }}</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/coming-soon-cover" target="_blank">{{ $t('coming_soon_cover')
                                }}</router-link>
                        </li>
                        <li>
                            <router-link to="/pages/maintenence" target="_blank">{{ $t('maintenence') }}</router-link>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('error') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/pages/error404" target="_blank">{{ $t('404') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/pages/error500" target="_blank">{{ $t('500') }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/pages/error503" target="_blank">{{ $t('503') }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('login') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/auth/cover-login" target="_blank">{{ $t('login_cover')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/auth/boxed-signin" target="_blank">{{ $t('login_boxed')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('register') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/auth/cover-register" target="_blank">{{ $t('register_cover')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/auth/boxed-signup" target="_blank">{{ $t('register_boxed')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('password_recovery') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/auth/cover-password-reset" target="_blank">{{
                                        $t('recover_id_cover')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/auth/boxed-password-reset" target="_blank">{{
                                        $t('recover_id_boxed')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('lockscreen') }}
                                <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                <li>
                                    <router-link to="/auth/cover-lockscreen" target="_blank">{{ $t('unlock_cover')
                                        }}</router-link>
                                </li>
                                <li>
                                    <router-link to="/auth/boxed-lockscreen" target="_blank">{{ $t('unlock_boxed')
                                        }}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-more class="shrink-0" />

                            <span class="px-2">{{ $t('more') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/dragndrop">{{ $t('drag_and_drop') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/charts">{{ $t('charts') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/font-icons">{{ $t('font_icons') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/widgets">{{ $t('widgets') }}</router-link>
                        </li>
                        <li>
                            <a href="https://vristo.sbthemes.com" target="_blank">{{ $t('documentation') }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

import { IconBell, IconDeviceLaptop, IconLogout, IconMoon, IconSun, IconUser } from '@tabler/icons-vue';


import { useAppStore } from '@/stores/index';
import { useRoute } from 'vue-router';

import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
// import IconMail from '@/components/icon/icon-mail.vue';
import IconMenu from '@/components/icon/icon-menu.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconMenuApps from '@/components/icon/menu/icon-menu-apps.vue';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
import IconMenuMore from '@/components/icon/menu/icon-menu-more.vue';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
import { appRouter } from '@/router';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';

const store = useAppStore();
const route = useRoute();


const notifications = ref([
]);

const messages = ref([
    {
        id: 1,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
        title: 'Congratulations!',
        message: 'Your OS has been updated.',
        time: '1hr',
    },
    {
        id: 2,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
        title: 'Did you know?',
        message: 'You can switch between artboards.',
        time: '2hr',
    },
    {
        id: 3,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
        title: 'Something went wrong!',
        message: 'Send Reposrt',
        time: '2days',
    },
    {
        id: 4,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
        title: 'Warning',
        message: 'Your password strength is low.',
        time: '5days',
    },
]);

onMounted(() => {
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const setActiveDropdown = () => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
        for (let i = 0; i < all.length; i++) {
            all[0]?.classList.remove('active');
        }
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele?.classList.add('active');
                });
            }
        }
    }
};

// const removeNotification = (value: number) => {
//     notifications.value = notifications.value.filter((d) => d.id !== value);
// };

const auth = useAuthStore();

const logout = async () => {
    var res = await auth.logout()
    if (res) {
        await appRouter.push('/login')
        toast.success(auth.message);
    } else {
        toast.error(auth.error);
    }
}
</script>
