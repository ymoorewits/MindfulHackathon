import { MoodJournal } from '../model/moodJournal.ts'
import { Convertor } from '../util/convertor.ts'

export class MoodJournalRepository {

    convertor: Convertor = new Convertor()

    async fetchAllMoodJournals(context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (mj:MoodJournal) RETURN (mj)`);
            return this.convertor.convertMoodJournal(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null;
        }
    }
    
    async fetchMoodJournalById(id: string, context: any) {
        try {
            let response = await context.tenant.db.run(`MATCH (mj:MoodJournal {id:$id}) RETURN (mj)`, { id: id });
            return this.convertor.convertMoodJournal(response);
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }
    
    async createMoodJournal(moodJournal: MoodJournal, context: any) {
        try {
            let response = await context.tenant.db.run(this.getCreateQuery(moodJournal));

            moodJournal.id = response.records[0]._fields[0].properties.id
            
            return moodJournal;
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async updateMoodJournal(id: string, moodJournal: MoodJournal, context: any) {
        try {
            await context.tenant.db.run(this.getUpdateQuery(moodJournal));
            return {};
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    async deleteMoodJournal(id: string, context: any) {
        try {
            await context.tenant.db.run(`MATCH (mj:MoodJournal {id:$id}) DETACH DELETE (mj) RETURN (mj)`, { id: id });
            return {};
        } catch (error) {
            console.log(`Exception: ${error}`)
            return null
        }
    }

    private getCreateQuery(moodJournal: MoodJournal) {
        let moods = moodJournal.moods.map(m => `'${m.moodId}'`)

        let matchUserQuery = `MATCH (u:User {id: '${moodJournal.userId}'})`
        let createMoodJournalQuery = `CREATE (mj:MoodJournal {
            id: '${moodJournal.id}', 
            userId: '${moodJournal.userId}', 
            notes: '${moodJournal.notes}', 
            dateTimeCreated: '${moodJournal.dateTimeCreated}', 
            moods: [${moods}]})`
        let createUserRelationQuery = `(mj)-[:ASSOCIATED_WITH]->(u)`
        let matchMoodsQuery:any = [];
        let createMoodsRelationQuery:any = [];

        moodJournal.moods.forEach((m, index) => {
            matchMoodsQuery.push(`(m${index}:Mood {id: '${m.moodId}'})`)
            createMoodsRelationQuery.push(`(mj)-[:HAVE {score: ${m.score}}]->(m${index})`)
        });

        return `${matchUserQuery},${matchMoodsQuery.join(',')} ${createMoodJournalQuery}, ${createUserRelationQuery}, ${createMoodsRelationQuery.join(',')} RETURN mj`
    }

    private getUpdateQuery(moodJournal: MoodJournal) {
        if (!moodJournal.moods) moodJournal.moods = []
        let moods = moodJournal.moods.map(m => `'${m.moodId}'`)

        let matchMoodJournalQuery = `MATCH (mj:MoodJournal {id: '${moodJournal.id}'})-[r:HAVE]->() `
        let deleteMoodRelatedQuery = `DELETE r`
        let withMoodJournalQuery = `WITH mj`
        let matchMoodsQuery:any = [];
        let createMoodsRelationQuery:any = [];

        moodJournal.moods.forEach((m, index) => {
            matchMoodsQuery.push(`(m${index}:Mood {id: '${m.moodId}'})`)
            createMoodsRelationQuery.push(`MERGE (mj)-[:HAVE {score: ${m.score}}]->(m${index})`)
        });

        let setNotesQuery = ``
        if (moodJournal.notes && moodJournal.notes != "") {
            setNotesQuery = `mj.notes = '${moodJournal.notes}'`
        }

        let setMoodsQuery = ``
        let query = matchMoodJournalQuery

        if (moodJournal.moods && moodJournal.moods.length > 0) {
            query += `${deleteMoodRelatedQuery} ${withMoodJournalQuery}`
            setMoodsQuery = `mj.moods = [${moods}]`
        }

        if (matchMoodsQuery.length > 0) {
            query += ` MATCH ${matchMoodsQuery.join(',')} `
        }

        if (setMoodsQuery) {
            query += `SET ${setMoodsQuery} `
        }
        if (setNotesQuery) {
            query += `SET ${setNotesQuery} `
        }

        return query += ` ${createMoodsRelationQuery.join(' ')} RETURN (mj)`
    }
}
