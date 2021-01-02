import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import NoteRoute from './routes/note.route';
import NotebookRoute from './routes/notebook.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new NotebookRoute(), new NoteRoute()]);

app.listen();
