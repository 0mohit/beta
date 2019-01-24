import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DbInitProvider {
    db: SQLiteObject
    constructor(private sqlite: SQLite, public http: HttpClient) {
        console.log('Hello DbInitProvider Provider');
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
        this.http.get('/assets/tables/table.json').subscribe((res) => {
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
                    callback(true)
                }
            }
            createTable(res['querys'], (response) => {
                console.log("create query executed")
            })
        })


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
