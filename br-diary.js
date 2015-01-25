// br-diary.js

var nextevent = document.getElementById("br-nextevent");
var allevents = document.getElementById("br-allevents");
var pagemessage = document.getElementById("br-pagemessage");
var pagemessage2 = document.getElementById("br-pagemessage2");
var foundevents = false;
$("br-nextevent").text("Working...");
$("br-allevents").text("Working...");

pagemessage.innerText = "Working...";
pagemessage2.innerText = "Working...";



$(document).ready(UpdateCalendarEvents(
//"http://www.google.com/calendar/feeds/af9f3hobdapolfftcs4o2usr34%40group.calendar.google.com/public/full?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"
"https://www.google.com/calendar/feeds/af9f3hobdapolfftcs4o2usr34%40group.calendar.google.com/public/basic?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"
));

var d = new Date();
Math.seedrandom(d.getTime());

var bannerpic = document.getElementById("tc-headerlogo");
var bannerimage = document.getElementById("tc-headerimage");
bannerpic.onclick = function(){
	var r= Math.random();
	var numImages= 2;
	var ri= ((r*10)%numImages)+1;
	var randomIndex= Math.floor(ri);
	switch (randomIndex) {
	case 1: bannerimage.src = "brlogo2014.jpg";
		break;
	case 2: bannerimage.src = "br1.png";
		break;
	}
}

/**/
function UpdateCalendarEvents(sourceFile) {

    $.getJSON(sourceFile, function (data) {

        if (data.feed.entry.length != 0) {
            pagemessage.innerText = "";
            $("br-pagemessage").hide();
            pagemessage2.innerText = "";
            $("br-pagemessage2").hide();
        }

        $.each(data.feed.entry, function (i, el) {

            var entry = $(el),
                title = entry[0].title.$t,
                summary = entry[0].summary.$t;
			var when = new Date("1990-01-01");
			
			// Format is "When: Sat 12 Sep 2015<br>\n\n\n<br>Event Status: confirmed"
			var sum = summary.split("<br>");
			for (var sumIndex= 0; sumIndex<sum.length; sumIndex++) {
				var entry= sum[sumIndex].split(":");
				if (entry[0] == "When") {
					when = new Date(entry[1].trim());
				}
			}

            foundevents = true;

            if (nextevent) {
                if (i === 0) {
                    nextevent.appendChild(document.createTextNode(when.toLocaleDateString() + " : " + title));
                }
            }

            if (allevents) {
                allevents.appendChild(document.createTextNode(when.toLocaleDateString() + " : "));
                allevents.appendChild(document.createTextNode(title));
                allevents.appendChild(document.createElement("br"));
                allevents.appendChild(document.createElement("br"));
            }
        });
    })
    .fail(function () {
        pagemessage.innerText = "No dates found.";
        pagemessage2.innerText = "No dates found.";

    });

}

