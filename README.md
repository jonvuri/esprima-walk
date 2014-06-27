# esprima-walk

A very fast [esprima](http://esprima.org/) AST node walker with no dependencies.

To naïvely traverse the AST object with callbacks will result in an exponential explosion of function calls and could take several seconds for a single parsed file of a thousand or so lines.

This walker calls no functions itself, only the callback passed in, and it only calls it on primary nodes of the tree (those with a `type` property), not every property and value. It also uses the fastest possible ways (on V8) to check types and iterate over properties and arrays.

The walker returns no result from the callbacks, only undefined.

## Usage

```js
var esprima = require( 'esprima' )
var walk = require( 'esprima-walk' )

var ast = esprima.parse( '"orange"' )

ast => {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'orange',
                raw: '"orange"'
            }
        }
    ]
}

var types = []

walk( ast, function ( node ) { types.push( node.type ) } )

types => [ 'Program', 'ExpressionStatement', 'Literal' ]
```

## Performance details

* Walk stack maintained with `.push()` to unbounded array, no `.pop()`. Iteration with for-loop and `.length` on stack.
* Object iteration with for..in, no hasOwnProperty. Make sure Object prototype unpolluted.
* Check array with `instanceof Array`, iterate with cached for-loop
* Check sub-node with `!= void 0` and `typeof === 'string'`
