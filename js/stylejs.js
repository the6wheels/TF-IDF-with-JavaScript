var tfidf;
var tokenz;
var files = [];
var tfidf1 = [];
var tfidf2 = [];
var tfidf3 = [];
var tfidf4 = [];


// And process the data for a file
function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);

  // Now we need to read all the rest of the files
  // for document occurences
  for (var i = 0; i < files.length; i++) {
    tfidf.docFreq(files[i].data);
  }
  tfidf.finish(files.length);
  //console.log(files);
  tfidf.sortByScore();
  
  
  tfidf1 = tfidf.getColTokens();
  tfidf1 = removeDuplicates(tfidf1);
  tfidf2 = tfidf.getColTokens2();
  tfidf2 = removeDuplicates(tfidf2);
  tfidf3 = tfidf.getColTokens4();
  tfidf3 = removeDuplicates(tfidf3);
  tfidf4 = tfidf.getColTokens5();
  tfidf4 = removeDuplicates(tfidf4);
  //var tfidf5 = tfidf.getColTokens;
  //var tfidf2 = tfidf.gettfmatrix();
  //var tfidf3 = tfidf.getColTokens2();

  //showTFIDF();
}

function removeDuplicates(arr) {
  o = {}
  arr.forEach(function (e) {
    o[e] = true
  })
  return Object.keys(o)
}



// Make a bunch of divs to show results
function showTFIDF() {
  // If this gets called multiple times we're removing all the divs that show counts
  // before making new ones
  clearList();

  // show results of tfidf
  var p = createP('');
  p.id('results');

  var ol = createElement('ol');
  ol.parent(p);

  // Get all the words
  var keys = tfidf.getKeys();
  //var howmany = min(20, keys.length);
  var howmany = keys.length;

  // (B) CREATE HTML TABLE STRING

      html = "<table style='margin-top: 25px;' class='table table-success table-striped'><thead><tr><th>#</th><th>String</th><th>Term Frequency</th><th>TF Normalized</th><th>Document Frequency</th><th>IDF</th><th>TF-IDF</th></tr></thead><tbody><tr>";

  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < howmany; i++) {

    var score = tfidf.getScore(keys[i]);
    var counts = tfidf.getCount(keys[i]);
    var df = tfidf.getDF(keys[i]);
    var idf = tfidf.getIDF(keys[i]);
    var tfnorm = tfidf.getTFnorm(keys[i]);
    html +=('<td>' + i + '</td><td>' + keys[i] + '</td><td>' + counts + '</td><td>' + tfnorm + '</td><td>' + df + '</td><td>' + idf + '</td><td>' + score + '</td>');
    html += "</tr><tr>";
  }
  html += "</tr></tbody></table>";
  document.getElementById("container").innerHTML = html;
}

// Go through and remove all the divs
function clearList() {
  var p = select('#results');
  p.remove();
}

// DOM elements
var dropZone, input, button, sample, clearButton;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';

function setup() {

  noCanvas();

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

}



// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background', '');
}


function gotFile(file) {
  document.getElementById("hhhfff").innerHTML ="1. Please select which file to process into tf-idf";
  files.push(file);
  var li = createElement('li');
  li.parent('list');
  var link = createA('#gg', file.name);
  link.parent(li);
  link.mousePressed(readFile);
  //link.mousePressed()
  function readFile() {
    document.getElementById("selected").innerHTML = file.name + " is selected.";
    process(file.data);
  }

}



// Clear all the divs with remove()
function clearText() {
  //input.html('');
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}


// display table results

function myFunction() {


  // (A) DUMMY ARRAY
  var data = tfidf1;

  // (B) CREATE HTML TABLE STRING
  var perrow = 10, // 2 CELLS PER ROW
    html = "<table style='margin-top: 25px;' class='table table-bordered border-primary'><tr>";

  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < data.length; i++) {
    // "NORMAL" CELL
    html += `<td>${i + `. ` + data[i]}</td>`;
    // BREAK INTO NEXT ROW
    var next = i + 1;
    if (next % perrow == 0 && next != data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";

  // (C) ATTACH HTML TO CONTAINER
  document.getElementById("demo").innerHTML = html;
};

function myFunction2() {


  // (A) DUMMY ARRAY
  var data = tfidf2;

  // (B) CREATE HTML TABLE STRING
  var perrow = 10, // 2 CELLS PER ROW
    html = "<table style='margin-top: 25px;' class='table table-bordered border-primary'><tr>";

  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < data.length; i++) {
    // "NORMAL" CELL
    html += `<td>${i + `. ` + data[i]}</td>`;

    // BREAK INTO NEXT ROW
    var next = i + 1;
    if (next % perrow == 0 && next != data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";

  // (C) ATTACH HTML TO CONTAINER
  document.getElementById("demo2").innerHTML = html;
};

function myFunction3() {

// Generating last table

  var data = tfidf3;

  // (B) CREATE HTML TABLE STRING
  var perrow = 10, // 2 CELLS PER ROW
    html = "<table style='margin-top: 25px;' class='table table-bordered border-primary'><tr>";

  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < data.length; i++) {

    html += `<td>${i + `. ` + data[i]}</td>`;

    var next = i + 1;
    if (next % perrow == 0 && next != data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";

  // (C) ATTACH HTML TO CONTAINER
  document.getElementById("demo3").innerHTML = html;
};

function myFunction4() {


  // (A) DUMMY ARRAY
  var data = tfidf4;

  // (B) CREATE HTML TABLE STRING
  var perrow = 10, // 2 CELLS PER ROW
    html = "<table style='margin-top: 25px;' class='table table-bordered border-primary'><tr>";

  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < data.length; i++) {
    // "NORMAL" CELL
    html += `<td>${i + `. ` + data[i]}</td>`;

    // BREAK INTO NEXT ROW
    var next = i + 1;
    if (next % perrow == 0 && next != data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";

  // (C) ATTACH HTML TO CONTAINER
  document.getElementById("demo4").innerHTML = html;
};

function showOrHideDiv() {
  var v = document.getElementById("showOrHide");
  if (v.style.display === "none") {
    v.style.display = "block";
  } else {
    v.style.display = "none";
  }
}

function showOrHideDiv2() {
  var v = document.getElementById("showOrHide2");
  if (v.style.display === "none") {
    v.style.display = "block";
  } else {
    v.style.display = "none";
  }
}