import React, { useRef } from 'react';
import PropTypes from "prop-types";
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';

const TaskForm = ({ add, length }) => {

    const nameRef = useRef("");
    const descriptionRef = useRef("");
    const levelRef = useRef(LEVELS.NORMAL);

    const addTask = (e) => {
        e.preventDefault()
        const newTask = new Task (
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        )
        add(newTask)
    }

    const normalStyle = {
        color: "blue",
        fontWeight: "bold"
    }

    const urgentStyle = {
        color: "yellow",
        fontWeight: "bold"
    }

    const blockingStyle = {
        color: "red",
        fontWeight : "bold"
    }

    return (
        <form onSubmit={addTask} className='d-flex justify-content-center align-items-center mt-4'>
            <div className='form-outline flex-fill'>
                <input ref={nameRef} id='inputName' type='text' className='font-control form-control-lg mx-2' required placeholder='Task name'></input>
                <input ref={descriptionRef} id='inputDescription' type='text' className='font-control form-control-lg mx-2' required autoFocus placeholder='Task description'></input>
                <select className='form-control-lg' ref={levelRef} defaultValue={LEVELS.NORMAL} id='selectLevel '>
                    <option style={normalStyle} value={LEVELS.NORMAL}>
                        Normal
                    </option>
                    <option style={urgentStyle} value={LEVELS.URGENT}>
                        Urgent
                    </option>
                    <option style={blockingStyle} value={LEVELS.BLOCKING}>
                        Blocking
                    </option>
                </select>
            </div>
            <button type='submit' className='btn btn-success btn-lg ms-2'>
                {length > 0 ? 'Add' : 'Create'}
            </button>
        </form>
    );
}

TaskForm.protoTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default TaskForm;
