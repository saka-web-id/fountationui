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
        component: () => import("../views/registration/RegistrationView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login/LoginHomeView.vue"),
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
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/companyadd/new',
        name: 'companyadd',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/companyedit/:companyIdParam',
        name: 'companyedit',
        component: () => import("../views/company/CompanyEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/companydepartment/:companyId',
        name: 'companydepartment',
        component: () => import("../views/department/DepartmentView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/departmentedit/:paramCompanyId/:paramDepartmentId',
        name: 'departmentedit',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/departmentadd/:paramCompanyId',
        name: 'departmentadd',
        component: () => import("../views/department/DepartmentEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/departmentusers/:companyIdParam/:departmentIdParam',
        name: 'departmentusers',
        component: () => import("../views/user/UserView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/user/UserView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/useradd/:companyIdParam/:departmentIdParam',
        name: 'useradd',
        component: () => import("../views/user/account/UserAccountEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/useredit/:userId/:companyIdParam/:departmentIdParam',
        name: 'useredit',
        component: () => import("../views/user/account/UserAccountEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/userpassword',
        name: 'userpassword',
        component: () => import("../views/user/UserPasswordEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/roles/:companyIdParam',
        name: 'roles',
        component: () => import("../views/role/RoleView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/roleedit/:roleIdParam/:companyIdParam',
        name: 'roleedit',
        component: () => import("../views/role/RoleEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/roleadd/:companyIdParam',
        name: 'roleadd',
        component: () => import("../views/role/RoleEditView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN" }
    },
    {
        path: '/email',
        name: 'email',
        component: () => import("../views/email/EmailView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: () => import("../views/oauth/OauthView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/profileinformation',
        name: 'profileinformation',
        component: () => import("../views/profile/ProfileInformationView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/profilepassword',
        name: 'profilepassword',
        component: () => import("../views/profile/ProfilePasswordView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/profile2fa',
        name: 'profile2fa',
        component: () => import("../views/profile/Profile2FAView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import("../views/activity/ActivityView.vue"),
        meta: { requiresAuth: true, roleAccess: "SUPER_ADMIN, ADMIN, MANAGER, USER, GUEST" }
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