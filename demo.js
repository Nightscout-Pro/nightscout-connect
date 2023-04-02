
const { createMachine, Machine, actions, interpret, spawn  } = require('xstate');
// var testableLoop = 

var testImpl = require('./testable_driver');
var axios = require('axios');
var builder = require('./lib/builder');

function testableLoop ( ) {
  
  var make = builder( );
  var impl = testImpl.fakeFrame({ }, axios);

  // var frame_retry_duration = backoff( );
  impl.generate_driver(make);

  // these results aren't quite right to use, ignored below.
  var built = make( );
  // console.log("BUILDER OUTPUT", built);
  console.log("BUILDER OUTPUT", JSON.stringify(built, null, 2));
  return built;

}

if (!module.parent) {
  var things = testableLoop( );
  console.log(things);
  var actor = interpret(things);
  actor.start( );
  actor.send({type: 'START'});
  setTimeout(( ) => {
  actor.send({type: 'STOP'});
  }, 60000 * 5);

}
