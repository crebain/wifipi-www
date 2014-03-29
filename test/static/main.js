// JavaScript source code
define(["jquery", "jqueryui"], function ($) {
    $(function () {
        var handlers = {};

        function go() {
            $.post($(this).prop('href'));
        }

        function startHandler(e) {
            if (!handlers[this.id])
                handlers[this.id] = window.setInterval($.proxy(go, this), 80);

            $(this).addClass('active');
            e.preventDefault();
        }

        function stopHandler(e) {
            if (handlers[this.id])
                window.clearTimeout(handlers[this.id]);

            handlers[this.id] = undefined;
            $(this).removeClass('active');
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
            var $element = actions[e.which];
            if (!$element)
                return;

            $.proxy(e.data, $element[0])(e);
            }

        $('body')
            .keydown(startHandler, keyHandler)
            .keyup(stopHandler, keyHandler);
    });
});
