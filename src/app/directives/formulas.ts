import {Inject, Component} from 'angular2/core';
import {IUserProfile} from '../common/UserProfile';
import {BmiPipe} from '../pipes/BmiPipe';
import {formulaBmr} from '../common/formulaBmr';
import {formulaBmi} from '../common/formulaBmi';
import {formulaThr} from '../common/formulaThr';

interface IFormulaParameter {
	isMale: boolean;
	weight: number;
	height: number;
	age: number;
}

@Component({
	selector: 'formulas',
	templateUrl: 'app/templates/formulas.html',
	pipes: [BmiPipe]
})
export class FormulaComponent {
	constructor(@Inject("UserProfile")private userProfile: IUserProfile) {}
	
	private profileToParam(): IFormulaParameter {
		return {
			isMale: this.userProfile.isMale,
			weight: this.userProfile.weightPounds,
			height: this.userProfile.heightInches,
			age: this.userProfile.ageYears 
		};
	}
	
	public get bmr(): number {
		return formulaBmr(this.profileToParam());
	}
	
	public get bmi(): number {
		return formulaBmi(this.profileToParam());
	}
	
	public get thr(): any {
		return formulaThr(this.userProfile.ageYears);
	}
}