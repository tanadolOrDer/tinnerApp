import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'tanadolsn'
const password = Bun.env.MONGO_DB_PASSWORD || 'os0rX0iQe5zLts7v'
const db_name = Bun.env.MONGO_DBNAME || 'tinner_app'
const uri = `mongodb+srv://${username}:${password}@cluster0.dl1cr.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`
export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('-----connect-----')
        }
        catch (error) {
            console.error('-----MongoDB connecteror')
            console.error(error)
        }
    }
}