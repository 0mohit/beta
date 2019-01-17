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

}




/*

Create Table User
(UserId Integer NOT NULL
CareProviderName varchar(50),
PhysicianName varchar(50),
Mobile varchar(50),
UserName varchar(20),
Password varchar(50),
Location nvarchar(200),
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
