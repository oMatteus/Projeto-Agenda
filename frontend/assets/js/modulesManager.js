//Remove FlashMessages
import '../../modules/removeFlashMessages';

//Validação de formulários
import Valida from '../../modules/validar';

const validaLogin = new Valida('.formLogin');
validaLogin.init('login');

const validaRegistro = new Valida('.formRegister');
validaRegistro.init('registro');

const validaContato = new Valida('.formContato');
validaRegistro.init('contato');


//Mascara para numero de telefone
import numberMask from '../../modules/numberMask';
numberMask('input[name="telefone"]');