var friends = require("../data/friends");
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.send(friends);
    });
//This function adds a new user
	//Req.body is the incoming survey data.
	app.post('/api/friends', function(req, res){

		var newFriend = req.body;
		friends.push(newFriend);

		var totalDifference = 0;
		var allDifferences = [];

		//Loop through all of the stored friends (minus one because the last stored friend is the current user)
		for (var i=0; i<(friends.length-1); i++){

			//Loop through all of question values and sum total their subtracted absolute values
			for (var j=0; j<10; j++){
				totalDifference += Math.abs(friends[i].scores[j] - newFriend.scores[j]);
			}

			allDifferences.push(totalDifference);
			totalDifference = 0;
		}

		//Give the smallest value in the array
		var bestMatch = friends[allDifferences.indexOf(Math.min.apply(null, allDifferences))];

		res.send(bestMatch);

	});

}