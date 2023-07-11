/**
 * Creado Por h92barrios 
*/

window.addEventListener('hashchange', ()=>{
    elem_delete.classList.remove('active'),
    document.querySelector('#windowItemsDelete').classList.add('d-none');
    (window.location.hash === '#trash') && (function(){
        elem_delete.classList.add('active'),
        document.querySelector('#windowItemsDelete').classList.remove('d-none')
    }());
})

document.querySelector('.btnClose').addEventListener('click', ()=> window.location.hash = '#')

window.onload = function () {
    header.classList.remove('active')
    console.info(`Esta accion es realizada con JavaScript`)
}

cont_botton.addEventListener('click', ()=> {
    (header.classList.toggle('active')) ?
        header.classList.remove('active') :
            header.classList.add('active');
    console.info(`Esta accion es realizada con JavaScript`)
});

header.addEventListener('click', ()=> {
    header.classList.toggle('active')
    console.info(`Esta accion es realizada con JavaScript`)
});

function deleteItems() {
    this.removeEventListener('click', deleteItems)
    this.nextElementSibling.removeEventListener('click', itemsView)
    this.parentElement.parentElement.parentElement.classList.add('deleteItem')
    let cloneItem = this.parentElement.parentElement.parentElement.cloneNode(true);
    setTimeout(() => {
        document.querySelector('#windowItemsDelete .context').appendChild(cloneItem)
        this.parentElement.parentElement.parentElement.remove()
    }, 800);
}

function itemsView() {
    (this.parentElement.parentElement.parentElement.classList.toggle('view')) ?
        (this.parentElement.parentElement.parentElement.classList.add('view'), this.textContent = 'Reducir') :
            (this.parentElement.parentElement.parentElement.classList.remove('view'), this.textContent = 'Ampliar');
}

function asdf(file) {
    const file_reader = new FileReader();
    ("undefined" !== typeof file)&&(

        file_reader.onprogress = function (ev) {
            document.querySelector('.progress').style.width = (Math.round((ev.loaded * 100) / ev.total)) + '%';
        },

        file_reader.onload = function (ev) {
            const div = document.createElement('div');
            const divMargin = document.createElement('div');
            const divButton = document.createElement('div');
            const imgs = document.createElement('img');
            const buttonClose = document.createElement('button');
            const buttonView = document.createElement('button');

            div.setAttribute('draggable', 'true')
            div.setAttribute("ondrag", "drag(event)")
            div.setAttribute('role', 'item-img')
            divMargin.className = "margen-en-el-cuadro-de-la-imagen"
            
            imgs.setAttribute('draggable', 'false')
            imgs.src = ev.target.result

            buttonClose.type = "button"
            buttonView.type = "button"

            buttonClose.textContent = "Eliminar"
            buttonView.textContent = "Ampliar"

            divButton.appendChild(buttonClose)
            divButton.appendChild(buttonView)
            divMargin.appendChild(divButton)
            divMargin.appendChild(imgs)

            buttonClose.addEventListener('click', deleteItems)
            buttonView.addEventListener('click', itemsView)

            contenerdor.appendChild(div).appendChild(divMargin)
            document.querySelector('.progress').style.width = '100%'
        },
        
        file_reader.readAsDataURL(file)
    );
}

inputImg.addEventListener('change', (ev) => {
    const file = [];
    let action;

    for (let i = 0; i < ev.target.files.length; i++, action = true) {
        (typeFormat.includes(ev.target.files[i].type)) && (asdf(ev.target.files[i]), file.push(ev.target.files[i]), document.querySelector('.progress').style.width = '0%', action = true);
    }

    if ('undefined' === typeof action) {
        console.info('no se pudo realizar la accion');
    }
})

var el = document.querySelector('.suelta-img'), drag_start = 'off';

function changeContentDrag () {
    ('undefined' !== typeof el && drag_start === 'on' && (el = elem_delete, true)) && el.classList.add('start');
    ('undefined' !== typeof el && drag_start === 'off' && (el = document.querySelector('.suelta-img'), true)) && el.classList.add('start');
}

document.documentElement.onmouseleave = function () {
    el.classList.remove('start');
}

document.documentElement.onmouseenter = function () {
    el.classList.remove('start');
}

window.ondrag = function (ev) {
    if (ev.type !== "drag") return false;
    ev.preventDefault()
    if (ev.target.parentElement.parentElement.getAttribute('role') === 'item-img') {
        el = elem_delete;
    }
}

window.ondragstart = function () {
    drag_start = 'on'
}

window.ondragend = function () {
    drag_start = 'off'
    el.classList.remove('start')
}

window.ondragover = function (ev) {
    if (ev.type !== "dragover") return false;
    ev.preventDefault()
    changeContentDrag()
}

img.ondrop = function (ev) {
    if (ev.type !== "drop") return false;
    ev.preventDefault(),
    changeContentDrag()
    drag_start = 'off'
    const data = ev.dataTransfer;
    const file = [];
    let action;
    el.classList.remove('start');
        
    for (let i = 0; i < data.items.length; i++) {
        (data.items[i].kind == "file" && typeFormat.includes(data.items[i].type)) && (asdf(data.items[i].getAsFile()), file.push(data.items[i].getAsFile()), document.querySelector('.progress').style.width = '0%', action = true);
    }

    if ('undefined' === typeof action) {
        console.info('no se pudo realizar la accion');
    }
}

function drag (ev) {
    if (ev.type !== "drag") return false;
    ev.preventDefault()
    ev.target.setAttribute("id", "inMove")
    data_transfer.setData('text', ev.target.id)
}

elem_delete.ondragleave = function () {
    elem_delete.classList.remove('enter')
}

elem_delete.ondragenter = function () {
    elem_delete.classList.add('enter')
}

elem_delete.ondragend = function () {
    elem_delete.classList.remove('enter')
}

elem_delete.ondrop = function (ev) {
    if (ev.type !== "drop") return false;
    ev.preventDefault(),
    changeContentDrag()
    drag_start = 'off'
    let action;
    let elem;
    el.classList.remove('start');

    (data_transfer.items[0].kind == "string" && ['text/plain'].includes(data_transfer.items[0].type) && ( elem = document.getElementById(data_transfer.getData('text') ), true)) && (
        document.querySelector('#windowItemsDelete .context').appendChild( elem ),
        elem.removeAttribute('draggable'),
        elem.removeAttribute('ondrag'),
        elem.removeAttribute('id'),
        elem.className = 'deleteItem',
        action = true
        );

    if ('undefined' === typeof action) {
        console.info('no se pudo realizar la accion');
    }
}