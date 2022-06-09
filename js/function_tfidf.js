// A function to get diffrence of 2 arrays

function diffArray(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter(item => !arr1.includes(item) || !arr2.includes(item));
}

// Some utility functions
function tokenize(text) {
  // Split into array of tokens
  return text.split(/\W+/);
}

// A function to validate a toke
function validate(token) {
  return /\w{2,}/.test(token);
}



class TFIDF {
  constructor() {
    this.corps = {};
    this.dict = {};
    this.tfmartix = {};
    this.keys = [];
    // Total word counts
    this.totalwords = 0;
    //all tokens of the collection before minimizing and removing stopwords and stemming
    this.coltokenz = [];
    //all tokens of a document
    this.filetokenz = [];
    this.filetokenz2 = [];
    this.filetokenz3 = [];
    // list of stop words.
    this.stopwords = ["a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "couldn", "couldn't", "d", "did", "didn", "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven", "haven't", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn", "isn't", "it", "it's", "its", "itself", "just", "ll", "m", "ma", "me", "mightn", "mightn't", "more", "most", "mustn", "mustn't", "my", "myself", "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should", "should've", "shouldn", "shouldn't", "so", "some", "such", "t", "than", "that", "that'll", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "was", "wasn", "wasn't", "we", "were", "weren", "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn", "wouldn't", "y", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "could", "he'd", "he'll", "he's", "here's", "how's", "i'd", "i'll", "i'm", "i've", "let's", "ought", "she'd", "she'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "we'd", "we'll", "we're", "we've", "what's", "when's", "where's", "who's", "why's", "would"];
    // all tokens of th collection after removing stopwords
    this.coltokenz2 = [];
    // all tokens of th collection after applying PortStemmer algorithm
    this.coltokenz3 = [];
    // all tokens of th collection after minimizing
    this.coltokenz4 = [];
    // all tokens of th collection sorted in alphabetical order
    this.coltokenz5 = [];
  }


  // Count the words
  termFreq(data) {
    var tokens = tokenize(data);
    //console.log(tokens);
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case and remove
        var token = tokens[i].toLowerCase()
         tokens[i] = token;
      }
 
    tokens = tokens.filter(x => !this.stopwords.includes(x));
    tokens = tokens.filter(item => item);

    // For every token
    for (var i = 0; i < tokens.length; i++) {
      
      var token = stemmer(tokens[i]);
      tokens[i] = token;
    }
    tokens = tokens.filter(item => item);
    console.log(tokens.length);
    for (var i = 0; i < tokens.length; i++) {

      // saving file tokenz
      if (validate(tokens[i])) {

        this.increment(tokens[i]);
        this.totalwords++;
        this.filetokenz[i] = tokens[i];
      }

    }

    // // TO remove empty elements from the arrays
     this.filetokenz = this.filetokenz.filter(item => item);

  }

  // Get the document frequencies across all documents
  docFreq(data) {

    var tokens = tokenize(data);

    // A temporary dictionary of words in this document
    var tempDict = {};


    // For every token

    // The collection
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var tokend = tokens[i].toLowerCase();
      this.coltokenz[i] = tokend;

    }

    // removing stopwords from and stemming the collection
    this.coltokenz2 = this.coltokenz.filter(x => !this.stopwords.includes(x));


    // A temporary dictionary of words in this document
    var tempDict = {};
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case

