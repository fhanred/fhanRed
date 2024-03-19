// const assignTaskToUser = require("./assignTaskToUser");
// const getAssignedTasksForUser = require("./getAssignedTasksForUser");
const getAllTasks = require("./getAllTasks");
const createTask = require('./createTask');
const assignTask = require('./assignTask');
const getTasksForUser = require("./getTasksForUser");
const getAllAssignments= require ("./allAsigments");
const deletedAssignment=require("./deletedAssignment");

module.exports = {
    assignTask,
    getTasksForUser,
    getAllTasks,
    createTask,
    getAllAssignments,
    deletedAssignment,
};