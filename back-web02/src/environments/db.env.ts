// db.env.ts
import { projName } from './proj.env'
export const dbConfig = {
    dbUrl: `mongodb+srv://20221029:CmTzxkLgJtwsFsDu@cluster0.paogfys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    dbOptions: {
        useNewUrlPasrser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
} 