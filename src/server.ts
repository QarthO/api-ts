import App from '@/app';
import IndexRoute from '@routes/index.route';
import MotorsRoute from '@routes/motors.route';
import MotionsRoute from '@routes/motions.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new MotorsRoute(), new MotionsRoute()]);

app.listen();
