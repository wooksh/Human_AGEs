function getRelationFilter(rule, langDict) {
	if( rule.filter.tags.has("relations_filter") )
		return `
		<span>&nbsp;and&nbsp;</span>
		<select class="selectpicker relation-filter" data-style="btn-inverse btn-xs" data-icon-base="Material Icons" virtual-scroll=100>
			${ langDict.values.relation_operator.map( (item) => "<option value=\"" + item.value + "\">" + item.label + "</option>" ) }
		</select>
		<span>of the related nodes must match.</span>
		`;
	else 
		return '';
}

export default function(langDict) {
	let customInputs = {
		'default': (rule, name) => {
			// .format(rule.filter.label)
			return `
			<input class="attribute-value form-control-sm plain-text-input" type="text" autocomplete="off" placeholder="${langDict.placeholders.default}"/>
			${ getRelationFilter(rule, langDict) }
			`;
			
		},
		'number': (rule, name) => {
			// .format(rule.filter.label)
			return `
			<input class="attribute-value" type="number" autocomplete="off"/>
			${ getRelationFilter(rule, langDict) }
			`;
			
		},
		'component': (rule, name) => {
			let inputAttributes = rule.filter.tags.has("proportion") ? `min="0" max=1` : `min="-100" max=100`;

			return `
			<input class="attribute-value w-25 form-control plain-number-input" autocomplete="off" type="number" value="0" ${inputAttributes} step="0.01"/>
			<span>&nbsp;for&nbsp;</span>
			<select class="selectpicker component-name" data-style="btn-inverse btn-xs" data-icon-base="Material Icons" virtual-scroll=100>
				${ [{"value": "c1", "label": "component #1"}, {"value": "c2", "label": "component #2"}].map( (item) => "<option value=\"" + item.value + "\">" + item.label + "</option>" ) }
			</select>
			<span>&nbsp;of the&nbsp;</span>
			<select class="selectpicker result-type" data-style="btn-inverse btn-xs" data-icon-base="Material Icons" virtual-scroll=100>
				${ [{"value": "result_pca_world", "label": "PCA World"}].map( (item) => "<option value=\"" + item.value + "\">" + item.label + "</option>" ) }
			</select>
			<span>&nbsp;analysis type.</span>
			`;
			
		},
		/* With values from meta */
		'select': (rule, name) => {
			return `
			<select class="selectpicker attribute-value" data-style="btn-inverse btn-xs" data-icon-base="Material Icons" virtual-scroll=100>
				${ rule.filter.values.map( (item) => "<option value=\"" + item + "\">" + item + "</option>" ) }
			</select>
			${ getRelationFilter(rule, langDict) }
			`;
		},
		'relation_exists': (rule, name) => {
			return `
			<select class="selectpicker attribute-value" data-style="btn-inverse btn-xs" data-icon-base="Material Icons" virtual-scroll=100>
				${ langDict.values.relation_existence.map( (item) => "<option value=\"" + item.value + "\">" + item.label + "</option>" ) }
			</select>
			`;
		},
		'search': (rule, name) => {
			return `
			<div style="display: inline-block">
				<div class="input-group icon-textbox-wrapper">
					<input class="form-control attribute-value searcher plain-text-input" value="" type="text" aria-label="search" placeholder="${langDict.placeholders.search}">
					<div class="input-group-append">
						<i class="material-icons">search</i>
					</div>
				</div>
			</div>
			${ getRelationFilter(rule, langDict) }
			`;
		},
		'point': (rule, name) => {
			return `
				<input placeholder="Latitude" class="w-25 attribute-value form-control latitude plain-number-input" id="${name}_latitude" name="${name}_1" type="number" value="" min="-90" max="90" step="0.000001" />
				<input placeholder="Longitude" class="w-25 attribute-value form-control longitude plain-number-input" id="${name}_longitude" name="${name}_2" type="number" value="" min="-180" max=180 step="0.000001" />
				<input placeholder="Radius (km)" class="w-25 attribute-value form-control distance plain-number-input" id="${name}_distance" name="${name}_3" type="number" value="" min="0" max="1000000" step="1" />
				${ getRelationFilter(rule, langDict) }
			`;
		},
		'from_to': (rule, name) => {
			let additionalClass = rule.filter.tags.has("contemporary") ? 'contemporary' : '';
			let isYear = rule.filter.tags.has("isYear") ? 'is_year=""' : '';

			if (rule.operator.type == 'between' || rule.operator.type == 'inrange') {
				return `
				<div id=${name}_range class="years-range-spinner d-flex">
					<span class="input-years-from w-75 ${additionalClass}">
						<input class="attribute-value form-control-sm plain-text-input w-100" type="text" value="0" autocomplete="off" ${isYear}/>
					</span>
					<hr class="range-line w-25"/>
					<span class="input-years-to w-75 ${additionalClass}">
						<input class="attribute-value form-control-sm plain-text-input w-100" type="text" value="0" autocomplete="off" ${isYear}/>
					</span>
				</div>
				${ getRelationFilter(rule, langDict) }
				`;
			} else {
				return `
					<span class="input-years-to ${additionalClass}">
						<input class="attribute-value form-control-sm plain-text-input w-50" type="text" value="0" autocomplete="off" ${isYear}/>
					</span>
					${ getRelationFilter(rule, langDict) }
				`;
			}
		}
	};

	return customInputs;
}

//input.input-years-from