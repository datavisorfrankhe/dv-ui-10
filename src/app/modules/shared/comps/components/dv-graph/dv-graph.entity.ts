import { Edge, Node, Layout } from '@swimlane/ngx-graph';

export class DvGraphNode {
    id: string;
    label: string;
    category: string;
    childrenIds: string[];
    highlighted: boolean;
    expandable: boolean;
    expanded: boolean;
    toolTip: string;
    bChild: boolean;
    childrenCount: number;
    children: any[];
    __id = 'DvGraphNode';
    constructor(data) {
        this.id = data['id'] || '0';
        this.label = data['label'] || '';
        this.category = data['category'] || '';
        this.childrenIds = data['childrenIds'] || [];
        this.highlighted = 'highlighted' in data ? data.highlighted : false;
        this.expandable = 'expandable' in data ? data.expandable : false;
        this.expanded = 'expanded' in data ? data.expanded : false;
        this.toolTip = data['toolTip'] || this.label;
        this.bChild = 'bChild' in data ? data.bChild : true;
        this.childrenCount = 'childrenCount' in data ? data.childrenCount : 0;
        this.children = 'children' in data ? data.children : [];
    }

    hasChild(id: any) {
        return this.childrenIds.find(i => i == id) != null;
    }

    merge(n: DvGraphNode) {
        n.childrenIds.forEach(nId => {
            if (!this.childrenIds.includes(nId)) {
                this.childrenIds.push(nId);
            }
        });
    }
    removeChildId(id) {
        this.childrenIds.splice(this.childrenIds.indexOf(id), 1);
    }
    addChild(n: DvGraphNode) {
        if (!this.hasChild(n.id)) {
            this.children.push(n);
            this.childrenIds.push(n.id);
        }
    }
    removeChild(n: DvGraphNode) {
        if (this.hasChild(n.id)) {
            this.removeChildId(n.id);
            this.children.splice(this.children.indexOf(n), 1);
        }
    }
}

export class DvGraphNodes {
    dvGraphNodes: DvGraphNode[];
    constructor(list) {
        this.dvGraphNodes = [];
        list.forEach(item => {
            this.dvGraphNodes.push(new DvGraphNode(item));
        });
    }

    toggleNode(node: Node) {
        this.findNodeById(node.id).expanded = !this.findNodeById(node.id).expanded;
    }

    combineNodes(dvGraphNodes: DvGraphNodes) {
        dvGraphNodes.dvGraphNodes.forEach((n: DvGraphNode) => {
            const dvGraphNode: DvGraphNode = this.findNodeById(n.id);
            if (!dvGraphNode) {
                this.dvGraphNodes.push(n);
            } else {
                dvGraphNode.merge(n);
            }
        });
    }

    removeChildrenNodesFor(node: Node) {

        const deletableNodeIds = [];
        const findDeletableNodesFor = (currentNode: Node | DvGraphNode) => {
            const currentGraphNode: DvGraphNode = this.findNodeById(currentNode.id);
            if (currentGraphNode.bChild) {
                // nodes only depended by the current node
                this.dvGraphNodes.forEach(n => {
                    if (n.hasChild(currentNode.id)) {
                        n.removeChildId(currentNode.id);

                        if (n.childrenIds.length === 0) {
                            deletableNodeIds.push(n.id);
                            findDeletableNodesFor(this.findNodeById(n.id));
                        }

                    }
                });
            } else {
                // nodes only depending on the current node
                const cIds = [...currentGraphNode.childrenIds];
                currentGraphNode.childrenIds = [];
                cIds.forEach(cId => {
                    const cN = this.findNodeById(cId);
                    if (this.findParentsFor(cN).length === 0) {
                        deletableNodeIds.push(cId);
                        findDeletableNodesFor(cN);
                    }
                });
            }
        };

        findDeletableNodesFor(node);

        for (let i = this.dvGraphNodes.length - 1; i >= 0; i--) {
            if (deletableNodeIds.includes(this.dvGraphNodes[i].id)) {
                this.dvGraphNodes.splice(i, 1);
            }
        }
    }

    findParentsFor(node: DvGraphNode) {
        const parentNodes = [];
        this.dvGraphNodes.forEach(n => {
            if (n.childrenIds.includes(node.id)) {
                parentNodes.push(n);
            }
        });
        return parentNodes;
    }

    isParentNodeDeletable(dvGraphNode: DvGraphNode, node: Node) {
        const tmpNode = node.data || node; //here can be either dvGraphNode or Node, so use this way
        let deletable = false;
        if (tmpNode.childrenIds.includes(dvGraphNode.id)) {
            deletable = true;
        } else {
            //recursively find any parent node of passed ndoe that containing the passed node,
            tmpNode.childrenIds.forEach(id => {
                deletable = this.isParentNodeDeletable(dvGraphNode, this.findNodeById(id));
            });
        }
        return deletable;
    }

    isNodeDeletable(nodeToDelete: DvGraphNode, centerNode: Node) {
        let deletable = false;
        if (nodeToDelete.hasChild(centerNode.id)) {
            deletable = true;
        } else {
            nodeToDelete.childrenIds.forEach(id => {
                deletable = this.isNodeDeletable(this.findNodeById(id), centerNode);
            });
        }
        return deletable;
    }

    findNodeById(id: any) {
        return this.dvGraphNodes.find(n => {
            return n.id == id;
        });
    }

    get nodes(): Node[] {
        const nodes: Node[] = [];
        this.dvGraphNodes.forEach(n => {
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
        this.dvGraphNodes.forEach((n: DvGraphNode) => {
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

    copy() {
        return new DvGraphNodes(this.dvGraphNodes);
    }
}
