var package_json = require('../package.json');
import { getStyleElement, getStyleSheet } from './get.js'
import { value_sets } from './value_sets.js'
import { property_sets } from './property_sets.js'
import { class_sets } from './class_sets.js'



// Variable Section
var debug = false;

var greeting = '/*' + '\n';
greeting += 'CSSIST' + '\n';
greeting += 'version : ' + package_json.version + '\n';
greeting += 'date : ' + new Date() + '\n';
greeting += 'The following codes are automatically generated.' + '\n';
greeting += '*/\n\n\n';

var cssist_default = {
  version: package_json.version,
  csses:{
    success:[],
    fail:[]
  },
  selectors:{
    success:[],
    fail:[]
  },
  stylesheet:greeting
};



// Initialize Section
export var initialize = function(){
  if(localStorage['cssist']) var cssist = JSON.parse(localStorage['cssist']);
  if(cssist && package_json && cssist.version == package_json.version){
    if(debug) console.log('[initialize] localStorage cssist');
    window.cssist = cssist;
  }
  else{
    if(debug) console.log('[initialize] new cssist');
    window.cssist = cssist_default;
  }

  // Method 1
  getStyleElement(window.cssist.stylesheet);

  // Method 2
  var sheet = getStyleSheet();
  var csses = window.cssist.csses.success;
  for(var i=0; i<csses.length; i++){
    var css = csses[i];
    if(sheet.insertRule) {
      sheet.insertRule(css.code);
    } else {
      sheet.addRule(css.selector, css.rules);
    }
  }

  if(debug){
    window.value_sets = value_sets;
    window.property_sets = property_sets;
    window.class_sets = class_sets;
  }
};
