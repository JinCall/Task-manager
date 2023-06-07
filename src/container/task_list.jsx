import React, { useState, useEffect } from 'react';
import { Task } from '../models/task.class';
import { LEVELS } from '../models/levels.enum';
import TaskComponent from '../components/task';
import TaskForm from '../components/form/taskForm';

import "../styles/task.css"

const TaskListComponent = () => {
    
    const defaultTask1 = new Task("Example1", "Default description1", true, LEVELS.NORMAL)
    const defaultTask2 = new Task("Example2", "Default description2", false, LEVELS.BLOCKING)
    const defaultTask3 = new Task("Example3", "Default description3", true, LEVELS.URGENT)


    // Estado del componente
    const [tasks, setTask] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);
    
    //  Control del ciclo de vida del componente
    
    useEffect(() => {
        console.log("Task state has been modified")
        setTimeout(() => {
            setLoading(false)
        }, 2000);
        return () => {
            console.log("Task list component is going to unmount")
        };
    }, [tasks]);
    
    const completeTask = (task) => {
        console.log("Complete this task: ", task)
        const index = tasks.indexOf(task)
        const tempTask = [...tasks]
        tempTask[index].completed = !tempTask[index].completed
        // Actualizar el estado del componente para que actualice la iteracion para mostrar los neuvos valores
        setTask(tempTask)
    }

    const removeTask = (task) => {
        const index = tasks.indexOf(task)
        const tempTask = [...tasks]
        tempTask.splice(index, 1)
        setTask(tempTask)
    }

    const addTask = (task) => {
        const index = tasks.indexOf(task)
        const tempTask = [...tasks]
        tempTask.push(task)
        setTask(tempTask)
    }

    const Table = () => {
        return (
            <table className="task-table">
                <thead> 
                    <tr>
                        <th className='task-table-title' scope='col'>Title</th>
                        <th className='task-table-title' scope='col'>Description</th>
                        <th className='task-table-title' scope='col'>Priority</th>
                        <th className='task-table-title' scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterar sobre una lista de tareas */}
                    { tasks.map((task, index) => {
                        console.log(task)
                        return(
                            <TaskComponent 
                                key={index} 
                                task={task}
                                complete={completeTask}
                                remove={removeTask}
                            >
                            </TaskComponent>)
                    }) }
                </tbody>
            </table>)
    }

    let taskTable 

    if(tasks.length > 0) {
        taskTable = <Table></Table>
    } else {
        taskTable = (
            <div>
                <h3>There are no tasks</h3>
                <h4>Please add a new task</h4>
            </div>)
    }

    const loadingStyle = {
        color: "grey",
        fontSize: "3rem",
        fontWeight: "bold"
    }

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>
                            Your Task:
                        </h5>
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbar="true" style={ {position: "relative", height: "400px"} }>
                        { loading ? <p style={loadingStyle}>Loading...</p> : taskTable }
                    </div>    
                </div>
                <TaskForm 
                    add={addTask}
                    lenght={tasks.length}
                >
                </TaskForm>
            </div>
        </div>
    );
};

export default TaskListComponent;
