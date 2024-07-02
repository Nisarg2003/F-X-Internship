import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
const user = JSON.parse(localStorage.getItem('user'))

const HomePage = () => {
    const [notes, setnotes] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const openModal = (note) => {
        setSelectedNote(note);
        toggleModal();
    };

    const colors = ['#FFECB3', '#FFCDD2', '#B2EBF2', '#E1BEE7', '#FFCCBC'];

    const fetchNotes = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/getNotes', {
                userId: user._id
            });
            if (res.data.success) {
                setnotes(res.data.notes || []);
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
                fetchNotes()
                console.log("Success");
            } else {
                console.log("Error while Deleting notes");
            }
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <Layout>

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
                                <button type="button" onClick={() => openModal(note)} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                            </div>
                        </div>
                    ))}
                    <div className='relative bg-gray-200'>
                        <div
                            className='flex items-center justify-center border rounded-md md:h-[300px] h-[210px] w-full cursor-pointer'
                            onClick={toggleModal}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-400">
                                <FontAwesomeIcon icon={faPlus} className="text-gray-600 text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && <Modal onClose={toggleModal} userId={user._id} note={selectedNote} setnotes={setnotes} fetchNotes={fetchNotes} notes={notes} />}
            </Layout>
        </>
    );
}

export default HomePage;
