import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { fetchUser, hasRole } from '../composables/useAuth'
import { auth } from '../stores/auth';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/home/HomeView.vue"),
        meta: {
            requiresAuth: false, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/howtouse',
        name: 'howtouse',
        component: () => import("../views/howtouse/HowToUseView.vue"),
        meta: {
            requiresAuth: false, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import("../views/registration/RegistrationView.vue"),
        meta: {
            requiresAuth: false, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login/LoginHomeView.vue"),
        meta: {
            requiresAuth: false, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../views/dashboard/DashboardView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/company',
        name: 'company',
        component: () => import("../views/company/CompanyView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/companyedit',
        name: 'companyedit',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/department',
        name: 'department',
        component: () => import("../views/department/DepartmentView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/departmentedit',
        name: 'departmentedit',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/user/UserView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/useredit',
        name: 'useredit',
        component: () => import("../views/user/UserEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/userpassword',
        name: 'userpassword',
        component: () => import("../views/user/UserPasswordEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/email',
        name: 'email',
        component: () => import("../views/email/EmailView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: () => import("../views/oauth/OauthView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/profileinformation',
        name: 'profileinformation',
        component: () => import("../views/profile/ProfileInformationView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/profilepassword',
        name: 'profilepassword',
        component: () => import("../views/profile/ProfilePasswordView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/profile2fa',
        name: 'profile2fa',
        component: () => import("../views/profile/Profile2FAView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import("../views/activity/ActivityView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        },
        beforeEnter: async (_to, _from, next) => {
            if (!auth.user) await fetchUser()
            if (hasRole('ADMIN')) next()
            else next('/unauthorized')
        }
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import("../views/error/UnauthorizedView.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active', /*https://stackoverflow.com/questions/71254099/vue-js-change-navbar-button-class-when-on-that-page*/
});

export default router