      tokens[i]= tokens[i].toLowerCase();
    
    
    }
    //console.log(tokens);
    tokens = tokens.filter(x => !this.stopwords.includes(x));
    //console.log(tokens);

    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      
      let token = stemmer(tokens[i]);
      this.coltokenz4[i] = token;
      // Simpler we just need to see if it exists or not
      if (validate(token) && tempDict[token] === undefined) {

        tempDict[token] = true;
        
        //this.corps[i] = tempDict;
      }
    }
    // Removing empty cells from Arrays
    this.coltokenz = this.coltokenz.filter(item => item);
    this.coltokenz2 = this.coltokenz2.filter(item => item);
    this.coltokenz4 = this.coltokenz4.filter(item => item);




    // sort the collection alphabiticly

    this.coltokenz5 = this.coltokenz4.slice().sort();

    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      // Does this word exist in this document?
      if (tempDict[key]) {
        this.dict[key].docCount++;
      }


    }
  }

  // Get Collection tokens after minimizing
  getColTokens() {
    return this.coltokenz;
  }


  // Get Collection tokens after removing stopwords
  getColTokens2() {
    return this.coltokenz2;
  }

  // not working
  getColTokens3() {
    return this.coltokenz3;
  }

  // Get Collection tokens after using portstemmer algorithm
  getColTokens4() {
    return this.coltokenz4;
  }
  // Get Collection tokens after minimizing
  getColTokens5() {
    return this.coltokenz5;
  }

  // get term frequancy 
  gettfmatrix() {
    return this.tfmartix;
  }

  // Get file tokens
  getFileTokens() {
    return this.filetokenz;
  }

  // Get all the keys
  getKeys() {
    return this.keys;
  }

  // Get the count for one word
  getCount(word) {
    return this.dict[word].count;

  }

    // Get tf normaized
    getTFnorm(word) {
      return this.dict[word].tfnorm;
  
    }

      // Get the IDF for one word
  getIDF(word) {
    return this.dict[word].idf;

  }

    // Get the document frequency for one word
    getDF(word) {
      return this.dict[word].docCount;
  
    }

  // Get the score for one word
  getScore(word) {
    return this.dict[word].tfidf;
  }

  // Increment the count for one word
  increment(word) {
    // Is this a new word?
    if (this.dict[word] == undefined) {
      this.dict[word] = {};
      this.dict[word].count = 1;
      this.dict[word].docCount = 0;
      this.dict[word].tfnorm = 0;
      this.dict[word].idf = 0;
      this.dict[word].word = word;
      this.keys.push(word);
      // Otherwise just increment its count
    } else {
      this.dict[word].count++;
    }
  }

  // Finish and calculate everything
  finish(totaldocs) {
    // calculate tf-idf score
    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      var word = this.dict[key];
      var tf = word.count / this.totalwords;
      word.tfnorm = tf;
      // See:
      var idf = log(totaldocs / word.docCount);
      word.idf = idf;
      word.tfidf = tf * idf;
    }
  }

  // Sort by word counts
  sortByCount() {
    // A fancy way to sort each element
    // Compare the counts
    var tfidf = this;
    this.keys.sort(function (a, b) {
      return (tfidf.getCount(b) - tfidf.getCount(a));
    });
  }

  // Sort by TFIDF score
  sortByScore() {
    // A fancy way to sort each element
    // Compare the counts
    var tfidf = this;
    this.keys.sort(function (a, b) {
      return (tfidf.getScore(b) - tfidf.getScore(a));
    });
  }

}

// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

// Release 1 be 'andargor', Jul 2004
// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009

var stemmer = (function () {
  var step2list = {
    "ational": "ate",
    "tional": "tion",
    "enci": "ence",
    "anci": "ance",
    "izer": "ize",
    "bli": "ble",
    "alli": "al",
    "entli": "ent",
    "eli": "e",
    "ousli": "ous",
    "ization": "ize",
    "ation": "ate",
    "ator": "ate",
    "alism": "al",
    "iveness": "ive",
    "fulness": "ful",
    "ousness": "ous",
    "aliti": "al",
    "iviti": "ive",
    "biliti": "ble",
    "logi": "log"
  },

    step3list = {
      "icate": "ic",
      "ative": "",
      "alize": "al",
      "iciti": "ic",
      "ical": "ic",
      "ful": "",
      "ness": ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  return function (w) {
    var stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4,
      origword = w;

    if (w.length < 3) { return w; }

    firstch = w.substr(0, 1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) { w = w.replace(re, "$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2, "$1$2"); }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re, "");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) { w = w + "e"; }
        else if (re3.test(w)) { re = /.$/; w = w.replace(re, ""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(s_v);
      if (re.test(stem)) { w = stem + "i"; }
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re, "");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  }
})();