// db.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { dbConfig } from 'src/environments/db.env';
import { initialValues } from 'src/environments/initial-values';

@Schema()
export class ObjectClass {
    @Prop({ index: true }) key: string;
    @Prop({ index: true }) time: number;
    @Prop({ type: Object }) obj: any; // {'a':2, 'b':5}
}
export const ObjectSchema = SchemaFactory.createForClass(ObjectClass);

@Injectable()
export class DbService {

    myDbConn: mongoose.Connection;

    constructor(
    ) {
        this.myDbConn = mongoose.createConnection(dbConfig.dbUrl);
        let imtems = Object.keys(initialValues);
        imtems.forEach((item: any) => {
            this.getItem(item).then((rslt => {
                if (!rslt) {
                    this.setItem(item, initialValues[item])
                        .then(a => { console.log(JSON.stringify(a)) });
                }
            })
            );
        });
        console.log(`DB will be initialized`);
    } //constructor

    async setItem(item: string, obj: any): Promise<any> {
        let myDbModel = this.myDbConn.model('dbStorage', ObjectSchema);
        let result = await myDbModel
            .findOneAndUpdate(
                { key: item },
                { obj: obj, time: Number(Date.now()) },
                { new: true, upsert: true },
            )
        return result;
    } // setItem()

    async getItem(item: string): Promise<any> {
        let myDbModel = this.myDbConn.model('dbStorage', ObjectSchema);
        return myDbModel
            .findOne({ key: item });
    } // getItem()

} //DbService