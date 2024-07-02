import express from 'express'
import { loginController, registerController } from '../Controller/userController.js'
import { createNote, deleteNotes, getAllNotes, getTodayNotes, getUpcomingNotes, updateNotes } from '../Controller/notesController.js'

const router = express.Router()

router.post('/login',loginController)
router.post('/register',registerController)

router.post('/createNotes',createNote)
router.post('/getNotes',getAllNotes)
router.post('/deleteNote',deleteNotes)
router.post('/upcomingTask',getUpcomingNotes)
router.post('/todaysTask',getTodayNotes)
router.put('/updateNote/:id',updateNotes)


export default router
