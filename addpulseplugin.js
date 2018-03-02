/*
	Add Pulse Plugin
	A plugin for Redactor v10 to remove <p> tags from around Pulse plug-in content
	
	<p>{{myplugin}}</p>		becomes:	{{myplugin}}
	
	Based on the norphan plug-in; 
	https://github.com/modmore/redactor-plugins
*/

if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.addpulseplugin = function()
	{
		return {
			init: function() {
                //if(this.opts.syncBeforeCallback !== undefined || !this.opts.tabifier) return;
                //console.log(this.opts);
                var that = this;
                that.opts.syncBeforeCallback = function(html) {
                	//create a dummy element to hold our code
                    var dummy = $(document.createElement('div'));
                    dummy.html(html);
                    // look for p tags to search within
                    dummy.find('p').each(function(){
                        $(this).replaceWith(that.addpulseplugin.filter($(this).get(0).outerHTML));
                    });

                    return that.tabifier.get(dummy.html());
                };
			},
            filter: function(html) {
            	//try and match plugin content wrapped directly in <p> tags
            	var newHTML = html;
            	var plugintag = /(<p>)({{[\d\w\W]+}})([\n\f\r]?)(<\/p>)/gi;
            	newHTML = newHTML.replace(plugintag,"$2");
            	return newHTML;
            }
		};
	};
})(jQuery);