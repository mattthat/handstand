var mockDocumentQuerySelector = function(method, work) {
    let original = document.querySelector;
    document.querySelector = method;
    work();
    document.querySelector = original;
}
module.exports = mockDocumentQuerySelector;