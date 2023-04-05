function responseMessage(response, jsonMessage) {
  response.writeHead(200, { 'Content-Type': 'application/json' });

  if( jsonMessage === undefined || jsonMessage === null ) {
    return response.end("{}");
  }

  let jsonResponse = {};

  if (jsonMessage.constructor === Array) {
    jsonResponse = {items: jsonMessage};
  } else {
    jsonResponse = {item: jsonMessage};
  }

  response.end( JSON.stringify(jsonResponse) );
}

function getExecuteParamsWithRequest(request) {
  return {
    params: request.params,
    query: request.query,
    body: request.body,
  }
}

async function _defaultProc(request, response, fnExecute) {
  try {
    const params = getExecuteParamsWithRequest(request);
    const result = await fnExecute(params);
    return responseMessage(response, result);

  } catch (error) {
    console.error(error);
    response.end( JSON.stringify(error) );

  }
}

class API {
  #app = null;

  init(app) {
    this.app = app;
  }

  get(url, fnExecute) {
    this.app.get(url, async function(request, response) {
      return await _defaultProc(request, response, fnExecute);
    });
  }

  post(url, fnExecute) {
    this.app.post(url, async function(request, response) {
      return await _defaultProc(request, response, fnExecute);
    });
  }

  put(url, fnExecute) {
    this.app.put(url, async function(request, response) {
      return await _defaultProc(request, response, fnExecute);
    });
  }

  delete(url, fnExecute) {
    this.app.delete(url, async function(request, response) {
      return await _defaultProc(request, response, fnExecute);
    });
  }
}

const api = new API();

module.exports = {
  api
}