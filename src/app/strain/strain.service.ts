import {Injectable} from '@angular/core';
import {Strain} from './strain';
import {StrainFilter} from './strain-filter';
import {CustomHttpClient} from '../essencial/custom-httpclient.service';
import {Observable, throwError} from 'rxjs';

import {BaseService} from '../base/base.service';
import {CompanyFilter} from '../company/company-filter';






@Injectable()
export class StrainService extends BaseService<Strain> {

  constructor(public http: CustomHttpClient) {
    super('strain', http);
  }

}
