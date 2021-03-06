const { TokenMock } = require('@0xcert/ethereum-erc20-contracts/build/token-mock');
const { NFTokenEnumerableMock } = require('@0xcert/ethereum-erc721-contracts/build/nf-token-enumerable-mock');
const { NFTokenMetadataMock } = require('@0xcert/ethereum-erc721-contracts/build/nf-token-metadata-mock');
const { NFTokenMock } = require('@0xcert/ethereum-erc721-contracts/build/nf-token-mock');
const { XcertMock } = require('@0xcert/ethereum-xcert-contracts/build/xcert-mock');
const { XcertCreateProxy } = require('@0xcert/ethereum-proxy-contracts/build/xcert-create-proxy');
const { TokenTransferProxy } = require('@0xcert/ethereum-proxy-contracts/build/token-transfer-proxy');
const { NFTokenTransferProxy } = require('@0xcert/ethereum-proxy-contracts/build/nftoken-transfer-proxy');
const { NFTokenSafeTransferProxy } = require('@0xcert/ethereum-proxy-contracts/build/nftoken-safe-transfer-proxy');
const { NFTokenReceiverTestMock } = require('@0xcert/ethereum-erc721-contracts/build/nf-token-receiver-test-mock');
const { OrderGateway } = require('@0xcert/ethereum-order-gateway-contracts/build/order-gateway');

/**
 * ERC20 contract data.
 */
export const erc20 = {
  abi: TokenMock.abi,
  bytecode: TokenMock.evm.bytecode.object,
};

/**
 * Enumerable ERC721 contract data.
 */
export const erc721Enumerable = {
  abi: NFTokenEnumerableMock.abi,
  bytecode: NFTokenEnumerableMock.evm.bytecode.object,
};

/**
 * ERC721 metadata contract data.
 */
export const erc721Metadata = {
  abi: NFTokenMetadataMock.abi,
  bytecode: NFTokenMetadataMock.evm.bytecode.object,
};

/**
 * ERC721 contract data.
 */
export const erc721 = {
  abi: NFTokenMock.abi,
  bytecode: NFTokenMock.evm.bytecode.object,
};

/**
 * ERC721 receiver.
 */
export const erc721receiver = {
  abi: NFTokenReceiverTestMock.abi,
  bytecode: NFTokenReceiverTestMock.evm.bytecode.object,
};

/**
 * Xcert contract data.
 */
export const xcert = {
  abi: XcertMock.abi,
  bytecode: XcertMock.evm.bytecode.object,
};

/**
 * Xcert create proxy contract data.
 */
export const xcertCreateProxy = {
  abi: XcertCreateProxy.abi,
  bytecode: XcertCreateProxy.evm.bytecode.object,
};

/**
 * Token transfer proxy data.
 */
export const tokenTransferProxy = {
  abi: TokenTransferProxy.abi,
  bytecode: TokenTransferProxy.evm.bytecode.object,
};

/**
 * Non-fungible token transfer proxy data.
 */
export const nftokenTransferProxy = {
  abi: NFTokenTransferProxy.abi,
  bytecode: NFTokenTransferProxy.evm.bytecode.object,
};

/**
 * Non-fungible token safe transfer proxy data.
 */
export const nftokenSafeTransferProxy = {
  abi: NFTokenSafeTransferProxy.abi,
  bytecode: NFTokenSafeTransferProxy.evm.bytecode.object,
};

/**
 * Decentralized orderGateway contract data.
 */
export const orderGateway = {
  abi: OrderGateway.abi,
  bytecode: OrderGateway.evm.bytecode.object,
};
