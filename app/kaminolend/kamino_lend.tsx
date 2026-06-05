import { createSolanaRpc, address } from '@solana/kit';
import { KaminoMarket, KaminoReserve, getMarketsFromApi } from '@kamino-finance/klend-sdk';

const RPC = 'https://api.mainnet-beta.solana.com';
const SLOT_DURATION_MS = 400;

export async function fetchReserves(): Promise<KaminoReserve[]> {
  const rpc = createSolanaRpc(RPC);
  const markets = await getMarketsFromApi();

  const results = await Promise.all(
    markets.slice(0, 2).map((config) =>
      KaminoMarket.load(
        rpc as Parameters<typeof KaminoMarket.load>[0],
        address(config.lendingMarket),
        SLOT_DURATION_MS,
        undefined,
        true
      )
    )
  );

  return results
    .flatMap((market) => market?.getReserves() ?? [])
    .filter((reserve) => reserve.getBorrowedAmount().gt(0));
}
