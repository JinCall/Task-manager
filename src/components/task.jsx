import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Task } from '../models/task.class';
import { LEVELS } from "../models/levels.enum";

import "../styles/task.css"


const TaskComponent = ({ task, complete, remove }) => {

    useEffect(() => {
        console.log(`Task ${task.name} created`)
        return () => {
            console.log(`Task: ${task.name} is going to unmount`)
        };
    }, [task]);


    const taskLevelBadge = () => {
        switch (task.level) {
            case LEVELS.NORMAL:
                    return(
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            { task.level }
                        </span>
                    </h6>)
                break;
            
            case LEVELS.URGENT:
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-warning' >
                            { task.level }
                        </span>
                    </h6>)
                break;

            case LEVELS.BLOCKING:
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-danger'>
                            { task.level }
                        </span>
                    </h6>)
                break;
            default:
                break;
        }
    }

    const taskCompleted = () => {
        switch (task.completed) {
            case true:
                    return(
                        <i onClick={() => complete(task)} className='bi-toggle-on task-action' style={ {color: "green" }}></i>)
                break;
            
            case false:
                return(
                    <i onClick={() => complete(task)} className='bi-toggle-off task-action' style={ {color: "grey" }}></i>)
                break;

            default:
                break;
        }
    }

    const taskCompletedStyle = {
        color: "grey",
        textDecoration: "line-through"
    }
    
    const taskPendingSytle = {
        fontWeight: "bold",
        color: "tomato"
    }

    return (
        <tr className='fw-normal' style={ task.completed ? taskCompletedStyle : taskPendingSytle }>
            <th>
                <span className='ms-2'>{ task.name }</span>
            </th>
            <td className='align-middle'>
                <span className='ms-2'>{ task.description }</span>
            </td>
            <td className='align-middle'>
            {/* Sustituir por un badge */}
                <span className='ms-2  task-table-badge'>{ taskLevelBadge() }</span>
            </td>
            <td className='align-middle'>
            {/* Sustituir por icono */}
                <span className='ms-2'>
                    { taskCompleted() }
                    <i onClick={() => remove(task)} className='bi-trash task-action' style={ {color: "tomato" }}></i>
                </span>
            </td>
        </tr>
        //      <div>
        //         <h2 className='task-name'>
        //             Nombre: { task.name }
        //         </h2>
        //         <h3>
        //             Descripcion: { task.description }
        //         </h3>
        //         <h4>
        //             Nivel: { task.level }
        //         </h4>
        //         <h5>
        //             This task is: { task.completed ? "Completed": "Pending" }
        //         </h5>
        //     </div> 
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};


export default TaskComponent;