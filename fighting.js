class Search {
    constructor() {
        this.$keyWords = $('#keyWords');
        this.$search = $('#searchButton');
        this.$loading = $('#loading');
        this.$result = $('#searchResult');
    }
    init() {
        $(document).ready(() => {
            this.fetch();
            this.toggleImg();
        });
        this.$search.on('click', (e) => {
            this.keywords = this.$keyWords.val();
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
        }, 100);
    }
    render(data) {
        setTimeout(() => {
            let list = this.adapter();
            let ret = '<ul class="recs">';
            list.forEach((item) => {
                ret += `<li class="poster" data-id='28827'>
                        <a class="link" href="${item.url}" target="_blank">
                            <img class='img' src="${item.imgh_url}" alt="${item.title}" tabIndex=1>
                            <span class="title">${item.title}</span>
                            <span class="update">${item.update_time}</span>
                        </a>
                        <div class="mask hide">
                            <img class="big-img" src="${item.imgv_url}" tabIndex=2>
                            <span class="close">X</span>
                        </div>
                    </li>`;
            });
            ret += '</ul>';
            this.$result.html(ret);
            this.$loading.addClass('hide');
        }, 2000);
    }
    adapter(data) {
        let ret = [];
        this.data.forEach((item) => {
            let t = item.data.videos;
            t.forEach(i => {
                if (i.title.match(this.keywords)) {
                    ret.push(i);
                }
            });
        });
        return ret;
    }
    

    //hover使用事件委托，只有当鼠标移除currentTargt元素外才会触发？？？
    toggleImg() {            
        this.$result.on('mouseover', (event) => {
            let target = event.target;
            if (target.tabIndex == 1) {
                target.parentNode.nextElementSibling.classList.remove('hide');
            }
            event.stopPropagation();
            return false;    
        });
        // this.$result.on('mouseout', (event) => {
        //     let target = event.target;
        //     if (target.tabIndex == 2) {
        //         target.parentNode.classList.add('hide');
        //     }
        //     event.stopPropagation();
        //     return false;    
        // });
        
        //mouseout和click冲突了，如果mouseout存在，当鼠标滑动到X时，图片就会关闭了。
        this.$result.on('click', (event) => {
            let target = event.target;
            if(target.className == 'close'){
                target.parentNode.classList.add('hide');
            }
            event.stopPropagation();
            return false; 
        });

    }
}
new Search().init();