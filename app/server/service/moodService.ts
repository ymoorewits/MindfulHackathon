import { Response } from '../model/response.ts'
import { Mood } from '../model/mood.ts';
import { MoodRepository } from '../repository/moodRepository.ts'
import { Validator } from '../util/validator.ts';

export class MoodService {

    moodRepository: MoodRepository = new MoodRepository()
    validator: Validator = new Validator()

    async fetchAllMoods(context: any) {
        let result = await this.moodRepository.fetchAllMoods(context);
        
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
    
    async fetchMoodById(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodRepository.fetchMoodById(id, context);
        if (result) {
            response.statusCode = 200
            response.data = result
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async createMood(mood: Mood, context: any) {
        let valid = this.validator.validateCreateMood(mood);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodRepository.createMood(mood, context);
    
        if (result) {
            response.statusCode = 201
            response.data = result
            response.message = "Successfully created mood"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async updateMood(id: any, mood: Mood, context: any) {
        let valid = this.validator.validateUpdateMood(mood);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodRepository.updateMood(id, mood, context);
        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully updated mood"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }    
    
    async deleteMood(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodRepository.deleteMood(id, context);
        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully deleted mood"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
}
