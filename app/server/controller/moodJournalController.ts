import { MoodJournal } from '../model/moodJournal.ts';
import { MoodJournalService } from '../service/moodJournalService.ts'

let moodJournalService = new MoodJournalService()

export async function fetchAllMoodJournals(context: any) {
    let response = await moodJournalService.fetchAllMoodJournals(context);
    return context.response.json(response);
}
fetchAllMoodJournals.attributes = { method: 'GET' };


export async function fetchMoodJournalById(context: any) {
    const id = context.request.params.id;
    const response = await moodJournalService.fetchMoodJournalById(id, context);
    return context.response.json(response);
}
fetchMoodJournalById.attributes = { method: 'GET' };


export async function createMoodJournal(context: any) {
    const moodJournal = new MoodJournal()
    moodJournal.id = context.utils.createId()
    moodJournal.userId = context.request.data.userId
    moodJournal.notes = context.request.data.notes
    moodJournal.dateTimeCreated = (new Date()).toISOString()
    moodJournal.moods = context.request.data.moods
    
    const response = await moodJournalService.createMoodJournal(moodJournal, context);

    return context.response.json(response);
}
createMoodJournal.attributes = { method: 'POST' };


export async function updateMoodJournal(context: any) {
    const id = context.request.data.id;
    
    const moodJournal = new MoodJournal()
    moodJournal.id = id
    moodJournal.userId = context.request.data.userId
    moodJournal.notes = context.request.data.notes
    moodJournal.moods = context.request.data.moods

    const response = await moodJournalService.updateMoodJournal(id, moodJournal, context);
    
    return context.response.json(response);
}
updateMoodJournal.attributes = { method: 'PUT' };


export async function deleteMoodJournal(context: any) {
    const id = context.request.params.id;
    const response = await moodJournalService.deleteMoodJournal(id, context);
    return context.response.json(response);
}
deleteMoodJournal.attributes = { method: 'DELETE' };
