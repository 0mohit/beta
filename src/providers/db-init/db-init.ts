import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbInitProvider {
    db: SQLiteObject
    constructor(private sqlite: SQLite) {
        console.log('Hello DbInitProvider Provider');
    }

    createSqlLiteDB() {
        return new Promise((resolve, reject) => {
            let createData: any = {};
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
        this.db.executeSql('Create Table User(UserId INTEGER PRIMARY KEY AUTOINCREMENT ,CareProviderName varchar(50),PhysicianName varchar(50),Mobile varchar(50),UserName varchar(20) UNIQUE,Password varchar(50), Location varchar(200))', []).then((res) => {
            console.log("**********", res)
        }).catch(e => console.log("***err", e));
    }
    userRegister(query) {
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

Create Table User
(UserId Integer NOT NULL
CareProviderName varchar(50),
PhysicianName varchar(50),
Mobile varchar(50),
UserName varchar(20),
Password varchar(50),
Location varchar(200),
PRIMARY KEY(UserId));

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

Create Table SensorReadings (
    ReadingId Integer NOT NULL,
    UserId Integer,
    Temperature DECIMAL(10,2),
    Moisture DECIMAL(10,2)
    Pressure DECIMAL(10,2)
)


SELECT * FROM USERDETAIL UD InnerJoin
User U On U.UserId = UD.UserId
Where U.UserId = 1234

*/
