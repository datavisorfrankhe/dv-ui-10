import { NgModule } from '@angular/core';
import { DvGraphComponent } from './dv-graph.component';
import { DvGraphService } from './dv-graph.service';
import { CustomMaterialModule } from '../../../custom_material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {DragAndDropModule} from "angular-draggable-droppable";
@NgModule({
    imports: [CustomMaterialModule, CommonModule, FormsModule, NgxGraphModule, DragAndDropModule],
    declarations: [DvGraphComponent],
    exports: [DvGraphComponent],
    providers: [DvGraphService]
})
export class DvGraphModule { }
