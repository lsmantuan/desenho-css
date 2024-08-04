// Função para detectar se o dispositivo suporta eventos de toque
function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (window.matchMedia("(pointer: coarse)").matches);
}

if (!isTouchDevice()) {
    // Selecionar elementos uma vez e armazenar em variáveis
    const circle = document.getElementById('circulo');
    const cabeca = document.querySelector('.cabeca');
    const sobrancelhaDireita = document.querySelector('.sobrancelha-direita');
    const sobrancelhaEsquerda = document.querySelector('.sobrancelha-esquerda');
    const pupilaDireita = document.getElementById('pupila-direita');
    const pupilaEsquerda = document.getElementById('pupila-esquerda');
    const olheiraDireita = document.getElementById('olheira-direita');
    const olheiraEsquerda = document.getElementById('olheira-esquerda');
    const boca = document.getElementById('boca');

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    const larguraTerco = window.innerWidth / 3;
    const alturaTerco = window.innerHeight / 3;

    // Função para mover o círculo baseado no movimento do mouse
    function moveCircle(event) {
        const mouse_x = event.clientX;
        const mouse_y = event.clientY;
        const initial_left = -715;
        const initial_top = -715;
        const circle_size = 1600;
        const circle_x = initial_left + circle_size / 2;
        const circle_y = initial_top + circle_size / 2;
        const delta_x = circle_x - mouse_x;
        const delta_y = circle_y - mouse_y;
        circle.style.left = `${initial_left + delta_x * 0.02}px`;
        circle.style.top = `${initial_top + delta_y * 0.02}px`;
    }

    // Função para atualizar animações baseadas no movimento do mouse
    function updateAnimations() {
        const deltaX = posX - larguraTerco;
        const deltaY = posY - alturaTerco;
        const relX = deltaX / larguraTerco;
        const relY = deltaY / larguraTerco;
        const giroCabeca = relX > 0 ? 1 : -1;
        const rotacaoCabeca = relY * 6 * giroCabeca;
        const cantoSuperiorDireito = (((posX / 6) * 4.5) > larguraTerco * 2) && (posY < (alturaTerco * 3) / 4.5);
        const giroBoca = cantoSuperiorDireito ? -1 : 1;
        const alturaBoca = cantoSuperiorDireito ? -0.8 : 0;
        const alturaSobrancelha = relX * 0.15;
        const rotacaoSobrancelhaDireita = relY * -10;
        const rotacaoSobrancelhaEsquerda = relY * 10;
        const posicaoPupilaY = 3.95 + relY * 0.08;
        const posicaoPupilaX = 4.7 + (giroCabeca == -1 ? relX * 0.12 * giroCabeca : relX * 0.06 * giroCabeca);

        pupilaDireita.style.top = `${posicaoPupilaY}em`;
        pupilaDireita.style.left = `${posicaoPupilaX}em`;
        pupilaEsquerda.style.top = `${posicaoPupilaY}em`;
        pupilaEsquerda.style.left = `${(posicaoPupilaX - 2.1)}em`;
        sobrancelhaDireita.style.top = `${3 - alturaSobrancelha}em`;
        sobrancelhaEsquerda.style.top = `${3 + alturaSobrancelha}em`;
        sobrancelhaDireita.style.transform = `rotate(${rotacaoSobrancelhaDireita}deg)`;
        sobrancelhaEsquerda.style.transform = `rotate(${rotacaoSobrancelhaEsquerda}deg)`;
        olheiraDireita.style.transform = `scaleY(${alturaSobrancelha < 0 ? 1.05 + alturaSobrancelha : 0.9 + alturaSobrancelha})`;
        olheiraEsquerda.style.transform = `scaleY(${alturaSobrancelha < 0 ? 0.95 - alturaSobrancelha : 1.1 - alturaSobrancelha})`;
        cabeca.style.transform = `rotate(${rotacaoCabeca}deg) scaleX(${giroCabeca})`;
        boca.style.transform = `rotate(${relY * 15}deg) scaleY(${giroBoca}) translateY(${alturaBoca}em)`;

        requestAnimationFrame(updateAnimations);
    }

    // Inicializa animações
    requestAnimationFrame(updateAnimations);

    // Atualiza posições do mouse e move o círculo
    document.addEventListener('mousemove', (event) => {
        posX = event.clientX;
        posY = event.clientY;
        moveCircle(event);
    });
}
