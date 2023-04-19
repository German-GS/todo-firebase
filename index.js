import {saveTask, getTask, onGetTasks, deleteTask, get_Task } from './firebase.js'

const taskform=document.getElementById("task-form")
const taskContainer = document.getElementById('task-container')

let editStatus = false


window.addEventListener('DOMContentLoaded', async ()=>{
        onGetTasks((querySnapshot)=>{
        let html=''

        querySnapshot.forEach((doc) => {
            const task = doc.data()
            html +=`
                <div>
                    <h3> ${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="btn-delete" data-id="${doc.id}" >Delete</button>
                    <button class="btn-edit" data-id="${doc.id}" >Edit</button>
                </div>
            
            `
        });
        
        taskContainer.innerHTML=html
        //=================Se encarga de capturar la informacion del boton de eliminar=================
        const btnDelete = taskContainer.querySelectorAll('.btn-delete')
        btnDelete.forEach(btn=> {
            btn.addEventListener('click', ({target:{dataset}})=>{
                console.log(dataset.id)
                deleteTask(dataset.id)
                console.log("elmininando ")
            })
        })
        //============== Se ecarga de capturar la informacion del boton de editar======================
        const btnEdit = taskContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach(btn=>{
            btn.addEventListener('click',async(e)  =>{
                const doc = await get_Task(e.target.dataset.id)
                const task= doc.data()

                taskform['task-title'].value = task.title
                taskform['task-description'].value =task.description

                editStatus = true
            })

        })


    })
    //console.log(taskContainer)
    //console.log(querySnapshot.empty ? [] : querySnapshot.docs.map(doc => doc.data())) 
})


taskform .addEventListener('submit', (e)=>{
    e.preventDefault()
    const title = taskform['task-title']
    const description = taskform['task-description']
    if(editStatus){
        console.log('updating')
    }else{
        saveTask(title.value, description.value)
    }
    

    taskform.reset()

})
