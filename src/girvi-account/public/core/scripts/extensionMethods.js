(function() {
    'use strict';

    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function(match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };

    String.prototype.isNullOrEmpty = function() {
        var value = this;
        if ($.trim(value) !== null && $.trim(value) !== "") {
            return false;
        } else {
            return true;
        }
    };

    Array.prototype.remove = function(value) {
        var arrayList = this;
        return _.without(arrayList, _.findWhere(arrayList, {
            url: value
        }));
    };

    $.fn.serializeObject = function() {
        var o = {},
            a;
        a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value.trim() || '');
            } else {
                o[this.name] = this.value.trim() || '';
            }
        });
        return o;
    };

    //returns date without the timezone information so that
    //when it is sent to the server the time remains manipulated.
    //usage : backbone fetch calls toJSON of all the model attributes,
    //if date is being sent then dateVariable.toJSON() should be called.
    Date.prototype.toJSON = function() {
        var momentDate = moment(this);
        return momentDate.format("YYYY-MM-DDTHH:mm:ss");
    };

    //returns a new date using moment.js
    //this is done to ignore the timezone info of the date from server
    //so that date and time remains manipulated on client side.
    //usage : whendata is received from server date is converted
    //into date type variable e.g in file areaReportModel.js
    String.prototype.toClientDate = function() {
        return moment(this.valueOf()).toDate();
    };

    //returns a new timespan using moment.js
    //this is done to get the hours and minutes from timespan
    //object from server side
    //used in systemDefinitionModel.js
    String.prototype.toClientTimeSpan = function() {
        return moment.duration(this.valueOf());
    };

    //returns a new date using moment.js
    //this is done to ignore the timezone info of the date from server
    //so that date and time remains manipulated on client side.
    //used in reportAxisFormatManager.js
    Number.prototype.toClientDate = function() {
        return moment(this.valueOf()).toDate();
    };

    //returns a new date using moment.js
    //this is done to ignore the timezone info of the date from server
    //so that date and time remains manipulated on client side.
    //used in reportAxisFormatManager.js
    Date.prototype.clone = function() {
        return moment(this).toDate();
    };


    Date.prototype.format = function(formatType) {
        return App.I18N.formatCultureDateTime(this, formatType);
    };

    // 
    // rounds given number to given number of decimal places
    //
    Number.prototype.round = function(places) {
        return +(Math.round(this + "e+" + places) + "e-" + places);
    };

    // 
    // check string contains only integer value.
    //
    String.prototype.isInteger = function() {
        //removing leading zeros
        var trimmed = this.replace(/\b(0(?!\b))+/g, "");
        return (parseInt(trimmed, 10)).toString() === trimmed;
    };

    //
    //jQuery extension methods to enable/disable and show/hide by adding classes
    //
    $.fn.extend({
        //extension method to disable the elements by function disable()
        disable: function() {
            return $(this).addClass("disabled");
        },

        //extension method to enable the elements by function enable()
        enable: function() {
            return $(this).removeClass("disabled");
        },

        //extension method to hide the elements by function hideElement()
        hideElement: function() {
            return $(this).addClass("hide");
        },

        //extension method to show the elements by function showElement()
        showElement: function() {
            return $(this).removeClass("hide");
        },

        //extension method to disable link
        disableLink: function() {
            return $(this).addClass("disable-control");
        },

        //extension method to enable link
        enableLink: function() {
            return $(this).removeClass("disable-control");
        }
    });
})();
