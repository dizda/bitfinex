// Generated by CoffeeScript 1.6.3
(function() {
  var Bitfinex, crypto, qs, request;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  request = require('request');

  crypto = require('crypto');

  qs = require('querystring');

  module.exports = Bitfinex = (function() {
    function Bitfinex(key, secret) {
      this.url = "https://api.bitfinex.com";
      this.key = key;
      this.secret = secret;
      this.nonce = 0;
    }

    Bitfinex.prototype._nonce = function() {
      var nonce;
      nonce = Math.round((new Date()).getTime() / 1000);
      if (this.nonce === nonce) {
        return this.nonce++;
      } else {
        this.nonce = nonce;
        return nonce;
      }
    };

    Bitfinex.prototype.make_request = function(sub_path, params, cb) {
      var headers, nonce, path, payload, signature, url;
      if (!this.key || !this.secret) {
        cb(new Error("missing api key or secret"));
      }
      path = '/v1/' + sub_path;
      url = this.url + path;
      nonce = JSON.stringify(this._nonce());
      payload = {
        request: path,
        nonce: nonce,
        options: params
      };
      payload = new Buffer(JSON.stringify(payload)).toString('base64');
      signature = crypto.createHmac("sha384", this.secret).update(payload).digest('hex');
      headers = {
        'X-BFX-APIKEY': this.key,
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      };
      request({
        url: url,
        method: "POST",
        headers: headers
      }, cb);
      return {
        make_public_request: function(path, cb) {
          url = this.url + '/v1/' + path;
          return request({
            url: url,
            method: "GET"
          }, cb);
        }
      };
    };

    Bitfinex.prototype.new_order = function(symbol, amount, price, exchange, side, type, is_hidden, cb) {
      var params;
      params = {
        symbol: symbol,
        amount: amount,
        price: price,
        exchange: exchange,
        side: side,
        type: type,
        is_hidden: is_hidden
      };
      return this.make_request('order/new', params, cb);
    };

    Bitfinex.prototype.multiple_new_orders = function(symbol, amount, price, exchange, side, type, cb) {
      var params;
      params = {
        symbol: symbol,
        amount: amount,
        price: price,
        exchange: exchange,
        side: side,
        type: type
      };
      return this.make_request('order/new/multi', params, cb);
    };

    Bitfinex.prototype.cancel_order = function(order_id, cb) {
      var params;
      params = {
        order_id: order_id
      };
      return this.make_request('order/cancel', params, cb);
    };

    Bitfinex.prototype.cancel_multiple_orders = function(order_ids, cb) {
      var params;
      params = {
        order_ids: order_ids
      };
      return this.make_request('order/cancel/multi', params, cb);
    };

    Bitfinex.prototype.order_status = function(order_id, cb) {
      var params;
      params = {
        order_id: order_id
      };
      return this.make_request('order/status', params, cb);
    };

    Bitfinex.prototype.active_orders = function(cb) {
      return this.make_request('orders/', {}, cb);
    };

    Bitfinex.prototype.active_positions = function(cb) {
      return this.make_request('positions/', {}, cb);
    };

    Bitfinex.prototype.past_trades = function(symbol, timestamp, limit_trades, cb) {
      var params;
      params = {
        symbol: symbol,
        timestamp: timestamp,
        limit_trades: limit_trades
      };
      return this.make_request('mytrades', params, cb);
    };

    Bitfinex.prototype.new_offer = function(currency, amount, rate, period, direction, insurance_option, cb) {
      var params;
      params = {
        currency: currency,
        amount: amount,
        rate: rate,
        period: period,
        direction: direction,
        insurance_option: insurance_option
      };
      return this.make_request('offer/new', params, cb);
    };

    Bitfinex.prototype.cancel_offer = function(offer_id, cb) {
      var params;
      params = {
        order_id: order_id
      };
      return this.make_request('offer/cancel', params, cb);
    };

    Bitfinex.prototype.offer_status = function(order_id, cb) {
      var params;
      params = {
        order_id: order_id
      };
      return this.make_request('offer/status', params, cb);
    };

    Bitfinex.prototype.active_offers = function(cb) {
      return this.make_request('offers', {}, cb);
    };

    Bitfinex.prototype.active_credits = function(cb) {
      return this.make_request('credits', {}, cb);
    };

    Bitfinex.prototype.wallet_balances = function(cb) {
      return this.make_request('balances', {}, cb);
    };

    return Bitfinex;

  })();

}).call(this);
