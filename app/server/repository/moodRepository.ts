import { Mood } from '../model/mood.ts'
import { Convertor } from '../util/convertor.ts'

export class MoodRepository {

    convertor: Convertor = new Convertor()

    async fetchAllMoods(context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (m:Mood {status:1}) RETURN (m)`);
            return this.convertor.convertMood(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null;
        }
    } 
    
    async fetchMoodById(id: string, context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (m:Mood {id:$id, status:1}) RETURN (m)`, { id: id });
            return this.convertor.convertMood(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }
    
    async createMood(mood: Mood, context: any) {
        try {
            let response = await context.tenant.db.run(`CREATE (m:Mood $mood) RETURN (m)`, { mood: {...mood, status: 1} });
            return this.convertor.convertMood(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async updateMood(id: string, mood: Mood, context: any) {
        try {
            await context.tenant.db.run(`MATCH (m:Mood {id:$id}) SET m += $mood RETURN m.id`, { id: id, mood: mood });
            return {};
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async deleteMood(id: string, context: any) {
        try {
            await context.tenant.db.run(`MATCH (m:Mood {id:$id}) SET m.status = 0 RETURN m.id`, { id: id });
            return {};
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }
}
