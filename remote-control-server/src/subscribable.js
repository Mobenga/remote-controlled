/**
 * # Utils Subscribable
 * Borrow publish/subscribe functionality through mixin.
 * > All events are published synchronously.
 *
 * @mixin subscribable
 *
 * @public
 */
'use strict';



/**
 * Gives an object pub/sub functionality.
 *
 * @example
 * // Make object subscribable
 *
 * var bus = subscribable.mixin({});
 *
 * var subscription = bus.subscribe('foo', function (message) {
 *     console.log(message.event + ': ' + message.data);
 * });
 *
 * bus.publish('foo', 'bar'); // Log: 'foo: bar'
 *
 * subscription.dispose();
 *
 * bus.publish('foo', 'bar'); // Nothing happens
 *
 * @param {Object} obj Object to become a subscribable.
 * @returns {Object} Returns the same object
 *
 * @function mixin
 *
 * @memberof subscribable
 *
 * @public
 */
exports.mixin = function (obj) {

    obj._subscriptions = [];
    obj.subscribe = subscribe;
    obj.publish = publish;

    return obj;
};

/**
 * Mixed in subscribe method.
 * Subscribe to events published by subscribable.
 * Returns an object with dispose method:
 *
 *      { dispose:function(){} };
 *
 * @param event
 * @param callback
 * @returns {Object} Disposable object.
 * @method subscribable.subscribe
 *
 * @memberof subscribable
 *
 * @public
 */
function subscribe(event, callback) {
    var subscription = createSubscription.call(this, event, callback);
    this._subscriptions.push(subscription);
    return subscription;
}

function createSubscription(event, callback){

    var subscription = {
        event: new RegExp(event),
        callback: callback,
        dispose: function () {
            var i = this._subscriptions.indexOf(subscription);
            if (i >= 0) {
                this._subscriptions.splice(i, 1);
            }
            subscription.isDisposed = true;
        }.bind(this)
    };
    return subscription;
}
/**
 * Mixed in publish method.
 * Publishes an event on subcribable.
 *
 * @param {String} event Event channel.
 * @param {Object} data Event data.
 * @method subscribable.publish
 *
 * @memberof subscribable
 *
 * @public
 */
function publish(event, data) {

    var filter = function (subscription) {
        return event.match(subscription.event);
    };

    var callSubscriber = function (subscription) {
        if(subscription.isDisposed) {
            return;
        }
        subscription.callback(data);
    };

    this._subscriptions.filter(filter).forEach(callSubscriber);
}

