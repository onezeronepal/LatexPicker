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
    script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";  // set its src to the provided URL
    document.head.appendChild(script);
    
    var scriptSelect = document.createElement("script");  // create a script DOM node
    scriptSelect.src = "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js";  // set
    document.head.appendChild(scriptSelect);
    
    var styleSelect = document.createElement("link");
    styleSelect.href = "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css";
    styleSelect.rel = "stylesheet";
    document.head.appendChild(styleSelect);

    var styleSelect = document.createElement("link");
    styleSelect.href = "https://latex.opensource.onezero.com.np/v0.0.2/css/eksunye-latex.css";
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
		    displayAlign: 'left',        // default for indentalign when set to 'auto'
		    displayIndent: 'left',            // default for indentshift when set to 'auto'
		    fontCache: 'global',            // or 'global' or 'none'
		    localID: null,                 // ID to use for local font cache (for single equation processing)
		    internalSpeechTitles: true,    // insert <title> tags with speech content
		    titleID: 0                     // initial id number to use for aria-labeledby titles
		  }
	};
         
    $.fn.latexEditor = function( options ) {
        var mouseOver=false;
        var $popup=null;
		var latexValues = "[{\"label\":\"\\\\square\\\\underline{\\\\,}\\\\square\",\"insert\":\"insert('\\\\\\\\,')\"},{\"label\":\"\\\\square\\\\underline{\\\\:}\\\\square\",\"insert\":\"insert('\\\\\\\\:')\"},{\"label\":\"\\\\square\\\\underline{\\\\;}\\\\square\",\"insert\":\"insert('\\\\\\\\;')\"},{\"label\":\"\\\\square\\\\!\\\\square\",\"insert\":\"insert('\\\\\\\\!')\"},{\"label\":\"\\\\leftarrow\",\"insert\":\"insert('\\\\\\\\leftarrow')\"},{\"label\":\"\\\\rightarrow\",\"insert\":\"insert('\\\\\\\\rightarrow')\"},{\"label\":\"a^{\\\\circ}\",\"insert\":\"insert('^{\\\\\\\\circ}',0)\"},{\"label\":\"x^a\",\"insert\":\"insert('^{}',2,0)\"},{\"label\":\"x_a\",\"insert\":\"insert('_{}',2,0)\"},{\"label\":\"_a^{b}\\\\textrm{C}\",\"insert\":\"insert('_{}^{}\\\\\\\\textrm{}',2,14)\"},{\"label\":\"\\\\frac{a}{b}\",\"insert\":\"insert('\\\\\\\\frac{}{}',6)\"},{\"label\":\"x\\\\tfrac{a}{b}\",\"insert\":\"insert('\\\\\\\\tfrac{}{}',7)\"},{\"label\":\"\\\\int_a^b\",\"insert\":\"insert('\\\\\\\\int_{}^{}',6,1000)\"},{\"label\":\"\\\\oint_a^b\",\"insert\":\"insert('\\\\\\\\oint_{}^{}',7,1000)\"},{\"label\":\"\\\\iint_a^b\",\"insert\":\"insert('\\\\\\\\iint_{}^{}',7,1000)\"},{\"label\":\"\\\\bigcap_a^b\",\"insert\":\"insert('\\\\\\\\bigcap_{}^{}',9,1000)\"},{\"label\":\"\\\\bigcup_a^b\",\"insert\":\"insert('\\\\\\\\bigcup_{}^{}',9,1000)\"},{\"label\":\"\\\\displaystyle \\\\lim_{x \\\\to 0}\",\"insert\":\"insert('\\\\\\\\lim_{}',6,1000)\"},{\"label\":\"\\\\sum_a^b\",\"insert\":\"insert('\\\\\\\\sum_{}^{}',6)\"},{\"label\":\"\\\\sqrt{x}\",\"insert\":\"insert('\\\\\\\\sqrt{}',6,6)\"},{\"label\":\"\\\\sqrt[n]{x}\",\"insert\":\"insert('\\\\\\\\sqrt[]{}',6,8)\"},{\"label\":\"\\\\prod_a^b\",\"insert\":\"insert('\\\\\\\\prod_{}^{}',7,1000)\"},{\"label\":\"\\\\coprod_a^b\",\"insert\":\"insert('\\\\\\\\coprod_{}^{}',9,1000)\"},{\"label\":\"\\\\left (\\\\: \\\\right )\",\"insert\":\"insert('\\\\\\\\left ( \\\\\\\\right )',8)\"},{\"label\":\"\\\\left [\\\\: \\\\right ]\",\"insert\":\"insert('\\\\\\\\left [ \\\\\\\\right ]',8)\"},{\"label\":\"\\\\left\\\\{\\\\: \\\\right\\\\}\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\{ \\\\\\\\right \\\\\\\\}',9)\"},{\"label\":\"\\\\left |\\\\: \\\\right |\",\"insert\":\"insert('\\\\\\\\left | \\\\\\\\right |',8)\"},{\"label\":\"\\\\left \\\\{ \\\\cdots \\\\right.\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\{ \\\\\\\\right.',9)\"},{\"label\":\"\\\\left \\\\|\\\\: \\\\right \\\\|\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\| \\\\\\\\right \\\\\\\\|',9)\"},{\"label\":\"\\\\left \\\\langle \\\\: \\\\right \\\\rangle\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\langle \\\\\\\\right \\\\\\\\rangle',14)\"},{\"label\":\"\\\\left \\\\lfloor \\\\: \\\\right \\\\rfloor\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\lfloor \\\\\\\\right \\\\\\\\rfloor',14)\"},{\"label\":\"\\\\left \\\\lceil \\\\: \\\\right \\\\rceil\",\"insert\":\"insert('\\\\\\\\left \\\\\\\\lceil \\\\\\\\right \\\\\\\\rceil',13)\"},{\"label\":\"\\\\left. \\\\cdots \\\\right \\\\}\",\"insert\":\"insert('\\\\\\\\left. \\\\\\\\right \\\\\\\\}',7)\"},{\"label\":\"\\\\mathbf{A1}\",\"insert\":\"insert('\\\\\\\\mathbf{}')\"},{\"label\":\"\\\\mathit{A1}\",\"insert\":\"insert('\\\\\\\\mathit{}')\"},{\"label\":\"\\\\mathrm{Aa1}\",\"insert\":\"insert('\\\\\\\\mathrm{}')\"},{\"label\":\"\\\\mathfrak{Aa1}\",\"insert\":\"insert('\\\\\\\\mathfrak{}')\"},{\"label\":\"\\\\mathbb{Aa1}\",\"insert\":\"insert('\\\\\\\\mathbb{}')\"},{\"label\":\"\\\\textbf{Aa1}\",\"insert\":\"insert('\\\\\\\\textbf{}')\"},{\"label\":\"\\\\textit{Aa1}\",\"insert\":\"insert('\\\\\\\\textit{}')\"},{\"label\":\"\\\\textrm{Aa1}\",\"insert\":\"insert('\\\\\\\\textrm{}')\"},{\"label\":\"\\\\texttt{Aa1}\",\"insert\":\"insert('\\\\\\\\texttt{}')\"},{\"label\":\"\\\\text{Aa1}\",\"insert\":\"insert('\\\\\\\\text{}')\"}]";
		var icons = JSON.parse(latexValues);
		var settings = $.extend({
        	
        }, options);
        return this.each( function() {
        	element=this;
			var textAreaLatex = $('.textAreaOneZeroLatex');
            if(!settings.buttonOnly && $(this).data("latexPicker")==undefined ){
				setTimeout(function(){ try{ MathJax.typesetPromise(); }catch(err){ try{ MathJax.typesetPromise(); }catch(err){ var a =1; } } }, 1000);   		
            	$this=$(this).addClass("form-control");
            	$wraper=$("<div/>",{class:"input-group w-100 float-left"});
            	$this.wrap($wraper);
				var elemObj = $(this);
            	$button=$("<div class=\"input-group-append w-10 inputLatexBtn\"><span class=\"input-group-text   pointer\">ƒ(x)</span></div>");
            	$this.after($button);
            	(function(ele){
            		$button.click(function(){
			       		createUI(ele,elemObj);
			       		showList(ele,icons);
	            	});
	            })($this);

            	$(this).data("latexPicker",{attached:true});
            }
        
	        function createUI($element,$laTexParent){
	        	$popup=$('<div/>',{
	        		css: {
		        		'opacity':1,
						'z-index':999999,
		        	},
		        	class:'latex-popup'
	        	})

				var selectMatrix ='<div class="col-2">\
				           <select class="form-control selectMatrix selectpicker-latex">\
								<option value="" readonly>Matrix</option>\
								<option value="\\begin{bmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{bmatrix}">Matrix []</option>\
								<option value="\\begin{pmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{pmatrix}">Matrix ()</option>\
								<option value="\\begin{Bmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{Bmatrix}">Matrix {}</option>\
								<option value="\\begin{Vmatrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{Vmatrix}">Matrix ||</option>\
								<option value="\\begin{matrix} &  & \\\\  &  & \\\\  &  & \\\\ \\end{matrix}">Matrix EMPTY</option>\
							</select>\
							</div>';
							
				var selectExtra ='<div class="col-2">\
				           <select class="form-control selectMatrix selectpicker-latex">\
								<option value="" readonly>Extra</option>\
								<option value="\\begin{aligned} \\end{aligned}">Align Box</option>\
								<option value="\\displaylines{ Contents }">Multi Lines</option>\
								<option value="\\\\">Next Line</option>\
								<option value="&">Next Row</option>\
							</select>\
							</div>';
			
								var selectColor ='<div class="col-2">\
				           <select class="form-control selectGreek selectpicker-latex">\
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
				
				var selectFunction = '<div class="col-2">'+
				'<select  class="form-control selectFuntion selectpicker-latex" title="Function">'+
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
				if($laTexParent.val() == ""){ resImgLaTex = "";  }else{ resImgLaTex = $laTexParent.val();  }
	        	$popup.html('<div style="height: calc(100vh - 25em); overflow-y:scroll;" class="container-fluid bg-white text-dark">\
									<div class="w-100 text-center d-none loadingLatex"><svg class="font-awesome-spin" width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></div>\
									<div class="svgLaText w-100">'+resImgLaTex+'</div>\
							</div>\
							<div style="height:25em;">\
								<div class="a-div w-100"> \
									<div class="container-fluid">\
										<div class="row p-2">\
											<div class="col-10" style="padding:2px">\
												<textarea style="height:6em !important;" class="form-control textAreaOneZeroLatex ip-search w-100 h-100">'+resImgLaTex+'</textarea> \
											</div>\
											<div class="col-2 text-right">\
												<button  type="button" class="w-100 btn btn-primary sendDataLatex text-white"><svg class="text-white" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.25 100.25"><path fill="white" d="M83.061 27.94l-11-11A1.5 1.5 0 0071 16.501H18a1.5 1.5 0 00-1.5 1.5v64a1.5 1.5 0 001.5 1.5h64a1.5 1.5 0 001.5-1.5v-53a1.5 1.5 0 00-.439-1.061zM34.5 19.5h31v21h-31v-21zm37 61h-43v-26h43v26zm9 0h-6V53a1.5 1.5 0 00-1.5-1.5H27a1.5 1.5 0 00-1.5 1.5v27.5h-6v-61h12V42a1.5 1.5 0 001.5 1.5h34a1.5 1.5 0 001.5-1.5V19.5h1.879L80.5 29.621V80.5z"/></svg> SAVE</button>\
											</div>\
										</div>\
									</div>\
								 </div>\
								 <div class="b-div container-fluid mt-2 mb-3"> \
									 <div class="row p-2" style="width:100%; padding-top:10px; padding-bottom:20px; position:absolute;">\
										 '+selectMatrix+'\
										 '+selectFunction+'\
										 '+selectColor+'\
										 '+selectExtra+'\
										 <div class="col-4 text-center">\
											<div class="row">\
														<div class="col-6">\
															<div class="form-control p-2" style="cursor:pointer;" onclick="$(\'.textAreaOneZeroLatex\').val($(\'.textAreaOneZeroLatex\').val().replace(\'\\\\(\', \'$$$$\'));$(\'.textAreaOneZeroLatex\').val($(\'.textAreaOneZeroLatex\').val().replace(\'\\\\)\', \'$$$$\')); $(\'.textAreaOneZeroLatex\').focus(); $(\'.textAreaOneZeroLatex\').trigger(\'change\');">\
																<div class="w-50 float-left"><b>\$\$</b>LaTex<b>\$\$</b></div> = Large Latex \
															</div>\
														</div>\
														<div class="col-6">\
															<div class="form-control p-2" style="cursor:pointer;" onclick="$(\'.textAreaOneZeroLatex\').val($(\'.textAreaOneZeroLatex\').val().replace(\'$$\',\'\\\\(\'));$(\'.textAreaOneZeroLatex\').val($(\'.textAreaOneZeroLatex\').val().replace(\'$$\', \'\\\\)\')); $(\'.textAreaOneZeroLatex\').focus();">\
																<div class="w-50 float-left"><b>\\(</b>LaTex<b>\\)</b></div> = Inline Latex \
															</div>\
														</div>\
													</div>\
											</div>\
									 </div>\
								 </div>\
								 <div class="container-fluid latex-list w-100 h-100">\
									Loading...\
								 </div>\
							 </div>\
					         ').appendTo("body");
	        	$('.selectpicker-latex').selectpicker('refresh');
	        	$textAreaLatex = $('.textAreaOneZeroLatex');
				$latexImg = $('.svgLaText');
				$latexLoading = $('.loadingLatex');
	        	$popup.append('<span style="position: fixed; top: 0px;right: 0px;padding: 5px;">ekSunye LatexPicker v0.0.1<button class="btn btn-close-latex btn-danger">X</button>\</span>').addClass('d-solid bg-light-90').show();
	        	
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
	                  $.each($(".latex-list>ul li"),function(i){
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
				
				$(".selectpicker-latex",$popup).change(function(){
					var laText = $(this).val()+' ';
					var initCur = $textAreaLatex.getCursorPosition();
					$textAreaLatex.insertLaText(laText);
					$latexImg.html($textAreaLatex.val());
					$textAreaLatex.selectRange(initCur + laText.length);
					$(this).selectpicker('refresh');
					$textAreaLatex.focus();
					$(".selectpicker-latex option").prop("selected", false);
				})
				
				$(".selectpicker-latex-matrix",$popup).change(function(){
					var laText = $(this).val()+' ';
					var initCur = $textAreaLatex.getCursorPosition();
					$textAreaLatex.insertLaText(laText);
					$latexImg.html($textAreaLatex.val());
					$textAreaLatex.selectRange(initCur + laText.length);
					$(this).selectpicker('refresh');
					$textAreaLatex.focus();
					$(".selectpicker-latex-matrix option").prop("selected", false);
				})
				
	        	$('.btn-close-latex',$popup).click(function(){
					removeInstance();
				});
	        	
	        	$(document).mouseup(function (e){
				    if(!$(e.target).closest('.latex-popup').length && !$(e.target).is('.latex-popup')){
				        //removeInstance();
				    }
				});
				
				var OldStringEkSunyeLatexPickerVar;
				var timer = null;
				setInterval(function(){
					if(OldStringEkSunyeLatexPickerVar != $textAreaLatex.val())
					{   
						clearTimeout(timer); 
						timer = setTimeout(refreshLatex(), 2000);
						OldStringEkSunyeLatexPickerVar = $textAreaLatex.val();
					}
				},2000);

	        }
	        function removeInstance(){
	        	$(".latex-popup").remove();
	        }
	        function showList($element,arrLis){
	        	$ul=$("<ul>");
	        	
	        	for (var i in arrLis) {
	        		$ul.append('<li><a href="#" data-latex="'+arrLis[i].insert+'">$$'+arrLis[i].label+'$$</a></li>');
	        	};

	        	$(".latex-list",$popup).html($ul);
	        	$(".latex-list li a",$popup).click(function(e){
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
			}
			
			window.refreshLatex = function()
			{
				$latexImg.html($textAreaLatex.val());
				//MathJax.typesetPromise();
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				//setTimeout(function(){ try{ MathJax.typeset(); }catch(err){ try{ MathJax.typeset(); }catch(err){ var a =1; } } }, 1000);   
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