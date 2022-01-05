import {NgModule} from "@angular/core";
import {DemoComponent} from "@modules/demo/demo.component";
import {RoutingModule} from "@modules/demo/routing.module";
import {Page1Component} from "@modules/demo/page1/page1.component";
import {Page2Component} from "@modules/demo/page2/page2.component";
import {SharedModule} from "@shared/shared.module";

@NgModule({
    declarations:[DemoComponent, Page1Component, Page2Component],
    imports:[
        RoutingModule, SharedModule
    ]
})
export class DemoModule{}