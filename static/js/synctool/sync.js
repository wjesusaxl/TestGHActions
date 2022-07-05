let btnRun = document.querySelector("#btn-run");
let modelCheks = document.getElementsByName("check-model");

btnRun.onclick = RunProcess;

let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
let processResult = document.querySelector("#process-result");

function ClearSelection(){
    modelCheks.forEach(m =>{
        m.checked = false;
    });
}

function SetStatus4All(status=true){
    modelCheks.forEach(m =>{
        m.checked = status;
    });
}

function RunProcess(){
    
    models = [];
    modelCheks.forEach(m =>{
        if(m.checked)
           models.push(m.value);
    })

    SubmitProcess({"models": models});
}

function SubmitProcess(data){
    let props = {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrfToken,
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3MDMyMjY5LCJpYXQiOjE2NTcwMjg2NjksImp0aSI6ImQ5ZWQ0ZTJjMTg3NDQ1ZTVhOGIyZjYyZGU1NmRlYjQ4IiwidXNlcl9pZCI6MX0.q5bqfwbJdw-erisNwR2wgjuWOmO9ulsVZqgYi1ZnjJc"
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }

    APIurl = domain + "/enginedb/sync/local/geodb";

    processResult.value += '[Start] -> ' + new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString() + '\n';

    fetch(APIurl, props)
    .then(async response => ({
        result: await response.json(),
        response: response
    }))
    .then(data => {
        processResult.value += '\n['+ data["response"]["status"] + "] - " + data["response"]["statusText"] + ' -> ' + new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString() +'\nResult:\n' + JSON.stringify(data["result"]) + '\n';
    })
    .catch((error) => {
        processResult.value += '\n'+ error['detail'] + '\n';
    });     
}

