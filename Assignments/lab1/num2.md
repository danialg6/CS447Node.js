####
1.
setTimeout(,0) essentially means execute after all current functions in the present queue get executed. 
No guarantees can be made about how long it could take.

setImmediate :It checks queue of I/O eventhandlers. If all I/O events in the current snapshot are processed, 
it executes the callback. It queues them immediately after the last I/O handler somewhat like process.nextTick. 
So it is faster.

setImmediate callbacks are called after I/O Queue callbacks are finished or timed out. 
setImmediate callbacks are placed in Check Queue, which are processed after I/O Queue.

setTimeout(fn, 0) callbacks are placed in Timer Queue and will 
be called after I/O callbacks as well as Check Queue callbacks. As event loop, 
process the timer queue first in each iteration, so which one will be executed first depends on which 
phase event loop is.
######
2.

nextTick() run before any other I/O event is fired, while with 
setImmediate(), the execution is queued behind any I/O event that is already in the queue.

######
3.


__dirname
__filename
clearImmediate(immediateObject)
clearInterval(intervalObject)
clearTimeout(timeoutObject)
console
Event
EventTarget
exports
global
MessageChannel
MessageEvent
MessagePort
module
performance
process
queueMicrotask(callback)
require()
setImmediate(callback[, ...args])
setInterval(callback, delay[, ...args])
setTimeout(callback, delay[, ...args])
URL
