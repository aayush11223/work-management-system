import Vue from "vue";
import VueRouter from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import EmployeeLayout from "@/layouts/EmployeeLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login",
    },

    // Auth Layout
    {
        path: "/",
        component: AuthLayout,
        meta: { requiresGuest: true },
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("../views/auth/LogIn.vue"),
            },
        ],
    },

    // Employee Layout
    {
        path: "/",
        component: EmployeeLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/views/DashboardView.vue"),
            },
            {
                path: "attendance",
                name: "attendance",
                component: () => import("@/views/employee/AttendanceView.vue"),
            },
            {
                path: "leave",
                name: "leave",
                component: () => import("@/views/employee/LeaveView.vue"),
            },
            {
                path: "worklog",
                name: "worklog",
                component: () => import("@/views/employee/WorkLogView.vue"),
            },
            {
                path: "summary",
                name: "summary",
                component: () => import("@/views/employee/MonthlySummaryView.vue"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("@/views/ProfileView.vue"),
            },
        ],
    },

    // Admin Layout
    {
        path: "/admin",
        component: AdminLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "dashboard",
                name: "admin-dashboard",
                component: () => import("@/views/DashboardView.vue"),
            },
            {
                path: "employees",
                component: () => import("@/views/admin/EmployeeListView.vue"),
            },
            {
                path: "attendance",
                component: () =>
                    import("@/views/admin/AttendanceManagementView.vue"),
            },
            {
                path: "leavemanagement",
                component: () => import("@/views/admin/LeaveManagementView.vue"),
            },
            {
                path: "worklogs",
                component: () => import("@/views/admin/WorkLogManagementView.vue"),
            },
            {
                path: "employees/:id",
                name: "employee-detail",
                component: () => import("@/views/admin/EmployeeDetailView.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) {
            next("/login");
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (token) {
            next("/dashboard");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;