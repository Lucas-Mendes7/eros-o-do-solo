let gotas = [];
let solo;
let tipoSolo = "vegetacao"; // valor inicial
let predios = []; // Array para armazenar os prédios
//let helicoptero; // Variável para o helicóptero
let prediosCriados = false; // Variável para controlar se os prédios já foram criados

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-holder");
  solo = new Solo(tipoSolo);

  // Inicializa o helicóptero
  //helicoptero = new Helicoptero();
}

function draw() {
  background(200, 220, 255); // céu

  for (let i = gotas.length - 1; i >= 0; i--) {
    gotas[i].cair();
    gotas[i].mostrar();

    if (gotas[i].atingeSolo(solo.altura)) {
      solo.aumentarErosao();
      gotas.splice(i, 1);
    }
  }

  solo.mostrar();

  // Atualiza e mostra os prédios
  for (let i = predios.length - 1; i >= 0; i--) {
    predios[i].atualizar(solo.altura);
    predios[i].mostrar();
    if (predios[i].desmoronando && predios[i].altura <= 0) {
      predios.splice(i, 1); // Remove o prédio completamente
    }
  }

  // Atualiza e mostra o helicóptero
  //helicoptero.atualizar();
  //helicoptero.mostrar();

  if (frameCount % 5 === 0) {
    gotas.push(new Gota());
  }

  // Adiciona prédios apenas se o solo for urbanizado e os prédios ainda não foram criados
  if (solo.tipo === "urbanizado" && !prediosCriados) {
    for (let i = 0; i < 3; i++) { // Adiciona 3 prédios - Alterado de 5 para 3
      let x = random(50, width - 50);
      let y = solo.altura - random(100, 200); // Altura dos prédios
      predios.push(new Predio(x, y));
    }let gotas = [];
let solo;
let tipoSolo = "vegetacao"; // valor inicial
let predios = []; // Array para armazenar os prédios
//let helicoptero; // Variável para o helicóptero
let prediosCriados = false; // Variável para controlar se os prédios já foram criados

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-holder");
  solo = new Solo(tipoSolo);

  // Inicializa o helicóptero
  //helicoptero = new Helicoptero();
}

function draw() {
  background(200, 220, 255); // céu

  for (let i = gotas.length - 1; i >= 0; i--) {
    gotas[i].cair();
    gotas[i].mostrar();

    if (gotas[i].atingeSolo(solo.altura)) {
      solo.aumentarErosao();
      gotas.splice(i, 1);
    }
  }

  solo.mostrar();

  // Atualiza e mostra os prédios
  for (let i = predios.length - 1; i >= 0; i--) {
    predios[i].atualizar(solo.altura);
    predios[i].mostrar();
    if (predios[i].desmoronando && predios[i].altura <= 0) {
      predios.splice(i, 1); // Remove o prédio completamente
    }
  }

  // Atualiza e mostra o helicóptero
  //helicoptero.atualizar();
  //helicoptero.mostrar();

  if (frameCount % 5 === 0) {
    gotas.push(new Gota());
  }

  // Adiciona prédios apenas se o solo for urbanizado e os prédios ainda não foram criados
  if (solo.tipo === "urbanizado" && !prediosCriados) {
    for (let i = 0; i < 3; i++) { // Adiciona 3 prédios - Alterado de 5 para 3
      let x = random(50, width - 50);
      let y = solo.altura - random(100, 200); // Altura dos prédios
      predios.push(new Predio(x, y));
    }
    prediosCriados = true; // Marca que os prédios foram criados
  }
}

function setSoilType(tipo) {
  tipoSolo = tipo;
  solo = new Solo(tipoSolo);

  // Recria os prédios quando o tipo de solo muda para urbanizado
  if (tipoSolo === "urbanizado") {
    predios = []; // Limpa os prédios existentes
    prediosCriados = false; // Permite que os prédios sejam criados novamente
    for (let i = 0; i < 3; i++) { // Adiciona 3 prédios iniciais - Alterado de 5 para 3
      let x = random(50, width - 50);
      let y = solo.altura - random(100, 200);
      predios.push(new Predio(x, y));
    }
  } else {
    predios = []; // Remove os prédios se o solo não for urbanizado
    prediosCriados = false; // Reseta a variável para o caso de mudar para urbanizado novamente
  }
}

class Gota {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.vel = random(4, 6);
  }

  cair() {
    this.y += this.vel;
  }

  mostrar() {
    stroke(0, 0, 200);
    line(this.x, this.y, this.x, this.y + 10);
  }

  atingeSolo(ySolo) {
    return this.y > ySolo;
  }
}

