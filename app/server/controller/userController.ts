import { User } from '../model/user.ts';
import { UserService } from '../service/userService.ts'

let userService = new UserService()

export async function fetchAllUsers(context: any) {
    let response = await userService.fetchAllUsers(context);
    return context.response.json(response);
}
fetchAllUsers.attributes = { method: 'GET' };


export async function fetchUserById(context: any) {
    const id = context.request.params.id;
    const response = await userService.fetchUserById(id, context);
    return context.response.json(response);
}
fetchUserById.attributes = { method: 'GET' };


export async function createUser(context: any) {
    const user = new User()
    user.id = crypto.randomUUID()
    user.fname = context.request.data.fname
    user.lname = context.request.data.lname
    user.email = context.request.data.email
    
    const response = await userService.createUser(user, context);

    return context.response.json(response);
}
createUser.attributes = { method: 'POST' };


export async function updateUser(context: any) {
    const id = context.request.data.id;
    
    const user = new User()
    user.id = id
    user.fname = context.request.data.fname
    user.lname = context.request.data.lname
    user.email = context.request.data.email

    const response = await userService.updateUser(id, user, context);
    
    return context.response.json(response);
}
updateUser.attributes = { method: 'PUT' };


export async function deleteUser(context: any) {
    const id = context.request.params.id;
    const response = await userService.deleteUser(id, context);
    return context.response.json(response);
}
deleteUser.attributes = { method: 'DELETE' };
