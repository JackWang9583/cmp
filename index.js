var options={
    fullscreenEl:false //关闭全屏按钮
}

Vue.use(vuePhotoPreview,options)
var vm = new Vue({
    el: "#body",
    data() {
        return {
            touchNum: 0, //上滑极限，是否可以上滑
            timer: null,
        }
    },
    mounted() {
        var _self = this;
        this.fullPage("#body", ".page-first", 4);
    },
    methods: {
        fullPage(mainClass, firstClass, num) {
            var _self = this;
            var startX = 0, //初始横坐标
                startY = 0, //初始纵坐标
                marginTop = 0, //上下滑动变量
                touchFlag = true, //可滑动标志 true 可滑动，false 不可滑
                bodyHeight = document.body.offsetHeight,
                page = document.querySelectorAll(mainClass)[0],
                pageFirst = document.querySelectorAll(firstClass)[0];

            //获取触摸的初识坐标
            page.addEventListener("touchstart", function (e) {
                // e.preventDefault();
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
            })
            //重置触摸的坐标值
            page.addEventListener("touchend", function (e) {
                // e.preventDefault();
                startX = 0;
                startY = 0;
                touchFlag = true;
            })

            //监听并实现 上、下 滑动效果
            page.addEventListener("touchmove", function (e) {
                // e.preventDefault();
                var newX = e.targetTouches[0].clientX,
                    newY = e.targetTouches[0].clientY;
                if (newY - startY > 50) {
                    if (touchFlag == true && _self.touchNum > 0) {
                        console.log("下滑");
                        touchFlag = false;
                        marginTop += 1;
                        _self.touchNum -= 1;
                        pageFirst.style.marginTop = marginTop * bodyHeight + "px";
                        _self.show();
                    }
                } else if (newY - startY < -50) {
                    if (touchFlag == true && marginTop > -num + 1) {
                        console.log("上滑");
                        touchFlag = false;
                        marginTop -= 1;
                        _self.touchNum += 1;
                        pageFirst.style.marginTop = marginTop * bodyHeight + "px";
                        _self.show();
                    }
                }
            })
        },
        isAct (num) {
            return num == this.touchNum ? 'active' : ''
        },
        show () {
            var _self = this;
            if (_self.timer) {
                clearTimeout(_self.timer);
                _self.timer = null;
            }
            _self.timer = setTimeout(function () {
                $('#body .page.active').removeClass('active');
                $('#body .page:nth-child('+ (_self.touchNum + 1) +')').addClass('active');
            }, 1500);
        }
    }
});