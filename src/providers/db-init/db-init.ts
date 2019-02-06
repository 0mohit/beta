import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Injectable()
export class DbInitProvider {
    db: SQLiteObject
    constructor(private sqlite: SQLite, public http: HttpClient) {
        console.log('Hello DbInitProvider Provider');
        this.CreatetimeToPressureUlcerLookup();
    }

    createSqlLiteDB() {
        return new Promise((resolve, reject) => {
            let createData: any = {};

            // if(this.platform.is('ios')){
            //     dbObj = {name: "appdata.db", iosDatabaseLocation: 'default'};

            // }else if(this.platform.is('android')){
            //     dbObj = {name: "appdata.db", location: 'default'};
            // }

            createData['name'] = 'beta';
            createData['location'] = 'default';
            this.sqlite.create(createData)
                .then((db: SQLiteObject) => {
                    this.db = db;
                    resolve(db);
                })
                .catch(e => {
                    console.log(e)
                    reject(e)
                });
        });
    }
    openDb() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            } else {
                resolve(this.createSqlLiteDB());
            }
        });
    }

    createTables() {
        this.http.get('assets/tables/table.json').subscribe((res) => {
            let createTable = (tables, callback) => {
                if (tables.length) {
                    let first_data = tables.splice(0, 1)[0];
                    console.log("first_data", `${first_data}`)
                    this.db.executeSql(`${first_data}`, []).then((res) => {
                        console.log("**********", res)
                        createTable(tables, callback);
                    }).catch(e => {
                        createTable(tables, callback);
                        console.log("***err", e)
                    });
                } else {
                    callback(true);
                }
            }
            createTable(res['querys'], (response) => {
                console.log("create query executed")
            })
        })


    }

    insertLookupTables(data) {
        let inserTable = (tables, callback) => {
            let firstRecord = tables.splice(0, 1)[0];
            console.log("wb", firstRecord)
            let TemperatureMin, TemperatureMax, MoistureMin, MoistureMax, pressureMin, pressureMax, AgeMin, AgeMax, WeightMin, WeightMax, PressureUlserMin, PressureUlserMax;

            if (firstRecord[0].indexOf('-') != -1) {
                let dataRange = firstRecord[0].split('-');
                TemperatureMin = dataRange[0];
                TemperatureMax = dataRange[1];
            } else if (firstRecord[0].indexOf('>') != -1) {
                let dataRange = firstRecord[0].split('>');
                TemperatureMin = dataRange[1];
                TemperatureMax = 100;
            } else {
                let dataRange = firstRecord[0].split('<');
                TemperatureMin = 100;
                TemperatureMax = dataRange[0];
            }

            if (firstRecord[1].indexOf('-') != -1) {
                let dataRange = firstRecord[1].split('-');
                MoistureMin = dataRange[0];
                MoistureMax = dataRange[1];
            } else if (firstRecord[1].indexOf('>') != -1) {
                let dataRange = firstRecord[1].split('>');
                MoistureMin = dataRange[1];
                MoistureMax = 100;
            } else {
                let dataRange = firstRecord[1].split('<');
                MoistureMin = 100;
                MoistureMax = dataRange[0];
            }

            if (firstRecord[2].indexOf('-') != -1) {
                let dataRange = firstRecord[2].split('-');
                pressureMin = dataRange[0];
                pressureMax = dataRange[1];
            } else if (firstRecord[2].indexOf('>') != -1) {
                let dataRange = firstRecord[2].split('>');
                pressureMin = dataRange[1];
                pressureMax = 100;
            } else {
                let dataRange = firstRecord[2].split('<');
                pressureMin = 100;
                pressureMax = dataRange[0];
            }

            if (firstRecord[3].indexOf('-') != -1) {
                let dataRange = firstRecord[3].split('-');
                AgeMin = dataRange[0];
                AgeMax = dataRange[1];
            } else if (firstRecord[3].indexOf('>') != -1) {
                let dataRange = firstRecord[3].split('>');
                AgeMin = dataRange[1];
                AgeMax = 100;
            } else {
                let dataRange = firstRecord[3].split('<');
                AgeMin = 100;
                AgeMax = dataRange[0];
            }

            if (firstRecord[4].indexOf('-') != -1) {
                let dataRange = firstRecord[4].split('-');
                WeightMin = dataRange[0];
                WeightMax = dataRange[1];
            } else if (firstRecord[4].indexOf('>') != -1) {
                let dataRange = firstRecord[4].split('>');
                WeightMin = dataRange[1];
                WeightMax = 100;
            } else {
                let dataRange = firstRecord[4].split('<');
                WeightMin = 100;
                WeightMax = dataRange[0];
            }

            if (firstRecord[5].indexOf('-') != -1) {
                let dataRange = firstRecord[5].split('-');
                PressureUlserMin = dataRange[0];
                PressureUlserMax = dataRange[1];
            } else if (firstRecord[5].indexOf('>') != -1) {
                let dataRange = firstRecord[5].split('>');
                PressureUlserMin = dataRange[1];
                PressureUlserMax = 0;
            } else {
                let dataRange = firstRecord[5].split('<');
                PressureUlserMin = 100;
                PressureUlserMax = dataRange[0];
            }

            let query = `INSERT INTO SensorLookupTable(TemperatureMin,TemperatureMax,MoistureMin,MoistureMax,PressureMin,PressureMax,AgeMin,AgeMax,WeightMin,WeightMax,PressureUlserMin,PressureUlserMax) VALUES  (${TemperatureMin},${TemperatureMax},${MoistureMin},${MoistureMax},${pressureMin},${pressureMax},${AgeMin},${AgeMax},${WeightMin},${WeightMax},${PressureUlserMin},${PressureUlserMax})`
            console.log("query", query)
            // this.db.executeSql('query', []).then(() => {
            if (tables.length != 0) {
                inserTable(tables, callback)
            } else {
                callback(true);
            }
            // })
            //     .catch(e => {
            //         console.log("insert error", e)
            //         // reject(e);
            //     });

        }

        inserTable(data, (response) => {
            console.log("create query executed")
        })
    }

    CreatetimeToPressureUlcerLookup() {
        let req = new XMLHttpRequest();
        let jsonData;
        let url = 'assets/Time_To_PressureUlcer_Lookup/Time_To_PressureUlcer_Lookup.xlsx';
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = (e) => {
            let data = new Uint8Array(req.response);
            let workbook = XLSX.read(data, { type: "array" });
            const wb: XLSX.WorkBook = XLSX.read(data, { type: "array" });
            const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
            jsonData = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
            jsonData.splice(0, 1)[0]
            this.insertLookupTables(jsonData)

        };
        req.send();
    }



    executeQuery(query) {
        return new Promise((resolve, reject) => {
            this.db.executeSql(query, []).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err);
            })
        })
    }
}




/*


Create Table UserDetail
(UserDetailId Integer NOT NULL
UserId Integer,
LastName varchar(50),
FirstName varchar(50),
Age Integer,
Gender Char,
Weight varchar(50),
PRIMARY KEY(UserDetailId)
Foreign Key(UserId) references User(UserId));


SELECT * FROM USERDETAIL UD InnerJoin
User U On U.UserId = UD.UserId
Where U.UserId = 1234

*/
