webpackJsonp([2],{"/JF9":function(t,e){},"1kS7":function(t,e){e.f=Object.getOwnPropertySymbols},Dd8w:function(t,e,i){"use strict";e.__esModule=!0;var s,n=i("woOf"),a=(s=n)&&s.__esModule?s:{default:s};e.default=a.default||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}},NpIQ:function(t,e){e.f={}.propertyIsEnumerable},R4wc:function(t,e,i){var s=i("kM2E");s(s.S+s.F,"Object",{assign:i("To3L")})},To3L:function(t,e,i){"use strict";var s=i("lktj"),n=i("1kS7"),a=i("NpIQ"),l=i("sB3e"),r=i("MU5D"),c=Object.assign;t.exports=!c||i("S82l")(function(){var t={},e={},i=Symbol(),s="abcdefghijklmnopqrst";return t[i]=7,s.split("").forEach(function(t){e[t]=t}),7!=c({},t)[i]||Object.keys(c({},e)).join("")!=s})?function(t,e){for(var i=l(t),c=arguments.length,o=1,u=n.f,d=a.f;c>o;)for(var v,p=r(arguments[o++]),f=u?s(p).concat(u(p)):s(p),_=f.length,m=0;_>m;)d.call(p,v=f[m++])&&(i[v]=p[v]);return i}:c},V3tA:function(t,e,i){i("R4wc"),t.exports=i("FeBl").Object.assign},f2Us:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Xxa5"),n=i.n(s),a=i("exGp"),l=i.n(a),r=i("Dd8w"),c=i.n(r),o={data:function(){return{item:{remote_url:[],alias:[],director:[],starring:[]},playerOptions:{},selectPlayIndex:0}},created:function(){this.fetch()},computed:{playlist:function(){var t=this;return this.item.remote_url.map(function(e){return c()({src:e,withCredentials:!1},t.getMediaType(e))})}},methods:{getMediaType:function(t){return t.endsWith(".mp4")?{type:"video/mp4",name:"mp4",inline:!0}:t.endsWith(".m3u8")?{type:"application/x-mpegURL",name:"m3u8",inline:!0}:{type:"application/x-shockwave-flash",name:"flash",inline:!1}},fetch:function(){var t=this;return l()(n.a.mark(function e(){var i,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.$route.params.id,e.next=3,t.$http.get("/video/"+i);case 3:s=e.sent,t.item=s.payload,t.setPlaylist();case 6:case"end":return e.stop()}},e,t)}))()},setPlaylist:function(){var t=this.playlist[this.selectPlayIndex];if(t&&t.inline){var e=this.$refs.videoPlayer.$el.getBoundingClientRect(),i=e.width,s=e.height;this.playerOptions={language:"zh-cn",playbackRates:[.7,1,1.5,2],sources:t.src,width:i,height:s}}else window.open(t.src)},setPlaylistIndex:function(t){this.selectPlayIndex=t,this.setPlaylist()}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page column scroll"},[i("main",{staticClass:"col-h"},[i("video-player",{ref:"videoPlayer",staticClass:"video-player-box",attrs:{options:t.playerOptions,playsinline:!0}}),t._v(" "),i("div",{staticClass:"block"},[t._v("选择片源：")]),t._v(" "),i("div",{staticClass:"block row paly-item-wrap"},t._l(t.playlist,function(e,s){return i("div",{key:e.src,staticClass:"paly-item",class:t.selectPlayIndex===s&&"actived",on:{click:function(e){t.setPlaylistIndex(s)}}},[t._v("\n        "+t._s(e.name)+"\n\n      ")])})),t._v(" "),i("div",{staticClass:"block"},[t._v("片名：《"+t._s(t.item.name)+"》")]),t._v(" "),i("div",{staticClass:"block"},[t._v("质量："+t._s(t.item.quality))]),t._v(" "),i("div",{staticClass:"block"},[t._v("别名："+t._s(t.item.alias.join(" , ")))]),t._v(" "),i("div",{staticClass:"block"},[t._v("导演："+t._s(t.item.director.join(" , ")))]),t._v(" "),i("div",{staticClass:"block"},[t._v("主演："+t._s(t.item.starring.join(" , ")))]),t._v(" "),i("div",{staticClass:"block"},[t._v("来源："+t._s(t.item.source))]),t._v(" "),i("div",{staticClass:"block"},[t._v(t._s(t.item.language)+" / "+t._s(t.item.region)+" / "+t._s(t.item.released_at)+" / "+t._s(t.item.running_time)+" 分钟")]),t._v(" "),i("div",{staticClass:"block"},[t._v("简介："+t._s(t.item.introduce))])],1)])},staticRenderFns:[]};var d=i("VU/8")(o,u,!1,function(t){i("/JF9")},null,null);e.default=d.exports},woOf:function(t,e,i){t.exports={default:i("V3tA"),__esModule:!0}}});