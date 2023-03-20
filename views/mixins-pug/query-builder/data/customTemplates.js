export default function() {

	return {
		/*filterSelect: '\
			{{ var optgroup = null; }} \
			<select class="selectpicker" name="{{= it.rule.id }}_filter"> \
			{{? it.settings.display_empty_filter }} \
				<option value="-1">{{= it.settings.select_placeholder }}</option> \
			{{?}} \
			{{~ it.filters: filter }} \
				{{? optgroup !== filter.optgroup }} \
				{{? optgroup !== null }}</optgroup>{{?}} \
				{{? (optgroup = filter.optgroup) !== null }} \
					<optgroup label=" \
					{{? filter.root === true }} \
					<span> \
					{{??}} \
					<span style=\'padding-left: {{= (filter.depth+1) * 2 }}em\'> \
					{{?}} \
					{{? filter.root === true }} \
					<i class=\'material-icons\'></i> \
					{{??}} \
						{{= filter.relation_previous }}&nbsp; \
						{{? filter.relation_direction === "right" }} \
							<span><b>&#8212;</b>{{= filter.relation }}</span>\
							<i class=\'material-icons\'>east</i> \
						{{??}} \
							<i class=\'material-icons\'>west</i><span>{{= filter.relation }} \
							<b>&#8212;</b></span>\
						{{?}} \
					{{?}} \
					<span class=\'badge badge-success\'>entity</span>&nbsp;{{= it.translate(it.settings.optgroups[optgroup]) }}</span>"> \
				{{?}} \
				{{?}} \
				<option {{~ filter.tags: tag }} {{= tag}} {{~}} entity-name={{= filter.field}} value-attribute={{= filter.valueAttribute}} label-attribute={{= filter.queryAttribute}} details-attribute={{= filter.detailsAttribute}} title="<span class=\'right-separator\'>{{= it.translate(it.settings.optgroups[optgroup]) }}</span>{{= it.translate(filter.label) }}&nbsp;" data-tokens="{{= it.translate(it.settings.optgroups[optgroup]) }}" value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}} data-content="<span style=\'padding-left: {{= (filter.depth+1) * 2 }}em\'>&#8226;&nbsp;&nbsp;{{= it.translate(filter.label) }}</span>">{{= it.translate(filter.label) }}</option> \
			{{~}} \
			{{? optgroup !== null }}</optgroup>{{?}} \
			</select>',*/

		filterSelect: `
			{{ var optgroup = null; }}
			<select class="selectpicker" name="{{= it.rule.id }}_filter">
			{{? it.settings.display_empty_filter }}
				<option value="-1">{{= it.settings.select_placeholder }}</option>
			{{?}}
			{{~ it.filters: filter }}
				{{? optgroup !== filter.optgroup }}
				{{? optgroup !== null }}</optgroup>{{?}}
				{{? (optgroup = filter.optgroup) !== null }}
					<optgroup label="
					{{? filter.root === true }}
					<span>
					{{??}}
					<span style=\'padding-left: {{= (filter.depth+1) * 2 }}em\'>
					{{?}}
					{{? filter.root === true }}
					<i class=\'material-icons\'></i>
					{{??}}
						{{= filter.relation_previous }}&nbsp;
						{{? filter.relation_direction === "right" }}
							<span><b>&#8212;</b>{{= filter.relation }}</span>
							<i class=\'material-icons\'>east</i>
						{{??}}
							<i class=\'material-icons\'>west</i><span>{{= filter.relation }}
							<b>&#8212;</b></span>
						{{?}}
					{{?}}
					<span class=\'badge badge-success\'>entity</span>&nbsp;{{= it.translate(it.settings.optgroups[optgroup]) }}</span>">
				{{?}}
				{{?}}
				<option {{~ filter.tags: tag }} {{= tag}} {{~}} entity-name={{= filter.field}} value-attribute={{= filter.valueAttribute}} label-attribute={{= filter.queryAttribute}} details-attribute={{= filter.detailsAttribute}} title="<span class=\'right-separator\'>{{= it.translate(it.settings.optgroups[optgroup]) }}</span>{{= it.translate(filter.label) }}&nbsp;" data-tokens="{{= it.translate(it.settings.optgroups[optgroup]) }}" value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}} data-content="<span style=\'padding-left: {{= (filter.depth+1) * 2 }}em\'>&#8226;&nbsp;&nbsp;{{= it.translate(filter.label) }}</span>">{{= it.translate(filter.label) }}</option>
			{{~}}
			{{? optgroup !== null }}</optgroup>{{?}}
			</select>`,

		group: '\
			<div id="{{= it.group_id }}" class="rules-group-container"> \
			<div class="rules-group-header"> \
				<div class="btn-group pull-right group-actions"> \
				<button type="button" class="btn-xs btn custom-button mb-0 palette-tertiary-light no-focus positive mr-2" data-add="rule"> \
					<i class="{{= it.icons.add_rule }}"></i> {{= it.translate("add_rule") }} \
				</button> \
				{{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
					<button type="button" class="btn-xs btn custom-button mb-0 palette-tertiary-light no-focus positive mr-2" data-add="group"> \
					<i class="{{= it.icons.add_group }}"></i> {{= it.translate("add_group") }} \
					</button> \
				{{?}} \
				{{? it.level>1 }} \
					<button type="button" class="btn-xs btn custom-button mb-0 palette-tertiary-light no-focus negative mr-2" data-delete="group"> \
					<i class="{{= it.icons.remove_group }}"></i> {{= it.translate("delete_group") }} \
					</button> \
				{{?}} \
				</div> \
				<div class="btn-group group-conditions"> \
				{{~ it.conditions: condition }} \
					<label class="btn-xs btn custom-button mb-0 palette-tertiary-light"> \
					<input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }} \
					</label> \
				{{~}} \
				</div> \
				{{? it.settings.display_errors }} \
				<div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
				{{?}} \
			</div> \
			<div class=rules-group-body> \
				<div class=rules-list></div> \
			</div> \
			</div>',
		rule: `
			<div id="{{= it.rule_id }}" class="rule-container"> 
			
			<div class="rule-header">
				<div class="btn-group pull-right rule-actions">
				<button type="button" class="btn-xs btn custom-button mb-0 palette-tertiary-light no-focus negative mr-2" data-delete="rule">
					<i class="{{= it.icons.remove_rule }}"></i> {{= it.translate("delete_rule") }}
				</button>
				</div>
			</div>
			{{? it.settings.display_errors }}
				<div class="error-container"><i class="{{= it.icons.error }}"></i></div>
			{{?}}

			<button type="button" id="{{= it.rule_id }}_tooltip" class="hidden archeo-tooltip">
				<i class="tooltip-icon material-icons py-1 px-2">help</i>
			</button>
			<div class="rule-filter-container"></div>
			<div class="rule-preoperator-container d-inline-block"></div>
			<div class="rule-operator-container"></div>
			<div class="rule-value-container"></div> 
			</div>`
	};
}