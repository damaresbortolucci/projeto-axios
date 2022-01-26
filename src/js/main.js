const statusEl = document.getElementById('status');
const dataEl = document.getElementById('data');
const headersEl = document.getElementById('headers');
const configEl = document.getElementById('config');


//GET
const get = () => {

    const config={
        params: {
            _limit: 10 //params = parâmetros passados pela url, no exemplo: max 10 responses
        }
    }

    axios.get('https://jsonplaceholder.typicode.com/posts', config)
        .then(response => {renderOutput(response)})
}


//POST
const post = () => {

    const data = {
        title: 'Axios-post',
        body: 'Post realizado com sucesso',
        userId: 1,  
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', data)
    .then(response => {renderOutput(response)})
}


//PUT - atualização total
const put = () => {

    const data = {
        title: 'Axios-put',
        body: 'put realizado com sucesso',
        userId: 1
    }

    axios.put('https://jsonplaceholder.typicode.com/posts/1', data)
    .then(response => {renderOutput(response)})
}


//PATCH - atualização parcial
const patch = () => {

    const data = {
        title: 'Axios-patch',
    }

    axios.patch('https://jsonplaceholder.typicode.com/posts/1', data)
    .then(response => {renderOutput(response)})
    
}


//DELETE
const del = () => {

     axios.delete('https://jsonplaceholder.typicode.com/posts/2')
    .then(response => {renderOutput(response)})
}


//MULTIPLAS REQUISIÇÕES
const multiple = () => {

    Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=5')
    ]).then(response => {
        console.table(response[0].data)
        console.table(response[1].data)
    })
}


//MODIFICAR UMA RESPONSE
const transform = () => {

    const config={
        params: {
            _limit: 5
        },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            const payload = JSON.parse(data).map( obj => {
                return{
                    title: obj.title // retornando apenas o title
                }
            });
            
            return payload;
          }]
    }

    axios.get('https://jsonplaceholder.typicode.com/posts', config)
        .then(response => renderOutput(response))
    
}


//ERRORS
const errorHandling = () => {

    axios.get('https://jsonplaceholder.typicode.com/postsz')
    .then(response => renderOutput(response))
    .catch(error => renderOutput(error.response));
    
}


//CANCELAR UMA REQUEST
const cancel = () => {

    const controller = new AbortController(); //interface javascript
    const config = {
        signal: controller.signal
    };

    axios.get('https://jsonplaceholder.typicode.com/posts', config)
    .then(response => renderOutput(response))
    
    // essa função poderia ser chamada, por exemplo, por meio de um buttom
    controller.abort()
}


const clear = () => {
    statusEl.innerHTML = '';
    statusEl.className = '';
    dataEl.innerHTML = '';
    headersEl.innerHTML = '';
    configEl.innerHTML = '';
}


const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute('class');
    let statusElClass = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium';
    if (status >= 500) {
        statusElClass += ' bg-red-100 text-red-800';
    } else if (status >= 400) {
        statusElClass += ' bg-yellow-100 text-yellow-800';
    } else if (status >= 200) {
        statusElClass += ' bg-green-100 text-green-800';
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
}

document.getElementById('get').addEventListener('click', get);
document.getElementById('post').addEventListener('click', post);
document.getElementById('put').addEventListener('click', put);
document.getElementById('patch').addEventListener('click', patch);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('multiple').addEventListener('click', multiple);
document.getElementById('transform').addEventListener('click', transform);
document.getElementById('cancel').addEventListener('click', cancel);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('clear').addEventListener('click', clear);
