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



$(document).ready(UpdateCalendarEvents("https://www.google.com/calendar/feeds/af9f3hobdapolfftcs4o2usr34%40group.calendar.google.com/public/full?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"));


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
                when = entry[0].gd$when[0].startTime;

            foundevents = true;

            if (nextevent) {
                if (i === 0) {
                    nextevent.appendChild(document.createTextNode(title + "; " + when));
                }
            }

            if (allevents) {
                allevents.appendChild(document.createTextNode(title));
                allevents.appendChild(document.createElement("br"));
                allevents.appendChild(document.createTextNode(when));
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

