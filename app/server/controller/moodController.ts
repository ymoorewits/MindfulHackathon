import { Mood } from '../model/mood.ts';
import { MoodService } from '../service/moodService.ts'

let moodService = new MoodService()

export async function fetchAllMoods(context: any) {
    let response = await moodService.fetchAllMoods(context);
    return context.response.json(response);
}
fetchAllMoods.attributes = { method: 'GET' };


export async function fetchMoodById(context: any) {
    const id = context.request.params.id;
    const response = await moodService.fetchMoodById(id, context);
    return context.response.json(response);
}
fetchMoodById.attributes = { method: 'GET' };


export async function createMood(context: any) {
    const mood = new Mood()
    mood.id = context.utils.createId()
    mood.name = context.request.data.name
    mood.description = context.request.data.description
    
    const response = await moodService.createMood(mood, context);

    return context.response.json(response);
}
createMood.attributes = { method: 'POST' };


export async function updateMood(context: any) {
    const id = context.request.data.id;
    
    const mood = new Mood()
    mood.id = id
    mood.name = context.request.data.name
    mood.description = context.request.data.description

    const response = await moodService.updateMood(id, mood, context);
    
    return context.response.json(response);
}
updateMood.attributes = { method: 'PUT' };


export async function deleteMood(context: any) {
    const id = context.request.params.id;
    const response = await moodService.deleteMood(id, context);
    return context.response.json(response);
}
deleteMood.attributes = { method: 'DELETE' };
