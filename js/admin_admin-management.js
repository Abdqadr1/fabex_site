import { Ajax } from "./ajax.js";
var audit = document.querySelector("[data-audit]");
var admins = document.querySelector("[data-admins]");
var noAdminTemplate = document.querySelector("[data-no-admin]");
var adminItem = document.querySelector("[data-admin-item]");
var noFeedTemplate = document.querySelector("[data-no-feeds]");
var feedItem = document.querySelector("[data-feed-item]");
var registerAdmin = document.querySelector("#register_admin");
var spinner = "<div class='spinner-border text-light spinner-border-sm' aria-hidden='true' role='status'></div>";
var deleteModalDiv = document.querySelector("#delete-modal");
var deleteModalName = deleteModalDiv.querySelector("[data-name]");
var deleteModalBtn = deleteModalDiv.querySelector("[data-delete]");
var registerSection = document.querySelector("#registerSection");
var adminSection = document.querySelector("#adminSection");
var bactBtn = registerSection.querySelector(".backBtn");
var registerForm = document.getElementById("registerForm");
var alertDiv = registerForm.querySelector("#alertDiv");
var submitBtn = registerForm.querySelector("button");
var toggleIcons = registerForm.querySelectorAll("span.toggle-password");
var passwordInputs = registerForm.querySelectorAll("input[type=password]");
toggleIcons.forEach(function (icon, index) {
    icon.onclick = function (event) {
        event.stopPropagation();
        var passwordInput = passwordInputs[index];
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.innerText = "visibility_off";
        }
        else {
            passwordInput.type = "password";
            icon.innerText = "visibility";
        }
    };
});
var deleteModal;
var toggleSections = function () {
    registerSection.classList.toggle("d-none");
    adminSection.classList.toggle("d-none");
};
registerAdmin.onclick = function () { return toggleSections(); };
bactBtn.onclick = function () { return toggleSections(); };
registerForm.onsubmit = function (event) {
    event.preventDefault();
    console.log("submitting admin form...");
    var ajax = new Ajax(event.target);
    ajax.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner + " please wait";
    });
    ajax.setAfter(function (data) {
        var response = JSON.parse(data);
        alert(response);
        toggleSections();
        getAdmins();
    });
    ajax.setError(function (xhttp) {
        var response = JSON.parse(xhttp.response);
        var status = xhttp.status;
        console.log("error", response);
        if (status == 403) {
            location.href = "../errors/403.html";
        }
        if (status == 400 || status == 500) {
            alertDiv.textContent = response;
            alertDiv.classList.remove("d-none");
            alertDiv.focus();
        }
    });
    ajax.setFinally(function () {
        submitBtn.innerHTML = "Register";
        submitBtn.disabled = false;
    });
    ajax.start();
};
//show and hide modal
var showModal = function (name, id, el) {
    if (!deleteModal) {
        deleteModal = new bootstrap.Modal(deleteModalDiv, {
            keyboard: false
        });
    }
    deleteModalName.textContent = name;
    deleteModalBtn.onclick = function () { return deleteAdmin(deleteModalBtn, id, el); };
    deleteModal.show();
};
function deleteAdmin(button, _id, el) {
    button.disabled = true;
    button.innerHTML = spinner;
    Ajax.fetchPage("php/delete_admin.php", function (data) {
        var str = JSON.parse(data);
        alert(str);
        if (str.endsWith("deleted")) {
            admins.removeChild(el);
        }
    }, { _id: _id }, [function () { },
        function () {
            deleteModal.hide();
            button.innerHTML = "Delete";
            button.disabled = false;
        }]);
}
function toggleAccess(event, _id) {
    var button = event.target;
    var _access = Number(button.getAttribute("data-access"));
    _access = (_access === 1) ? 0 : 1;
    button.innerHTML = spinner;
    button.disabled = true;
    Ajax.fetchPage("php/toggle_admin_access.php", function (data) {
        var str = JSON.parse(data);
        alert(str);
        if (str.endsWith("updated")) {
            button.setAttribute("data-access", _access.toString());
            if (_access === 1) {
                button.textContent = "Disable Access";
                button.classList.remove("btn-primary");
                button.classList.add("btn-danger");
            }
            else {
                button.textContent = "Enable Access";
                button.classList.remove("btn-danger");
                button.classList.add("btn-primary");
            }
        }
    }, { _id: _id, _access: _access }, [function () { }, function () { return button.disabled = false; }]);
}
function getAdmins() {
    admins.innerHTML = spinner;
    Ajax.fetchPage("php/admin_data.php?which=admins", function (data) {
        var arr = JSON.parse(data);
        admins.innerHTML = "";
        if (arr.length > 0) {
            arr.forEach(function (admin) {
                var el = adminItem.content.cloneNode(true)
                    .childNodes[1];
                var name = el.querySelector("[data-name]");
                var email = el.querySelector("[data-email]");
                var button = el.querySelector("[data-button]");
                var deleteBtn = el.querySelector("[data-delete-button]");
                name.textContent = admin.full_name;
                email.textContent = admin.email;
                var access = Number(admin.access);
                var id = Number(admin.id);
                if (access === 1) {
                    button.classList.replace("btn-primary", "btn-danger");
                    button.textContent = "Disable Access";
                }
                else {
                    button.classList.replace("btn-danger", "btn-primary");
                    button.textContent = "Enable Access";
                }
                button.setAttribute("data-access", admin.access);
                button.onclick = function (event) { return toggleAccess(event, id); };
                deleteBtn.onclick = function (event) { return showModal(admin.full_name, id, el); };
                admins.appendChild(el);
            });
        }
        else {
            var el = noAdminTemplate.content.cloneNode(true)
                .childNodes[1];
            var button = el.querySelector("button");
            button.onclick = function () { return toggleSections(); };
            admins.appendChild(el);
        }
    }, {}, [
        function (response) {
            if (response.status === 403)
                location.href = "../errors/403.html";
        },
    ]);
}
// get admins
(function () {
    getAdmins();
})();
//get feeds
(function () {
    audit.innerHTML = spinner;
    Ajax.fetchPage("php/activity_feeds.php?which=admins", function (data) {
        var arr = JSON.parse(data);
        audit.innerHTML = "";
        if (arr.length > 0) {
            arr.forEach(function (feed) {
                var el = feedItem.content.cloneNode(true).childNodes[1];
                var name = el.querySelector("[data-name]");
                var action = el.querySelector("[data-action]");
                var tx_id = el.querySelector("[data-id]");
                name.textContent = feed.full_name;
                action.textContent = feed.description;
                tx_id.textContent = feed.tx_id.toUpperCase();
                audit.appendChild(el);
            });
        }
        else {
            var el = noFeedTemplate.content.cloneNode(true).childNodes[1];
            audit.appendChild(el);
        }
    }, {}, [
        function (response) {
            if (response.status === 403)
                location.href = "../errors/403.html";
        }
    ]);
})();
