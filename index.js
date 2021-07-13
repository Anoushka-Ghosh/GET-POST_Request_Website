// console.log('project6');


// //Utility function
// //1. Utility function to get DOM element from string
// function getElementFromString(string){
//     let div=document.createElement('div');
//     div.innerHTML=string;
//     return div.firstElementChild;
// }
// //Initialize no of params
// let addedParamsCount=0;

// //Hide the parameter box initially
// let parametersBox = document.getElementById('parametersBox');
// let jsonBox = document.getElementById('jsonBox');
// parametersBox.style.display = 'none';


// //If the user clicks params box,hide the json box
// let params = document.getElementById('params');
// params.addEventListener('click', () => {
//     parametersBox.style.display = 'block';
//     jsonBox.style.display = 'none';
// })


// //If the user clicks json box,hide the parameter box
// let json = document.getElementById('json');
// json.addEventListener('click', () => {
//     jsonBox.style.display = 'block';
//     parametersBox.style.display = 'none';
// })

// //If the user click on + button add more parameters
// let addParam=document.getElementById('addParam');
// addParam.addEventListener('click',()=>{
//     let paramAdded=document.getElementById('paramAdded');
//     let str=`<div class="row g-3 my-2">
//                 <label for="parameter" class="col-sm-2 col-form-label">Parameter ${addedParamsCount+2}</label>
//                 <div class="col-md-4">
//                     <input type="text" class="form-control" id="key${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} key">
//                 </div>
//                 <div class="col-md-4">
//                     <input type="text" class="form-control" id="value${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} value">
//                 </div>
//                 <div class="col-auto">
//                     <button class="btn btn-primary deleteParam">-</button>
//                 </div>
//             </div>`;
//     //Convert the element string to DOM node
//     let paramElement=getElementFromString(str);
//     // console.log(paramElement);
//     paramAdded.appendChild(paramElement);

//     //Add an event listener to remove the parameter on clicking minus
//     let deleteParam=document.getElementsByClassName('deleteParam');
//     for(let item of deleteParam){
//         item.addEventListener('click',(e)=>{
//             e.target.parentElement.parentElement.remove();
//         })
//     }
//     addedParamsCount ++;
// })

// //If the user clicks on submit button
// let submit=document.getElementById('submit');
// submit.addEventListener('click',()=>{
//     //Show please wait in the response box to request patience from the user
//     document.getElementById('responsePrism').innerHTML='Please wait...fetching response...'

//     //fetch all the values user has entered
//     let url=document.getElementById('url').value;
//     let requestType=document.querySelector("input[name='request']:checked").value;
//     let contentType=document.querySelector("input[name='content']:checked").value;

//     //If user has used params option instead of json, collect all the parameters in an object
//     if(contentType=='params'){
//         data={};
//         for (let i = 0; i < addedParamsCount+1; i++) {
//             if(document.getElementById('key'+(i+1))!=undefined){
//                 let key=document.getElementById('key'+(i+1)).value;
//                 let value=document.getElementById('value'+(i+1)).value;
//                 data[key]=value;
//             }
//         }
//         data=JSON.stringify(data);
//     }
//     else{
//         data=document.getElementById('jsonText').value;
//     }

//     //print all the values in the console for debugging
//     console.log('URL is ',url);
//     console.log('requestType is ',requestType);
//     console.log('contentType is ',contentType);
//     console.log('data is ',data);

//     //If the request type is get,invoke fetch api to create a post request
//     if(requestType=='GET'){
//         fetch(url,{
//             method:'GET'
//         }).then(response=>response.text()).then(data=>{
//             document.getElementById('responsePrism').innerHTML=data;
//             Prism.highlightAll();
//         })
//     }
//     else{
//         fetch(url,{
//             method:'POST',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//             body:data
//         }).then(response=>response.text()).then(data=>{
//             // document.getElementById('responseText').value=data;
//             document.getElementById('responsePrism').innerHTML=data;
//             Prism.highlightAll();
//         })
//     }
// })

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