// const assignTaskToUser = require("./assignTaskToUser");
// const getAssignedTasksForUser = require("./getAssignedTasksForUser");
const getAllTasks = require("./getAllTasks");
const createTask = require('./createTask');
const assignTask = require('./assignTask');
const getTasksForUser = require("./getTasksForUser");

module.exports = {
    assignTask,
    getTasksForUser,
    getAllTasks,
    createTask

};