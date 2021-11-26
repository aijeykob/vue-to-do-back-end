module.exports = (route) => {
    route.doRegisterRoute('post','todo/add', '','','createToDo');
    route.doRegisterRoute('get','todo/:id', '','','getToDo');
    route.doRegisterRoute('put','todo/:id', '','','updateToDo')
}
