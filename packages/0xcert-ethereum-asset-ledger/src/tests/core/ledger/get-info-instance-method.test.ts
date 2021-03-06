import { Spec } from '@specron/spec';
import { GenericProvider } from '@0xcert/ethereum-generic-provider';
import { Protocol } from '@0xcert/ethereum-sandbox';
import { AssetLedger } from '../../../core/ledger';

const spec = new Spec<{
  provider: GenericProvider;
  protocol: Protocol;
}>();

spec.before(async (stage) => {
  const protocol = new Protocol(stage.web3);
  stage.set('protocol', await protocol.deploy());
});

spec.before(async (stage) => {
  const provider = new GenericProvider({
    client: stage.web3,
  });
  stage.set('provider', provider);
});

spec.test('returns ledger info (xcert smart contract)', async (ctx) => {
  const provider = ctx.get('provider');
  const ledgerId = ctx.get('protocol').xcert.instance.options.address;
  const ledger = new AssetLedger(provider, ledgerId);
  ctx.deepEqual(await ledger.getInfo(), {
    name: 'Xcert',
    symbol: 'Xcert',
    uriBase: 'http://0xcert.org/',
    schemaId: '0x0500000000000000000000000000000000000000000000000000000000000000',
    supply: '0',
  });
});

spec.test('returns ledger info (erc721 metadata smart contract)', async (ctx) => {
  const provider = ctx.get('provider');
  const ledgerId = ctx.get('protocol').erc721Metadata.instance.options.address;
  const ledger = new AssetLedger(provider, ledgerId);
  ctx.deepEqual(await ledger.getInfo(), {
    name: 'ERC721 Metadata',
    symbol: 'ERC721Metadata',
    uriBase: 'http://0xcert.org/',
    schemaId: null,
    supply: null,
  });
});

export default spec;
