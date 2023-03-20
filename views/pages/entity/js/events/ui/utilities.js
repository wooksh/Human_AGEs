function getBibtexString(source) {
    return `@article{${source.id},\r\n` +
        `title = {${source.name}},\r\n` +
        (source.authors.length > 0 ? `author = {${source.authors.join(' and ')}},\r\n` : '') +
        (ArcheoUtilities.isValid(source.date) ? `year = ${source.date.year},\r\n` : '') +
        //(ArcheoUtilities.isValid(source.date) ? `month = ${source.date.month},\r\n` : '') +
        (ArcheoUtilities.isValid(source.volume_and_issue) ? `volume = ${source.volume_and_issue},\r\n` : '') +
        (ArcheoUtilities.isValid(source.pages) ? `pages = ${source.pages},\r\n` : '') +
        (ArcheoUtilities.isValid(source.publisher) ? `journal = ${source.publisher},\r\n` : '') +
        (ArcheoUtilities.isValid(source.hyperlink) ? `url = {${source.hyperlink}}\r\n` : '') +
    `}`;
}


export {
    getBibtexString
};