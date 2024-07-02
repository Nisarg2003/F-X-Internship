import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
const user = JSON.parse(localStorage.getItem('user'))

const UpcomingTask = () => {
    const [notes, setnotes] = useState([])
    const colors = ['#FFECB3', '#FFCDD2', '#B2EBF2', '#E1BEE7', '#FFCCBC'];
    const fetchUpcomingNotes = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/upcomingTask', {
                user: user._id
            });
            if (res.data.success) {
                setnotes(res.data.notes || []);
                console.log(res.data);
            } else {
                console.log("Error while fetching notes");
            }
        } catch (error) {
            console.log("Error");
        }
    };
    const handleDelete = async (Id) => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/deleteNote', {
                noteId: Id
            });
            if (res.data.success) {
                fetchUpcomingNotes()
                console.log("Success");
            } else {
                console.log("Error while Deleting notes");
            }
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        fetchUpcomingNotes();
    }, []);
    return (
        <>
            <Layout>
                {notes && notes.length > 0 ? (
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        {notes.map((note, index) => (
                            <div key={index} className='border rounded-md md:h-[320px] h-[250px] w-full flex flex-col'
                                style={{ backgroundColor: colors[index % colors.length] }}
                            >
                                <div className='flex flex-col'>
                                    <p className='flex justify-center font-bold text-3xl'>{note.title}</p>
                                    <span className='flex justify-end text-red-500'>(deadline:{note.deadline})</span>
                                </div>
                                <span className='border-b-2 border-gray-300 inline-block w-full'></span>
                                <div className='overflow-y-auto max-h-[100px] md:max-h-[200px]'>
                                    <p className='text-xl ml-1'>{note.description}</p>
                                </div>
                                <div className='mt-auto flex  justify-center space-x-2 mb-2'>
                                    {/* <button type="button" onClick={()=>handleDelete(note._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button> */}
                                    <button type="button" onClick={() => handleDelete(note._id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Task Completed</button>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    <p className='text-4xl font-bold flex justify-center'>No Upcoming Task</p>
                )}
            </Layout>
        </>
    )
}

export default UpcomingTask