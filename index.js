function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

let paramAddedCount=0;
let jsonBox=document.getElementById('jsonBox');
let parametersBox=document.getElementById('parametersBox');
parametersBox.style.display='none';

let json=document.getElementById('json');
json.addEventListener('click',()=>{
    jsonBox.style.display='block';
    parametersBox.style.display='none';
})

let params=document.getElementById('params');
params.addEventListener('click',()=>{
    parametersBox.style.display='block';
    jsonBox.style.display='none';
})

let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let paramAdded=document.getElementById('paramAdded');
    let html=`<div class="row g-3 my-3">
                <label for="parameter" class="col-sm-2 col-form-label">Parameter ${paramAddedCount+2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="key${paramAddedCount+2}" placeholder="Enter Parameter ${paramAddedCount+2} key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="value${paramAddedCount+2}" placeholder="Enter Parameter ${paramAddedCount+2} value">
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary deleteParam">-</button>
                </div>
            </div>`;
    let paramElem=getElementFromString(html);
    paramAdded.appendChild(paramElem);

    let deleteParam=document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove();
        })
    }
    paramAddedCount++;  
})

let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    let url=document.getElementById('url').value;
    let request=document.querySelector("input[name='request']:checked").value;
    let content=document.querySelector("input[name='content']:checked").value;
    let responsePrism=document.getElementById('responsePrism');
    responsePrism.innerHTML='Please wait...';

    
    if(content=='params'){
        data={};
        for(i=0;i<paramAddedCount+1;i++){
            if(document.getElementById('key'+(i+1))!=undefined){
                let key=document.getElementById('key'+(i+1)).value;
                let value=document.getElementById('value'+(i+1)).value;
                data[key]=value;
            }
        }
        data=JSON.stringify(data);
    }
    else{
        data=document.getElementById('jsonText').value;
    }
    
    // console.log(url);
    // console.log(request);
    // console.log(content);
    // console.log(data);
    

    if(request=='GET'){
        fetch(url,{
            method:'GET'
        }).then(response=>response.text()).then(data=>{
            responsePrism.innerHTML=data;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url,{
            body:data,
            headers:{
                'content-type':'application/json'
            },
            method:'POST'
        }).then(response=>response.text()).then(data=>{
            responsePrism.innerHTML=data;
            Prism.highlightAll();
        })
    }
})
