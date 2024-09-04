let url = 'http://localhost:3000/rpc/methods'

async function callRpcMethod(method, params) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        method: method,
        params: params,
        id: 1,
      }),
    });
    console.log(JSON.stringify({
      jsonrpc: '1.0',
      method: method,
      params: params,
      id: 1,
    }));
  
    const data = await response.json();
  
    if (data.error) {
      console.error('RPC Error:', data.error.message);
    } else {
      console.log('RPC Result:', data.result);
    }
  }
  
  // Example RPC call to 'add' method
  callRpcMethod('add', [5, 7]);
  