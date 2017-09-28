var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground"); 
var middleware  = require("../middleware"); 

//========================================
//  CAMPGROUND ROUTES
// INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err); 
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   // get date from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price; 
   var image = req.body.image; 
   var createdAt = req.body.createdAt; 
   var desc = req.body.description; 
   var author = {
      id: req.user._id,
      username: req.user.username
   }; 
   var newCampground = {name: name, price: price, image: image, description: desc, createdAt: createdAt, author: author}; 
   //create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) {
           console.log(err); 
       } else {
            //redirect back to camgrounds page
            res.redirect("/campgrounds"); 
       }
   });
});

// NEW - SHOW FORM TO CREATE A NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", function(req, res) {
    // FIND A CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
            // console.log(foundCampground); 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect somewhere
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground has been deleted."); 
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router; 