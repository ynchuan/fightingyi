window.onload = function() {
    $.getJSON("http://v.baidu.com/staticapi/api_hotsearch.json?callback=?", bdvTopSearchList);
}
var datares = null;
function bdvTopSearchList(data) {
    var html = '';
    datares = data;
    var data = data[0].data.videos;
    for (var i = 0; i < data.length; i++) {
    	if(data.length>0 && filter(data[i].title)){
    		html += '<li class="show"><a class="information" href=' + data[i].url + '>' + data[i].title +
            '<span class="date">更新日期：' + data[i].update_time +
            '</a><img src=' + data[i].imgh_url + '>' + '</li>';
    	}else if(data.length==0){
    		html = '无数据'
    	}
        
    }

    $('#searchResult').html(html);
}
function filter(data){
	var words = $('input[name="searchKey"]').val();
	return data.indexOf(words)===-1 ? false : true;
}

$('#searchButton').click(function(){
	bdvTopSearchList(datares)
});