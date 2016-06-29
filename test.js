// Mocha globals
/* global describe it */

'use strict'


var expect = require( 'chai' ).expect

var walk = require( './esprima-walk' )

var esprima = require('esprima')

var source = 'var i=0;'






describe('esprima-walk with range', function(){
	it('should work', function(){
		var ast = esprima.parse(source, {
			range: true
		})

		var types = []

		walk( ast, function ( node ) {
			types.push( node.type )
		} )

		var expectedTypes = [ 'Program',
	  'VariableDeclaration',
	  'VariableDeclarator',
	  'Identifier',
	  'Literal' ]

		expect( types ).to.deep.equal( expectedTypes )

	})
})

describe('esprima-walkAddParent with range', function(){
	walk = walk.walkAddParent
	it('should work', function(){
		var ast = esprima.parse(source, {
			range: true
		})

		var types = []

		walk( ast, function ( node ) {
			types.push( node.type )
		} )

		var expectedTypes = [ 'Program',
	  'VariableDeclaration',
	  'VariableDeclarator',
	  'Identifier',
	  'Literal' ]

		expect( types ).to.deep.equal( expectedTypes )

	})
})


describe( 'esprima-walk', function () {

	it( 'should work', function () {
		
		var ast = {
			type: 'Program',
			body: [
				{
					type: 'VariableDeclaration',
					declarations: [
						{
							type: 'VariableDeclarator',
							id: {
								type: 'Identifier',
								name: 'answer'
							},
							init: {
								type: 'BinaryExpression',
								operator: '*',
								left: {
									type: 'Literal',
									value: 6,
									raw: '6'
								},
								right: {
									type: 'Literal',
									value: 7,
									raw: '7'
								}
							}
						}
					],
					kind: 'var'
				}
			]
		}

		var types = []

		walk( ast, function ( node ) {
			types.push( node.type )
		} )

		var expectedTypes = [
			'Program',
			'VariableDeclaration',
			'VariableDeclarator',
			'Identifier',
			'BinaryExpression',
			'Literal',
			'Literal'
		]

		expect( types ).to.deep.equal( expectedTypes )

	} )


} )

