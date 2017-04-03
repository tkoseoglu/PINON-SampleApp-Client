export class HospitalRecord {
    id: number = 0;
    hospitalName: string = "";
    numberOfPatients: number = 0;

    constructor(id: number, hospitalName: string, numberOfPatients: number) {
        this.id = id;
        this.hospitalName = hospitalName;
        this.numberOfPatients = numberOfPatients;
    }
}