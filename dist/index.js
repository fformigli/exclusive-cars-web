"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '.env') });
const express_1 = __importDefault(require("express"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const routes_1 = require("./routes");
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
//init
const app = (0, express_1.default)();
require('./lib/passport');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//middlewares
app.use(session({
    secret: 'testsession',
    resave: false,
    saveUninitialized: false
}));
app.use((0, connect_flash_1.default)());
app.use(morgan('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport.initialize());
app.use(passport.session());
// globals
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});
// public
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// routes
app.use(routes_1.routes);
app.use((req, res) => {
    res.status(404).render('others/not_found.hbs');
});
// start
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port ' + app.get('port'));
});
