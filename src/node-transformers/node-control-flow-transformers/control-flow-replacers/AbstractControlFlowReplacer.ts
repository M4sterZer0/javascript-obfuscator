import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @returns {string}
     */
    protected static getStorageKey (): string {
        return RandomGeneratorUtils.getRandomGenerator().string({
            length: 3,
            pool: RandomGeneratorUtils.randomGeneratorPool
        });
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public abstract replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node;
}