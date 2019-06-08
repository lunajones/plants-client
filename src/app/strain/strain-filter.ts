import {BaseEntity} from '../base/base-entity.component';

export interface StrainFilter extends BaseEntity {
  name: string;
  specie: any;
  requiredExpertizes: string[];
  minHeight: number;
  maxHeight: number;
  minYield: number;
  maxYield: number;
  flowerings: string[];

}
