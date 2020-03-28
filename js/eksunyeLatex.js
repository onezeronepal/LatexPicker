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
	var script = document.createElement("script");  // create a script DOM node
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";  // set its src to the provided URL
    document.head.appendChild(script);
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
            if(!settings.buttonOnly && $(this).data("iconPicker")==undefined ){
            	$this=$(this).addClass("form-control");
            	$wraper=$("<div/>",{class:"input-group"});
            	$this.wrap($wraper);
				var elemObj = $(this);
            	$button=$("<div class=\"input-group-append\"><span class=\"input-group-text  pointer\">ƒ(x)</span></div>");
            	$this.after($button);
            	(function(ele){
	            	$button.click(function(){
			       		createUI(ele,elemObj);
			       		showList(ele,icons);
			    		setTimeout(function(){ try{ MathJax.typeset(); }catch(err){ try{ MathJax.typeset(); }catch(err){ var a =1; } } }, 1000);   		
	            	});
	            })($this);

            	$(this).data("iconPicker",{attached:true});
            }
        
	        function createUI($element,$laTexParent){
	        	$popup=$('<div/>',{
	        		css: {
		        		'top':$element.offset().top+$element.outerHeight()+6,
		        		'left':$element.offset().left
		        	},
		        	class:'icon-popup'
	        	})

				var selectMatrix ='<div class="col-3">\
				           <select class="form-control selectMatrix selectpicker">\
								<option value="">Matrix</option>\
								<option value="null">Matrix</option>\
								<option value="\\begin{bmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{bmatrix}">Matrix []</option>\
								<option value="\\begin{pmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{pmatrix}">Matrix {}</option>\
								<option value="\\begin{smatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{smatrix}">Matrix ()</option>\
							</select>\
							</div>';
			
				var selectColor ='<div class="col-3">\
				           <select class="form-control selectGreek selectpicker">\
								<option value="">α β γ</option>\
								<option value="\\alpha">α</option>\
								<option value="\\beta">β</option>\
								<option value="\\chi">χ</option>\
								<option value="\\delta">δ</option>\
								<option value="\\epsilon">ϵ</option>\
								<option value="\\eta">η</option>\
								<option value="\\gamma">γ</option>\
								<option value="\\kappa">κ</option>\
								<option value="\\lambda">λ</option>\
								<option value="\\mu">µ</option>\
								<option value="\\nu">ν</option>\
								<option value="\\o">o</option>\
								<option value="\\omega">ω</option>\
								<option value="\\phi">φ</option>\
								<option value="\\psi">ψ</option>\
								<option value="\\rho">ρ</option>\
								<option value="\\sigma">σ</option>\
								<option value="\\tau">τ</option>\
								<option value="\\theta">θ</option>\
								<option value="\\upsilon">υ</option>\
								<option value="\\xi">ξ</option>\
								<option value="\\digamma">J</option>\
								<option value="\\varepsilon">ε</option>\
								<option value="\\varkappa">κ</option>\
								<option value="\\varphi">ϕ</option>\
								<option value="\\varpi">α</option>\
								<option value="\\varrho">q</option>\
								<option value="\\varsigma">ς</option>\
								<option value="\\Delta">∆</option>\
								<option value="\\Gamma">Γ</option>\
								<option value="\\Lambda">Λ</option>\
								<option value="\\Omega">Ω</option>\
								<option value="\\Phi">Φ</option>\
								<option value="\\Pi">Π</option>\
								<option value="\\Psi">Ψ</option>\
								<option value="\\Theta">Θ</option>\
								<option value="\\Upsilon">Υ</option>\
								<option value="\\Xi">Ξ</option>\
								<option value="\\beth">ł</option>\
								<option value="\\daleth">Y</option>\
					           </select>\
				        </div>';
				
				var selectFunction = '<div class="col-3">'+
				'<select  class="form-control selectFuntion selectpicker" title="Function">'+
				'    <option selected="selected" value="">ƒ(x)</option>'+
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
				if($laTexParent.value == ""){ resImgLaTex = "\\alpha\\beta\\gamma123"; }else{ resImgLaTex = $laTexParent.val();  }
	        	$popup.html('<div class="ip-control w-100"> \
								<div class="container-fluid  mb-2">\
									<div class="row">\
										<div class="col-6">\
											<textarea  h-100 w-100 onchange="refreshLatex()" onkeyup="refreshLatex()" onpaste="refreshLatex()" class="form-control textArea ip-search">'+resImgLaTex+'</textarea> \
										</div>\
										<div class="col-6">\
											<div class="svgLaText  h-100 w-100">$$'+resImgLaTex+'$$</div>\
										</div>\
									</div>\
								</div>\
						     </div>\
							 <div class="container-fluid mt-1 dropDown"> \
							 <div class="row">\
							 '+selectMatrix+'\
							 '+selectFunction+'\
							 '+selectColor+'\
							 <div class="col-3 text-right">\
								<button  type="button" class="btn btn-primary sendDataLatex">🖫 Save</button>\
							 <\div>\
							 </div>\
							 </div>\
						     <div class="icon-list w-100">\
							 </div> \
					         ').appendTo("body");
	        	$('.selectpicker').selectpicker('refresh');
	        	$textAreaLatex = $('.textArea');
				$latexImg = $('.svgLaText');
	        	$popup.addClass('dropdown-menu').show();
	        	

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
					$latexImg.html('$$'+$textAreaLatex.val()+'$$');
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
				$latexImg.html('$$'+$textAreaLatex.val()+'$$');
				if(cursorS == undefined){ cursorS = laText.length;}
				$textAreaLatex.selectRange(initCur + cursorS);
				refreshLatex();
			}
			
			window.refreshLatex = function()
			{
				$latexImg.html('$$'+$textAreaLatex.val()+'$$');
				MathJax.typeset();
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
