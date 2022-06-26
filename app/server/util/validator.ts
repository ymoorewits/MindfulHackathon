import { ValidatorResponse } from "../model/validatorResponse.ts"

export class Validator {
    private EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

    public validateEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }

    public validateCreateUser(payload: any): ValidatorResponse {
        let response = new ValidatorResponse()
        if (!payload.lname || !payload.fname || !payload.email) {
            response.message = 'Missing Data'
            response.isValid = false
            return response
        }

        if (!this.validateEmail(payload.email)) {
            response.message = 'Incorrect Email'
            response.isValid = false
            return response
        }

        response.isValid = true
        return response;
    }

    public validateUpdateUser(payload: any): ValidatorResponse {
        let response = new ValidatorResponse()

        response = this.validateId(payload.id)
        if(!response.isValid) return response;

        if (payload.email) {
            if (!this.validateEmail(payload.email)) {
                response.message = 'Incorrect Email'
                response.isValid = false
                return response
            }
        }

        response.isValid = true
        return response;
    }

    public validateId(id: any): ValidatorResponse {
        let response = new ValidatorResponse();

        if (!id) {
            response.isValid = false
            response.message = 'Missing Id'
            return response
        }

        response.isValid = true
        return response;
    }

    public validateCreateMood(payload: any): ValidatorResponse {
        let response = new ValidatorResponse()
        if (!payload.name || !payload.description) {
            response.message = 'Missing Data'
            response.isValid = false
            return response
        }

        response.isValid = true
        return response;
    }

    public validateUpdateMood(payload: any): ValidatorResponse {
        let response = new ValidatorResponse()

        response = this.validateId(payload.id)
        if(!response.isValid) return response;

        response.isValid = true
        return response;
    }

    public validateCreateMoodJournal(payload: any): ValidatorResponse {
        let response = new ValidatorResponse()

        if (!payload.userId || !payload.moods || !payload.notes
            || payload.moods.length <= 0) {
            response.message = 'Missing Data'
            response.isValid = false
            return response
        }

        if (!this.validateMoodsInJournal(payload.moods)) {
            response.message = 'Missing Data in moods'
            response.isValid = false
            return response
        }

        response.isValid = true;
        return response;
    }

    private validateMoodsInJournal(moods: any): boolean {
        if (moods.length > 0) {
            moods.forEach((mood) => {
                if (!mood.moodId || !mood.score || (mood.score && mood.score < 1 || mood.score > 5)) {
                    return false
                }
            })
        } else {
            return false
        }

        return true
    }
}
