import { Spec } from '@specron/spec';
import { GenericProvider } from '../../..';

interface Data {
  provider: GenericProvider;
}

const spec = new Spec<Data>();

spec.before(async (stage) => {
  const provider = new GenericProvider({
    client: stage.web3,
  });

  stage.set('provider', provider);
});

spec.test('returns block data', async (ctx) => {
  const provider = ctx.get('provider');

  const res = await provider.post({
    method: 'web3_clientVersion',
    params: [],
  });

  ctx.is(res.result.indexOf('EthereumJS'), 0);
});

export default spec;
