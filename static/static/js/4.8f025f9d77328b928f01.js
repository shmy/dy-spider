webpackJsonp([4],{"8Jyl":function(e,n){},dwST:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("Xxa5"),a=t.n(r),s=t("exGp"),o=t.n(s),i={name:"keep-search",data:function(){return{paging:{keyword:"",page:1,per_page:21},items:[],isRefreshIng:!1,isLoadMoreIng:!1,noMore:!1}},mounted:function(){this.$refs.searchInput.focus()},methods:{fetch:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return o()(a.a.mark(function t(){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/video/search",e.paging);case 2:r=t.sent,n?e.items=r.payload.result:e.items.push.apply(e.items,r.payload.result),n||r.payload.result.length?e.noMore=!1:e.noMore=!0;case 5:case"end":return t.stop()}},t,e)}))()},refresh:function(e){var n=this;return o()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.isRefreshIng){t.next=2;break}return t.abrupt("return");case 2:return n.isRefreshIng=!0,n.paging.page=1,t.next=6,n.fetch(1);case 6:n.isRefreshIng=!1,e("done");case 8:case"end":return t.stop()}},t,n)}))()},loadmore:function(){var e=this;return o()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.isLoadMoreIng&&!e.noMore){n.next=2;break}return n.abrupt("return");case 2:return e.isLoadMoreIng=!0,e.paging.page++,n.next=6,e.fetch();case 6:e.isLoadMoreIng=!1;case 7:case"end":return n.stop()}},n,e)}))()},handelInput:function(){var e=this;return o()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.paging.page=1,n.next=3,e.fetch(1);case 3:case"end":return n.stop()}},n,e)}))()}}},c={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"column"},[t("header",{staticClass:"search"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.paging.keyword,expression:"paging.keyword"}],ref:"searchInput",attrs:{type:"search",placeholder:" 🔍 输入电影名称以搜索"},domProps:{value:e.paging.keyword},on:{change:e.handelInput,input:function(n){n.target.composing||e.$set(e.paging,"keyword",n.target.value)}}})]),e._v(" "),t("main",{staticClass:"col-h"},[t("pull-to",{directives:[{name:"keep-scroll",rawName:"v-keep-scroll.sub",value:".scroll-container",expression:"'.scroll-container'",modifiers:{sub:!0}}],staticClass:"col-h",attrs:{"top-load-method":e.refresh},on:{"infinite-scroll":e.loadmore}},[t("div",{staticClass:"movie-page row"},[e._l(e.items,function(e){return t("movie-item",{key:e._id,attrs:{item:e}})}),e._v(" "),t("p",{staticStyle:{"text-align":"center",width:"100%"}},[e._v("\n          "+e._s(e.isLoadMoreIng?"正在加载中...":" ")+"\n          "+e._s(e.noMore?"没有更多数据了...":" ")+"\n        ")])],2)])],1)])},staticRenderFns:[]};var u=t("VU/8")(i,c,!1,function(e){t("8Jyl")},null,null);n.default=u.exports}});