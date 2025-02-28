'use strict';

const searchCore = {};
const urlUtil = require('../components/urlUtil');
const productTile = {};
/**
 * Overwrite function from core to appy filter on desktop
 */
searchCore.applyFilter = function () {
    $('.container').on(
        'click.applyFilter',
        '.refinements li a, .refinement-bar a.reset, .filter-value a, .swatch-filter a',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            let self = $(this);
            let elementToUpdate = [
                '.sort-field',
                '.product-grid',
                '.show-more',
                '.result-count'
            ];

            let url = e.currentTarget.href;
            url = searchCore.methods.prepareSearchFilterUrl(url, self);

            $.spinner().start();
            self.trigger('search:filter', e);

            $.ajax({
                url: url,
                data: {
                    page: $('.grid-footer').data('page-number'),
                    selectedUrl: url
                },
                method: 'GET'
            }).done(function (response) {
                productFilter.parseResults(elementToUpdate, response);
                productTile.carouselAttribute();
                productFilter.removeCommaRefinements();
                productFilter.triggerFilteredSortedSwatches(url);
                $('body').trigger('search:applyFilter', response);
                $.spinner().stop();
            }).fail(function () {
                $.spinner().stop();
            });
        });
};

/**
 * Prepare and parse custom refinement URL before applying filter
 * @param {string} url - Refinement target URL
 * @param {JQuery<HTMLElement>} refinementEl - Refinement item element
 * @returns {string} - New custom refinement URL
 */
searchCore.methods.prepareSearchFilterUrl = function (url, refinementEl) {
    let desktopRefineBar = $('.refinement-wrapper');
    let newUrl = url;
    newUrl = urlUtil.removeBooleanRefinementFromURL(newUrl, 'dimensionExpandableWidth');
    newUrl = urlUtil.reIndexRefinementParam(newUrl);

    let instock = productFilter.methods.isBooleanRefinementSelected(desktopRefineBar, refinementEl, 'instock-selection');
    newUrl = urlUtil.appendParamToURL(newUrl, 'instock', instock);

    let expandable = productFilter.methods.isBooleanRefinementSelected(desktopRefineBar, refinementEl, 'expandable-selection');
    newUrl = urlUtil.appendParamToURL(newUrl, 'expandable', expandable);
    return newUrl;
};

[productFilter].forEach(function (library) {
    Object.keys(library).forEach(function (item) {
        if (typeof library[item] === 'object') {
            searchCore[item] = $.extend({}, searchCore[item], library[item]);
        } else {
            searchCore[item] = library[item];
        }
    });
});

searchCore.sortRule = productSort.activateSort;

module.exports = searchCore;
