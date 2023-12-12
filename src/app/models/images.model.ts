export class Images {
  url: string;
  thumbnail: string;
  resizeUrl: string;
  resizeThumbnail: string;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.url = obj.url;
    this.thumbnail = obj.thumbnail;
    this.resizeUrl = obj.resizeUrl;
    this.resizeThumbnail = obj.resizeThumbnail;
  }
}
