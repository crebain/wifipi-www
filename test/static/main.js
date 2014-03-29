// JavaScript source code
define(["jquery", "jqueryui"], function ($) {
    $(function () {
        var handlers = {};

        function go() {
            $.post($(this).prop('href'));
        }

        function startHandler(e) {
            handlers[this.id] = window.setInterval($.proxy(go, this), 80);
            e.preventDefault();
        }

        function stopHandler(e) {
            window.clearTimeout(handlers[this.id]);
            e.preventDefault();
        }

        $('.action')
            .mousedown(startHandler)
            .mouseup(stopHandler)
            .click(function () { return false; })

        var actions = {};
        actions[$.ui.keyCode.UP] = $('#forward');
        actions[$.ui.keyCode.RIGHT] = $('#right');
        actions[$.ui.keyCode.DOWN] = $('#backward');
        actions[$.ui.keyCode.LEFT] = $('#left');

        function keyHandler(e) {
            console.log("Pressed key " + e.which);

            var $element = actions[e.which];
            if (!$element)
                return;

            $.proxy(e.data, $element[0])();
            }

        $('body')
            .keydown(go, keyHandler)
            //.keyup(stopHandler, keyHandler);
    });
});
