import { GenericProvider, Mutation } from '@0xcert/ethereum-generic-provider';
import { normalizeAddress, bigNumberify } from '@0xcert/ethereum-utils';
import { ValueLedgerBase, ValueLedgerDeployRecipe, ValueLedgerInfo,
  ValueLedgerTransferRecipe, OrderGatewayBase } from "@0xcert/scaffold";
import deploy from '../mutations/deploy';
import getBalance from '../queries/get-balance';
import getInfo from '../queries/get-info';
import approveAccount from '../mutations/approve-account';
import getAllowance from '../queries/get-allowance';
import transfer from '../mutations/transfer';
import transferFrom from '../mutations/transfer-from';

/**
 * Ethereum value ledger implementation.
 */
export class ValueLedger implements ValueLedgerBase {
  protected $id: string;
  protected $provider: GenericProvider;

  /**
   * Initialize value ledger.
   * @param provider Provider class with which we comunicate with blockchain.
   * @param id Address of the erc20 smart contract.
   */
  public constructor(provider: GenericProvider, id: string) {
    this.$id = normalizeAddress(id);
    this.$provider = provider;
  }

  /**
   * Gets the address of the smart contract that represents this value ledger.
   */
  public get id() {
    return this.$id;
  }

  /**
   * Gets the provider that is used to comunicate with blockchain.
   */
  public get provider() {
    return this.$provider;
  }

  /**
   * Deploys a new smart contract representing value ledger to the blockchain. 
   * @param provider Provider class with which we comunicate with blockchain.
   * @param recipe Data needed to deploy a new value ledger.
   */
  public static async deploy(provider: GenericProvider, recipe: ValueLedgerDeployRecipe): Promise<Mutation> {
    return deploy(provider, recipe);
  }

  /**
   * Gets an instance of already deployed value ledger.
   * @param provider Provider class with which we comunicate with blockchain.
   * @param id Address of the erc20 smart contract.
   */
  public static getInstance(provider: GenericProvider, id: string): ValueLedger {
    return new ValueLedger(provider, id);
  }

  /**
   * Gets the amount of value that another account id approved for.
   * @param accountId Account id.
   * @param spenderId Account if of the spender.
   */
  public async getApprovedValue(accountId: string, spenderId: string): Promise<String> {
    return getAllowance(this, accountId, spenderId);
  }

  /**
   * Gets the amount of value a specific account owns.
   * @param accountId Account id.
   */
  public async getBalance(accountId: string): Promise<string> {
    return getBalance(this, accountId);
  }
  
  /**
   * Gets information(name, symbol, total supply, decimals) about the value ledger.
   */
  public async getInfo(): Promise<ValueLedgerInfo> {
    return getInfo(this);
  }

  /**
   * Checks if spender is approved for the specific values.
   * @param accountId Account id.
   * @param spenderId Account id of spender.
   * @param value Value amount we are checking against.
   */
  public async isApprovedValue(value: string, accountId: string, spenderId: string | OrderGatewayBase): Promise<Boolean> {
    if (typeof accountId !== 'string') {
      accountId = await (accountId as any).getProxyAccountId(1);
    }
    const approved = await getAllowance(this, accountId, spenderId as string);
    return bigNumberify(approved).gte(bigNumberify(value));
  }

  /**
   * Approves another account to operate with a specified amount of value.
   * @param accountId Account id.
   * @param value Value amount.
   */
  public async approveValue(value: string, accountId: string | OrderGatewayBase): Promise<Mutation> {
    if (typeof accountId !== 'string') {
      accountId = await (accountId as any).getProxyAccountId(1);
    }
    return approveAccount(this, accountId as string, value);
  }

  /**
   * Disapproves account for operating with your value.
   * @param accountId Account id.
   */
  public async disapproveValue(accountId: string | OrderGatewayBase): Promise<Mutation> {
    if (typeof accountId !== 'string') {
      accountId = await (accountId as any).getProxyAccountId(1);
    }
    return approveAccount(this, accountId as string, '0');
  }

  /**
   * Transfer value to another account.
   * @param recipe Data needed for the transfer.
   */
  public async transferValue(recipe: ValueLedgerTransferRecipe): Promise<Mutation> {
    return recipe.senderId
      ? transferFrom(this, recipe.senderId, recipe.receiverId, recipe.value)
      : transfer(this, recipe.receiverId, recipe.value);
  }

}
