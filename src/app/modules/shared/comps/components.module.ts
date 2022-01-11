import {NgModule} from '@angular/core';
import {CustomMaterialModule} from '@shared/custom_material.module';
import {DvMatInputComponent} from '@shared/comps/components/mat_input/mat_input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DvFlowBuilderComponent} from '@shared/comps/components/dv-flow-builder/dv-flow-builder.component';
import {DvFlowBuilderService} from '@shared/comps/components/dv-flow-builder/dv-flow-builder.service';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {NgxGraphModule} from '@swimlane/ngx-graph';

@NgModule({
    declarations: [DvMatInputComponent, DvFlowBuilderComponent],
    imports: [CustomMaterialModule, FormsModule, ReactiveFormsModule, DragAndDropModule, NgxGraphModule],
    exports: [DvMatInputComponent, FormsModule, DvFlowBuilderComponent],
    providers: [DvFlowBuilderService]
})
export class ComponentsModule {
}
