# Julros

WARNING, This isn't working with the app.set feature of express currently, needs to be fixed, but it's sort of working as a renderer. END WARNING!

A very simple templating engine basically parsing with a simple regexp and some basic rules. The parser searches for any string matching `{{ some text here }}` where some is the name of the command or action to execute unless it's just one word without any whitespace in which case it tries to fetch that variable.

It adds the result of the computation e.g. fetching a variable, including a template directly into the current version of the template and then searches for the next occurrence of the pattern. If the added content itself has matches these will also be handled until there is no longer any match for the pattern.

If you want to add some actual text that looks like the pattern use &#x007b; for at least one of the opening brackets and &#x007d; for at least one of the closing brackets.

A julros string can not span multiple lines.

## Usage

The julros package can be installed through npm with `npm install julros --save` and can be used by requiring it in the files that you want to use it in. It has a function html which can be called with the path to a view with the .julros extension omitted.

### Example

`julros.html("books/edit");` will look for a template called edit.julros in the views/books or src/views/books folder counting from the root directory of your project. It is not possible to change the search path to something other than views/... or src/views/...

The html function returns a utf8 document that is in no way verified as valid html but if your templates are valid html that's basically what you should be getting.

## Variables

Anything that is not one of the commands below is basically seen as a variable. Normally a variable would be something like this `{{ some.variable }}`, a name without whitespace and nothing else, but if julros doesn't recognize the command it tries to fetch the value of a variable instead. This would work `{{ some.variable A nice comment but is ignored by the parser }}` if data passed in as a second parameter to the html function contains at least `{ some: { variable: "Woowoo" } }`. Both of the snippets above would be replaced with the value "Woowoo".

## Includes

Partial templates can be included with `{{ include template/path/filename }}` where the path name works the same as in view. Currently everything is fetched relative to root view folder so in the case of `{{ include bling }}` there would have to be a bling.julros template in either views or src/views folder for it to be found.

## Conditionals

There is only an if conditional with an optional else clause and it looks like this: `{{ if variable.isHappening if-template else-template }}`.

If the variable passed into if can be interpreted by javascript as true then the if-template is included into the document. Otherwise the else-template is included if one has been passed.

The template has to be in a separate file and the naming convention follows the same rules as any other templates.