class Solo {
  constructor(tipo) {
    this.tipo = tipo;
    this.altura = height - 80;
    this.erosao = 0;
  }

  aumentarErosao() {
    let taxa;
    if (this.tipo === "vegetacao") taxa = 0.1;
    else if (this.tipo === "exposto") taxa = 0.5;
    else if (this.tipo === "urbanizado") taxa = 0.3;

    this.erosao += taxa;
    this.altura += taxa;
  }

  mostrar() {
    noStroke();
    if (this.tipo === "vegetacao") fill(60, 150, 60);
    else if (this.tipo === "exposto") fill(139, 69, 19);
    else if (this.tipo === "urbanizado") fill(120);

    rect(0, this.altura, width, height - this.altura);

    fill(0);
    textSize(14);
    textAlign(LEFT);
    text(`Erosão: ${this.erosao.toFixed(1)}`, 10, 20);
    text(`Tipo de solo: ${this.tipo}`, 10, 40);
  }
}

class Predio {
  constructor(x, y) {
    this.x = x;
    this.yInicial = y; // Guarda a altura inicial da base
    this.y = y;
    this.largura = random(40, 80);
    this.alturaInicial = random(150, 300); // Altura inicial dos prédios
    this.altura = this.alturaInicial;
    this.cor = color(150 + random(80), 150 + random(80), 150 + random(80)); // Cores mais acinzentadas
    this.desmoronando = false;
    this.taxaDesmoronamento = 0.5; // Velocidade de desmoronamento - AUMENTADO para 0.5
    this.numAndares = floor(this.alturaInicial / 30); // Calcula o número de andares
  }

  atualizar(alturaSolo) {
    // Se a base do prédio estiver abaixo da altura do solo, começa a desmoronar
    if (this.y + this.altura > alturaSolo) {
      this.desmoronando = true;
    }

    if (this.desmoronando) {
      this.altura -= this.taxaDesmoronamento;
      this.y += this.taxaDesmoronamento; // Move o prédio para cima enquanto diminui
    } else { // Novo bloco else para fazer os prédios descerem sempre
      this.y += this.taxaDesmoronamento; // Move o prédio para baixo continuamente
    }
  }

  mostrar() {
    if (this.altura > 0) {
      fill(this.cor);
      rect(this.x, this.y, this.largura, this.altura);

      // Desenha as janelas
      let andarAltura = this.altura / this.numAndares;
      let janelaLargura = this.largura / 3;
      let janelaAltura = andarAltura / 3;

      for (let i = 0; i < this.numAndares; i++) {
        let andarY = this.y + i * andarAltura + janelaAltura / 2;
        for (let j = 0; j < 2; j++) {
          let janelaX = this.x + (j + 0.5) * janelaLargura;
          fill(220); // Cor das janelas
          rect(janelaX, andarY, janelaLargura, janelaAltura);
        }
      }
    }
  }
}

// class Helicoptero {
//  constructor() {
//    this.x = -100;
//    this.y = 50;
//    this.velocidade = 2;
//    this.tamanhoCorpo = 80;
//    this.tamanhoRotor = 25;
//    this.anguloRotor = 0;
//    this.corCorpo = color(240, 240, 240);
//    this.corDetalhe = color(150, 150, 150);
//    this.numHelices = 4;
//    this.comprimentoCauda = 40;
//    this.alturaCauda = 20;
//    this.tamanhoJanela = 20;
//  }

//  atualizar() {
//    this.x += this.velocidade;
//    if (this.x > width + 100) {
//      this.x = -width - 100;
//    }
//    this.anguloRotor += 0.5;
//  }

//  mostrar() {
//    push();
//    translate(this.x, this.y);

//    // Corpo principal
//    fill(this.corCorpo);
//    rect(-this.tamanhoCorpo / 2, -this.tamanhoCorpo / 4, this.tamanhoCorpo, this.tamanhoCorpo / 2, 10);

