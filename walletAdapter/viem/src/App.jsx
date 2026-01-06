import { useState } from 'react'
import './App.css'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';


const queryClient=new QueryClient();


const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), 
}) 

async function getBalance(){
    const res=await client.getBalance({address: "0x92B0e20fA9cB98B508F554f0Fd69F2636E60C0Cf"});
    console.log(res);
    return res;
  }





function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <GetBalance/>
    </QueryClientProvider>
    </>
  )
}


function useBalance(){
  return useQuery({queryKey: ["balance"], queryFn: getBalance, refetchInterval: 5*1000});
}

function GetBalance(){

  const {data, isLoading, error}=useBalance();

  return <>
  {data} Hi
  </>
}





export default App
