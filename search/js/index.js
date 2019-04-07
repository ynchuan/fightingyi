class Search {
    constructor() {
        this.$keyword = $('#keyword');
        this.$search = $('#search');
        this.$result = $('#result');
        this.$loading = $('#loading');
    }
    init() {
        this.$search.on('click', (e) => {
            this.keyword = this.$keyword.val();
            this.fetch();
        });
    }
    fetch() {
        this.$loading.removeClass('hide');
        if (this.data) {
            this.render();
            return;
        }
        clearTimeout(this.timeAuthorHandler);
        this.timeAuthorHandler = setTimeout(() => {
            window.bdvTopSearchList = data => {
                this.data = data;
                this.render();
            };
            $.getJSON('http://v.baidu.com/staticapi/api_hotsearch.json?callback=?');
        }, 1000);
    }
    render(data) {
        setTimeout(() => {
            let ret = '<ul class="recs">';
            let list = this.adapter();
            list.forEach((item) => {
                ret += `<li class="poster" data-id='28827'>
                        <a class="link" href="${item.url}" target="_blank">
                            <img class='img' src="${item.imgh_url}" alt="${item.title}">
                            <span class="title">${item.title}</span>
                            <span class="update">${item.update_time}</span>
                        </a>
                    </li>`;
            });
            ret += '</ul>';
            this.$result.html(ret);
            this.$loading.addClass('hide');
        }, 2000);
    }
    adapter(data) {
        let ret = [];
        this.data.forEach(item => {
            let t = item.data.videos;
            t.forEach(i => {
                if (i.title.match(this.keyword)) {
                    ret.push(i);
                }
            });
        });
        return ret;
    }
}

new Search().init();
