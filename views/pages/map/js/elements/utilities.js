function appendLinkToHtmlObject(objectSelector, element, baseUrl, isLast = false) {
    const $element = $(objectSelector);
    if(isLast)
      $element.append(
          `<a href=${baseUrl}${element.url}>${element.text}</a>`
      );
    else
      $element.append(
          `<a href=${baseUrl}${element.url}>${element.text}</a>, `
      );
}


function getEntityTitle(entityName) {
	return $('#select-query-dataset').find(`[value="${entityName}"]`).text();
}


function getEntityDisplayedName(layerId) {
	var datasetId = ArcheoSession.get().layers[ layerId ].datasetId;
	var entityName = ArcheoSession.get().datasets[ datasetId ].entityName;

	return getEntityTitle(entityName);
}





export {
  appendLinkToHtmlObject,
  getEntityTitle,
  getEntityDisplayedName
};