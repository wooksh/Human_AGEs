/**
 * @class BtSelectpicker
 * @memberof module:plugins
 * @descriptioon Applies Bootstrap Select on filters and operators combo-boxes.
 * @param {object} [options]
 * @param {string} [options.container='body']
 * @param {string} [options.style='btn-inverse btn-xs']
 * @param {int|string} [options.width='auto']
 * @param {boolean} [options.showIcon=false]
 * @throws MissingLibraryError
 */
QueryBuilder.define('bt-selectpicker', function(options) {
    if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
        Utils.error('MissingLibrary', 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
    }

    var Selectors = QueryBuilder.selectors;

    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').selectpicker(options);
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').selectpicker(options);
    });

    // update selectpicker on change
    /*this.on('afterUpdateRuleFilter', function(e, rule) {
        var selectObj = rule.$el.find(Selectors.rule_filter);
        
        selectObj.selectpicker('render');

		//// Define select picker custom behaviour ////
        var selectButtonObj = selectObj.next();
        var groupNameObj = selectButtonObj.children('.filter-option-group-name');
        var optgroupName = rule.filter.optgroup;

        if (groupNameObj.length > 0) {
            groupNameObj = $(groupNameObj[0]);
        }
        else {
            groupNameObj = $('<div class="filter-option-group-name"></div>'); // define style
            selectButtonObj.prepend( groupNameObj );
        }

        // To get optgroup name
        // it.translate(it.settings.optgroups[optgroup])

        //this.settings.optgroups[filter.optgroup]

        //console.log(`optgroups ${rule.filter.settings.optgroups[optgroupName]}`);
        //console.log(`optgroups ${rule.filter.settings.optgroups[optgroupName]}`);
        
        //console.log( selectObj );
        //console.log(`opti ${optgroupName}`);
        //console.log(`groupNameObj ${groupNameObj}`);

        //groupNameObj.text('Title');

        // Filter optgroup visibility in selection box //
    });*/

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).selectpicker('render');
    });

    this.on('beforeDeleteRule', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker('destroy');
        rule.$el.find(Selectors.rule_operator).selectpicker('destroy');
    });
}, {
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});
