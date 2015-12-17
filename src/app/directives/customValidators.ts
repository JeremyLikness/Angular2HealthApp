import {Control} from "angular2/common";

export class HealthAppCustomValidators {
  
  	static min(min: number): Function {
      return (control: Control): {[key: string]: any} => {
        var v: number = Number(control.value);
        return v < min || isNaN(v) ?
                  {"min": {"requiredMin": min, "actualMin": v}} :
                  null;
      };
	  }
	
	static max(max: number): Function {
      return (control: Control): {[key: string]: any} => {
  var v: number = Number(control.value);
        return v > max || isNaN(v) ?
                  {"max": {"requiredMax": max, "actualMax": v}} :
                  null;
      };
  }
}