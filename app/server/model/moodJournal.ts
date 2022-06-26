export class MoodJournal {
    id: string;
    userId: string;
    dateTimeCreated: string;
    notes: string;
    moods: Moods[]
}

class Moods {
    moodId: string;
    score: number;        
}