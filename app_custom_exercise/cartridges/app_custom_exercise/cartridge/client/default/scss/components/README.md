=========================GUIDE=======================
    To apply custom-style for form input, please follow below html structure for a form input: 
        <div class="form-group">
            <input class="form-control" />
            <label class="form-control-label">
                ...
            </label>
            <span class="focus-border"></span>
            <div class="invalid-feedback"></div>
        </div>
    Use function addClassContent in util/util.js.
======================================================