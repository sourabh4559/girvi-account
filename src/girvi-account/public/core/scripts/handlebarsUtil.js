'use strict';

import Handlebars from 'handlebars';

var getI18NHandlebarsString = function(argumentsList) {
    var i, argsArray = [];
    for (i = 0; i < argumentsList.length - 1; i++) {
        argsArray.push(argumentsList[i]);
    }
    return App.I18N.getString.apply(this, argsArray);
};

var getPowPakName = function(deviceType) {
    var powpakName;
    for (var powpakType in App.Enum.powpakTypes) {
        if(App.Enum.powpakTypes[powpakType] === deviceType) {
            powpakName = powpakType;
            break;
        }
    }
    return powpakName;
};

Handlebars.registerHelper("isEqual", function(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isNotEqual", function(value1, value2, options) {
    if (value1 !== value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isGreaterThanEqual", function(value1, value2, options) {
    if (!isNaN(value1) && !isNaN(value2) && value1 >= value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("getSelectedOption", function(value, options) {
    var $el = $('<select />').html(options.fn(this));
    $el.find('[value=' + value + ']').attr({
        'selected': 'selected'
    });
    return $el.html();
});

Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});

Handlebars.registerHelper('times', function(items, numberOfTimes, options) {
    var html = '',
        counter = 0;
    if (items && items.length > 0) {
        //If number Of items < numberOfTimes, then set numberOfTimes accordingly.
        numberOfTimes = (items.length < numberOfTimes) ? items.length : numberOfTimes;
        //Loop through Items
        for (counter = 0; counter < numberOfTimes; ++counter) {
            html += options.fn(items[counter]);
        }
    }
    return html;
});

Handlebars.registerHelper('formatDateTime', function(dateTime, formatType) {
    var formattedDate = "";
    if (dateTime) {
        if (!(dateTime instanceof Date)) {
            dateTime = dateTime.toClientDate();
        }
        formattedDate = dateTime.format(formatType);
    }
    return formattedDate;
});


Handlebars.registerHelper("getI18NString", function() {
    return getI18NHandlebarsString(arguments);
});

Handlebars.registerHelper("getI18NLowerString", function() {
    var stringValue = getI18NHandlebarsString(arguments);
    if (stringValue) {
        stringValue = stringValue.toLowerCase();
    }
    return stringValue;
});

Handlebars.registerHelper("getI18NUpperString", function() {
    var stringValue = getI18NHandlebarsString(arguments);
    if (stringValue) {
        stringValue = stringValue.toUpperCase();
    }
    return stringValue;
});


Handlebars.registerHelper('dateToString', function(date) {
    if (date && date instanceof Date) {
        return date.asString();
    } else {
        return "";
    }
});

Handlebars.registerHelper('encodeURIComponent', function(href) {
    if (href && !href.isNullOrEmpty()) {
        return encodeURIComponent(href);
    } else {
        return "";
    }
});

Handlebars.registerHelper('getPowPakModelNumber', function(deviceType) {
    var powpakName = getPowPakName(deviceType);
    return App.Enum.powpakModelTypes[powpakName];
});

Handlebars.registerHelper('getPowPakModelName', function(deviceType) {
    var powpakName = getPowPakName(deviceType);
    return App.Enum.powpakModelNames[powpakName];
});

Handlebars.registerHelper("switch", function(value, options) {
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
});

Handlebars.registerHelper("case", function() {
    var args = Array.prototype.slice.call(arguments);
    var options    = args.pop();
    var caseValues = args;
    if (caseValues.indexOf(this._switch_value_) === -1) {
        return '';
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper("getLocalizedSelector", function(selector) {
    return selector.concat("-" , App.I18N.currentCulture);
});