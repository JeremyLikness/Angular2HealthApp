import {Attribute, Control, Directive, forwardRef, Provider, NG_VALIDATORS} from "angular2/angular2";
import {HealthAppCustomValidators} from "./customValidators";

const MIN_VALIDATOR = new Provider(NG_VALIDATORS, {useExisting: 
  forwardRef(() => MinValidator), multi:true});

@Directive({
  selector: '[min][ng-control],[min][ng-form-control],[min][ng-model]',
  providers: [MIN_VALIDATOR]
})
export class MinValidator {
  
  private _validator: Function;

  constructor(@Attribute("min") min: string) {
    this._validator = HealthAppCustomValidators.min(Number(min));
  }
  validate(c: Control): {[key: string]: any} {
    return this._validator(c); 
  }
}