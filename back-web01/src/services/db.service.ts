import { Injectable } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { dbConfig } from 'src/environments/db.env';
@Schema()
export class ObjectClass {
    @Prop({ index: true }) key: string;
    @Prop({ index: true }) time: number;
    @Prop({ type: Object }) value: {oneValue:number; twoValue: number}; // {'a':2, 'b':5}
}
export const ObjectSchema = SchemaFactory.createForClass(ObjectClass);

@Injectable()
export class DbService {
    myDbConn: mongoose.Connection;
    constructor() {
        this.myDbConn = mongoose.createConnection(dbConfig.dbUrl);
        this.startAutoIncrement();
    } //constructor

    private startAutoIncrement() {
        const collectionName = 'dbStorage';
        const itemKey = 'myNumbers';

        setInterval(async () => {
            let result = await this.getItem(collectionName, itemKey);
            let newValues = {
                oneValue: (result?.value?.oneValue ?? 0) + 1, // null일 경우 0으로 초기화
                twoValue: (result?.value?.twoValue ?? 0) + 10,
            };

            await this.setItem(collectionName, itemKey, newValues);
        }, 30000);
    }
    async setItem(collectionName: string, item: string, obj: { oneValue: number; twoValue: number }): Promise<any> {
        let myDbModel = this.myDbConn.model(collectionName, ObjectSchema);
        console.log(`setItem(One):reuqest: collectionName:${collectionName}, item:${item},
    obj:${JSON.stringify(obj)}`, this);
        let result = await myDbModel
            .findOneAndUpdate(
                { key: item },
                { value: obj, time: Number(Date.now()) },
                { new: true, upsert: true },
            )
        console.log(`setItem(One): result:${JSON.stringify(result)}`, this);
        return result;
    } // setItem()
    async getItem(collectionName: string, item: string,): Promise<any> {
        let myDbModel = this.myDbConn.model(collectionName, ObjectSchema);
        console.log(`getItem(One):request: collectionName:${collectionName}, item:${item}`,
            this);
        let result = await myDbModel
            .findOne({ key: item }); //.sort({ time: -1 })
        console.log(`getItem(One): result:${JSON.stringify(result)}`, this);
        return result;
    } // getItem()
    async resetItem(collectionName: string, item: string): Promise<any> {
        let myDbModel = this.myDbConn.model(collectionName, ObjectSchema);
        console.log(`resetItem: request: collectionName: ${collectionName}, item: ${item}`, this);
        
        let result = await myDbModel.findOneAndUpdate(
            { key: item },
            { value: { oneValue: 0, twoValue: 0 }},
            { new: true }
        );

        console.log(`resetItem: result: ${JSON.stringify(result)}`, this);
        return result;
    }
}