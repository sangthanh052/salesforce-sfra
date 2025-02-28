'use strict';

const urlUtil = {};

/**
 * Remove boolean refinement from URL
 * @param {string} url - Current URL
 * @param {string} originRefinementAttr - Origin refinement attribute rendered by product search model
 * @returns {string} - New URL
 */
function removeBooleanRefinementFromURL(url, originRefinementAttr) {
    var refineUrl = url;
    var refinementIdx = refineUrl.charAt(refineUrl.indexOf('=' + originRefinementAttr) - 1);
    if (refinementIdx) {
        refineUrl = urlUtil.removeParamFromURL(refineUrl, ('prefn' + refinementIdx));
        refineUrl = urlUtil.removeParamFromURL(refineUrl, ('prefv' + refinementIdx));
    }
    return refineUrl;
}

/**
 * Re-index the prefn and prefv parameteres
 * @param {string} url - Current URL
 * @returns {string} - URL after re-indexing
 */
function reIndexRefinementParam(url) {
    var urlParamObj = urlUtil.getUrlParamObject(url);
    var newUrlParamObj = JSON.parse(JSON.stringify(urlParamObj));
    var prefnValues = [];
    var prefvValues = [];

    if (urlParamObj) {
        Object.keys(urlParamObj).sort().forEach(key => {
            var value = urlParamObj[key];
            if (key.startsWith('prefn')) {
                prefnValues.push(value);
                delete newUrlParamObj[key];
            } else if (key.startsWith('prefv')) {
                prefvValues.push(value);
                delete newUrlParamObj[key];
            }
        });
    }

    prefnValues.forEach((value, index) => {
        newUrlParamObj[`prefn${index + 1}`] = value;
    });
    prefvValues.forEach((value, index) => {
        newUrlParamObj[`prefv${index + 1}`] = value;
    });

    var newUrl = url.split('?')[0];

    Object.keys(newUrlParamObj).forEach(key => {
        newUrl = urlUtil.appendParamToURL(newUrl, key, decodeURIComponent(newUrlParamObj[key]));
    });

    return newUrl;
}

/**
 * Set weight refinement value to search URL
 * @param {string} url - Current URL
 * @param {JQuery<HTMLElement>} refinementBarEl - Refinement bar element
 * @returns {string} - Return new search URL
 */
function setWeightRefinementToUrl(url, refinementBarEl) {
    let newUrl = url;
    let weightRefinementElement = $('.weights-refinement .weight-selection', refinementBarEl);
    let currentMinPrice = Number(weightRefinementElement.data('value-weight-from'));
    let currentMaxPrice = Number(weightRefinementElement.data('value-weight-to'));
    if (currentMinPrice && currentMaxPrice) {
        newUrl = urlUtil.setUrlParameter(newUrl, 'wmin', currentMinPrice);
        newUrl = urlUtil.setUrlParameter(newUrl, 'wmax', currentMaxPrice);
    }
    return newUrl;
}

urlUtil.removeBooleanRefinementFromURL = removeBooleanRefinementFromURL;
urlUtil.reIndexRefinementParam = reIndexRefinementParam;
urlUtil.setWeightRefinementToUrl = setWeightRefinementToUrl;

module.exports = urlUtil;
