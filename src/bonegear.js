(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'underscore', 'backbone'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'), require('underscore'), require('backbone'));
	} else {
		// Globals
		factory(jQuery, _, Backbone);
	}
}(function($, _, Backbone) {

	"use strict";

	var Bonegear = $.fn.bonegear = function() {
		console.log("Log: Bonegear function");
	};

	/**
	 * Bonegear Alert View
	 */
	Bonegear.AlertView = Backbone.View.extend({
		defaults: {
			tbody: "(Default) <strong>Well done!</strong> You successfully read this important alert message.",
			elref: "div",
			type: "alert-success",
			dismiss: "true",
			dismissbody: "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
		},

		initialize: function(options) {
			console.log("Log: Bonegear AlertView initialize");
			options || (options = {});
			_.defaults(this, this.defaults);
			_.extend(this, _.pick(options, _.keys(this.defaults)));
		},

		className: "alert alert-dismissible",

		template: _.template("<%=tbody%>"),

		render: function() {
			var data = this.model ? this.model.toJSON() : {};

			this.$el.html(this.template({
				tbody: _.template(this.tbody)(data),
				elref: _.template(this.elref)(data),
				type: _.template(this.type)(data),
				dismiss: _.template(this.dismiss)(data),
				dismissbody: _.template(this.dismissbody)(data)
			}));

			(this.type) ? this.$el.addClass(this.type): this.$el.addClass(this.defaults.type);

			if (this.dismiss === "true") {
				this.$el.prepend(this.dismissbody);
				this.$el.addClass("alert-dismissible");
			} else {
				if (this.$el.hasClass("alert-dismissible")) {
					this.$el.removeClass("alert-dismissible");
				}
			}

			$(this.elref).html(this.$el);

			return this;
		}
	});

	/**
	 * Bonegear Notification View
	 */
	Bonegear.NotifyView = Backbone.View.extend({
		defaults: {
			tbody: "(Default) <strong>Well done!</strong> You successfully read this important alert message.",
			elref: "div",
			type: "alert-success",
			dismiss: "true",
			dismissbody: "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>",
			nposition: "top-right"
		},

		initialize: function(options) {
			console.log("Log: Bonegear NotifyView initialize");
			options || (options = {});
			_.defaults(this, this.defaults);
			_.extend(this, _.pick(options, _.keys(this.defaults)));
		},

		className: "alert alert-dismissible",

		template: _.template("<%=tbody%>"),

		render: function() {
			var data = this.model ? this.model.toJSON() : {};

			this.$el.html(this.template({
				tbody: _.template(this.tbody)(data),
				elref: _.template(this.elref)(data),
				type: _.template(this.type)(data),
				dismiss: _.template(this.dismiss)(data),
				dismissbody: _.template(this.dismissbody)(data),
				nposition: _.template(this.nposition)(data)
			}));

			(this.type) ? this.$el.addClass(this.type): this.$el.addClass(this.defaults.type);

			if (this.dismiss === "true") {
				this.$el.prepend(this.dismissbody);
				this.$el.addClass("alert-dismissible");
			} else {
				if (this.$el.hasClass("alert-dismissible")) {
					this.$el.removeClass("alert-dismissible");
				}
			}

			var npositionObj = {};
			switch (this.nposition) {
				case "bottom-right":
					npositionObj = {
						"bottom": "10px",
						"right": "10px"
					};
					break;

				case "bottom-left":
					npositionObj = {
						"bottom": "10px",
						"left": "10px"
					};
					break;

				case "top-left":
					npositionObj = {
						"top": "10px",
						"left": "10px"
					};
					break;

				case "top-right":
				default:
					npositionObj = {
						"top": "10px",
						"right": "10px"
					};
					break;
			}

			npositionObj = _.extend(npositionObj, {
				"position": "absolute"
			});
			
			this.$el.css(npositionObj);

			$(this.elref).html(this.$el);

			return this;
		}


	});
}));