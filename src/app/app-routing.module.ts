import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from '@app/app.component';
import {DvFlowBuilderComponent} from '@shared/comps/components/dv-flow-builder/dv-flow-builder.component';


const routes: Routes = [{
    path: '',
    component: AppComponent,
    children: [
        {
            path: '',
            redirectTo: 'demo/page1',
            pathMatch: 'full'
        }
    ]
},
    {
        path: 'fb',
        component: DvFlowBuilderComponent
    },

];


@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
