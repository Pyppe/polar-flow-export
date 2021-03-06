# Polar Flow Export
Bookmarklet for exporting your [Polar Flow](https://flow.polar.com/) data.

### Installation
Create a bookmark with following content:
```javascript
javascript:(function(){!function(){function e(e){$("#polar-flow-export").remove();var t=$('<div id="polar-flow-export"></div>');t.css({position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:9999,background:"white",padding:"0 40px",boxSizing:"border-box"}).appendTo($("body")),$("<h1>Export Polar flow data</h2>").val("foobar").appendTo(t),e?($("<p>You may now copy-paste the information below to a spreadsheet program (such as Excel or Google Spreadsheet).</p>").appendTo(t),$("<textarea></textarea>").css({width:"100%",height:300}).val(e).appendTo(t)):$("<img />").attr("src","http://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif").appendTo(t),$("<br/>").appendTo(t);var o="https://github.com/Pyppe/polar-flow-export";$('<p>See <a href="'+o+'" target="_blank">'+o+"</a> for more details about this bookmarklet.</p>").appendTo(t).find("a").css({color:"#d10027"}),$('<button class="button" type="button">Close</button>').css({fontSize:"20px"}).click(function(){t.remove()}).appendTo(t)}function t(e){function t(e){return("00"+e).slice(-2)}var o=/(\d+) hours? (\d+) minutes/g,a=o.exec(e);return a&&3===a.length?[t(a[1]),t(a[2]),"00"].join(":"):null}function o(){var e="https://flow.polar.com/diary";if(0===window.location.href.indexOf(e))return!0;var t=confirm(["You are not on correct page for export. Redirect to Polar Flow Diary?","","NOTE: You must re-run bookmarklet on that page."].join("\n"));return t?(window.location=e,!1):!1}function a(o,a){var r=a.diff(o,"days"),p=_.reduce(_.range(0,r+1),function(e,t){return e.push(moment(o).add(t,"d")),e},[]),l=(new Date).getTime(),u=_.map(p,function(e){var o=e.format(i),a=["https://flow.polar.com/activity/summary/",o,"/",o,"/day?_=",l].join("");return $.get(a).then(function(o){function a(e,t){return{title:e,value:t}}var i=$("<div>"+o+"</div>"),r=i.find(".sleep-tracked-icon-image:eq(0) > span"),p=i.find(".steps-icon-image .value-huge").text();return p&&parseInt(p)>0?{day:e,rows:[a("Day",e.format(n)),a("Steps",p),a("Distance",i.find(".distance-icon-image .value-huge").text()),a("Calories",i.find(".calories-icon-image .value-huge").text()),a("Activity time",t(i.find(".active-time-icon-image .value-huge").text())),a("Inactivity stamps",i.find(".inactivity-icon-image .value-huge").text()),a("Total sleep",t(r.eq(0).text())),a("Restful sleep",t(r.eq(2).text())),a("Restless sleep",t(r.eq(3).text())),a("Restful sleep %",i.find(".sleep-tracked-icon-image:eq(1) .value-huge").text())]}:null})});e(null),$.when.apply($,u).then(function(){var t=_.reduce(_.compact(arguments),function(e,t,o){var a=t.rows;return 0===o&&e.push(_.pluck(a,"title").join("\t")),e.push(_.pluck(a,"value").join("\t")),e},[]);e(t.join("\n"))})}var n="YYYY-MM-DD",i="D.M.YYYY";!function(){if(o()){var e=moment().add(-7,"d").format(n),t=prompt("Give either start day of export (e.g. "+e+") or number of days from now to export (e.g. 7)","7"),i=moment(t,n);if(i.isValid()){e=moment().format(n);var r=prompt("Give end day of export (e.g. "+e+")",e),p=moment(r,n);p.isValid()?a(i,p):alert("Invalid input.")}else/^\d+$/gi.test(t)?a(moment().subtract(parseInt(t),"d"),moment()):alert("Invalid input.")}}()}();})();
```

### Screenshot
![Screenshot](/polar-flow-export.png?raw=true "Screenshot")

### Why, oh why?
Because the UI of Polar Flow doesn't give you very good summary views.
Exporting data in tabular form gives you the freedom to create graphs
that are relevant to you. For example, this graph shows that I probably should
sleep more during weekdays...

![Graph](/polar-graph-example.png?raw=true "Graph")

Also: why not?

