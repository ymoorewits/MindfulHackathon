import { User } from '../model/user.ts'
import { Convertor } from '../util/convertor.ts'

export class UserRepository {

    convertor: Convertor = new Convertor()

    async fetchAllUsers(context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (u:User) RETURN (u)`);
            return this.convertor.convertUser(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null;
        }
    }    
    
    async fetchUserById(id: string, context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (u:User {id:$id}) RETURN (u)`, { id: id });
            return this.convertor.convertUser(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }
    
    async createUser(user: User, context: any) {
        try {
            let response = await context.tenant.db.run(`CREATE (u:User $user) RETURN (u)`, { user: user });
            return this.convertor.convertUser(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async updateUser(id: string, user: User, context: any) {
        try {
            await context.tenant.db.run(`MATCH (u:User {id:$id}) SET u += $user RETURN u.id`, { id: id, user: user });
            return {}
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async deleteUser(id: string, context: any) {
        try {
            await context.tenant.db.run(`MATCH (u:User {id:$id}) DELETE (u) RETURN (u)`, { id: id });
            return {}
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }
}
