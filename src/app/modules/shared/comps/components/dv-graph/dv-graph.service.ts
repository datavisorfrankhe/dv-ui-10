import { Injectable } from '@angular/core';
import { DvGraphNodes } from './dv-graph.entity';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { Observable } from 'rxjs';

@Injectable()
export class DvGraphService {

    public getDvGraphNodes(data: any): DvGraphNodes {
        return new DvGraphNodes(data);
    }

    public combineGraphNodes(originalGraphNodes: DvGraphNodes, additionalGraphNodes: DvGraphNodes): DvGraphNodes {
        originalGraphNodes.combineNodes(additionalGraphNodes);
        return originalGraphNodes;
    }

    public collapseGraphNodes(originalGraphNodes: DvGraphNodes, node: Node): DvGraphNodes {
        originalGraphNodes.removeChildrenNodesFor(node);
        return originalGraphNodes;
    }


}
