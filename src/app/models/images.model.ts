export class Images {

    url: string;
    thumbnail: string;
    resize_url: string;
    resize_thumbnail: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.url = obj.url;
        this.thumbnail = obj.thumbnail;
        this.resize_url = obj.resize_url;
        this.resize_thumbnail = obj.resize_thumbnail;
    }
}