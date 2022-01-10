import { Injectable } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { Observable } from 'rxjs';
import { DvGraphNodes } from '@src/app/modules/shared/comps/components/dv-graph/dv-graph.entity';

@Injectable()
export class DvFlowBuilderService {

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