//    // Cauda
//    fill(this.corDetalhe);
//    rect(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8, this.comprimentoCauda, this.tamanhoCorpo / 8);

//    // Detalhe na cauda (linha)
//    stroke(this.corCorpo);
//    strokeWeight(3);
//    line(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8 + 5, -this.tamanhoCorpo / 2, -this.tamanhoCorpo / 8 + 5);

//    // Rotor principal
//    fill(this.corDetalhe);
//    push();
//    rotate(this.anguloRotor);
//    for (let i = 0; i < this.numHelices; i++) {
//      rotate(TWO_PI / this.numHelices);
//      ellipse(0, 0, this.tamanhoRotor, this.tamanhoRotor * 5);
//    }
//    pop();

//    // Rotor da cauda
//    fill(this.corDetalhe);
//    push();
//    translate(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8);
//    rotate(this.anguloRotor * 1.5);
//    ellipse(0, 0, this.tamanhoRotor / 2, this.tamanhoRotor * 3);
//    pop();

//    // Janela
//    fill(250);
//    ellipse(this.tamanhoCorpo / 3, -this.tamanhoCorpo / 8, this.tamanhoJanela, this.tamanhoJanela);

//    // Trem de pouso
//    stroke(this.corDetalhe);
//    strokeWeight(4);
//    line(-this.tamanhoCorpo / 3, 0, -this.tamanhoCorpo / 6, this.tamanhoCorpo / 3 + 10);
//    line(this.tamanhoCorpo / 3, 0, this.tamanhoCorpo / 6, this.tamanhoCorpo / 3 + 10);

//    pop();
//  }
// }

    prediosCriados = true; // Marca que os prédios foram criados
  }
}

function setSoilType(tipo) {
  tipoSolo = tipo;
  solo = new Solo(tipoSolo);

  // Recria os prédios quando o tipo de solo muda para urbanizado
  if (tipoSolo === "urbanizado") {
    predios = []; // Limpa os prédios existentes
    prediosCriados = false; // Permite que os prédios sejam criados novamente
    for (let i = 0; i < 3; i++) { // Adiciona 3 prédios iniciais - Alterado de 5 para 3
      let x = random(50, width - 50);
      let y = solo.altura - random(100, 200);
      predios.push(new Predio(x, y));
    }
  } else {
    predios = []; // Remove os prédios se o solo não for urbanizado
    prediosCriados = false; // Reseta a variável para o caso de mudar para urbanizado novamente
  }
}

class Gota {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.vel = random(4, 6);
  }

  cair() {
    this.y += this.vel;
  }

  mostrar() {
    stroke(0, 0, 200);
    line(this.x, this.y, this.x, this.y + 10);
  }

  atingeSolo(ySolo) {
    return this.y > ySolo;
  }
}

class Solo {
  constructor(tipo) {
    this.tipo = tipo;
    this.altura = height - 80;
    this.erosao = 0;
  }

  aumentarErosao() {
    let taxa;
    if (this.tipo === "vegetacao") taxa = 0.1;
    else if (this.tipo === "exposto") taxa = 0.5;
    else if (this.tipo === "urbanizado") taxa = 0.3;

    this.erosao += taxa;
    this.altura += taxa;
  }

  mostrar() {
    noStroke();
    if (this.tipo === "vegetacao") fill(60, 150, 60);
    else if (this.tipo === "exposto") fill(139, 69, 19);
    else if (this.tipo === "urbanizado") fill(120);

    rect(0, this.altura, width, height - this.altura);

    fill(0);
    textSize(14);
    textAlign(LEFT);
    text(`Erosão: ${this.erosao.toFixed(1)}`, 10, 20);
    text(`Tipo de solo: ${this.tipo}`, 10, 40);
  }
}

class Predio {
  constructor(x, y) {
    this.x = x;
    this.yInicial = y; // Guarda a altura inicial da base
    this.y = y;
    this.largura = random(40, 80);
    this.alturaInicial = random(150, 300); // Altura inicial dos prédios
    this.altura = this.alturaInicial;
    this.cor = color(150 + random(80), 150 + random(80), 150 + random(80)); // Cores mais acinzentadas
    this.desmoronando = false;
    this.taxaDesmoronamento = 0.5; // Velocidade de desmoronamento - AUMENTADO para 0.5
    this.numAndares = floor(this.alturaInicial / 30); // Calcula o número de andares
  }

