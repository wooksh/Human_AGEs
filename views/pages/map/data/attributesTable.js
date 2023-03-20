import attributesTypes from './attributesTypes.json';


let sex = {
    "name": "Sex",
    "visible": false
};

let haplogroupY = {
    "name": "Haplogroup Y",
    "type": "tree",
    "visible": false
};

let haplogroupMt = {
    "name": "Haplogroup Mt",
    "type": "tree",
    "visible": false
};

let admixture = {
    "name": "Admixture",
    "type": "admixture",
    "visible": false,
    "isOptgroup": true
}

let pca = {
    "name": "PCA",
    "type": "plot",
    "visible": false,
    "isOptgroup": true
}

let umap = {
    "name": "UMAP",
    "type": "plot",
    "visible": false,
    "isOptgroup": true
}


var attributesTable = {
    "RemainsAADR": {
        _order: ['sex', 'haplogroup_y', 'haplogroup_mt', 'admixture', 'pca', 'umap'],
        sex: sex,
        haplogroup_y: haplogroupY,
        haplogroup_mt: haplogroupMt,
        admixture: admixture,
        pca: pca,
        umap: umap
        //...admixturesDict
        /*results: {
            name: "Analysis results",
            isOptgroup: true,
            options: {
                admixture: admixture
            }
        }*/
    },
    "PersonAADR": {
        _order: ['sex', 'haplogroup_y', 'haplogroup_mt'],
        sex: sex,
        haplogroup_y: haplogroupY,
        haplogroup_mt: haplogroupMt
    },
    "PersonEMPOP": {
        _order: ['haplogroup_mt'],
        haplogroup_mt: haplogroupMt
    }
}


const attributesWithTypes = ['admixture', 'pca', 'umap'];
function getAttributesTable() {
    let attributesTableClone = ArcheoUtilities.deepCloneObject(attributesTable);

    attributesWithTypes.forEach((attribute) => {
        let attributeName = window.metadata.props_keys[attribute];

        Object.keys(attributesTable).forEach((databaseName) => {
            if(attribute in attributesTableClone[databaseName]) {

                for(var i = 0; i < window.metadata[attributeName].id.length; ++i) {
                    let typeId = window.metadata[attributeName].id[i];
                    let typeName = window.metadata[attributeName].name[i];

                    attributesTableClone[databaseName][typeId] = {
                        "name": typeName,
                        "type": attribute,
                        "parent": attribute,
                        "visible": false,
                        "selected": false
                    }

                    attributesTableClone[databaseName]._order.push(typeId);
                }                
            }
        })
    });

    return attributesTableClone;
}


export default getAttributesTable;
