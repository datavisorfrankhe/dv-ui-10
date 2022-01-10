import { Component, Input, Output, EventEmitter,  AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DvGraphNodes, DvGraphNode } from './dv-graph.entity';
import { DvGraphService } from './dv-graph.service';
import { Edge, Node, Layout, GraphComponent } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { DagreNodesOnlyLayout } from '@src/app/modules/shared/comps/components/dv-graph/customDagreNodesOnly';
// import { clipboardCopy } from '@src/utils/clipboard';
// import { StoreService } from '@src/app/modules/shared/services/redux/store.service';
// import { I18NService } from '@src/app/modules/shared/services/i18n.service';
// import { ALERT_TYPE } from '@src/app/modules/shared/comps/components/messager.component';

@Component({
    selector: 'dv-graph',
    templateUrl: './dv-graph.component.html',
    styleUrls: ['./dv-graph.component.scss'],
})
export class DvGraphComponent implements AfterViewInit {

    @Input() dataList;
    @Input() zoomable = false;
    @Input() direction = 'TB';
    @Output() onNodeClicked: EventEmitter<any> = new EventEmitter();
    @ViewChild('dvGraph') dvGraph: GraphComponent;
    @Input() nodeClickable = false;
    //used t accept dropped object
    @Input() droppable = false;
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    @Input() editable = false;
    @Input() deletable = false;
    @Output() onEdit: EventEmitter<any> = new EventEmitter();
    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    @Output() onLinkClicked:  EventEmitter<any> = new EventEmitter();
    @Output() onMoreClick: EventEmitter<any> = new EventEmitter();

    dvGraphNodes: DvGraphNodes = null;
    nodes: Node[] = [];
    edges: Edge[] = [];
    loaded = false;
    zoomLevel = 2;
    zoomSpeed = 0.1;
    minZoomLevel = 0.01;
    maxZoomLevel = 10;
    layoutSettings;

    copyToolTip; moreToolTip;

    public curve: any = shape.curveLinear;
    public layout: Layout = new DagreNodesOnlyLayout();

    constructor(private dvGraphService: DvGraphService/*, private storeService: StoreService, private i18n: I18NService*/) {
        //this.dataList = demoData;
        setTimeout(() => {
            this.layoutSettings = {
                orientation: this.direction //TB|LR
            };
            // this.copyToolTip = this.i18n.trans('COPY_NODE_FEATURE_NAME');
            // this.moreToolTip = this.i18n.trans('MORE_NODE_FEATURE_NAME');
        });
    }
    zoomChange(e) {
    }
    zoomIn() {
        this.zoomLevel += 0.02;
        this.dvGraph.zoom(this.zoomLevel);
    }
    zoomOut() {
        this.zoomLevel -= 0.02;
        this.dvGraph.zoomTo(this.zoomLevel);
    }

    ngAfterViewInit(): void {
        this.dvGraphNodes = this.dvGraphService.getDvGraphNodes(this.dataList);
        this._processNodes();
    }

    addingNodes( additonalNodes: DvGraphNode[] ) {
        this.dvGraphNodes = this.dvGraphService.combineGraphNodes(
            this.dvGraphNodes,
            this.dvGraphService.getDvGraphNodes(additonalNodes)
        );
        this._processNodes();
    }

    expand(node) {
        this.onNodeClicked.emit(node);
        this.dvGraphNodes.toggleNode(node);
    }

    collapse(node) {
        this.dvGraphNodes.toggleNode(node);
        this.dvGraphNodes.removeChildrenNodesFor(node);
        this._processNodes();
    }

    _processNodes() {
        this.loaded = false;
        this.nodes = this.dvGraphNodes.nodes;
        this.edges = this.dvGraphNodes.edges;
        setTimeout(() => {
            this.loaded = true;
        }, 0);
    }
    nodeClick(e) {
        if (this.nodeClickable) {
            this.onNodeClicked.emit(e);
        }
    }
    drop(from, to) {
        this.onDrop.emit({
            self: '__id' in from && '__id' in to && from.__id === to.__id  && to.__id === 'DvGraphNode',
            fromData: from,
            toData: to
        });
    }
    delete(node) {
        this.onDelete.emit(node);
    }
    edit(node) {
        this.onEdit.emit(node);
    }
    clickedLine(e) {
        this.onLinkClicked.emit(e);
    }
    copy(node) {
        // clipboardCopy(node.label).then(() => {
        //     //this.copyToolTip = this.i18n.trans('FP_DEP_NODE_COPIED_TITLE');
        // }).catch(err => {
        //     console.error('ClipboardCopy: Could not copy text: ', err);
        // });
    }
    showMore(node) {
        this.onMoreClick.emit(node);
    }
}
