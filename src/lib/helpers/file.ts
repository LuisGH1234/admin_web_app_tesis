export function getContentDispositionFilename(contentDisposition: string): string {
    let filename = '';

    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    }

    return filename;
}
