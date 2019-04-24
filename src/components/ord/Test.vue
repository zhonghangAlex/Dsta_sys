<template>
      <div class="index">
        <div class="entrance-bottom">
          <div class="entrance-bottom-frame clearfix">
            <div class="entrance-bottom-frame-line active" v-for="(item, index) in quesdata">
              <div class="entrance-bottom-frame-beijing"></div>
              <div class="entrance-bottom-frame-line-id">{{ item.id }}</div>
              <div class="entrance-bottom-frame-line-title">编译和运行下面代码时显示的结果是（）</div>
              <pre class="pre_message">
                <code v-html="item.code">
                </code>
              </pre>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">A</div>
                <div class="entrance-bottom-frame-line-button-frame">打开当前目录下的文件1.txt，既可以向文件写数据，也可以从文件读数据</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">B</div>
                <div class="entrance-bottom-frame-line-button-frame">ClassCastException</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">C</div>
                <div class="entrance-bottom-frame-line-button-frame">FileNotFoundException</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">D</div>
                <div class="entrance-bottom-frame-line-button-frame">IndexOutOfBoundsException</div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  export default {
    data() {
      return {
        quesdata: [
          {
            "id" : "1",
            "title": "编译和运行下面代码时显示的结果是（）",
            "code": "public class ThisConstructorCall { "+ "<br>" +
              "&nbsp&nbsp"+"public ThisConstructorCall(String s){"+ "<br>" +
              "&nbsp&nbsp"+"	System.out.println('s = ' + s);  "+ "<br>" +
              "&nbsp&nbsp"+"} "+ "<br>" +
              "&nbsp&nbsp"+"public ThisConstructorCall(int i){ "+ "<br>" +
              "&nbsp&nbsp"+"	this('i = ' + i);  "+ "<br>" +
              "&nbsp&nbsp"+"} "+ "<br>" +
              "&nbsp&nbsp"+"public static void main(String args[]){  "+ "<br>" +
              "&nbsp&nbsp"+"	new ThisConstructorCall('String call');"+ "<br>" +
              "&nbsp&nbsp"+"	new ThisConstructorCall(47);"+ "<br>" +
              "&nbsp&nbsp"+"}"+ "<br>" +
              "}",
            "xuanxiang":[
              "打开当前目录下的文件1.txt，既可以向文件写数据，也可以从文件读数据",
              "ClassCastException",
              "FileNotFoundException",
              "IndexOutOfBoundsException",
            ]
          },{
            "id" : "2",
            "title": "编译和运行下面代码时显示的结果是（）",
            "code":"public class ThisConstructorCall { "+ "<br>" +
              "&nbsp&nbsp"+"public ThisConstructorCall(String s){"+ "<br>" +
              "&nbsp&nbsp"+"	System.out.println('s = ' + s);  "+ "<br>" +
              "&nbsp&nbsp"+"} "+ "<br>" +
              "&nbsp&nbsp"+"public ThisConstructorCall(int i){ "+ "<br>" +
              "&nbsp&nbsp"+"	this('i = ' + i);  "+ "<br>" +
              "&nbsp&nbsp"+"} "+ "<br>" +
              "&nbsp&nbsp"+"public static void main(String args[]){  "+ "<br>" +
              "&nbsp&nbsp"+"	new ThisConstructorCall('String call');"+ "<br>" +
              "&nbsp&nbsp"+"	new ThisConstructorCall(47);"+ "<br>" +
              "&nbsp&nbsp"+"}"+ "<br>" +
              "}",
            "xuanxiang":[
              "打开当前目录下的文件2.txt，既可以向文件写数据，也可以从文件读数据",
              "ClassCastException",
              "FileNotFoundException",
              "IndexOutOfBoundsException",
            ]
          }
        ]
      }
    },
    mounted() {
      let _this = this
      this.$nextTick(function() {
        // mintime = 1;
        //  timer = setInterval("CountDown()", 1000);
        let dact = document.querySelector(".entrance-bottom-frame-line")
        let active = "active"
        let none = "none"
        _this.addClass(dact, active)
        let timu_id = 0
        for (var i = 0; i < document.querySelectorAll(".entrance-bottom-frame-line-button").length; i++) {
          document.querySelectorAll(".entrance-bottom-frame-line-button")[i].onclick = function () {
            if (timu_id < document.querySelectorAll(".entrance-bottom-frame-line").length - 1) {
              let frame_left = _this.getStylee(document.querySelector('.entrance-bottom-frame'), 'marginLeft')
              document.querySelector(".entrance-bottom-frame").style.marginLeft = parseInt(frame_left) - 1050 + "px"
              timu_id++;
              _this.addClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id], active)
              _this.removeClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id - 1], active)
              _this.addClass(document.querySelectorAll(".entrance-bottom-frame-beijing")[timu_id - 1], none)
            } else {
              alert("最后一题啦")
            }
          }
        }
      })
    },
    methods: {
      addClass: function(obj, cls){
        let obj_class = obj.className//获取 class 内容.
        let blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
        let added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
        obj.className = added;//替换原来的 class.
      },

      removeClass: function(obj, cls){
        let obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
        let removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        obj.className = removed;//替换原来的 class.
      },

      getStylee: function(obj,attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }
        else{
          return document.defaultView.getComputedStyle(obj,null)[attr];
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
