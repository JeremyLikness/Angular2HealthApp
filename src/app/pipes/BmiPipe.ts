import {Pipe, Inject} from 'angular2/core';

@Pipe({
  name: 'bmi'
})
export class BmiPipe {
	constructor() {}
  transform(input:number, args: string[]) : any {
    var value = Number(input);

            if (value >= 30.0) {
                return 'Obese';
            }

            if (value >= 25.0) {
                return 'Overweight';
            }

            if (value < 18.5) {
                return 'Underweight';
            }

            return 'Normal';
  }
}