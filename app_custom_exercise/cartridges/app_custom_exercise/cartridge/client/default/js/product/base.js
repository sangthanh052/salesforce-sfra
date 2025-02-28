'use strict';

var base = require('base/product/base');

/**
 * Retrieve product options
 *
 * @param {jQuery} productContainer - DOM element for current product
 * @return {string} - Product options and their selected values
 */
function getOptions(productContainer) {
    var options = productContainer
        .find('.product-option')
        .map(function () {
            var elOption = $(this).find('.options-select');
            var urlValue = elOption.val();
            var selectedValueId = elOption.find('option[value="' + urlValue + '"]')
                .data('value-id');
            return {
                optionId: $(this).data('option-id'),
                selectedValueId: selectedValueId
            };
        }).toArray();

    return JSON.stringify(options);
}

/**
 * Retrieves the relevant pid value
 * @param {jquery} $el - DOM container for a given add to cart button
 * @return {string} - value to be used when adding product to cart
 */
function getPidValue($el) {
    var pid;

    if ($('#quickViewModal').hasClass('show') && !$('.product-set').length) {
        pid = $($el).closest('.modal-content').find('.product-quickview').data('pid');
    } else if ($('.quick-view-modal .show').length) {
        pid = $($el).closest('.modal-content').find('.quick-view-product').data('pid');
    } else if ($('.product-set-detail').length || $('.product-set').length) {
        pid = $($el).closest('.product-detail').find('.product-id').text();
    } else if ($('.product-new-family-banner.modal.show').length) {
        pid = $($el).closest('.family-banner-section').find('.product-family-banner-popup').data('pid');
    } else if ($('.magazine-carousel').find('.tile-item').length) {
        pid = $($el).closest('.magazine-carousel .tile-item')
            .find('.product')
            .data('pid');
    } else {
        pid = $('.product-detail:not(".bundle-item")').data('pid');
    }

    return pid;
}

/**
 * Retrieves the bundle product item ID's for the Controller to replace bundle master product
 * items with their selected variants
 *
 * @return {string[]} - List of selected bundle product item ID's
 */
function getChildProducts() {
    var childProducts = [];
    $('.bundle-item').each(function () {
        childProducts.push({
            pid: $(this).find('.product-id').text(),
            quantity: parseInt($(this).find('label.quantity').data('quantity'), 10)
        });
    });

    return childProducts.length ? JSON.stringify(childProducts) : [];
}

/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */
function handlePostCartAdd(response) {
    $('.minicart').trigger('count:update', response);
    var messageType = response.error ? 'alert-danger' : 'alert-success';
    // show add to cart toast
    if (response.newBonusDiscountLineItem
        && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
        base.methods.editBonusProducts(response.newBonusDiscountLineItem);
    } else {
        if ($('.add-to-cart-messages').length === 0) {
            $('body').append(
            '<div class="add-to-cart-messages"></div>'
            );
        }

        $('.add-to-cart-messages').append(
            '<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">'
            + response.message
            + '</div>'
        );

        setTimeout(function () {
            $('.add-to-basket-alert').remove();
        }, 5000);
    }
}

/**
 * Create url for purchase now or make empty basket
 * @param {string} baseUrl - base url
 * @param {string} pid - product id
 * @returns {string} - final url
 */
function createPurchaseNowUrl(baseUrl, pid) {
    let urlUtils = require('./components/urlUtil');
    let finalUrl = urlUtils.appendParamToURL(baseUrl, 'products', pid);
    let productMonogramValue = $('.product-monogram-value');

    if (productMonogramValue.length) {
        let monogramValue = productMonogramValue.val();

        if (monogramValue) {
            finalUrl = urlUtils.appendParamToURL(finalUrl, 'monogram', monogramValue);
        }
    }

    var purchaseNowURLObject = {
        finalUrl: finalUrl
    };

    $('body').trigger('updatePurchaseNowURL', purchaseNowURLObject);

    finalUrl = purchaseNowURLObject.finalUrl;

    return finalUrl;
}

/**
 * handle submit add to cart
 * @param {Object} buttonEl - HTML button
 * @param {boolean} makeEmptyBasket - remove all line item in current basket or not
 */
