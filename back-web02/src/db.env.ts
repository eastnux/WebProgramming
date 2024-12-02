// db.env.ts
import { projName } from './proj.env'
export const dbConfig = {
    dbUrl: `mongodb+srv://csleehnu:558153Mm!!@cluster0.q35gyuf.mongodb.net/${projName}?retryWrites=true&w=majority`,
    dbOptions: {
        useNewUrlPasrser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
} 