import {saveTask, getTask, onGetTasks, deleteTask } from './firebase.js'

const taskform=document.getElementById("task-form")
const taskContainer = document.getElementById('task-container')


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
                </div>
            
            `
        });
        
        taskContainer.innerHTML=html
        const btnDelete = taskContainer.querySelectorAll('.btn-delete')
        btnDelete.forEach(btn=> {
            btn.addEventListener('click', ({target:{dataset}})=>{
                console.log(dataset.id)
                deleteTask(dataset.id)
                console.log("elmininando ")
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

    saveTask(title.value, description.value)

    taskform.reset()

})
