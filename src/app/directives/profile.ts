import {Control, ControlGroup, FORM_DIRECTIVES, FormBuilder} from 'angular2/common';
import {Inject, Component} from 'angular2/core';
import {IUserProfile} from '../common/UserProfile';
import {IUnitOfMeasureState} from '../common/UnitOfMeasureState';
import {IConversions} from '../common/Conversions';
import {HeightPipe} from '../pipes/HeightPipe';
import {MinValidator} from '../directives/min';
import {MaxValidator} from '../directives/max';

@Component({
	selector: 'user-profile',
	templateUrl: 'app/templates/userprofile.html',
	directives: [FORM_DIRECTIVES, MinValidator, MaxValidator],
	pipes: [HeightPipe]
})
export class ProfileComponent {
	constructor(@Inject("UserProfile")private userProfile: IUserProfile,
	@Inject("UnitOfMeasureState")private unitOfMeasureState: IUnitOfMeasureState,
	@Inject("Conversions")private conversions: IConversions) {		
		// set up weight value
		this._weightValue = unitOfMeasureState.usMeasure ? userProfile.weightPounds :
			conversions.poundsToKilograms(userProfile.weightPounds);
		this._wasMetric = unitOfMeasureState.metricMeasure;
		
		// set up weight validations
		var fb = new FormBuilder(), that = this;
		this.myForm = fb.group({
			weight: [this.weightValue, (c: Control) => that.weightValidator(that, c)]
		});
		
		// set up age
		this._ageValue = userProfile.ageYears;					
	}
	
	private weightValidator(that: ProfileComponent, c: Control): any {
	var weight: number;    
	if (c.value === null || isNaN(c.value)) {        
		return {
			required: true
		};
	}
	weight = Number(c.value);
	if (isNaN(weight) || weight < that.minWeight || weight > that.maxWeight) {
		return {
			weightRange: true
		};
	}	
	return null;
}
	
	private _ageValue: number;
		
	private _weightValue: number;
	
	private _wasMetric: boolean;
	
	public myForm: ControlGroup;
	
	public get uomLabel(): string {
		return this.unitOfMeasureState.usMeasure ? "Imperial" : "Metric";
	}
	
	public get genderLabel(): string {
		return this.userProfile.isMale ? "Male" : "Female";
	}
	
	public get minHeight(): number {
		return this.unitOfMeasureState.usMeasure ? 24 : 60;
	}
	
	public get maxHeight(): number {
		return this.unitOfMeasureState.usMeasure ? 84: 215;
	}
	
	public get heightValue(): number {
		return this.unitOfMeasureState.usMeasure ?
			this.userProfile.heightInches : 
			this.conversions.inchesToCentimeters(this.userProfile.heightInches);
	}
	
	public set heightValue(val: number) {
		this.userProfile.heightInches = this.unitOfMeasureState.usMeasure ? val 
		: this.conversions.centimetersToInches(val);
	}
	
	public get minWeight(): number {
		return this.unitOfMeasureState.usMeasure ? 20 : 9;
	}
	
	public get maxWeight(): number {
		return this.unitOfMeasureState.usMeasure ? 400 : 182;
	}
	
	public get weightUom(): string {
		return this.unitOfMeasureState.usMeasure ? "lbs" : "kg";
	}
	
	public get weightValue(): number {
		if (this.unitOfMeasureState.metricMeasure !== this._wasMetric) {
			this._wasMetric = this.unitOfMeasureState.metricMeasure;
			if (this._wasMetric) {
				this._weightValue = Math.round(this.conversions.poundsToKilograms(this._weightValue));
			}
			else {
				this._weightValue = Math.round(this.conversions.kilogramsToPounds(this._weightValue));
			}
		}
		return this._weightValue;
	}
	
	public set weightValue(val: number) {
		var incoming: number = Number(val), adjustedWeight: number = incoming;
		this._weightValue = incoming;
		if (this.unitOfMeasureState.metricMeasure) {
			adjustedWeight = this.conversions.kilogramsToPounds(incoming);
		}
		if (adjustedWeight >= 20 && adjustedWeight <= 400) {
			this.userProfile.weightPounds = adjustedWeight;
		}
	}
	
	public get ageValue(): number {
		return this._ageValue;
	}
	
	public set ageValue(val: number) {
		var incoming = Number(val);
		this._ageValue = val;
		if (incoming >= 13 && incoming <= 120) {
			this.userProfile.ageYears = incoming;
		}
	}
	
	public toggleUom(): void {
		this.unitOfMeasureState.toggle();
	}
	
	public toggleGender(): void {
		this.userProfile.toggleGender();
	}
}