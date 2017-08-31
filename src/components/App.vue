<template>
  <div id="wrapper">
    <div id="header">
      <a id="yc" href="http://www.ycombinator.com">
        <!--<img src="https://news.ycombinator.com/y18.gif">-->
      </a>
      <h1><a href="#/">Hacker News</a></h1>
      <span class="source">
        Built with <a href="http://vuejs.org" target="_blank">Vue.js</a> |
        <a href="https://github.com/vuejs/vue-hackernews" target="_blank">Source</a>
      </span>
    </div>
    <!--<router-view class="view" keep-alive transition transition-mode="out-in"></router-view>-->
  </div>
</template>

<style lang="scss">
  html, body {
    font-family: Verdana;
    font-size: 13px;
    height: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }
</style>