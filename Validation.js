var Validation = function () {
    this.ktr = function (value, name, error) {
        if(value.trim() === "") {
            document.querySelector(error).innerHTML = name + ' không được bỏ trống!';
            return false;
        }
        document.querySelector(error).innerHTML = "";
        return true;
    }
    this.ktl = function (value, name, error, lengthMin, lengthMax) {
        if(value.trim().length < lengthMin || value.trim().length > lengthMax) {
            document.querySelector(error).innerHTML = name + ` chỉ từ ${lengthMin} đến ${lengthMax}`;
            return false;
        }
        document.querySelector(error).innerHTML = "";
        return true;
    }

    this.ktv = function (value, name, error, min, max) {
        if(Number(value) < min || Number(value) > max) {
            document.querySelector(error).innerHTML = name + ` chỉ từ ${min} đến ${max}`;
            return false;
        }
        document.querySelector(error).innerHTML = "";
        return true;
    }

    this.kts = function(value, name, error) {
        var regexS = /^[A-Za-z ]+$/;
        if (!regexS.test(value)) {
            document.querySelector(error).innerHTML = name + ' không đúng định dạng!';
            return false;
        }
        document.querySelector(error).innerHTML = "";
        return true;
    }

    this.kti = function(value, name, error) {
        var regexI = /^[0-9]+$/;
        if (!regexI.test(value)) {
            document.querySelector(error).innerHTML = name + ' không đúng định dạng!';
            return false;
        }
        document.querySelector(error).innerHTML = "";
        return true;
    }


}