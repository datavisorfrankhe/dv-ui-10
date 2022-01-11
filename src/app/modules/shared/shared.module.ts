import {NgModule} from '@angular/core';
import {CustomMaterialModule} from '@shared/custom_material.module';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '@shared/comps/components.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, ComponentsModule, FormsModule ],
    exports: [CommonModule, ComponentsModule, FormsModule ]
})
export class SharedModule {
}
