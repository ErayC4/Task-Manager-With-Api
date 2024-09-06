import React, { useEffect, useState } from 'react';

function TasksList(props) {

    return (
        <div>
            hi
            {props.tasks.map((task) => {
                return <div key={task.id}>{task.name}</div>
            })}
        </div>
    );
}

export default TasksList;