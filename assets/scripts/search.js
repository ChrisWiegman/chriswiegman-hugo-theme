var fuseOptions = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.0,
  keys: [
    { name: "title", weight: 0.8 },
    { name: "contents", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "categories", weight: 0.3 },
    { name: "date", weight: 0.3 }
  ]
};

var searchQuery = param("s");
if (searchQuery) {
  $("#search").val(searchQuery);
  $("#search-term").append(searchQuery);
  executeSearch(searchQuery);
} else {
  window.location.assign("/blog");
}

function executeSearch(searchQuery) {
  $.getJSON("/index.json", function (data) {
    var pages = data;
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    $('#search-count').append(result.length)
    if (result.length > 0) {
      populateResults(result);
    } else {
      $('#search-results').append("<p>No matches found</p>");
    }
  });
}

function populateResults(result) {
  $.each(result, function (key, value) {
    //pull template from hugo templarte definition
    var templateDefinition = $('#search-result-template').html();
    let date = new Date(value.item.date);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    let displayDate = `${day} ${month}, ${year}`

    //replace values
    var output = render(templateDefinition, { key: key, title: value.item.title, link: value.item.RelPermalink, date: displayDate });
    $('#search-results').append(output);

  });
}

function param(name) {
  return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
  var conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], '');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}