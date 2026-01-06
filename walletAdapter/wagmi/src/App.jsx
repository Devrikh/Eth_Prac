import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'


export const config = createConfig({
  chains: [mainnet  ],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})


const queryClient = new QueryClient()




function App() {

  return (
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector/> 
        <EthSend/>
        <MyDetails/>
      </QueryClientProvider> 
    </WagmiProvider>
    
    </>
  )
}


function MyDetails(){
  const {address}=useAccount()
  const balance= useBalance({address})
  console.log(balance)
  return <div>
    {address}<br></br>
    Balance: {balance?.data?.value}
  </div>
}


function WalletConnector(){

  const {connectors, connect}=useConnect();

  return connectors.map((connector)=>(
    <button key={connector.uid} onClick={()=>{connect({connector})}}>{connector.name}</button>
  ))

}




function EthSend(){

  const { data: hash, sendTransaction } = useSendTransaction()
  
function sendETH(){
  sendTransaction({
     to: document.getElementById("address").value ,
     value: "100000000000000000"
  })

}





  return <>
        <input id='address' type='text' placeholder='Address..'></input>
        <button onClick={sendETH}>Send 0.1 ETH</button>
        {hash && <div>Transaction Hash: {hash}</div>}
  </>
}

export default App
