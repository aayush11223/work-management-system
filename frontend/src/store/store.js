import api from "@/api/index.js";
import Vue from "vue";

export const store = Vue.observable({
    user: null,
    token: null,
    adminAttendance: [],
    attendance: [],
    leave: [],
    allLeaves: [],
    logs: [],
    adminLogs: [],
    employees: [],
    summary: {

    },
});

store.getUserAttendance = function (userId) {
    return api.get('/attendance', { params: { userId } })
        .then((res) => {
            store.attendance = res.data;
        });
};

store.getAllAttendance = function () {
    return api.get('/attendance/all')
        .then((res) => {
            store.adminAttendance = res.data;
        });
};

store.createAttendance = function (payload) {
    return api.post('/attendance', payload)
        .then((res) => {
            store.attendance.push(res.data);
            return res.data;
        });
};

store.updateAttendance = function (id, payload) {
    return api.patch(`/attendance/${id}`, payload)
        .then((res) => {
            const updated = res.data;
            store.adminAttendance = store.adminAttendance.map(item =>
                item.id === updated.id ? updated : item
            );
            store.attendance = store.attendance.map(item =>
                item.id === updated.id ? updated : item
            );
            return updated;
        });
};

store.fetchLeaves = function (userId) {
    return api.get('/leaves', { params: { userId } })
        .then((res) => {
            store.leave = res.data;
        });
};

store.applyLeave = function (payload) {
    return api.post('/leaves', { ...payload, userId: store.user.id })
        .then((res) => {
            store.leave.push(res.data);
            return res.data;
        });
};

store.fetchAllLeaves = function () {
    return api.get('/leaves/all')
        .then((res) => {
            store.allLeaves = res.data;
        });
};

store.updateLeaveStatus = function (id, status) {
    return api.patch(`/leaves/${id}`, { status })
        .then((res) => {
            const updated = res.data;
            store.allLeaves = store.allLeaves.map(item =>
                item.id === updated.id ? updated : item
            );
            return updated;
        });
};

store.fetchWorklogs = function (userId) {
    return api.get('/worklogs', { params: { userId } })
        .then((res) => {
            store.logs = res.data;
        });
};

store.fetchAllLogs = function () {
    return api.get('/worklogs/all')
        .then((res) => {
            store.adminLogs = res.data;
        });
};

store.logWork = function (payload) {
    return api.post('/worklogs', { ...payload, userId: store.user.id })
        .then((res) => {
            store.logs.push(res.data);
            return res.data;
        });
};

store.fetchEmployees = function () {
    return api.get('/employees')
        .then((res) => {
            store.employees = res.data;
        });
};

store.login = function (email, password) {
    return api.post('/auth/login', { email, password })
        .then((res) => {
            store.user = res.data.user;
            store.token = res.data.token;
            localStorage.setItem('token', res.data.token);
            return res.data;
        });
};

store.logout = function () {
    store.user = null;
    store.token = null;
    localStorage.removeItem('token');
};

store.initAuth = function () {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve();

    store.token = token;
    return api.get('/auth/me', { headers: { Authorization: token } })
        .then((res) => {
            store.user = res.data;
        })
        .catch(() => {
            store.logout();
        });
};

store.fetchPaycheck = function (userId, month, year) {
    return api.get('/paycheck', { params: { userId, month, year } })
        .then((res) => {
            store.summary = res.data;
        });
};

store.updateSalary = function (employeeId, salary) {
    return api.patch(`/employees/${employeeId}`, { salary })
        .then((res) => {
            store.employees = store.employees.map((item) =>
                item.id === employeeId ? res.data : item
            );
            return res.data;
        });
};

