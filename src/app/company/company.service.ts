import {Injectable} from '@angular/core';
import {Company} from './company';
import {CompanyFilter} from './company-filter';
import {CustomHttpClient} from '../essencial/custom-httpclient.service';
import {BaseService} from '../base/base.service';

@Injectable()
export class CompanyService extends BaseService<Company> {

  constructor(public http: CustomHttpClient) {
    super('company', http);
  }

}
