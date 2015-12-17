import {Pipe, Inject} from 'angular2/core';
import {IUnitOfMeasureState} from '../common/UnitOfMeasureState';
import {IConversions} from '../common/Conversions';

@Pipe({
  name: 'height'
})
export class HeightPipe {
	constructor(
	@Inject("UnitOfMeasureState")private unitOfMeasureState: IUnitOfMeasureState,
	@Inject("Conversions")private conversions: IConversions) {}
  transform(value:number, args: string[]) : any {
    var heightInches = Number(value), heightCentimeters, m, ft, result = '',
    convert = !!args[0];
            if (this.unitOfMeasureState.usMeasure) {
                ft = Math.floor(this.conversions.inchesToFeet(heightInches));
                if (ft > 0) {
                    result = ft + " ft. ";
                }
                heightInches -= ft * 12;
                if (heightInches >= 1) {
                    result += (Math.floor(heightInches) + ' in.');
                }
            }
            else {
                if (convert !== undefined && !!convert === convert && !convert) {
                    heightCentimeters = heightInches;
                }
                else {
                    heightCentimeters = this.conversions.inchesToCentimeters(heightInches);                    
                }
                result = Math.round(heightCentimeters) + ' cm.';
            }
            return result;
  }
}