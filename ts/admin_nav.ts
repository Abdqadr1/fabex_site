declare let version:number;
declare let activePage: string;
declare let page: string;
declare const isCompleted:boolean;
declare const bootstrap:any;
    import { Ajax } from "./ajax.js";
if(isCompleted){
    doComplete();
} else{
    const spinner = `<div class='spinner-border text-light spinner-border-sm' aria-hidden='true' role='status'></div>`;
    const modalDiv = document.querySelector("#password-modal") as HTMLDivElement;
    const  passwordModal = new bootstrap.Modal(
      modalDiv,
      {keyboard: false}
    );
    const form = modalDiv.querySelector("form#passwordForm") as HTMLFormElement;
    const alertDiv = form.querySelector("#alertDiv") as HTMLDivElement;
    const submitBtn = form.querySelector("button") as HTMLButtonElement;
    form.onsubmit = event => {
        event.preventDefault();
        const ajax = new Ajax(event.target as HTMLFormElement);
        ajax.setBefore(()=> {
            submitBtn.disabled = true;
            submitBtn.innerHTML = spinner;
        })
        ajax.setFinally(()=>{
            submitBtn.innerHTML = "Change Password";
            submitBtn.disabled = false;
        })
        ajax.setError((xhttp:XMLHttpRequest) => {
            const response = JSON.parse(xhttp.response);
            alertDiv.textContent = response;
            alertDiv.classList.remove("d-none");

        })
        ajax.setAfter((data:string)=> {
            const response:string = JSON.parse(data);
            if(response.endsWith("updated")){
                alertDiv.textContent = response;
                alertDiv.classList.remove("d-none");
                alertDiv.classList.replace("alert-danger", "alert-success");
                passwordModal.hide();
                document.body.removeChild(modalDiv);
                doComplete();
            }
        })
        ajax.start();
    }
    passwordModal.show();
}


function doComplete(){
    const jsFolder = "../js/admin_";
    const navLinks = document.querySelectorAll(
      "li>a.nav-link"
    ) as NodeListOf<HTMLAnchorElement>;
    const navToggleButton = document.querySelector(
      ".dropdown-toggle"
    ) as HTMLAnchorElement;
    const container = document.querySelector("div#container") as HTMLDivElement;
    const navLinkDiv = document.querySelector(
      "div#navbarTogglerDemo03"
    ) as HTMLDivElement;
    const loaderHTML = `<div class='d-flex align-items-center justify-content-center' style='height: 100%;'>
            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
                <span class='visually-hidden'>Loading...</span>
            </div>
        </div>`;

    const activate = (activePage: string) => {
      navLinks.forEach((el) => {
        const text = el.innerText;
        let active = "active";
        let borderBottom = "border-bottom";
        let border2 = "border-2";
        let borderPrimary = "border-primary";
        let dSMNone = "d-none";
        let dMdBlock = "d-md-block";
        if (activePage.toLowerCase() === text.toLowerCase()) {
          navToggleButton.innerText = text;
          el.classList.add(active);
          el.classList.add(borderBottom);
          el.classList.add(border2);
          el.classList.add(borderPrimary);
          el.classList.add(dSMNone);
          el.classList.add(dMdBlock);
        } else {
          el.classList.remove(active);
          el.classList.remove(borderBottom);
          el.classList.remove(border2);
          el.classList.remove(borderPrimary);
          el.classList.remove(dSMNone);
        }
      });
    };
    navLinks.forEach((element) => {
      element.onclick = (event) => {
        event.preventDefault();
        (navToggleButton.parentElement as HTMLButtonElement).classList.add(
          "collapsed"
        );
        (navToggleButton.parentElement as HTMLButtonElement).setAttribute(
          "aria-expanded",
          "false"
        );
        navLinkDiv.classList.remove("show");
        let text = element.innerText;
        if (activePage !== text) {
          container.innerHTML = "";
          container.innerHTML = loaderHTML;
          //load page asynchronously
          load(text);
          activePage = text;
          navToggleButton.innerText = text;
          let active = "active";
          let borderBottom = "border-bottom";
          let border2 = "border-2";
          let borderPrimary = "border-primary";
          let dSMNone = "d-none";
          let dMdBlock = "d-md-block";
          navLinks.forEach((el) => {
            if (el.innerText === text) {
              el.classList.add(active);
              el.classList.add(borderBottom);
              el.classList.add(border2);
              el.classList.add(borderPrimary);
              el.classList.add(dSMNone);
              el.classList.add(dMdBlock);
            } else {
              el.classList.remove(active);
              el.classList.remove(borderBottom);
              el.classList.remove(border2);
              el.classList.remove(borderPrimary);
              el.classList.remove(dSMNone);
            }
          });
        }
      };
    });

    const load = (pageName: string) => {
      const ur = decodeURI(location.href).split("/");
      ur[ur.length - 1] = pageName.toLowerCase();
      history.pushState("", "", ur.join("/"));
      version = version + 0.01;
      const url: string = pageName.toLowerCase() + ".php";
      Ajax.fetchPage(url, (data: string) => {
        container.innerHTML = "";
        container.innerHTML = data;
        document.title = activePage;
        const scriptB4 = container.querySelector(
          "script#pageScript"
        ) as HTMLScriptElement;
        if (scriptB4 !== null) {
          container.removeChild(scriptB4);
        }
        const script = document.createElement("script");
        script.src =
          jsFolder + pageName.toLowerCase() + ".js?version=" + version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
      });
    };

    // get page
    (function () {
      switch (page.toLowerCase()) {
        case "orders":
          activePage = "orders";
          load(activePage);
          break;
        case "rate-management":
          activePage = "rate-management";
          load(activePage);
          break;
        case "settings":
          activePage = "settings";
          load(activePage);
          break;
        case "admin-management":
          activePage = "admin-management";
          load(activePage);
          break;
        default:
          console.log(page);
          location.href = "../errors/404.html";
      }
      activate(activePage);
    })();
}