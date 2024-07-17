export function ActivateLoader(bool_value){
    document.getElementById('loader-box').style.display=bool_value?'flex':'none';
    document.getElementById('blur-box').style.display=bool_value?'flex':'none';
}
export function ShowAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.style.backgroundColor=type;
    alert.className = `m-1 p-2 rounded-md z-20`;
    alert.innerText = message;
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.classList.add('hidden');
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}
export default {ActivateLoader,ShowAlert}