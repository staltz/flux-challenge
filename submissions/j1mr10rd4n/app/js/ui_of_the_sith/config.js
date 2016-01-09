// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.config');
goog.require('cljs.core');
goog.require('goog.log');
ui_of_the_sith.config.base_url = "http://localhost:3000/dark-jedis/";
ui_of_the_sith.config.initial_sith_remote_id = (3616);
ui_of_the_sith.config.list_size = (5);
ui_of_the_sith.config.scroll_size = (2);
if(typeof ui_of_the_sith.config.logger !== 'undefined'){
} else {
ui_of_the_sith.config.logger = (function (){var logger = goog.log.getLogger("sith.ui");
logger.setLevel(goog.debug.Logger.Level.WARNING);

return logger;
})();
}