  atualizar(alturaSolo) {
    // Se a base do prédio estiver abaixo da altura do solo, começa a desmoronar
    if (this.y + this.altura > alturaSolo) {
      this.desmoronando = true;
    }

    if (this.desmoronando) {
      this.altura -= this.taxaDesmoronamento;
      this.y += this.taxaDesmoronamento; // Move o prédio para cima enquanto diminui
    } else { // Novo bloco else para fazer os prédios descerem sempre
      this.y += this.taxaDesmoronamento; // Move o prédio para baixo continuamente
    }
  }

  mostrar() {
    if (this.altura > 0) {
      fill(this.cor);
      rect(this.x, this.y, this.largura, this.altura);

      // Desenha as janelas
      let andarAltura = this.altura / this.numAndares;
      let janelaLargura = this.largura / 3;
      let janelaAltura = andarAltura / 3;

      for (let i = 0; i < this.numAndares; i++) {
        let andarY = this.y + i * andarAltura + janelaAltura / 2;
        for (let j = 0; j < 2; j++) {
          let janelaX = this.x + (j + 0.5) * janelaLargura;
          fill(220); // Cor das janelas
          rect(janelaX, andarY, janelaLargura, janelaAltura);
        }
      }
    }
  }
}

// class Helicoptero {
//  constructor() {
//    this.x = -100;
//    this.y = 50;
//    this.velocidade = 2;
//    this.tamanhoCorpo = 80;
//    this.tamanhoRotor = 25;
//    this.anguloRotor = 0;
//    this.corCorpo = color(240, 240, 240);
//    this.corDetalhe = color(150, 150, 150);
//    this.numHelices = 4;
//    this.comprimentoCauda = 40;
//    this.alturaCauda = 20;
//    this.tamanhoJanela = 20;
//  }

//  atualizar() {
//    this.x += this.velocidade;
//    if (this.x > width + 100) {
//      this.x = -width - 100;
//    }
//    this.anguloRotor += 0.5;
//  }

//  mostrar() {
//    push();
//    translate(this.x, this.y);

//    // Corpo principal
//    fill(this.corCorpo);
//    rect(-this.tamanhoCorpo / 2, -this.tamanhoCorpo / 4, this.tamanhoCorpo, this.tamanhoCorpo / 2, 10);

//    // Cauda
//    fill(this.corDetalhe);
//    rect(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8, this.comprimentoCauda, this.tamanhoCorpo / 8);

//    // Detalhe na cauda (linha)
//    stroke(this.corCorpo);
//    strokeWeight(3);
//    line(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8 + 5, -this.tamanhoCorpo / 2, -this.tamanhoCorpo / 8 + 5);

//    // Rotor principal
//    fill(this.corDetalhe);
//    push();
//    rotate(this.anguloRotor);
//    for (let i = 0; i < this.numHelices; i++) {
//      rotate(TWO_PI / this.numHelices);
//      ellipse(0, 0, this.tamanhoRotor, this.tamanhoRotor * 5);
//    }
//    pop();

//    // Rotor da cauda
//    fill(this.corDetalhe);
//    push();
//    translate(-this.tamanhoCorpo / 2 - this.comprimentoCauda, -this.tamanhoCorpo / 8);
//    rotate(this.anguloRotor * 1.5);
//    ellipse(0, 0, this.tamanhoRotor / 2, this.tamanhoRotor * 3);
//    pop();

//    // Janela
//    fill(250);
//    ellipse(this.tamanhoCorpo / 3, -this.tamanhoCorpo / 8, this.tamanhoJanela, this.tamanhoJanela);

//    // Trem de pouso
//    stroke(this.corDetalhe);
//    strokeWeight(4);
//    line(-this.tamanhoCorpo / 3, 0, -this.tamanhoCorpo / 6, this.tamanhoCorpo / 3 + 10);
//    line(this.tamanhoCorpo / 3, 0, this.tamanhoCorpo / 6, this.tamanhoCorpo / 3 + 10);

//    pop();
//  }
// }
