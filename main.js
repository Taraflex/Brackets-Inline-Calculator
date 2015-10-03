define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule('command/CommandManager'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        Menus = brackets.getModule('command/Menus');

    function reval(s) {
        try {
            return window.eval('(function(){with(Math){ return ' + s + '; }})()');
        }
        catch (e) {
            return undefined;
        }
    }

    var MY_COMMAND_ID = 'inline-calc',
        precision,
        _preferences = PreferencesManager.getExtensionPrefs(MY_COMMAND_ID),
        reloadSettings = function () {
            precision = Math.pow(10, Math.min(_preferences.get('precision'), 15));
        }

    _preferences.definePreference("precision", "number", 2).on('change', reloadSettings);

    reloadSettings();

    function calcselectedtext() {
        var editor = EditorManager.getCurrentFullEditor(),
            currentSelection,
            originalText,
            processedText;

        if (editor.hasSelection()) {

            currentSelection = editor.getSelection();
            originalText = editor.getSelectedText().trim();

            if (originalText) {
                var res = reval(originalText);
                if (res !== undefined) {
                    if (typeof res == 'number') {
                        res = Math.round(res * precision) / precision;
                    }
                    editor.document.replaceRange(res.toString(), currentSelection.start, currentSelection.end);
                }
            }
        }
    }

    CommandManager.register('Inline Calc', MY_COMMAND_ID, calcselectedtext);

    Menus.getMenu(Menus.AppMenuBar.EDIT_MENU).addMenuItem(MY_COMMAND_ID, 'Alt-C');
});