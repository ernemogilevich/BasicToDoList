class alertModal {
    constructor() {
    }

    open(alertTitle, alertDescription, button1_title) {  
        let contenido = 
        `<div id="background-alert">
            <div id="content-alert">
                <div id="title-alert">${alertTitle}</div>
                <div id="description-alert">${alertDescription}</div>
                <div>
                    <button id="button1" type="button" class="btn btn-outline-success">${button1_title}</button>
                    <button id="buttonCancelar" type="button" class="btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML("afterbegin", contenido);
        let button1 = document.getElementById("button1");
        let buttonCancelar = document.getElementById("buttonCancelar");

        return new Promise((resolve, reject) => {
            button1.addEventListener("click", () => {
                this.close();
                resolve('Accept');
            });

            buttonCancelar.addEventListener("click", () => {
                this.close();
                reject('Reject');
            });
        });
    }

    close() {
        //Fade Out
        let alerta = document.getElementById("background-alert");
        alerta.style.animation = 'fadeOut 1s';
        alerta.style.animationFillMode = 'forwards';
        setTimeout(() => { alerta.remove(); }, 1000);

        //Bounce Out
        let modal = document.getElementById("content-alert");
        modal.style.animation = 'modalOut 1s';
        modal.style.animationFillMode = 'forwards';
        setTimeout(() => { modal.remove(); }, 1000);
    }
}
