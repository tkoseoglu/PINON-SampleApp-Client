import { HospitalRecord } from '../models/hospitalRecord';

export class Patient {
    id: number = 0;
    hospital: HospitalRecord;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    hairColor: string = "";
    eyeColor: string = "";
    height: string = "";
    weight: string = "";
    userId: string = "";

    constructor(id: number, hospital: HospitalRecord, firstName: string, lastName: string, email: string, hairColor: string, eyeColor: string, height: string, weight: string, userId: string) {
        this.id = id;
        this.hospital = hospital;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.height = height;
        this.weight = weight;
        this.userId = userId;
    }
}