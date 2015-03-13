# Polar Flow Export
Bookmarklet for exporting your [Polar Flow](https://flow.polar.com/) data.

### Installation
Create a bookmark with following content:
```javascript
javascript:(!function(){function e(e){$("#polar-flow-export").remove();var t=$('<div id="polar-flow-export"></div>');t.css({position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:9999,background:"white",padding:"0 40px",boxSizing:"border-box"}).appendTo($("body")),$("<h1>Export Polar flow data</h2>").val("foobar").appendTo(t),e?($("<p>You may now copy-paste the information below to a spreadsheet program (such as Excel or Google Spreadsheet).</p>").appendTo(t),$("<textarea></textarea>").css({width:"100%",height:300}).val(e).appendTo(t)):$("<img />").attr("src","http://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif").appendTo(t),$("<br/>").appendTo(t);var o="https://github.com/Pyppe/polar-flow-export";$('<p>See <a href="'+o+'" target="_blank">'+o+"</a> for more details about this bookmarklet.</p>").appendTo(t).find("a").css({color:"#d10027"}),$('<button class="button" type="button">Close</button>').css({fontSize:"20px"}).click(function(){t.remove()}).appendTo(t)}function t(e){function t(e){return("00"+e).slice(-2)}var o=/(\d+) hours? (\d+) minutes/g,a=o.exec(e);return a&&3===a.length?[t(a[1]),t(a[2]),"00"].join(":"):null}function o(){var e="https://flow.polar.com/diary";if(0===window.location.href.indexOf(e))return!0;var t=confirm(["You are not on correct page for export. Redirect to Polar Flow Diary?","","NOTE: You must re-run bookmarklet on that page."].join("\n"));return t?(window.location=e,!1):!1}function a(o,a){var i=a.diff(o,"days"),l=_.reduce(_.range(0,i+1),function(e,t){return e.push(moment(o).add(t,"d")),e},[]),p=(new Date).getTime(),s=_.map(l,function(e){var o=e.format(r),a=["https://flow.polar.com/activity/summary/",o,"/",o,"/day?_=",p].join("");return $.get(a).then(function(o){var a=$("<div>"+o+"</div>"),n=a.find(".sleep-tracked-icon-image:eq(0) > span"),r=a.find(".sleep-tracked-icon-image:eq(1) .value-huge").text(),i=a.find(".steps-icon-image .value-huge").text(),l=a.find(".distance-icon-image .value-huge").text(),p=a.find(".calories-icon-image .value-huge").text();return i&&parseInt(i)>0?{day:e,data:{totalSleep:t(n.eq(0).text()),restfulSleep:t(n.eq(2).text()),restlessSleep:t(n.eq(3).text()),restfulSleepPercentage:r,stepCount:i,distance:l,kcal:p}}:null})});e(null),$.when.apply($,s).then(function(){var t=["Day","Steps","Distance","Calories (kcal)","Total sleep","Restful sleep","Restless sleep","Restful sleep %"].join("	"),o=_.reduce(_.compact(arguments),function(e,t){var o=t.data;return e.push([t.day.format(n),o.stepCount,o.distance,o.kcal,o.totalSleep,o.restfulSleep,o.restlessSleep,o.restfulSleepPercentage].join("	")),e},[t]);e(o.join("\n"))})}var n="YYYY-MM-DD",r="D.M.YYYY";!function(){if(o()){var e=moment().add(-7,"d").format(n),t=prompt("Give either start day of export (e.g. "+e+") or number of days from now to export (e.g. 7)","7"),r=moment(t,n);if(r.isValid()){e=moment().format(n);var i=prompt("Give end day of export (e.g. "+e+")",e),l=moment(i,n);l.isValid()?a(r,l):alert("Invalid input.")}else/^\d+$/gi.test(t)?a(moment().subtract(parseInt(t),"d"),moment()):alert("Invalid input.")}}()}(););
```

### Screenshot
![Screenshot](/polar-flow-export.png?raw=true "Screenshot")
