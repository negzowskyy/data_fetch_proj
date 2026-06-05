import { fetchReserves } from './kaminolend/kamino_lend';
import { useJupLendData } from './juplend/hooks/useJupLendData';

const KAMINO_DATA = await fetchReserves();
const JUPLEND_DATA = await useJupLendData();

export default async function App() {
  
  console.log('Kamino Tokens:', KAMINO_DATA);
  console.log('JupLend Tokens:', JUPLEND_DATA.tokens);

  const FILTERED_BY_SYMBOL = KAMINO_DATA.filter(

    kaminoTokens => JUPLEND_DATA.tokens.some(
    
      jupTokens => jupTokens.symbol === kaminoTokens.symbol &&
      jupTokens.mint === kaminoTokens.stats.mintAddress
    
    )
  );

  console.log('Filtered Tokens (by symbol):', FILTERED_BY_SYMBOL);

  return (
    <div>
      <h1>Kamino Lend and JupLend Data comparison</h1>
      <p>check the console for more information!</p>
    </div>
  );
}
