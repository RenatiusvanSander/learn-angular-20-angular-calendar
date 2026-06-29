import { Injectable } from '@angular/core';
import { ServiceContractDataService } from './service-contract-data-service';
import { ServiceContractPriceDataService } from './service-contract-price-data-service';
import { ServiceContract } from '../models/service-contract';

@Injectable({
  providedIn: 'root',
})
export class ServiceContractService {
  
  constructor(private serviceContractPricesDataService: ServiceContractPriceDataService , private serviceContractDataService: ServiceContractDataService) {}

  async getServiceContracts(userId: number): Promise<Array<ServiceContract>> {
    const loadedServiceContractPrices = await this.serviceContractPricesDataService.loadServiceContractPriceByUserId(userId);
    const serviceContractIds = loadedServiceContractPrices.map(price => price.serviceContractId);
    const loadedServiceContracts = await this.serviceContractDataService.loadServiceContractsByIds(serviceContractIds);

    return loadedServiceContracts;
  }

}
