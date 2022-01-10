export class DvFlatNode {
    id: number;
    relatedNodeIds: number[];
    constructor(data) {
        this.id = data.id;
        this.relatedNodeIds = data.children;
    }
}
export class DvFlatNodes {
    dvFlatNodes: DvFlatNode[];
    constructor(list) {
        this.dvFlatNodes = [];
        list.forEach(item => {
            this.dvFlatNodes.push(new DvFlatNode(item));
        });
    }

    findNodeById(id: number): DvFlatNode {
        return this.dvFlatNodes.find(n => n.id === id);
    }
}

export class DvFeatureGraph {
    centerId: number;
    allChildrenNodes: DvFlatNodes;
    allParentNodes: DvFlatNodes;
    constructor(centerId: number, children: DvFlatNodes, parents: DvFlatNodes) {
        this.centerId = centerId;
        this.allChildrenNodes = children;
        this.allParentNodes = parents;
    }

    getChildrenIdsFor(id: number) {
        return this.allChildrenNodes.findNodeById(id) ? this.allChildrenNodes.findNodeById(id).relatedNodeIds : [];
    }
    getParentIdsFor(id: number) {
        return this.allParentNodes.findNodeById(id) ? this.allParentNodes.findNodeById(id).relatedNodeIds : [];
    }
}


/**
 * Datavisor entity nodes denifitions.
 */
export class DvEntityNode {
    id: string;
    entityId: number;
    relatedNodeIds: string[];
    category: any;
    // _depending: Set<DvEntityNode> = new Set();
    // _dependedBy: Set<DvEntityNode> = new Set();

    // get depending() {
    //     return this._depending;
    // }

    // get dependedBy() {
    //     return this._dependedBy;
    // }
    constructor(data) {
        this.id = data.id;
        this.entityId = data.entityId;
        this.relatedNodeIds = data.children ? data.children.map(child => child.category + '_' + child.id) : [];
        this.category = data.category;
        // this._depending = new Set();
        // this._dependedBy = new Set();
    }

    // addDependingNode(node: DvEntityNode) {
    //     if (!this.depending.has(node)) {
    //         this.depending.add(node);
    //     }
    // };

    // addDependedByNode(node: DvEntityNode) {
    //     if (!this.dependedBy.has(node)) {
    //         this.dependedBy.add(node);
    //     }
    // }
}


export class DvEntityNodes {
    dvEntityNodes: DvEntityNode[];
    constructor(list) {
        this.dvEntityNodes = [];
        list.forEach(item => {
            this.dvEntityNodes.push(new DvEntityNode(item));
        });
    }

    findNodeById(id: string): DvEntityNode {
        return this.dvEntityNodes.find(n => n.id === id);
    }

    // findNodeByTypeAndEntityId(entityType: EntityType, entityId: number) {
    //     return this.dvEntityNodes.find(n => n.category === entityType && n.entityId === entityId);
    // }

    getNodesByCategory(category: any): DvEntityNode[] {
        return this.dvEntityNodes.filter(n => n.category === category);
    }

    add(node: DvEntityNode) {
        if (!this.dvEntityNodes.map(n => n.id).includes(node.id)) {
            this.dvEntityNodes.push(node);
        }
    }
}



export class DvDependencyGraph {
    centerId: string;
    allChildNodes: DvEntityNodes;
    allParentNodes: DvEntityNodes;
    constructor(centerId: string, children: DvEntityNodes, parents: DvEntityNodes) {
        this.centerId = centerId;
        this.allChildNodes = children;
        this.allParentNodes = parents;

        // const enrichChildrenNodes = (node: DvEntityNode) => {
        //     this.getChildIdsFor(node.id).forEach(childId => {
        //         const childNode = this.allChildNodes.findNodeById(childId);
        //         node.addDependingNode(childNode);
        //         childNode.addDependedByNode(node);
        //         enrichChildrenNodes(childNode);
        //     });
        // };
        // enrichChildrenNodes(this.getChildrenRootNode());

        // const rootNode = this.getParentsRootNode();

        // const enrichParentsNode = (node: DvEntityNode) => {
        //     this.getParentIdsFor(node.id).forEach(childId => {
        //         const childNode = this.allChildNodes.findNodeById(childId);
        //         node.addDependedByNode(childNode);
        //         childNode.addDependingNode(node);
        //         enrichParentsNode(childNode);
        //     });
        // };
        // enrichParentsNode(rootNode);
    }

    getChildrenRootNode(): DvEntityNode {
        return this.allChildNodes.findNodeById(this.centerId);
    }

    getParentsRootNode(): DvEntityNode {
        return this.allParentNodes.findNodeById(this.centerId);
    }

    getChildIdsFor(id: string): string[] {
        return this.allChildNodes.findNodeById(id) ? this.allChildNodes.findNodeById(id).relatedNodeIds : [];
    }

    getParentIdsFor(id: string): string[] {
        return this.allParentNodes.findNodeById(id) ? this.allParentNodes.findNodeById(id).relatedNodeIds : [];
    }

    getAllRelatedIdsByType(type: any): number[] {
        return [...this.allChildNodes.getNodesByCategory(type), ...this.allParentNodes.getNodesByCategory(type)].map(n => n.entityId);
    }
}
