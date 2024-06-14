const express = require('express');
const port = 8096;
const db = require('./config/mongoose');
const Task = require('./models/task');
const adm = require('./models/Admin');
const pt = require('./models/Patient');
const dr = require('./models/Doctor');

const app = express();

app.use(express.urlencoded({ extended: true })); // Body parser middleware
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', function(req, res){
    Task.find({}).then(tasks => {
        adm.find({}).then(admins => {
            pt.find({}).then(patients => { // Fetch patients here
                dr.find({}).then(doctors => { // Fetch doctors here
                    res.render('home', { task: tasks, adm: admins, pt: patients, dr: doctors });
                }).catch(err => {
                    console.log('Error', err);
                    res.status(500).send('Internal Server Error');
                });
            }).catch(err => {
                console.log('Error', err);
                res.status(500).send('Internal Server Error');
            });
        }).catch(err => {
            console.log('Error', err);
            res.status(500).send('Internal Server Error');
        });
    }).catch(err => {
        console.log('Error', err);
        res.status(500).send('Internal Server Error');
    });
});

app.post('/add-user', function(req, res){
    const task = new Task({
        Name: req.body.Name,
        U_id: req.body.U_id,
        email: req.body.email,
        password: req.body.password,
    });

    task.save()
        .then(() => {
            console.log('User added.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/Admin', function(req, res){
    const ad = new adm({
        Admin_Name: req.body.Admin_Name,
        password: req.body.password,
    });

    ad.save()
        .then(() => {
            console.log('Admin logged in.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/patient', function(req, res){
    const patient = new pt({
        Name: req.body.Name,
        card_id: req.body.card_id,
        gender: req.body.gender,
        Age: req.body.Age,
        address: req.body.address,
        Phone: req.body.Phone,
        Department: req.body.Department,
        Doctor_name: req.body.Doctor_name,
    });

    patient.save()
        .then(() => {
            console.log('Patient details added.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/doctor', function(req, res){
    const doctor = new dr({
        Name: req.body.Name,
        Doctor_id: req.body.Doctor_id,
        gender: req.body.gender,
        address: req.body.address,
        Phone:req.body.Phone,
        Date:req.body.Date,
    });

    doctor.save()
        .then(() => {
            console.log('Doctor logged in.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/delete-user', function(req, res){
    const ids = Object.keys(req.query);

    Task.deleteMany({ _id: { $in: ids } })
        .then(() => {
            console.log('User deleted successfully.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.redirect('back');
        });
});
app.get('/delete-Admin', function(req, res){
    const ids = Object.keys(req.query);

    adm.deleteMany({ _id: { $in: ids } })
        .then(() => {
            console.log('Admin deleted successfully.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.redirect('back');
        });
});
app.get('/delete-patient', function(req, res){
    const ids = Object.keys(req.query);

    pt.deleteMany({ _id: { $in: ids } })
        .then(() => {
            console.log('patient details deleted successfully.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.redirect('back');
        });
});
app.get('/delete-doctor', function(req, res){
    const ids = Object.keys(req.query);

       dr.deleteMany({ _id: { $in: ids } })
        .then(() => {
            console.log('Doctor deleted successfully.');
            res.redirect('back');
        })
        .catch(err => {
            console.log('Error', err);
            res.redirect('back');
        });
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
