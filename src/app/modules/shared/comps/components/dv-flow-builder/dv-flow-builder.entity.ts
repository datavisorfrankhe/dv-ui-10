import { DvGraphNode } from '@src/app/modules/shared/comps/components/dv-graph/dv-graph.entity';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
// import { UtilService } from '@src/app/modules/shared/services/util.service';

enum AvailableElementTypes {
    RULESET = 'RULESET',
    RULE = 'RULE',
    CONDITION = 'CONDITION',
    ACTION = 'ACTION'
}

export class GraphActions {
    historicalActionStack;
    constructor() {
        this.historicalActionStack = [];
    }
    push(dvFlowBuilderNodes: DvFlowBuilderNodes) {
        this.historicalActionStack.push(JSON.stringify(dvFlowBuilderNodes));
    }
    pop() {
        return new DvFlowBuilderNodes(JSON.parse(this.historicalActionStack.pop()));
    }
    get empty() {
        return this.historicalActionStack.length === 0;
    }
}


export class DroppableElementType {
    type: string;
    label: string;
    constructor(data) {
        if (data) {
            this.type = data.type || '';
            this.label = data.label || '';
        }
    }
}

export class DroppableElementTypes {
    droppableElementTypes: DroppableElementType[];
    constructor(data = null) {
        this.droppableElementTypes = [];
        if (data) {
            //to do
        } else {
            this.droppableElementTypes.push(new DroppableElementType({
                type: AvailableElementTypes.RULESET,
                label: AvailableElementTypes.RULESET,
            }));
            this.droppableElementTypes.push(new DroppableElementType({
                type: AvailableElementTypes.RULE,
                label: AvailableElementTypes.RULE,
            }));
            this.droppableElementTypes.push(new DroppableElementType({
                type: AvailableElementTypes.CONDITION,
                label: AvailableElementTypes.CONDITION,
            }));
            this.droppableElementTypes.push(new DroppableElementType({
                type: AvailableElementTypes.ACTION,
                label: AvailableElementTypes.ACTION,
            }));
        }
    }
}

export class DvFlowBuilderNode {

    dvGraphNode: DvGraphNode;
    type: DroppableElementType;
    standAlone = false;
    //util: UtilService;
    constructor(data) {
        //this.util = new UtilService();

        if ('dvGraphNode' in data) {
            this.dvGraphNode = new DvGraphNode(data.dvGraphNode);
        } else {
            if (!('id' in data)) {
                data['id'] = Math.floor(Math.random()*10000); //this.util.uuid;
            }
            if ('type' in data) {
                this.type = data['type'];
            }
            if (!('label' in data)) {
                data['label'] = this.type.label;
            }
            if ('standAlone' in data) {
                this.standAlone = data.standAlone;
            }
            this.dvGraphNode = new DvGraphNode(data);
        }


    }
    get id() {
        return this.dvGraphNode.id;
    }
    get label() {
        return this.dvGraphNode.label;
    }
    get childrenIds() {
        return this.dvGraphNode.childrenIds;
    }
    add(n: DvFlowBuilderNode) {
        this.dvGraphNode.addChild(n.dvGraphNode);
    }
    remove(n: DvFlowBuilderNode) {
        this.dvGraphNode.removeChild(n.dvGraphNode);
    }
}

export class DvFlowBuilderNodes {
    dvFlowBuilderNodes: DvFlowBuilderNode[];
    constructor(data = null) {
        this.dvFlowBuilderNodes = [];
        if (data) {
            if ('dvFlowBuilderNodes' in data) {
                data.dvFlowBuilderNodes.forEach(item => {
                    this.dvFlowBuilderNodes.push(new DvFlowBuilderNode(item));
                });
            } else {
                data.forEach(item => {
                    this.dvFlowBuilderNodes.push(new DvFlowBuilderNode(item));
                });
            }

        }
    }

    refresh() {
        this.dvFlowBuilderNodes = [];
        this.dvFlowBuilderNodes.push(new DvFlowBuilderNode({
            label: 'Start'
        }));
    }

    addTypeToNode(type: DroppableElementType, to: DvFlowBuilderNode = null) {
        const newNode = new DvFlowBuilderNode({ type, standAlone: !to });
        this.dvFlowBuilderNodes.push(newNode);
        if (to) {
            to.add(newNode);
        }
    }

    addNodeToNode(from: DvFlowBuilderNode, to: DvFlowBuilderNode) {
        to.standAlone = false; from.standAlone = false;
        to.add(from);
    }

    addNodeIdToNodeId(fromId, toId) {
        this.addNodeToNode(
            this.findById(fromId),
            this.findById(toId)
        );
    }

    prependTypeToNode(type: DroppableElementType, to: DvFlowBuilderNode = null) {
        const newNode = new DvFlowBuilderNode({ type, standAlone: !to });
        this.dvFlowBuilderNodes.push(newNode);
        if (to) {
            this.findAllParentsForNode(to).forEach(node => {
                node.remove(to);
                node.add(newNode);
            });
            newNode.add(to);
        }
    }

    prependNodeToNode(from: DvFlowBuilderNode, to: DvFlowBuilderNode) {
        to.standAlone = false; from.standAlone = false;
        this.findAllParentsForNode(to).forEach(node => {
            node.remove(to);
            node.add(from);
        });
        from.add(to);
    }

    findAllParentsForNode(node: DvFlowBuilderNode) {
        return this.dvFlowBuilderNodes.filter(n => n.childrenIds.includes(node.id));
    }

    remove(n: DvFlowBuilderNode) {
        for (let i = this.dvFlowBuilderNodes.length - 1; i >= 0; i--) {
            this.dvFlowBuilderNodes[i].remove(n);
        }
        this.dvFlowBuilderNodes.splice(this.dvFlowBuilderNodes.indexOf(n), 1);
    }

    updateLabelFor(label: string, id: string) {
        this.findById(id).dvGraphNode.label = label;
    }

    findById(id): DvFlowBuilderNode {
        return this.dvFlowBuilderNodes.find(item => item.id === id);
    }

    get nodes(): Node[] {
        const nodes: Node[] = [];
        this.dvFlowBuilderNodes.forEach(n => {
            const node: Node = {
                id: '' + n.id,
                label: n.label,
                data: n
            };
            nodes.push(node);
        });
        return nodes;
    }
    get edges(): Edge[] {
        const edges: Edge[] = [];
        //here, we need to get ALL the edges
        this.dvFlowBuilderNodes.forEach(n => {
            if (n.childrenIds.length > 0) {
                n.childrenIds.forEach(id => {
                    const e: Edge = {
                        source: '' + n.id,
                        target: '' + id
                    };
                    edges.push(e);
                });
            }
        });
        return edges;
    }
}
