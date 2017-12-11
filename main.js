window.onload = function() {
    function Init() {
        // Setup HTML5 on start
        document.cookie = "playerHtml=true";
    }

	// https://goodies.pixabay.com/javascript/auto-complete/demo.html
    var xhrs = new XMLHttpRequest();
    new autoComplete({
        selector: 'input[name=search-text]',
        minChars: 3,
        source: function(term, suggest) {
            xhrs.open('GET', 'https://korpatov.github.io/jsonp/autocomplete.json?name=' + term, false);
            xhrs.onload = function() {
                var suggestions = [];
                if (xhrs.status != 200 || xhrs.responseText.length == "") {
                    return
                }
                result = JSON.parse(xhrs.responseText)
                for (i=0; i<result.title_ru.length; i++) {
                    if (/sil\-/i.test(iframe_url[i]) == false) {
                        continue;
                    }
                    suggestions.push({
                        'title': result.title_ru[i],
                        'link': result.iframe_url[i],
                        'id': result.id[i],
                    });
                }
                suggest(suggestions)
            }
            xhrs.send(null);
			alert( xhrs.send(null) );
        },
        renderItem: function (item, search) {
            if (item.link.length == 0) {
                return '<div class="autocomplete-suggestion" data-link="/">'+item.title+'</div>';
            }
            return '<div class="autocomplete-suggestion" data-link="/?title='+item.title+'"><a href="?title='+item.title+'">'+item.title+'</a></div>';
        },		
        onSelect: function(e, term, item) {
            link = item.getAttribute('data-link');
            if (link != "/") {
                location = link;
            }
        }
	    });
		
				
	echo(suggestions);
	Init();
};

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
};
