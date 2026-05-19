import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { fetchUser } from '../composables/useAuth'
import { useAuthStore } from '~/stores/auth'

// Define your routes
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/home/HomeView.vue"),
    },
    {
        path: '/howtouse',
        name: 'howtouse',
        component: () => import("../views/howtouse/HowToUseView.vue"),
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import("../views/registration/RegistrationView.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login/LoginHomeView.vue"),
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import("~/views/demo/DemoView.vue"),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../views/dashboard/DashboardView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/company',
        name: 'company',
        component: () => import("../views/company/CompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/companyadd/new',
        name: 'companyadd',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/companyedit/:companyIdParam',
        name: 'companyedit',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/companydepartment/:companyId',
        name: 'companydepartment',
        component: () => import("../views/department/DepartmentView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/departmentedit/:paramCompanyId/:paramDepartmentId',
        name: 'departmentedit',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/departmentadd/:paramCompanyId',
        name: 'departmentadd',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/departmentusers/:companyIdParam/:departmentIdParam',
        name: 'departmentusers',
        component: () => import("../views/user/UserView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/user/UserView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/useradd/:companyIdParam/:departmentIdParam',
        name: 'useradd',
        component: () => import("../views/user/account/UserAccountEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/useredit/:userId/:companyIdParam/:departmentIdParam',
        name: 'useredit',
        component: () => import("../views/user/account/UserAccountEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/userpassword',
        name: 'userpassword',
        component: () => import("../views/user/UserPasswordEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/roles/:companyIdParam',
        name: 'roles',
        component: () => import("../views/role/RoleView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/roleedit/:roleIdParam/:companyIdParam',
        name: 'roleedit',
        component: () => import("../views/role/RoleEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/roleadd/:companyIdParam',
        name: 'roleadd',
        component: () => import("../views/role/RoleEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/membership/:companyIdParam',
        name: 'membership',
        component: () => import("../views/membership/MembershipView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/membershipedit/:companyIdParam/:membershipIdParam',
        name: 'membershipedit',
        component: () => import("../views/membership/MembershipEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/membershipadd/:companyIdParam',
        name: 'membershipadd',
        component: () => import("../views/membership/MembershipEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/membershipadd/:companyIdParam',
        name: 'membershipadd',
        component: () => import("../views/membership/MembershipEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/setting',
        name: 'notificationsetting',
        component: () => import("~/views/notification/NotificationSettingView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/category',
        name: 'notificationcategory',
        component: () => import("~/views/notification/settings/category/NotificationCategoryCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/category/list/:companyIdParam',
        name: 'notificationcategorylist',
        component: () => import("~/views/notification/settings/category/NotificationCategoryListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/templates',
        name: 'notificationtemplates',
        component: () => import("~/views/notification/templates/NotificationTemplateCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/templates/list/:companyId',
        name: 'notificationTemplateList',
        component: () => import("~/views/notification/templates/NotificationTemplateListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/templates/designer/:companyId/:templateId',
        name: 'notificationTemplateDesigner',
        component: () => import("~/views/notification/templates/NotificationTemplateDesignerView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/campaign',
        name: 'notificationCampaign',
        component: () => import("~/views/notification/campaign/CampaignCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/campaign/list/:companyIdParam',
        name: 'notificationCampaignList',
        component: () => import("~/views/notification/campaign/CampaignListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/history',
        name: 'notificationhistory',
        component: () => import("~/views/notification/history/NotificationHistoryCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/history/list/:companyIdParam',
        name: 'notificationhistorylist',
        component: () => import("~/views/notification/history/NotificationHistoryListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/email',
        name: 'notificationemail',
        component: () => import("~/views/notification/settings/email/EmailSettingCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/list/email/:companyIdParam',
        name: 'notificationlistemail',
        component: () => import("~/views/notification/settings/email/EmailSettingListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/edit/email/:companyIdParam/:providerIdParam',
        name: 'notificationdetaileditemail',
        component: () => import("~/views/notification/settings/email/EmailSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/test/email/:companyIdParam/:providerIdParam',
        name: 'notificationtestemail',
        component: () => import("~/views/notification/settings/email/EmailSettingTestView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/add/email/:companyIdParam',
        name: 'notificationdetailaddemail',
        component: () => import("~/views/notification/settings/email/EmailSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/sms',
        name: 'notificationsms',
        component: () => import("~/views/notification/settings/sms/SmsSettingCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/list/sms/:companyIdParam',
        name: 'notificationlistsms',
        component: () => import("~/views/notification/settings/sms/SmsSettingListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/edit/sms/:companyIdParam/:providerIdParam',
        name: 'notificationdetaileditsms',
        component: () => import("~/views/notification/settings/sms/SmsSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/add/sms/:companyIdParam',
        name: 'notificationdetailaddsms',
        component: () => import("~/views/notification/settings/sms/SmsSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/test/sms/:companyIdParam/:providerIdParam',
        name: 'notificationtestsms',
        component: () => import("~/views/notification/settings/sms/SmsSettingTestView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/whatapps',
        name: 'notificationwhatapps',
        component: () => import("~/views/notification/settings/whatapps/WhatappsSettingCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/list/whatapps/:companyIdParam',
        name: 'notificationlistwhatapps',
        component: () => import("~/views/notification/settings/whatapps/WhatappsSettingListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/edit/whatapps/:companyIdParam/:providerIdParam',
        name: 'notificationdetaileditwhatapps',
        component: () => import("~/views/notification/settings/whatapps/WhatappsSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/test/whatapps/:companyIdParam/:providerIdParam',
        name: 'notificationtestwhatapps',
        component: () => import("~/views/notification/settings/whatapps/WhatappsSettingTestView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notification/detail/add/whatapps/:companyIdParam',
        name: 'notificationdetailaddwhatapps',
        component: () => import("~/views/notification/settings/whatapps/WhatappsSettingDetailView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/billingcycleadd/:companyIdParam',
        name: 'billingcycleadd',
        component: () => import("../views/membership/billing/BillingCycleEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/billingcycleedit/:companyIdParam/:billingCycleId',
        name: 'billingcycleedit',
        component: () => import("../views/membership/billing/BillingCycleEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/email',
        name: 'email',
        component: () => import("../views/email/EmailView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: () => import("../views/oauth/OauthView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/logsetting',
        name: 'logsetting',
        component: () => import("~/views/log/setting/LogSettingView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/logsettinglist/:companyIdParam',
        name: 'logsettinglist',
        component: () => import("~/views/log/setting/LogSettingListView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/logsettingedit/:companyIdParam/:logSettingIdParam',
        name: 'logsettingedit',
        component: () => import("~/views/log/setting/LogSettingEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/submenulogs',
        name: 'submenulogs',
        component: () => import("~/views/log/LogMenuView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/gatewaylogs',
        name: 'gatewaylogs',
        component: () => import("~/views/log/gateway/LogsGatewayListView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/apilogs',
        name: 'apilogs',
        component: () => import("~/views/log/api/LogsApiListView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/notificationlogs',
        name: 'notificationlogs',
        component: () => import("~/views/log/notification/provider/LogsNotificationProviderListView.vue"),
        meta: { requiresAuth: true, requiresPremium: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER" }
    },
    {
        path: '/permissionsetting',
        name: 'permissionsetting',
        component: () => import("~/views/permission/PermissionView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/permissionadd',
        name: 'permissionadd',
        component: () => import("~/views/permission/PermissionEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/permissionedit/:permissionIdParam',
        name: 'permissionedit',
        component: () => import("~/views/permission/PermissionEditView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/profileinformation',
        name: 'profileinformation',
        component: () => import("../views/profile/ProfileInformationView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/profilepassword',
        name: 'profilepassword',
        component: () => import("../views/profile/ProfilePasswordView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/profile2fa',
        name: 'profile2fa',
        component: () => import("../views/profile/Profile2FAView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import("../views/activity/ActivityView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/submenu/registries',
        name: 'registries',
        component: () => import("~/views/registry/RegistryMenuView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/country/state',
        name: 'registrycountrystate',
        component: () => import("~/views/registry/country-state/CountryStateView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/country',
        name: 'registrycountry',
        component: () => import("~/views/registry/country/CountryView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/currency',
        name: 'registrycurrency',
        component: () => import("~/views/registry/currency/CurrencyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/language',
        name: 'registrylanguage',
        component: () => import("~/views/registry/language/LanguageView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/uom',
        name: 'registryuom',
        component: () => import("~/views/registry/uom/UomView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/uomcategory',
        name: 'registryuomcategory',
        component: () => import("~/views/registry/uomcategory/UomCategoryView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/configparameter',
        name: 'registryconfigparameter',
        component: () => import("~/views/registry/config-parameter/ConfigParameterView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/repo/sequence',
        name: 'registryRepoSequence',
        component: () => import("~/views/registry/repo-sequence/RepoSequenceCompanyView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/registry/repo/sequence/list/:valueCompanyId',
        name: 'registryRepoSequenceList',
        component: () => import("~/views/registry/repo-sequence/RepoSequenceListView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/object/storage/provider',
        name: 'objectstorageprovider',
        component: () => import("~/views/registry/storage-provider/StorageProviderView.vue"),
        meta: { requiresAuth: true, requiresPremium: false, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import("../views/error/UnauthorizedView.vue")
    }
]

// Create router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
})

// Global guard
router.beforeEach(async (to, _from, next) => {
    const auth = useAuthStore()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    // Jika halaman butuh Premium tapi plan saat ini adalah FREE
    if (to.meta.requiresPremium && !isPremiumPlan) {
        console.warn("Akses ditolak: Upgrade ke Premium untuk melihat halaman ini.");

        next('/unauthorized');
    }

    if (to.meta.requiresAuth) {
        if (!auth.user) {
            await fetchUser()
        }

        const allowedRoles = to.meta.roleAccess
            ? (to.meta.roleAccess as string).split(',').map(r => r.trim().toUpperCase())
            : []

        const userRole = auth.user?.authority?.roleName?.toUpperCase()

        if (userRole && allowedRoles.includes(userRole)) {
            return next()
        } else {
            return next('/unauthorized')
        }
    }

    next()
})

export default router