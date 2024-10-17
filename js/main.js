const toggle = document.getElementById('toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const homePage = document.querySelector('.home');
document.onclick = function(e) {

    if (e.target.id !== 'sidebar' && e.target.id !== 'toggle') {

        toggle.classList.remove('active');
        sidebar.classList.remove('active');
        closeSidebar.classList.remove('active');
    }
}


toggle.onclick = function() {

    toggle.classList.add('active');
    sidebar.classList.add('active');
    closeSidebar.classList.add('active');
    homePage.classList.add('expander')
}

/**======= Typing Animation ======== */

var typed = new Typed(".typing", {

    strings: ["", "web Designer", "web Developer", "Graphic Designer", "Youtuber"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

/**======= Aside ======== */

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {

    const a = navList[i].querySelector("a")
    a.addEventListener("click", function() {

        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
    })
}

function showSection(element) {

    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}




/**
 * 
 * 
 * 
 * JS LOGIN
 * 
 * 
 * 
 */

//Đối tượng `Validator`
function Validator(options) {
    var formElement = document.querySelector(options.form);

    //Lấy element của form cần validate
    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // Xử lý blur khỏi input
                inputElement.onblur = function() {
                        validate(inputElement, rule);
                    }
                    //Xử lý khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
        });
    }

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
}

//ĐỊnh nghĩa rules
//1. Khi co lỗi thì trả mes lỗi
//2. Khi hợp lệ trả về undifined
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };

}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };

}

Validator.minLenght = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập ${min} ký tự`;
        }
    };

}