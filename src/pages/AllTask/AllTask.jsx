import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


const AllTask = () => {
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": [],
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const categories = ["To-Do", "In Progress", "Done"];
                const updatedTasks = {};
                for (let category of categories) {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${category}`);
                    updatedTasks[category] = response.data;
                }
                setTasks(updatedTasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
        fetchTasks();
    }, []);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const sourceCategory = source.droppableId;
        const destinationCategory = destination.droppableId;

        const newTasks = { ...tasks };
        const movedTask = newTasks[sourceCategory][source.index];

        // Remove from the source category
        newTasks[sourceCategory].splice(source.index, 1);

        // Update the category if moved to a different one
        movedTask.category = destinationCategory;

        // Insert in the destination category at new position
        newTasks[destinationCategory].splice(destination.index, 0, movedTask);

        // Update state
        setTasks(newTasks);

        // Save changes to the database
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/update/${movedTask._id}`, { category: destinationCategory });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">All Tasks</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(tasks).map((category) => (
                        <Droppable droppableId={category} key={category}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="task-column bg-gray-200 p-4 rounded-lg shadow-md min-h-[300px]"
                                >
                                    <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
                                    {tasks[category].map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card bg-white p-4 rounded-lg shadow-md mb-4"
                                                >
                                                    <h3 className="font-semibold">{task.title}</h3>
                                                    <p className="text-sm text-gray-600">{task.category}</p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Created:</span>{" "}
                                                        {new Date(task.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default AllTask;
