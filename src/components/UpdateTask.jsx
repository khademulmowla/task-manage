import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

const UpdateTask = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-task/${id}`);
                setTasks([response.data]); // Set the specific task data
            } catch (err) {
                console.error('Error fetching task:', err);
            }
        };

        if (id) {
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const name = form.userName.value;
        const email = form.userEmail.value;

        // Generate a timestamp
        const timestamp = new Date().toISOString();

        const formData = { title, category, name, email, timestamp, status: category }
        console.log(formData)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/update-task/${id}`, formData)
            navigate('/my-task')
            toast.success('Data updated successfully')
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)

        }
    }
    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="artifactName">
                        Title
                    </label>
                    <input
                        type="text"
                        id="artifactName"
                        name="title"
                        defaultValue={tasks.title}
                        required
                        placeholder="Enter Task Title"
                        className="w-full px-3 py-2 border  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="artifactType">
                        Category
                    </label>
                    <select
                        id="artifactType"
                        name="category"
                        defaultValue={tasks.category}
                        className="w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a type</option>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="userName">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={user?.displayName}
                            readOnly
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="userEmail">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="userEmail"
                            value={user?.email}
                            readOnly
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2  text-white font-medium rounded-md shadow-sm hover:bg-blue-900 bg-[#ac9a1a] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;