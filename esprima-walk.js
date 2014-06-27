'use strict'


exports = module.exports = function ( ast, fn ) {

	var stack = [ ast ], i, j, key, len, node, child

	for ( i = 0; i < stack.length; i += 1 ) {

		node = stack[ i ]

		fn( node )

		for ( key in node ) {

			child = node[ key ]

			if ( child instanceof Array ) {

				for ( j = 0, len = child.length; j < len; j += 1 ) {
					stack.push( child[ j ] )
				}

			} else if ( child != void 0 && typeof child.type === 'string' ) {

				stack.push( child )

			}

		}

	}

}
