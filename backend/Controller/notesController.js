import notesModel from "../Model/notesModel.js"
import userModel from "../Model/userModel.js";

export const createNote = async(req,res)=>{
    try{

        const {title,description,user,deadline} = req.body
        if(!user){
            return res.send({ message: "User not found"});
        }
        const notes = await new notesModel({
            title,
            description,
            deadline,
            user:user
        }).save()

        return res.status(201).send({
            success:true,
            message:"Successfully created",
            notes
        })
    }catch(error){
        return res.status(400).send({
            success:false,
            message : "Error in Creating Notes",
            error
        })
        console.log(error)
    }
}

export const getAllNotes = async(req,res)=>{
    try{
        const {userId} = req.body

        const notes = await notesModel.find({user:userId})

        return res.status(201).send({
            success:true,
            message:"Successfully created",
            notes
        })
    }catch(error){
        return res.status(400).send({
            success:false,
            message : "Error in fetching Notes",
            error
        })
    }
}

export const deleteNotes = async(req,res)=>{
    try {
        const {noteId} = req.body
        const deletedNote = await notesModel.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
        });
    } catch (error) {
        return res.status(400).send({
            success:false,
            message : "Error in Deleting Notes",
            error
        })
    }
}
export const getUpcomingNotes = async (req, res) => {
    try {
      const {user} = req.body;
      const today = new Date().toISOString();
      
      console.log('User ID:', user);
      console.log('Today:', today);
  
      const upcomingNotes = await notesModel.find({
        user: user,
        deadline: { $gt: today }
      }).sort({ deadline: 1 });
  
      console.log('Upcoming Notes:', upcomingNotes);
  
      return res.status(200).json({
        success: true,
        notes: upcomingNotes
      });
    } catch (error) {
      console.error('Error in fetching upcoming notes:', error);
      return res.status(400).send({
        success: false,
        message: 'Error in fetching upcoming notes',
        error
      });
    }
  };

  export const getTodayNotes = async (req, res) => {
    try {
      const { user } = req.body;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
  
      
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
  
      console.log('User ID:', user);
      console.log('Today:', today.toISOString());
      console.log('Tomorrow:', tomorrow.toISOString());
  
      const todayTask = await notesModel.find({
        user: user,
        deadline: {
          $gte: today.toISOString(),
          $lt: tomorrow.toISOString()
        }
      }).sort({ deadline: 1 });
  
      console.log('Today Notes:', todayTask);
  
      return res.status(200).json({
        success: true,
        notes: todayTask
      });
    } catch (error) {
      console.error('Error in fetching today\'s notes:', error);
      return res.status(400).send({
        success: false,
        message: 'Error in fetching today\'s notes',
        error
      });
    }
  };

export const updateNotes = async(req,res)=>{
  try {
    const {title,description,deadline} = req.body
    const {id} = req.params
    console.log(id)
    const updatedNote = await notesModel.findByIdAndUpdate(id,{
      title,
      description,
      deadline,
    },{ new: true })
    if (!updatedNote) {
      return res.status(404).json({
          success: false,
          message: 'Note not found',
      });
  }
  return res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    note: updatedNote,
});
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: 'Error in Updating Note',
      error
    });
  }
}
  