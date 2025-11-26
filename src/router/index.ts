import {createRouter, createWebHistory} from 'vue-router'

const routes = [
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
        }
    },
    {
        path: '/company',
        name: 'company',
        component: () => import("../views/company/CompanyView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/companyedit',
        name: 'companyedit',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/department',
        name: 'department',
        component: () => import("../views/department/DepartmentView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/departmentedit',
        name: 'departmentedit',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/user/UserView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/useredit',
        name: 'useredit',
        component: () => import("../views/user/UserEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/userpassword',
        name: 'userpassword',
        component: () => import("../views/user/UserPasswordEditView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/email',
        name: 'email',
        component: () => import("../views/email/EmailView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: () => import("../views/oauth/OauthView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/profileinformation',
        name: 'profileinformation',
        component: () => import("../views/profile/ProfileInformationView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/profilepassword',
        name: 'profilepassword',
        component: () => import("../views/profile/ProfilePasswordView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/profile2fa',
        name: 'profile2fa',
        component: () => import("../views/profile/Profile2FAView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import("../views/activity/ActivityView.vue"),
        meta: {
            requiresAuth: true, // Add meta field to indicate protected route
            roleAccess: "administrator,finance,warehouse,offline,vendor"
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active', /*https://stackoverflow.com/questions/71254099/vue-js-change-navbar-button-class-when-on-that-page*/
});

export default router