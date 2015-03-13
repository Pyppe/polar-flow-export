(function() {

  var ISO_DAY = 'YYYY-MM-DD';
  var FIN_DAY = 'D.M.YYYY';

  function showExport(data) {
    $('#polar-flow-export').remove();
    var $el = $('<div id="polar-flow-export"></div>');
    $el.
      css({
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'white',
        padding: '0 40px',
        boxSizing: 'border-box'
      }).
      appendTo($('body'));

    $('<h1>Export Polar flow data</h2>').val('foobar').appendTo($el);
    if (data) {
      $('<p>You may now copy-paste the information below to a spreadsheet program (such as Excel or Google Spreadsheet).</p>').appendTo($el);
      $('<textarea></textarea>').css({width: '100%', height: 300}).val(data).appendTo($el);
    } else {
      $('<img />').
        attr('src', 'http://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif').
        appendTo($el);
    }

    $('<br/>').appendTo($el);
    var homepage = 'https://github.com/Pyppe/polar-flow-export';
    $('<p>See <a href="'+homepage+'" target="_blank">'+homepage+'</a> for more details about this bookmarklet.</p>').
      appendTo($el).find('a').css({
        color: '#d10027'
      });
    $('<button class="button" type="button">Close</button>').
      css({fontSize: '20px'}).
      click(function() {
        $el.remove();
      }).
      appendTo($el);
  }

  function parseDuration(str) {
    function pad(n) {
      return ("00" + n).slice(-2);
    }
    var re = /(\d+) hours? (\d+) minutes/g;
    var m = re.exec(str);
    return (m && m.length === 3) ?
      [pad(m[1]), pad(m[2]), '00'].join(':') :
      null;
  }

  function isOnCorrectPage() {
    var correctPage = 'https://flow.polar.com/diary';
    if (window.location.href.indexOf(correctPage) === 0) {
      return true;
    } else {
      var redirect = confirm([
        'You are not on correct page for export. Redirect to Polar Flow Diary?',
        '',
        'NOTE: You must re-run bookmarklet on that page.'
      ].join('\n'));
      if (redirect) {
        window.location = correctPage;
        return false;
      }
      return false;
    }
  }


  function fetchData(start, end) {
    var dayCount = end.diff(start, 'days');

    var days = _.reduce(_.range(0,dayCount+1), function(acc, i) {
      acc.push(moment(start).add(i,'d'));
      return acc;
    }, []);

    var ts = new Date().getTime();
    var futures = _.map(days, function(day) {
      var finDay = day.format(FIN_DAY);
      var url = [
        'https://flow.polar.com/activity/summary/',
        finDay,
        '/',
        finDay,
        '/day?_=',
        ts
      ].join('');
      return $.get(url).then(function(html) {
        function item(title, value) {
          return {
            title: title,
            value: value
          };
        }
        var $html = $('<div>'+html+'</div>');
        var $sleep = $html.find('.sleep-tracked-icon-image:eq(0) > span');
        var stepCount = $html.find('.steps-icon-image .value-huge').text();
        if (stepCount && parseInt(stepCount) > 0) {
          return {
            day: day,
            rows: [
              item('Day',               day.format(ISO_DAY)),
              item('Steps',             stepCount),
              item('Distance',          $html.find('.distance-icon-image .value-huge').text()),
              item('Calories',          $html.find('.calories-icon-image .value-huge').text()),
              item('Activity time',     parseDuration($html.find('.active-time-icon-image .value-huge').text())),
              item('Inactivity stamps', $html.find('.inactivity-icon-image .value-huge').text()),
              item('Total sleep',       parseDuration($sleep.eq(0).text())),
              item('Restful sleep',     parseDuration($sleep.eq(2).text())),
              item('Restless sleep',    parseDuration($sleep.eq(3).text())),
              item('Restful sleep %',   $html.find('.sleep-tracked-icon-image:eq(1) .value-huge').text())
            ]
          };
        } else {
          return null;
        }

      });
    });

    showExport(null);
    $.when.apply($, futures).then(function() {
      var rows = _.reduce(_.compact(arguments), function(acc, obj, i) {
        var rows = obj.rows;
        if (i === 0) {
          acc.push(_.pluck(rows,'title').join('\t'));
        }
        acc.push(_.pluck(rows,'value').join('\t'));
        return acc;
      }, []);
      showExport(rows.join('\n'));
    });
  }

  // START
  (function() {
    if (isOnCorrectPage()) {
      var example = moment().add(-7, 'd').format(ISO_DAY);
      var startInput = prompt('Give either start day of export (e.g. '+example+') or number of days from now to export (e.g. 7)', '7');

      var start = moment(startInput, ISO_DAY);
      if (start.isValid()) {
        example = moment().format(ISO_DAY);
        var endInput = prompt('Give end day of export (e.g. '+example+')', example);
        var end = moment(endInput, ISO_DAY);
        if (end.isValid()) {
          fetchData(start, end);
        } else {
          alert('Invalid input.')
        }
      } else if ((/^\d+$/gi).test(startInput)) {
        fetchData(moment().subtract(parseInt(startInput), 'd'), moment());
      } else {
        alert('Invalid input.');
      }
    }
  })();

  //fetchData(moment('2015-03-09', ISO_DAY), moment('2015-03-10', ISO_DAY));

})();