function handleAddToCart(buttonEl, makeEmptyBasket) {
    var method = 'POST';
    var addToCartUrl;
    var pid;
    var pidSObj;
    var setPidS;

    $('body').trigger('product:beforeAddToCart', buttonEl);

    if ($('.set-items').length && $(buttonEl).hasClass('add-to-cart-global')) {
        setPidS = [];

        $('.product-detail').each(function () {
            if (!$(this).hasClass('product-set-detail')) {
                setPidS.push({
                    pid: $(this).find('.product-id').text(),
                    qty: $(this).find('.quantity-select').val(),
                    options: getOptions($(this))
                });
            }
        });
        pidSObj = JSON.stringify(setPidS);
    }

    pid = getPidValue($(buttonEl));

    var productAccessories = $('.product-accessories-item');
    if (productAccessories.length && productAccessories.find('input:checked').length) {
        setPidS = [];
        setPidS.push({
            pid: pid,
            qty: 1
        });

        var checkedAccessories = productAccessories.find('input:checked');
        checkedAccessories.each(function () {
            setPidS.push({
                pid: $(this).data('pid'),
                qty: 1
            });
        });

        pidSObj = JSON.stringify(setPidS);
    }

    var productContainer = $(buttonEl).closest('.product-detail');
    if (!productContainer.length) {
        productContainer = $(buttonEl).closest('.quick-view-dialog').find('.product-detail');
    }

    addToCartUrl = $('.add-to-cart-url').val();

    var form = {
        pid: pid,
        pidsObj: pidSObj,
        childProducts: getChildProducts(),
        quantity: base.getQuantitySelected($(buttonEl))
    };

    var ajaxData = {
        success: function (data) {
            handlePostCartAdd(data);
            $('body').trigger('product:afterAddToCart', data);
            $.spinner().stop();
        },
        error: function () {
            $.spinner().stop();
        }
    };

    if (makeEmptyBasket && $('.gift-certificate-data').length > 0) {
        addToCartUrl = createPurchaseNowUrl($('.gift-certificate-data').data('makeEmptyBasket'), pid);
        method = 'GET';
    } else {
        ajaxData.data = form;
    }

    ajaxData.url = addToCartUrl;
    ajaxData.method = method;

    if (!$('.bundle-item').length) {
        form.options = getOptions(productContainer);
    }

    $(buttonEl).trigger('updateAddToCartFormData', form);
    if (addToCartUrl) {
        $.ajax(ajaxData);
    }
}

/**
 * Check current basket has gift certificate or normal product and handle
 * @param {Object} buttonEl - HTML button
 * @param {Object} callBackFunction - function add to cart
 * @param {string} productId - current product add to cart
 */
function verifyGiftCertificateBasket(buttonEl, callBackFunction, productId) {
    var giftCardPopUpData = $('.gift-certificate-data');

    if (giftCardPopUpData.length === 0) {
        callBackFunction(buttonEl);
        return;
    }

    $.ajax({
        url: giftCardPopUpData.data('url') + productId,
        type: 'GET',
        success: function (data) {
            if (data) {
                if (data.notShowPopUp) {
                    callBackFunction(buttonEl);
                } else {
                    $('#warningGiftCertificateModal').remove();
                    $('body').append(data);
                    var warningModal = $('#warningGiftCertificateModal');

                    warningModal.data('buttonEl', buttonEl);
                    warningModal.modal({
                        show: true
                    });
                }
            } else {
                callBackFunction(buttonEl);
            }
        }
    });
}

/**
 * handle submit modal remove all gift card
 * @param {Object} callBackFunction - function add to cart
 */
function handleConfirmAddToCart(callBackFunction) {
    $('body').off('click', '#warningGiftCertificateModal .confirm-btn');
    $('body').on('click', '#warningGiftCertificateModal .confirm-btn', function () {
        var warningModal = $(this).closest('#warningGiftCertificateModal');
        var buttonEl = warningModal.data('buttonEl');

        if (buttonEl) {
            callBackFunction(buttonEl, true);
        }
    });
}

module.exports = {
    addToCart: function () {
        $(document).off('click', 'button.add-to-cart, button.add-to-cart-global');
        $(document).on('click', 'button.add-to-cart, button.add-to-cart-global', function (e) {
            e.preventDefault();
            verifyGiftCertificateBasket(this, handleAddToCart, getPidValue($(this)));
            handleConfirmAddToCart(handleAddToCart);
        });
    },
    methods: {
        verifyGiftCertificateBasket: verifyGiftCertificateBasket,
        handleConfirmAddToCart: handleConfirmAddToCart,
        createPurchaseNowUrl: createPurchaseNowUrl
    }
};
