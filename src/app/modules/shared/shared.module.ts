import {NgModule} from "@angular/core";
import {CustomMaterialModule} from "@shared/custom_material.module";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "@shared/comps/components.module";
import {FormsModule} from "@angular/forms";
import {DvGraphModule} from "@shared/comps/components/dv-graph/dv-graph.module";

@NgModule({
    imports:[CommonModule, ComponentsModule, FormsModule, DvGraphModule],
    exports: [CommonModule, ComponentsModule, FormsModule, DvGraphModule]
})
export class SharedModule{}
