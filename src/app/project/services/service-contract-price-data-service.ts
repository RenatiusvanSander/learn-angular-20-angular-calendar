import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceContractPrice } from '../models/service-contract-price';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceContractPriceDataService {

  private static apiUrl: String = 'http://localhost:8082/tutoring3/test/servicecontractprices';

  constructor(private http: HttpClient ) {
  }

  async loadServiceContractPriceByUserId(userId: number) : Promise<Array<ServiceContractPrice>> {
    return await lastValueFrom(this.http.get<Array<ServiceContractPrice>>(ServiceContractPriceDataService.apiUrl + '/get-service-contract-by-user-id/' + userId));
  }
}
