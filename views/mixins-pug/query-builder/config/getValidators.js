export default function(langDict) { 
	return {
		'min_max_length': (min, max) => {
			return (value, rule) => {
				ArcheoUtilities.parseValues(value, rule.filter.type);

				if(value.length < min || value.length > max)
					return langDict.errors.min_max_length_exceeds.format(min, max);

				return true;
			}
		},
		'min_max_number': (min, max) => {
			return (value, rule) => {
				if( value.length == 2)
					if (value[0] > value[1])
						return langDict.errors.min_max_number_order;
				
				for(var i = 0; i < value.length; ++i)
					if(value[i] < min || value[i] > max)
						return langDict.errors.min_max_number_exceeds.format(min, max);
				
				return true;
			}
		},
		'coordinates': () => {
			return (value, rule) => {
				ArcheoUtilities.parseValues(value, rule.filter.type);
				let maxDistanceInMeters = 1000000000;
				
				if ( ! ArcheoUtilities.isValid(value.point.latitude) || 
					! ArcheoUtilities.isValid(value.point.longitude) || 
					! ArcheoUtilities.isValid(value.distance)  )
					return langDict.errors.coordinates_empty;
				else if (value.point.latitude < -90 || value.point.latitude > 90 ) {
					return langDict.errors.coordinates_lat;
				}
				else if (value.point.longitude < -180 || value.point.longitude > 180) {
					return langDict.errors.coordinates_long;
				}
				else if (value.distance < 0 || value.distance >= maxDistanceInMeters) {
					return langDict.errors.coordinates_dist;
				}
				
				return true;
			}
		},
		'tree': () => {
			return (value, rule) => {
				if ( ! ArcheoUtilities.isValidNonEmptyString(value) )
					return langDict.errors.tree_not_selected;

				return true;
			}
		}
	}
}