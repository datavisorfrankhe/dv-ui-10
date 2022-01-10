import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DvGraphNodes } from '@src/app/modules/shared/comps/components/dv-graph/dv-graph.entity';
import { Edge, Node, Layout, GraphComponent } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { DagreNodesOnlyLayout } from '@src/app/modules/shared/comps/components/dv-graph/customDagreNodesOnly';
import { DvFlowBuilderService } from '@src/app/modules/shared/comps/components/dv-flow-builder/dv-flow-builder.service';
// import { StoreService } from '@src/app/modules/shared/services/redux/store.service';
// import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { DvFlowBuilderNodes, DroppableElementTypes, DvFlowBuilderNode, DroppableElementType, GraphActions } from './dv-flow-builder.entity';

declare var Tether: any;
declare var $: any;

@Component({
    selector: 'dv-flow-builder',
    templateUrl: './dv-flow-builder.component.html',
    styleUrls: ['./dv-flow-builder.component.scss'],
})
export class DvFlowBuilderComponent {

    @Input() dataList;
    @Input() direction = 'TB';
    @Output() onNodeClicked: EventEmitter<any> = new EventEmitter();
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    @Input() size = 800;
    @ViewChild('dvGraph') dvGraph: GraphComponent;
    layoutSettings;
    dvFlowBuilderNodes: DvFlowBuilderNodes = null;
    droppableElementTypes: DroppableElementTypes;

    nodes: Node[] = [];
    edges: Edge[] = [];
    loaded = false;
    zoomable = false;
    curve: any = shape.curveLinear;
    layout: Layout = new DagreNodesOnlyLayout();

    zoomLevel = 1;
    zoomSpeed = 0.03;
    minZoomLevel = 0.01;
    maxZoomLevel = 1;

    graphActions: GraphActions = new GraphActions();
    redoActions: GraphActions = new GraphActions();

    openedSelector = '';
    selectOptions = [{ id: 1, name: 'rule1' }, { id: 2, name: 'rule2' }, { id: 3, name: 'rule3' }, { id: 4, name: 'rule4' }];
    view = [];
    constructor(private dvFlowBuilderService: DvFlowBuilderService/*,
        private storeService: StoreService, private i18n: I18NService*/) {
        //this.dataList = demoData;
        this.dvFlowBuilderNodes = new DvFlowBuilderNodes();
        this.droppableElementTypes = new DroppableElementTypes();
        setTimeout(() => {
            this.view = [this.size, this.size];
            this.layoutSettings = {
                orientation: this.direction //TB|LR
            };
        });
    }

    delete(node, e) {
        this.pushToStack();
        e.stopPropagation();
        this.dvFlowBuilderNodes.remove(node.data);
        this._processNodes();
    }
    clickedLine(e) {
        console.log('link clicked ', e);
    }
    nodeClick(e) {
        console.log('node clicked ', e);
    }
    toggleSelector(node, e) {
        if (this.openedSelector === node.id) {
            this.openedSelector = '';
        } else {
            this.openedSelector = node.id;
        }
        new Tether({
            element: '.selectorWrapper',
            target: e.target,
            attachment: 'bottom right',
            targetAttachment: 'top right',
            targetOffset: '15px -160px'
        });
    }
    valueSelected(e) {
        this.dvFlowBuilderNodes.updateLabelFor(e[0].name, this.openedSelector);
        this.openedSelector = '';
        this._processNodes();
    }
    dropAfter(from: any, to: DvFlowBuilderNode) {
        this.pushToStack();
        if ('data' in from && 'id' in from && 'label' in from) {
            //ths is self drop
            this.dvFlowBuilderNodes.addNodeToNode(from.data, to);
        } else {
            this.dvFlowBuilderNodes.addTypeToNode(from, to);
        }
        this._processNodes();
    }
    dropBefore(from: any, to: DvFlowBuilderNode) {
        this.pushToStack();
        if ('data' in from && 'id' in from && 'label' in from) {
            //ths is self drop
            this.dvFlowBuilderNodes.prependNodeToNode(from.data, to);
        } else {
            this.dvFlowBuilderNodes.prependTypeToNode(from, to);
        }
        this._processNodes();
    }
    dropMe(from: DroppableElementType) {
        this.pushToStack();
        this.dvFlowBuilderNodes.addTypeToNode(from);
        this._processNodes();
    }
    start() {
        this.pushToStack();
        this.dvFlowBuilderNodes.refresh();
        this._processNodes();
    }
    pushToStack() {
        this.graphActions.push(this.dvFlowBuilderNodes);
    }
    zoomIn() {
        this.zoomLevel -= 0.02; console.log(this.zoomLevel);
        this.dvGraph.zoom(this.zoomLevel);
    }
    zoomOut() {
        this.zoomLevel += 0.02; console.log(this.zoomLevel);
        this.dvGraph.zoomTo(this.zoomLevel);
    }
    undo() {
        this.redoActions.push(this.dvFlowBuilderNodes);
        this.dvFlowBuilderNodes = this.graphActions.pop();
        this._processNodes();
    }
    redo() {
        this.graphActions.push(this.dvFlowBuilderNodes);
        this.dvFlowBuilderNodes = this.redoActions.pop();
        this._processNodes();
    }
    reset() {
        this._processNodes();
    }
    _processNodes() {
        this.loaded = false;
        this.nodes = this.dvFlowBuilderNodes.nodes;
        this.edges = this.dvFlowBuilderNodes.edges;
        const __this = this;
        setTimeout(() => {
            this.loaded = true;
            //enable drop node to node
            setTimeout(() => {
                $('.droppableContainer').draggable();
                $('.droppableContainer').droppable({
                    drop: function(event, ui) {
                        console.log(event, ui, 'dropped left');
                        const tartgetId = event.target.id;
                        const sourceId = ui.draggable[0].getAttribute('id');
                        __this.dvFlowBuilderNodes.addNodeIdToNodeId(sourceId, tartgetId);
                        __this._processNodes();
                    }
                });
            });
        });
    }

}
