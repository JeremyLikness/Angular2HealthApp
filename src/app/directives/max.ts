import {Attribute, Control, Directive, forwardRef, Provider, NG_VALIDATORS} from "angular2/angular2";
import {HealthAppCustomValidators} from "./customValidators";

const MAX_VALIDATOR = new Provider(NG_VALIDATORS, {useExisting: 
  forwardRef(() => MaxValidator), multi:true});

@Directive({
  selector: '[max][ng-control],[max][ng-form-control],[max][ng-model]',
  providers: [MAX_VALIDATOR]
})
export class MaxValidator {
  
  private _validator: Function;
  private _max: number;

  constructor(@Attribute("max") max: string) {
    this._validator = HealthAppCustomValidators.max(this._max);
  }
  
  validate(c: Control): {[key: string]: any} { 
    return  this._validator(c); 
  }
}