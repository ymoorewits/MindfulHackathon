import { Response } from '../model/response.ts'
import { User } from '../model/user.ts'
import { UserRepository } from '../repository/userRepository.ts'
import { Validator } from '../util/validator.ts'

export class UserService {

    userRepository: UserRepository = new UserRepository()
    validator: Validator = new Validator()

    async fetchAllUsers(context: any) {
        let result = await this.userRepository.fetchAllUsers(context);
        
        let response = new Response()
        if (result) {
            response.statusCode = 200
            response.data = result
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }    
    
    async fetchUserById(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }

        const result = await this.userRepository.fetchUserById(id, context);
    
        if (result) {
            response.statusCode = 200
            response.data = result
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async createUser(user: User, context: any) {
        let valid = this.validator.validateCreateUser(user)
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.userRepository.createUser(user, context);
    
        if (result) {
            response.statusCode = 201
            response.data = result
            response.message = "Successfully created user"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async updateUser(id: any, user: User, context: any) {
        let valid = this.validator.validateUpdateUser(user);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.userRepository.updateUser(id, user, context);
        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully updated user"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }    
    
    async deleteUser(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.userRepository.deleteUser(id, context);
        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully deleted user"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
}
