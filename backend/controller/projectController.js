const ProjectModel = require('../model/Project.model')

const addProject = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProject = new ProjectModel({ title, description, date });
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error adding the project', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        // Find the project by ID and delete it
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProject = async(req,res) =>{
    try {
        const updateProject = await ProjectModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            status:"success",
            data:{
              updateProject
            }
        })
    } catch (error) {
        res.status(404).json({
          status:"fail",
          message:error.message
        })
      }
}

const listAllProject = async (req,res) => { 
    try {
      const projectData = await ProjectModel.find();
      res.status(200).json(projectData)
    } catch (error) {
      res.status(404).json({
        status:"failed to fetch food article",
        message:error.message
      })
    }
   }

   
   const getProjectById = async (req, res) => {
    try {
        
        
        // Find the project by ID
        const project = await ProjectModel.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error getting project by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  

module.exports ={
    addProject,
    deleteProject,
    updateProject,
    listAllProject,
    getProjectById
}