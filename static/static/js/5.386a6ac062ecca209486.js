j([5],{"M/Hv":function(t,e){},ghRW:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),a=r.n(n),s=r("exGp"),c=r.n(s),i={data:function(){return{items:[],state:{isRefreshIng:!1}}},components:{Scroller:r("8Dyd").a},created:function(){this.fetch()},methods:{fetch:function(){var t=this;return c()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=[],e.next=3,t.$localforage.record.iterate(function(t,e){t._id=e,t.percentage=(t.current/t.total*100).toFixed(2),r.push(t)});case 3:r.sort(function(t,e){return t.at<e.at}),t.items=r;case 5:case"end":return e.stop()}},e,t)}))()},refresh:function(t){var e=this;return c()(a.a.mark(function r(){return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.fetch();case 2:t("done");case 3:case"end":return r.stop()}},r,e)}))()}}},o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"column"},[r("header",{staticClass:"header row"},[r("div",{staticClass:"left",on:{click:function(e){t.$router.back()}}},[r("i",{staticClass:"iconfont icon-fanhui"}),t._v("返回")]),t._v(" "),r("div",{staticClass:"center"},[t._v("播放记录")]),t._v(" "),r("div",{staticClass:"right"})]),t._v(" "),r("main",{staticClass:"col-h"},[r("scroller",{attrs:{state:t.state,"class-name":""},on:{refresh:t.refresh}},t._l(t.items,function(e,n){return r("router-link",{key:e._id,staticClass:"movie-item row",attrs:{to:"/detail/"+e._id,tag:"div"}},[r("div",{staticClass:"col-w"},[t._v(t._s(n+1)+". "+t._s(e.name)+" ")]),t._v(" "),r("div",[t._v(t._s(e.percentage)+"%")])])}))],1)])},staticRenderFns:[]};var u=r("VU/8")(i,o,!1,function(t){r("M/Hv")},"data-v-7102bb77",null);e.default=u.exports}});