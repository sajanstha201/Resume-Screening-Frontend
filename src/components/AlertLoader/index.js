export function activate_loader(bool_value){
    document.getElementById('loader-box').style.display=bool_value?'flex':'none';
    document.getElementById('blur-box').style.display=bool_value?'flex':'none';
}
export function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerText = message;
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.classList.add('hidden');
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}
export {NewLoader} from './NewLoader'
export default {activate_loader,showAlert}