var express = require('express');
var router = express.Router();

//Call User Datab
var StateModel = require('../schema/state_table')
//  var CountryModel = require('../schema/country_table');
 var CityModel = require('../schema/city_table');
const { json } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-city-api',function(req,res, next) {
  CityModel.find({}, function(err,mydb1) {
    if (err) {
      res.send(JSON.stringify({'flag':0,'message':'Error in API','err' : err}));

    }else {
      res.send(JSON.stringify({'flag':1,'message':'data listing','data' : mydb1}));
    }
  });
});





router.post('/add-city-api',function(req, res, next) {
  console.log(req.body);

  const mybodydata = {
    city_name: req.body.city_name,

  }
  var data = CityModel(mybodydata);
  data.save(function(err) {
    if(err) {
      res.send(JSON.stringify({'flag':0,'message':'Error in API','err' : err}));
    } else {
      res.send(JSON.stringify({'flag':1,'message':'record Added'}));
    }
  })
  
});

router.delete('/delete-city-api',function(req,res, next) {
  CityModel.findByIdAndRemove(req.body._id, function(err,mydb1) {
    if (err) {
      res.send(JSON.stringify({'flag':0,'message':'Error in API','err' : err}));

    }else {
      res.send(JSON.stringify({'flag':1,'message':'record deleted'}));
    }
  });
});

router.put('/update-city-api/:id',function(req,res, next) {
  console.log(req.params.id);
  CityModel.findByIdAndUpdate(req.params.id, req.body, function(err,post) {
    if (err) {
      res.send(JSON.stringify({'flag':0,'message':'Error in API','err' : err}));

    }else {
      res.send(JSON.stringify({'flag':1,'message':'record updated'}));
    }
  });
});


router.get('/add', function(req, res, next) {

    StateModel.find(function(err, db_state_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_state_array);
            //Render User Array in HTML Table
            res.render('city/add-city', { state_array : db_state_array });
            
          }
      });
  //res.render('add-category');
});


//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);
 
  //Create an Array 
  const mybodydata = {
    city_name: req.body.city_name,
    _state: req.body._state
   
    }
 
    console.log("Name is "  + req.body.city_name);
    console.log("ID is "  + req.body._state);
 
var data = CityModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.redirect('add');
    }
})

});


 


  router.get('/display', function(req, res, next) {

    CityModel.find(function(err, db_city_array){
        
        console.log(db_city_array);

        if (err) res.json({message: 'There are no posts here.'});

        CityModel.find({})
        .populate('_state')
      
          .exec(function(err, db_city_array) {

            console.log(db_city_array);
         
            res.render("city/display-city", { city_array: db_city_array });
          })
      });
   
  });


//Get Single User By ID
router.get('/show/:id', function(req, res) {
  console.log(req.params.id);

  CityModel.findById(req.params.id, function(err, db_city_array) {


      if (err) {
          console.log("Error in Single Record Fetch" + err);
      } else {

        
          console.log(db_city_array);

          res.render('city/single-city-record', { city_array: db_city_array });
      }
  });
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CityModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/city/display');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CityModel.findById(req.params.id, function(err, db_city_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_city_array);

          res.render('city/edit-city-form', { city_array: db_city_array });
      }
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    city_name: req.body.city_name,
    _state: req.body._state
  }

  CityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/city/display');
      } else {
        
          res.redirect('/city/display');
      }
  });
});


module.exports = router;