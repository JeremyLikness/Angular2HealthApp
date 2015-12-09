import {bootstrap, provide, FORM_DIRECTIVES, ControlContainer, Component} from 'angular2/angular2';
import {IUserProfile, UserProfile} from './common/UserProfile';
import {IUnitOfMeasureState, UnitOfMeasureState} from './common/UnitOfMeasureState';
import {IConversions, Conversions} from './common/Conversions';
import {ProfileComponent} from './directives/profile';
import {FormulaComponent} from './directives/formulas';
import {HealthAppCustomValidators} from './directives/customValidators';

let userProfileFactory = () => <IUserProfile>(new UserProfile());
let uomStateFactory = () => <IUnitOfMeasureState>(new UnitOfMeasureState());
let conversionsFactory = () => <IConversions>(new Conversions());

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.html',
    directives: [ProfileComponent, FormulaComponent]
})
class AppComponent { }
bootstrap(AppComponent, [provide("UserProfile", {useFactory:userProfileFactory}),
    provide("UnitOfMeasureState", {useFactory:uomStateFactory}),
    provide("Conversions", {useFactory:conversionsFactory}),
    provide(HealthAppCustomValidators, {useClass: HealthAppCustomValidators})]);