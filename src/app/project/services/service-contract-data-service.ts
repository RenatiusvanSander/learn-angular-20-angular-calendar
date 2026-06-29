import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ServiceContract } from '../models/service-contract';
import { DataServicesHelper } from '../helpers/data-services-helper';

@Injectable({
  providedIn: 'root',
})
export class ServiceContractDataService {
  
  private static apiUrl: String = 'http://localhost:8082/tutoring3/test/servicecontracts';

  constructor(private http: HttpClient) {}

  loadServiceContractsByIds(ids: Array<number>): Promise<Array<ServiceContract>> {
    const httpParams = DataServicesHelper.generateIdsHttpParams(ids);
    return lastValueFrom(this.http.get<Array<ServiceContract>>(ServiceContractDataService.apiUrl + '/get-service-contracts-by-ids', { params: httpParams }));
  }
}
