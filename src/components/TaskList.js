import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasksSlice';

const TaskList = () => {
	const dispatch = useDispatch();
	const { tasks, status, error } = useSelector((state) => state.tasks);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTasks());
		}
	}, [status, dispatch]);

	if (status === 'loading') {
		return <div>Загрузка...</div>;
	}

	if (status === 'failed') {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					{task.title} {task.completed ? '✔️' : '❌'}
				</li>
			))}
		</ul>
	);
};

export default TaskList;