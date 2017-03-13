var config = {
	apiKey: "AIzaSyDu8VFcwID30t0PhsVL14ImxJal0_75YIU",
	authDomain: "jennychu-1c5a3.firebaseapp.com",
	databaseURL: "https://jennychu-1c5a3.firebaseio.com",
	storageBucket: "jennychu-1c5a3.appspot.com",
	messagingSenderId: "1037201403548"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitTrain").on("click", function() {
	event.preventDefault();

	var trainName = $("#trainName").val().trim();
	var trainDest = $("#trainDest").val().trim();
	var trainFirst = $("#trainFirst").val().trim();
	var trainFreq = Number($("#trainFreq").val().trim());

	console.log("trainFirst: " + trainFirst);
	console.log("trainFreq: " + trainFreq + " & typeof: " + typeof(trainFreq));

	// new temp object to store employee data
	var newTrain = {
		name: trainName,
		destination: trainDest,
		firstTrain: trainFirst,
		frequency: trainFreq,
	}

	// upload employee to database
	database.ref().push(newTrain);

	// moment data
	var currentTime = moment();
	console.log("Current time: " + currentTime + " & converted: " + moment(currentTime).format("hh:mm"));

	var convertedFreq = trainFreq * 6000;

	var firstTrainTime = moment(trainFirst.substring(0,2), "HH");
	console.log("firstTrainTime " + firstTrainTime + " & converted: " + moment(firstTrainTime).format("hh:mm"));

	var minutesDiff = (currentTime - firstTrainTime) % convertedFreq;
	console.log("minutesDiff: " + minutesDiff);

	var convertedMinDiff = Math.floor(((firstTrainTime - currentTime) % convertedFreq) / 6000);
	console.log("convertedMinDiff: " + convertedMinDiff);

	var convertedMinAway = trainFreq + convertedMinDiff;
	console.log("convertedMinAway: " + convertedMinAway)

	var nextArr = currentTime + minutesDiff;
	nextArr = moment(nextArr).format("hh:mm");
	console.log("nextArr: " + nextArr);

	// create new table row to populate new employee data from form
	var newRow = $("<tr>")
		.append($("<td width='14%'>").html(trainName))
		.append($("<td width='14%'>").html(trainDest))
		.append($("<td width='14%'>").html(trainFreq + " min"))
		.append($("<td width='14%'>").html(nextArr))
		.append($("<td width='14%'>").html(convertedMinAway));


	$("#scheduleTable").append(newRow);


	// $("#trainName").val("");
	// $("#trainDest").val("");
	// $("#trainFirst").val("");
	// $("#trainFreq").val("");

})