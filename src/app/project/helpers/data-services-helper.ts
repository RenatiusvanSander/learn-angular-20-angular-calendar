import { HttpParams } from "@angular/common/http";

export class DataServicesHelper {

    static generateIdsHttpParams(ids: Array<number>) {
        let params: HttpParams = new HttpParams();
        for(let id of ids) {
            params = params.append('id', id);
        }

        return params;
    }
}
