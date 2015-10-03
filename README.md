Inline Calculator
================

Inline Calculator is a plugin for Brackets which lets you do inline calculations with a few keypresses.
All you need to do is select the mathematical expression and press `Alt+C`.

![](/images/usage.gif)

Configuration
----------------
By default, Inline Calculator rounds the result down to two decimals. However, you can specify the number of decimals you would like in the preferences file. Only create property `"inline-calc.precision": (the number of decimals)` in the root of the settings tree.
If you want to change the default keybinding, add a new keybinding with command `"inline-calc"`.
Example:
<pre>
"Ctrl-D": "inline-calc"
</pre>