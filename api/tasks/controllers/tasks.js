'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const _ = require('lodash');
 const { sanitizeEntity } = require('strapi-utils');
 
module.exports = {
    async myTasks(ctx) {
        const { id } = ctx.state.user;
        
        const knex = strapi.connections.default;
        const tasks = await knex('tasks').where('userid', id).select('title', 'id');

        return tasks;
    },

    async deleteTask(ctx) {
        const { id } = ctx.state.user;
        const { taskid } = ctx.request.query;
        
        const knex = strapi.connections.default;
        const task = await knex('tasks').where('userid', id).where('id', taskid).delete();


        if (task > 0 && task !== undefined) {
            return ctx.send({
                messsage: 'Tarefa apagada com sucesso!'
            }, 200);
        } else {
            return ctx.send({
                message: 'Tarefa não encontrada'
            }, 400);
        }
    },

    async updateTask(ctx) {
        const { id } = ctx.state.user;
        const { taskid } = ctx.request.query;
        const { newtask } = ctx.request.body;

        const knex = strapi.connections.default;
        const task = await knex('tasks').where('userid', id).where('id', taskid).update('title', newtask);
       
        if (task > 0 && task !== undefined) {
            return ctx.send({
                messsage: 'Tarefa alterada com sucesso!'
            }, 200);
        } else {
            return ctx.send({
                message: 'Tarefa não encontrada'
            }, 400);
        }
    }
};
