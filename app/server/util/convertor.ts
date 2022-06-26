import { User } from "../model/user.ts"
import { Mood } from "../model/mood.ts"
import { MoodJournal } from "../model/moodJournal.ts"

export class Convertor {

    convertUser(result: any) {
        return result.records.map(u => {
            const properties = u._fields[0].properties
            
            const user = new User()
            user.id = properties.id
            user.fname = properties.fname
            user.lname = properties.lname
            user.email = properties.email

            return user
        })
    }

    convertMood(result: any) {
        return result.records.map(m => {
            const properties = m._fields[0].properties
            
            const mood = new Mood()
            mood.id = properties.id
            mood.name = properties.name
            mood.description = properties.description

            return mood
        })
    }

    convertMoodJournal(result: any) {
        return result.records.map(mj => {
            const properties = mj._fields[0].properties
            
            const moodJournal = new MoodJournal()
            moodJournal.id = properties.id
            moodJournal.userId = properties.userId
            moodJournal.dateTimeCreated = properties.dateTimeCreated
            moodJournal.notes = properties.notes
            moodJournal.moods = properties.moods

            return moodJournal
        })
    }
}
