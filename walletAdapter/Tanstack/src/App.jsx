import { useEffect, useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const queryClient= new QueryClient();


async function getter() {
      const res= await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
  }



function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Posts/>      
      </QueryClientProvider>
    </>
  )
}



function Posts(){

  const {data, isLoading, error}= useQuery(  {queryKey: ['posts'], queryFn: getter, refetchInterval: 10*1000
  });
  if(error){
    return <div>error while laoding </div>
  }
  if(isLoading){
    return <div>
    Loading...
    </div>
  }
  return <> 
  {JSON.stringify(data)}
  </>
}

export default App
