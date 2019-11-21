export class Address {

    houseNo: number;
    apartmentName: string;
    streetDetails: string;
    landmark: string;
    areaDetails: string;
    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.houseNo = obj.houseNo;
        this.apartmentName = obj.apartmentName;
        this.streetDetails = obj.streetDetails;
        this.landmark = obj.landmark;
        this.areaDetails = obj.areaDetails;
    }
}