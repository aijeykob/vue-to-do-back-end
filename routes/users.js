module.exports = (route) => {
    route.doRegisterRoute('post','user/registration', '','','registrationUser');
    route.doRegisterRoute('get','user/:id', '','','getUser');
    route.doRegisterRoute('put','user/:id', '','','updateUser');
}
