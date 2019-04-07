class Recomand {
    constructor() {
        this.$keyword = $('#keyword');
        this.$search = $('#search');
        this.$result = $('#result');
    }
    init() {
        this.$search.on('click', (e) => {
            this.keyword = this.$keyword.val();
            this.fetch();
        });
    }
    fetch() {
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
            $.getJSON('http://v.baidu.com/staticapi/api_hotsearch.json?callback=?', (data) => {
                console.log('h');
            });
        }, 1000);
    }
    boot() {
        this.init();
    }
    render(data) {
        let ret = '<ul class="recs">';
        let list = this.adapter();
        list.forEach((item) => {
            ret += `<li class="poster">
                        <a class="link" href="${item.url}" target="_blank">
                            <span class="title">${item.title}</span>
                            <span class="dur">更新日期：${item.update_time}</span>
                            <img class='img' src="${item.imgh_url}" alt="${item.title}">
                        </a>
                    </li>`;
        });
        ret += '</ul>';
        this.$result.html(ret);
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

new Recomand().boot();
