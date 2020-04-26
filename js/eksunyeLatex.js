/*
 * Bootstrap 3.3.6 latexEditor - jQuery plugin for Latex Editor Picker
 *
 * Copyright (c) 2019 Kiran Pantha <One Zero Software Pvt. Ltd.> kiran[at]onezero[dot]com[dot]np
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/kiranpantha/latexEditor
 *
 * Version:  1.0.1
 *
 */

(function($) {
	var scriptPoly = document.createElement("script");  // create a script DOM node
    scriptPoly.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";  // set its src to the provided URL
    document.head.appendChild(scriptPoly);
	
	var script = document.createElement("script");  // create a script DOM node
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";  // set its src to the provided URL
    document.head.appendChild(script);
    
    var scriptSelect = document.createElement("script");  // create a script DOM node
    scriptSelect.src = "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js";  // set
    document.head.appendChild(scriptSelect);
    
    var styleSelect = document.createElement("link");
    styleSelect.href = "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css";
    styleSelect.rel = "stylesheet";
    document.head.appendChild(styleSelect);
    
    var styleSelect = document.createElement("link");
    styleSelect.href = "https://cdn.onezero.com.np/latex/eksunyeLatex.css?v=1.0.0.7";
    styleSelect.rel = "stylesheet";
    document.head.appendChild(styleSelect);
    

    
	MathJax = {
		tex2jax: {
			inlineMath: [ ['$','$'], ["\\(","\\)"] ],
			processEscapes: true
		},
		options: {
			renderActions: {
				addMenu: [0, '', '']
			}
		},
		svg: {
		    scale: 1,                      // global scaling factor for all expressions
		    minScale: .5,                  // smallest scaling factor to use
		    matchFontHeight: true,         // true to match ex-height of surrounding font
		    mtextInheritFont: false,       // true to make mtext elements use surrounding font
		    merrorInheritFont: true,       // true to make merror text use surrounding font
		    mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
		    skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
		    exFactor: .5,                  // default size of ex in em units
		    displayAlign: 'center',        // default for indentalign when set to 'auto'
		    displayIndent: '0',            // default for indentshift when set to 'auto'
		    fontCache: 'local',            // or 'global' or 'none'
		    localID: null,                 // ID to use for local font cache (for single equation processing)
		    internalSpeechTitles: true,    // insert <title> tags with speech content
		    titleID: 0                     // initial id number to use for aria-labeledby titles
		  }
	};
         
    $.fn.latexEditor = function( options ) {
        var mouseOver=false;
        var $popup=null;
		var latexValues = "[{\"label\":\"\\\\square\\\\underline{\\\\,}\\\\square\",\"insert\":\"insert('\\\\\\\\,')\"},{\"label\":\"\\\\square\\\\underline{\\\\:}\\\\square\",\"insert\":\"insert('\\\\\\\\:')\"},{\"label\":\"\\\\square\\\\underline{\\\\;}\\\\square\",\"insert\":\"insert('\\\\\\\\;')\"},{\"label\":\"\\\\square\\\\!\\\\square\",\"insert\":\"insert('\\\\\\\\!')\"},{\"label\":\"\\\\leftarrow\",\"insert\":\"insert('\\\\\\\\leftarrow')\"},{\"label\":\"\\\\rightarrow\",\"insert\":\"insert('\\\\\\\\rightarrow')\"},{\"label\":\"a^{\\\\circ}\",\"insert\":\"insert('^{\\\\\\\\circ}',0)\"},{\"label\":\"x^a\",\"insert\":\"insert('^{}',2,0)\"},{\"label\":\"x_a\",\"insert\":\"insert('_{}',2,0)\"},{\"label\":\"_a^{b}\\\\textrm{C}\",\"insert\":\"insert('_{}^{}\\\\\\\\textrm{}',2,14)\"},{\"label\":\"\\\\frac{a}{b}\",\"insert\":\"insert('\\\\\\\\frac{}{}',6)\"},{\"label\":\"x\\\\tfrac{a}{b}\",\"insert\":\"insert('\\\\\\\\tfrac{}{}',7)\"},{\"label\":\"\\\\int_a^b\",\"insert\":\"insert('\\\\\\\\int_{}^{}',6,1000)\"},{\"label\":\"\\\\oint_a^b\",\"insert\":\"insert('\\\\\\\\oint_{}^{}',7,1000)\"},{\"label\":\"\\\\iint_a^b\",\"insert\":\"insert('\\\\\\\\iint_{}^{}',7,1000)\"},{\"label\":\"\\\\bigcap_a^b\",\"insert\":\"insert('\\\\\\\\bigcap_{}^{}',9,1000)\"},{\"label\":\"\\\\bigcup_a^b\",\"insert\":\"insert('\\\\\\\\bigcup_{}^{}',9,1000)\"},{\"label\":\"\\\\displaystyle \\\\lim_{x \\\\to 0}\",\"insert\":\"insert('\\\\\\\\lim_{}',6,1000)\"},{\"label\":\"\\\\sum_a^b\",\"insert\":\"insert('\\\\\\\\sum_{}^{}',6)\"},{\"label\":\"\\\\sqrt{x}\",\"insert\":\"insert('\\\\\\\\sqrt{}',6,6)\"},{\"label\":\"\\\\sqrt[n]{x}\",\"insert\":\"insert('\\\\\\\\sqrt[]{}',6,8)\"},{\"label\":\"\\\\prod_a^b\",\"insert\":\"insert('\\\\\\\\prod_{}^{}',7,1000)\"},{\"label\":\"\\\\coprod_a^b\",\"insert\":\"insert('\\\\\\\\coprod_{}^{}',9,1000)\"},{\"label\":\"\\\\left (\\\\: \\\\right )\",\"insert\":\"insert('\\\\\\\\left ( \\\\\\\\right )',8)\"},{\"label\":\"\\\\left [\\\\: \\\\right ]\",\"insert\":\"insert('\\\\\\\\left [ \\\\\\\\right ]',8)\"},{\"label\":\"\\\\left\\\\{\\\\: \\\\right\\\\}\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\{ \\\\\\\\right \\\\\\\\}',9)\"},{\"label\":\"\\\\left |\\\\: \\\\right |\",\"insert\":\"insert('\\\\\\\\left | \\\\\\\\right |',8)\"},{\"label\":\"\\\\left \\\\{ \\\\cdots \\\\right.\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\{ \\\\\\\\right.',9)\"},{\"label\":\"\\\\left \\\\|\\\\: \\\\right \\\\|\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\| \\\\\\\\right \\\\\\\\|',9)\"},{\"label\":\"\\\\left \\\\langle \\\\: \\\\right \\\\rangle\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\langle \\\\\\\\right \\\\\\\\rangle',14)\"},{\"label\":\"\\\\left \\\\lfloor \\\\: \\\\right \\\\rfloor\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\lfloor \\\\\\\\right \\\\\\\\rfloor',14)\"},{\"label\":\"\\\\left \\\\lceil \\\\: \\\\right \\\\rceil\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\lceil \\\\\\\\right \\\\\\\\rceil',13)\"},{\"label\":\"\\\\left. \\\\cdots \\\\right \\\\}\",\"insert\":\"insert('\\\\\\\\left. \\\\\\\\right \\\\\\\\}',7)\"},{\"label\":\"\\\\mathbf{A1}\",\"insert\":\"insert('\\\\\\\\mathbf{}')\"},{\"label\":\"\\\\mathit{A1}\",\"insert\":\"insert('\\\\\\\\mathit{}')\"},{\"label\":\"\\\\mathrm{Aa1}\",\"insert\":\"insert('\\\\\\\\mathrm{}')\"},{\"label\":\"\\\\mathfrak{Aa1}\",\"insert\":\"insert('\\\\\\\\mathfrak{}')\"},{\"label\":\"\\\\mathbb{Aa1}\",\"insert\":\"insert('\\\\\\\\mathbb{}')\"},{\"label\":\"\\\\textbf{Aa1}\",\"insert\":\"insert('\\\\\\\\textbf{}')\"},{\"label\":\"\\\\textit{Aa1}\",\"insert\":\"insert('\\\\\\\\textit{}')\"},{\"label\":\"\\\\textrm{Aa1}\",\"insert\":\"insert('\\\\\\\\textrm{}')\"},{\"label\":\"\\\\texttt{Aa1}\",\"insert\":\"insert('\\\\\\\\texttt{}')\"}]";
		var icons = JSON.parse(latexValues);
		var settings = $.extend({
        	
        }, options);
        return this.each( function() {
        	element=this;
			var textAreaLatex = $('.textArea');
            if(!settings.buttonOnly && $(this).data("latexPicker")==undefined ){
				setTimeout(function(){ try{ MathJax.typeset(); }catch(err){ try{ MathJax.typeset(); }catch(err){ var a =1; } } }, 1000);   		
            	$this=$(this).addClass("form-control");
            	$wraper=$("<div/>",{class:"input-group w-100 float-left"});
            	$this.wrap($wraper);
				var elemObj = $(this);
            	$button=$("<div class=\"input-group-append w-10 inputLatexBtn\"><span class=\"input-group-text   pointer\">Æ’(x)</span></div>");
            	$this.after($button);
            	(function(ele){
            		$button.click(function(){
			       		createUI(ele,elemObj);
			       		showList(ele,icons);
			    		setTimeout(function(){ try{ MathJax.typeset(); }catch(err){ try{ MathJax.typeset(); }catch(err){ var a =1; } } }, 1000);   		
	            	});
	            })($this);

            	$(this).data("latexPicker",{attached:true});
            }
        
	        function createUI($element,$laTexParent){
	        	$popup=$('<div/>',{
	        		css: {
		        		'top':$element.offset().top+$element.outerHeight()+6,
		        		'left':$element.offset().left
		        	},
		        	class:'icon-popup'
	        	})

				var selectMatrix ='<div class="col-sm-3">\
				           <select class="form-control selectMatrix selectpicker">\
								<option value="">Matrix</option>\
								<option value="\\begin{matrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{matrix}">Matrix</option>\
								<option value="\\begin{bmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{bmatrix}">Matrix []</option>\
								<option value="\\begin{pmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{pmatrix}">Matrix {}</option>\
								<option value="\\begin{smatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{smatrix}">Matrix ()</option>\
							</select>\
							</div>';
			
				var selectColor ='<div class="col-sm-3">\
				           <select class="form-control selectGreek selectpicker">\
								<option value="">Î± Î² Î³</option>\
								<option value="\\alpha">Î±</option>\
								<option value="\\beta">Î²</option>\
								<option value="\\chi">Ï‡</option>\
								<option value="\\delta">Î´</option>\
								<option value="\\epsilon">Ïµ</option>\
								<option value="\\eta">Î·</option>\
								<option value="\\gamma">Î³</option>\
								<option value="\\kappa">Îº</option>\
								<option value="\\lambda">Î»</option>\
								<option value="\\mu">Âµ</option>\
								<option value="\\nu">Î½</option>\
								<option value="\\o">o</option>\
								<option value="\\omega">Ï‰</option>\
								<option value="\\phi">Ï†</option>\
								<option value="\\psi">Ïˆ</option>\
								<option value="\\rho">Ï</option>\
								<option value="\\sigma">Ïƒ</option>\
								<option value="\\tau">Ï„</option>\
								<option value="\\theta">Î¸</option>\
								<option value="\\upsilon">Ï…</option>\
								<option value="\\xi">Î¾</option>\
								<option value="\\digamma">J</option>\
								<option value="\\varepsilon">Îµ</option>\
								<option value="\\varkappa">Îº</option>\
								<option value="\\varphi">Ï•</option>\
								<option value="\\varpi">Î±</option>\
								<option value="\\varrho">q</option>\
								<option value="\\varsigma">Ï‚</option>\
								<option value="\\Delta">âˆ†</option>\
								<option value="\\Gamma">Î“</option>\
								<option value="\\Lambda">Î›</option>\
								<option value="\\Omega">â„¦</option>\
								<option value="\\Phi">Î¦</option>\
								<option value="\\Pi">Î </option>\
								<option value="\\Psi">Î¨</option>\
								<option value="\\Theta">Î˜</option>\
								<option value="\\Upsilon">Î¥</option>\
								<option value="\\Xi">Îž</option>\
								<option value="\\beth">Å‚</option>\
								<option value="\\daleth">Y</option>\
					           </select>\
				        </div>';
				
				var selectFunction = '<div class="col-sm-3">'+
				'<select  class="form-control selectFuntion selectpicker" title="Function">'+
				'    <option selected="selected" value="">Æ’(x)</option>'+
				'    <optgroup label="Trig">'+
				'        <option value="\\sin">sin</option>'+
				'        <option value="\\cos">cos</option>'+
				'        <option value="\\tan">tan</option>'+
				'        <option value="\\csc">csc</option>'+
				'        <option value="\\sec">sec</option>'+
				'        <option value="\\cot">cot</option>'+
				'        <option value="\\sinh">sinh</option>'+
				'        <option value="\\cosh">cosh</option>'+
				'        <option value="\\tanh">tanh</option>'+
				'        <option value="\\coth">coth</option>'+
				'    </optgroup>'+
				'    <optgroup label="Inverse Trig">'+
				'        <option value="\\arcsin">arcsin</option>'+
				'        <option value="\\arccos">arccos</option>'+
				'        <option value="\\arctan">arctan</option>'+
				'        <option value="\\textrm{arccsc}">arccsc</option>'+
				'        <option value="\\textrm{arcsec}">arcsec</option>'+
				'        <option value="\\textrm{arccot}">arccot</option>'+
				'        <option value="\\sin^{-1}">sin-1</option>'+
				'        <option value="\\cos^{-1}">cos-1</option>'+
				'        <option value="\\tan^{-1}">tan-1</option>'+
				'        <option value="\\sinh^{-1}">sinh-1</option>'+
				'        <option value="\\cosh^{-1}">cosh-1</option>'+
				'        <option value="\\tanh^{-1}">tanh-1</option>'+
				'    </optgroup>'+
				'    <optgroup label="Logs">'+
				'        <option value="\\exp">exp</option>'+
				'        <option value="\\lg">lg</option>'+
				'        <option value="\\ln">ln</option>'+
				'        <option value="\\log">log</option>'+
				'        <option value="\\log_{e}">log e</option>'+
				'        <option value="\\log_{10}">log 10</option>'+
				'    </optgroup>'+
				'    <optgroup label="Limits">'+
				'        <option value="\\lim">limit</option>'+
				'        <option value="\\liminf">liminf</option>'+
				'        <option value="\\limsup">limsup</option>'+
				'        <option value="\\max">maximum</option>'+
				'        <option value="\\min">minimum</option>'+
				'        <option value="\\infty">infinite</option>'+
				'    </optgroup>'+
				'    <optgroup label="Operators">'+
				'        <option value="\\arg">arg</option>'+
				'        <option value="\\det">det</option>'+
				'        <option value="\\dim">dim</option>'+
				'        <option value="\\gcd">gcd</option>'+
				'        <option value="\\hom">hom</option>'+
				'        <option value="\\ker">ker</option>'+
				'        <option value="\\Pr">Pr</option>'+
				'        <option value="\\sup">sup</option>'+
				'    </optgroup>'+
				'</select>'+
				'</div>';
				
				var resImgLaTex;
				if($laTexParent.val() == ""){ resImgLaTex = "";  }else{ resImgLaTex = $laTexParent.val();  }
	        	$popup.html('<div class="ip-control w-100"> \
								<div class="container-fluid  mb-2">\
									<div class="row">\
										<div class="col-sm-6" style="padding:2px">\
											<textarea w-100 onchange="refreshLatex()" onkeyup="refreshLatex()" onpaste="refreshLatex()" class="form-control textArea ip-search" style="height:90% !important;">'+resImgLaTex+'</textarea> \
												<span style="font-size:8px; padding-left:10px;">\
													<span style="cursor:pointer;" onclick="insert(\'$$$$\',2,100);"><b>\$\$</b>LaTex<b>\$\$</b> = Large Latex </span> & 	<span  style="cursor:pointer;" onclick="insert(\'\\\\(\\\\)\',2,100);"><b>\\(</b>LaTex<b>\\)</b> = Inline Latex </span>\
												</span>\
										</div>\
										<div class="col-sm-3" style="font-size:12px;">\
											<div class="svgLaText  h-75 w-100">'+resImgLaTex+'</div>\
										</div>\
									</div>\
								</div>\
						     </div>\
							 <div class="container-fluid mt-2 dropDown"> \
								 <div class="row" style="width:100%; padding-top:10px; padding-bottom:20px; position:absolute;">\
									 '+selectMatrix+'\
									 '+selectFunction+'\
									 '+selectColor+'\
									 <div class="col-sm-3">\
										<button  type="button" class="btn btn-primary sendDataLatex">ðŸ–«SAVE</button>\
									 </div>\
								 </div>\
							 </div>\
						     <div class="container-fluid icon-list w-100">\
						    	Loading...\
							 </div>\
					         ').appendTo("body");
	        	$('.selectpicker').selectpicker('refresh');
	        	$textAreaLatex = $('.textArea');
				$latexImg = $('.svgLaText');
	        	$popup.addClass('dropdown-menu').show();
	        	
	        	if(resImgLaTex === ""){ insert('$$$$',2,100); }

				$popup.mouseenter(function() {  mouseOver=true;  }).mouseleave(function() { mouseOver=false;  });

	        	var lastVal="", start_index=0,per_page=30,end_index=start_index+per_page;
				var laText = "",cursorS = 0,cursorE = 0;
	        	$(".ip-control .btn",$popup).click(function(e){
	                e.stopPropagation();
	                var dir=$(this).attr("data-dir");
	                start_index=start_index+per_page*dir;
	                start_index=start_index<0?0:start_index;
	                if(start_index+per_page<=210){
	                  $.each($(".icon-list>ul li"),function(i){
	                      if(i>=start_index && i<start_index+per_page){
	                         $(this).show();
	                      }else{
	                        $(this).hide();
	                      }
	                  });
	                }else{
	                  start_index=180;
	                }
	            });
				
				$(".selectpicker",$popup).change(function(){
					var laText = $(this).val()+' ';
					var initCur = $textAreaLatex.getCursorPosition();
					$textAreaLatex.insertLaText(laText);
					$latexImg.html($textAreaLatex.val());
					$textAreaLatex.selectRange(initCur + laText.length);
					refreshLatex();
					$(this).selectpicker('refresh');
					$textAreaLatex.focus();
				})
				
	        	
	        	
	        	$(document).mouseup(function (e){
				    if(!$(e.target).closest('.icon-popup').length && !$(e.target).is('.icon-popup')){
				        removeInstance();
				    }
				});

	        }
	        function removeInstance(){
	        	$(".icon-popup").remove();
	        }
	        function showList($element,arrLis){
	        	$ul=$("<ul>");
	        	
	        	for (var i in arrLis) {
	        		$ul.append('<li><a href="#" data-latex="'+arrLis[i].insert+'">$$'+arrLis[i].label+'$$</a></li>');
	        	};

	        	$(".icon-list",$popup).html($ul);
	        	$(".icon-list li a",$popup).click(function(e){
	        		e.preventDefault();
	        		var title=$(this).data("latex");
					if (title != "") {
						var fn = new Function(title);
						fn();
					}
	        		//removeInstance();
	        	});
				$(".sendDataLatex",$popup).click(function(e){
	        		e.preventDefault();
					$element.val($textAreaLatex.val());
					removeInstance();
				});
	        }
			window.insert = function(laText,cursorS,cursorE)
			{
				var initCur = $textAreaLatex.getCursorPosition();
				$textAreaLatex.insertLaText(laText+" ");
				$latexImg.html($textAreaLatex.val());
				if(cursorS == undefined){ cursorS = laText.length;}
				$textAreaLatex.selectRange(initCur + cursorS);
				refreshLatex();
			}
			
			window.refreshLatex = function()
			{
				$latexImg.html($textAreaLatex.val());
				MathJax.typeset();
			}
			
			window.hasClass = function(elem,className)
			{
    			return elem.className.split(' ').indexOf(className) > -1;
			}
			
			window.replaceAll = function(str, find, replace) {
			  return str.replace(new RegExp(find, 'g'), replace);
			}
			
			window.removeElementsByClass = function(className){
			    var elements = document.getElementsByClassName(className);
			    while(elements.length > 0){
			        elements[0].parentNode.removeChild(elements[0]);
			    }
			}
        });
    }
	
	$.fn.selectRange = function(start, end) {
		if(end === undefined) {
			end = start;
		}
		return this.each(function() {
			if('selectionStart' in this) {
				this.selectionStart = start;
				this.selectionEnd = end;
			} else if(this.setSelectionRange) {
				this.setSelectionRange(start, end);
			} else if(this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	}
	
	$.fn.insertLaText = function(text) {
		var txtarea = $(this)[0];
		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
		"ff" : (document.selection ? "ie" : false ) );
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			strPos = range.text.length;
		}
		else if (br == "ff") strPos = txtarea.selectionStart;
		
		var front = (txtarea.value).substring(0,strPos); 
		var back = (txtarea.value).substring(strPos,txtarea.value.length); 
		txtarea.value=front+text+back;
		strPos = strPos + text.length;
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			range.moveStart ('character', strPos);
			range.moveEnd ('character', 0);
			range.select();
		}
		else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}
		txtarea.scrollTop = scrollPos;
	}
	
	$.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
	
 
}(jQuery));