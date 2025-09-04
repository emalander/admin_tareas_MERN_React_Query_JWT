import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAutorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router();

router.use(authenticate)

router.post(
  '/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
);
// OBTENER TODOS
router.get(
  '/',
  ProjectController.getAllProjects
);
// OBTENER POR ID
router.get(
  '/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById
);
// ROUTES FOR TASKS

router.param('projectId', projectExists)

// ACTUALIZAR 
router.put(
  '/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  handleInputErrors,
  hasAutorization,
  ProjectController.updateProject
);
// BORRAR
router.delete(
  '/:projectId',
  param('projectId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  hasAutorization,
  ProjectController.deleteProject
);



router.post('/:projectId/tasks',
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
  TaskController.createTask
)

router.get('/:projectId/tasks',
  TaskController.getProjectTasks
)

router.param('TaskId', taskExists)
router.param('TaskId', taskBelongsToProject)

router.get('/:projectId/tasks/:TaskId',
  param('TaskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.getTaskById
)

router.put('/:projectId/tasks/:TaskId',
  hasAutorization,
  param('TaskId').isMongoId().withMessage('ID no válido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete('/:projectId/tasks/:TaskId',
  hasAutorization,
  param('TaskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.deleteTask
)

router.post('/:projectId/tasks/:TaskId/status',
  hasAutorization, 
  param('TaskId').isMongoId().withMessage('ID no válido'),
  body('status')
    .notEmpty().withMessage('El estado es obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)
router.post('/:projectId/team/find',
  body('email')
  .isEmail().toLowerCase().withMessage('Email no válido'),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team',
  body('id')
  .isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TeamMemberController.addMemberById
)

router.get('/:projectId/team',

  TeamMemberController.getProjectTeam
)

router.delete('/:projectId/team/:userId',
  param('userId')
  .isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TeamMemberController.removeMemberById
)
router.post('/:projectId/tasks/:TaskId/notes', 
  body('content')
    .notEmpty().withMessage('El contendio de la nota es obligatorio'),
  handleInputErrors,
  NoteController.createNote
)


router.get('/:projectId/tasks/:TaskId/notes', 
  NoteController.getNotes
)

router.delete('/:projectId/tasks/:TaskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID No Válido'),
    handleInputErrors,
    NoteController.deleteNote
)

export default router;