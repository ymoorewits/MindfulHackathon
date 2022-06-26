import { Response } from '../model/response.ts'
import { MoodJournal } from '../model/moodJournal.ts';
import { UserRepository } from '../repository/userRepository.ts'
import { MoodRepository } from '../repository/moodRepository.ts'
import { MoodJournalRepository } from '../repository/moodJournalRepository.ts'
import { Validator } from '../util/validator.ts';

export class MoodJournalService {

    moodJournalRepository: MoodJournalRepository = new MoodJournalRepository()
    userRepository: UserRepository = new UserRepository()
    moodRepository: MoodRepository = new MoodRepository()
    validator: Validator = new Validator()

    async fetchAllMoodJournals(context: any) {
        let result = await this.moodJournalRepository.fetchAllMoodJournals(context);
        
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
    
    async fetchMoodJournalById(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodJournalRepository.fetchMoodJournalById(id, context);
    
        if (result) {
            response.statusCode = 200
            response.data = result
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async createMoodJournal(moodJournal: MoodJournal, context: any) {
        let valid = this.validator.validateCreateMoodJournal(moodJournal);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
    
        const result = await this.moodJournalRepository.createMoodJournal(moodJournal, context);
        
        if (result) {
            response.statusCode = 201
            response.data = result
            response.message = "Successfully created mood journal"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
    
    async updateMoodJournal(id: any, moodJournal: MoodJournal, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodJournalRepository.updateMoodJournal(id, moodJournal, context);

        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully updated mood journal"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }    
    
    async deleteMoodJournal(id: any, context: any) {
        let valid = this.validator.validateId(id);
        let response = new Response()
        if(!valid.isValid){
            response.statusCode = 400
            response.message = valid.message
            return response
        }
        const result = await this.moodJournalRepository.deleteMoodJournal(id, context);

        if (result) {
            response.statusCode = 204
            response.data = result
            response.message = "Successfully deleted mood journal"
        } else {
            response.statusCode = 500
            response.message = "Something went wrong!!"
        }
    
        return response
    }
}
