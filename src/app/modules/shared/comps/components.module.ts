import {NgModule} from "@angular/core";
import {CustomMaterialModule} from "@shared/custom_material.module";
import {DvMatInputComponent} from "@shared/comps/components/mat_input/mat_input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [DvMatInputComponent],
    imports: [CustomMaterialModule, FormsModule, ReactiveFormsModule],
    exports: [DvMatInputComponent, FormsModule]
})
export class ComponentsModule { }