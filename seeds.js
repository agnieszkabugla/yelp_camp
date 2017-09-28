var mongoose = require("mongoose"); 
var Campground = require("./models/campground"); 
var Comment = require("./models/comment"); 

var data = [ 
    {
        name: "Salmon Creek", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, sed an solet periculis, quo et omnesque theophrastus, sit ad graeco feugait omnesque. Vulputate adolescens ex eum, no vis equidem referrentur dissentiunt. Nonumes democritum mel ex. Sit at quod ludus probatus, te nusquam appetere eos. Erant timeam meliore te quo, nam hinc eruditi rationibus ne. Sit id iriure definitiones. Cum platonem repudiare te. Prompta senserit his cu, vel et etiam apeirian. Cu nec ridens copiosae. Vis ea sale munere conceptam, sea eu nihil laboramus consetetur. Nam cu sumo deleniti mnesarchum, qui populo conceptam et, modus alterum inimicus ex mei. Epicurei consectetuer ei qui."
    },
    {
        name: "Granite Hill", 
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description: "Lorem ipsum dolor sit amet, sed an solet periculis, quo et omnesque theophrastus, sit ad graeco feugait omnesque. Vulputate adolescens ex eum, no vis equidem referrentur dissentiunt. Nonumes democritum mel ex. Sit at quod ludus probatus, te nusquam appetere eos. Erant timeam meliore te quo, nam hinc eruditi rationibus ne. Sit id iriure definitiones. Cum platonem repudiare te. Prompta senserit his cu, vel et etiam apeirian. Cu nec ridens copiosae. Vis ea sale munere conceptam, sea eu nihil laboramus consetetur. Nam cu sumo deleniti mnesarchum, qui populo conceptam et, modus alterum inimicus ex mei. Epicurei consectetuer ei qui."
    },
    {
        name: "Mountain Goats Rest", 
        image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
        description: "Lorem ipsum dolor sit amet, sed an solet periculis, quo et omnesque theophrastus, sit ad graeco feugait omnesque. Vulputate adolescens ex eum, no vis equidem referrentur dissentiunt. Nonumes democritum mel ex. Sit at quod ludus probatus, te nusquam appetere eos. Erant timeam meliore te quo, nam hinc eruditi rationibus ne. Sit id iriure definitiones. Cum platonem repudiare te. Prompta senserit his cu, vel et etiam apeirian. Cu nec ridens copiosae. Vis ea sale munere conceptam, sea eu nihil laboramus consetetur. Nam cu sumo deleniti mnesarchum, qui populo conceptam et, modus alterum inimicus ex mei. Epicurei consectetuer ei qui."
    }
];

function seedDB () {
  //Remove all campgrounds
  Campground.remove({}, function(err){
      if(err) {
          console.log(err); 
      }
      console.log("removed campgrounds!");
      //add a few campgrounds
      data.forEach(function(seed) {
          Campground.create(seed, function(err, campground){
              if(err) {
                  console.log(err);
              } else {
                  console.log("created a new campground");
                  //create a comment
                  Comment.create(
                      {
                          text: "This place is great, but I wish there was Internet",
                          author: "Homer"
                      }, function(err, comment){
                          if(err) {
                              console.log(err);
                          } else {
                                campground.comments.push(comment); 
                                campground.save();
                                console.log("created new comment"); 
                          }
                      });
              }
          });
      });
  });  
}

module.exports = seedDB; 
