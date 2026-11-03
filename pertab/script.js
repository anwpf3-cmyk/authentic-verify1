// ==================== ЧАСТЬ 1: БАЗА ДАННЫХ ЭЛЕМЕНТОВ ====================

const elements = [
    // Период 1
    { num: 1, symbol: 'H', name: 'Водород', col: 1, row: 1, group: 'reactive-nonmetal', mass: '1.008 u', density: '0.0899 г/л', melt: '-259.16 °C', discoverer: 'Генри Кавендиш', desc: 'Самый распространенный и легкий химический элемент во Вселенной. Из него в основном состоят все звезды.' },
    { num: 2, symbol: 'He', name: 'Гелий', col: 18, row: 1, group: 'noble-gas', mass: '4.0026 u', density: '0.1785 г/л', melt: '-272.20 °C', discoverer: 'Жансен и Локьер', desc: 'Абсолютно инертный, легкий газ без цвета и запаха. Используется в аэростатах и дирижаблях.' },
    
    // Период 2
    { num: 3, symbol: 'Li', name: 'Литий', col: 1, row: 2, group: 'alkali-metal', mass: '6.94 u', density: '0.534 г/см³', melt: '180.54 °C', discoverer: 'Юхан Арфведсон', desc: 'Самый легкий металл на планете. Незаменим в производстве аккумуляторов для гаджетов и электромобилей.' },
    { num: 4, symbol: 'Be', name: 'Бериллий', col: 2, row: 2, group: 'alkaline-earth', mass: '9.0122 u', density: '1.85 г/см³', melt: '1287 °C', discoverer: 'Луи Воклен', desc: 'Высокопрочный легкий металл, используемый в авиации, лазерах, космических спутниках и рентгеновской технике.' },
    { num: 5, symbol: 'B', name: 'Бор', col: 13, row: 2, group: 'metalloid', mass: '10.81 u', density: '2.34 г/см³', melt: '2075 °C', discoverer: 'Жозеф Гей-Люссак', desc: 'Чрезвычайно твердый полуметалл, применяется в создании сверхпрочных материалов и регулирующих стержней ядерных реакторов.' },
    { num: 6, symbol: 'C', name: 'Углерод', col: 14, row: 2, group: 'reactive-nonmetal', mass: '12.011 u', density: '2.267 г/см³', melt: '3550 °C', discoverer: 'Известен с древности', desc: 'Уникальный элемент, составляющий основу всей органической жизни на Земле. Может быть мягким графитом или сверхтвердым алмазом.' },
    { num: 7, symbol: 'N', name: 'Азот', col: 15, row: 2, group: 'reactive-nonmetal', mass: '14.007 u', density: '1.251 г/л', melt: '-210.00 °C', discoverer: 'Даниэль Резерфорд', desc: 'Главный компонент земного атмосферного воздуха (около 78%). Жидкий азот незаменим в медицине и кулинарии для быстрой заморозки.' },
    { num: 8, symbol: 'O', name: 'Кислород', col: 16, row: 2, group: 'reactive-nonmetal', mass: '15.999 u', density: '1.429 г/л', melt: '-218.79 °C', discoverer: 'Джозеф Пристли', desc: 'Жизненно важный газ, обеспечивающий дыхание большинства организмов и поддерживающий все процессы горения на Земле.' },
    { num: 9, symbol: 'F', name: 'Фтор', col: 17, row: 2, group: 'reactive-nonmetal', mass: '18.998 u', density: '1.696 г/л', melt: '-219.67 °C', discoverer: 'Анри Муассан', desc: 'Экстремально агрессивный и реактивный бледно-желтый газ. Его соединения добавляют в пасты для защиты зубной эмали.' },
    { num: 10, symbol: 'Ne', name: 'Неон', col: 18, row: 2, group: 'noble-gas', mass: '20.180 u', density: '0.9002 г/л', melt: '-248.59 °C', discoverer: 'Рамзай и Трэверс', desc: 'Инертный газ, светящийся ярким красно-оранжевым цветом при пропускании через него электрического разряда. Применяется в вывесках.' },

    // Период 3
    { num: 11, symbol: 'Na', name: 'Натрий', col: 1, row: 3, group: 'alkali-metal', mass: '22.990 u', density: '0.971 г/см³', melt: '97.72 °C', discoverer: 'Гемфри Дэви', desc: 'Очень мягкий щелочной металл, который легко режется обычным ножом. Чрезвычайно бурно, со взрывом, реагирует с водой.' },
    { num: 12, symbol: 'Mg', name: 'Магний', col: 2, row: 3, group: 'alkaline-earth', mass: '24.305 u', density: '1.738 г/см³', melt: '650 °C', discoverer: 'Гемфри Дэви', desc: 'Легкий ковкий металл серебристого цвета, горящий ослепительно белым пламенем. Важен для биохимических процессов в организме.' },
    { num: 13, symbol: 'Al', name: 'Алюминий', col: 13, row: 3, group: 'post-transition', mass: '26.982 u', density: '2.70 г/см³', melt: '660.32 °C', discoverer: 'Ганс Эрстед', desc: 'Самый распространенный металл в земной коре. Активно используется везде: от фольги для запекания до конструирования самолетов.' },
    { num: 14, symbol: 'Si', name: 'Кремний', col: 14, row: 3, group: 'metalloid', mass: '28.085 u', density: '2.329 г/см³', melt: '1414 °C', discoverer: 'Йёнс Берцелиус', desc: 'Важнейший полупроводник, послуживший основой всей кремниевой электроники, процессоров, солнечных панелей и микросхем.' },
    { num: 15, symbol: 'P', name: 'Фосфор', col: 15, row: 3, group: 'reactive-nonmetal', mass: '30.974 u', density: '1.823 г/см³', melt: '44.15 °C', discoverer: 'Хенниг Бранд', desc: 'Неметалл, белый изотоп которого способен слабо светиться в темноте из-за окисления. Красный фосфор наносят на спичечные коробки.' },
    { num: 16, symbol: 'S', name: 'Сера', col: 16, row: 3, group: 'reactive-nonmetal', mass: '32.06 u', density: '2.07 г/см³', melt: '115.21 °C', discoverer: 'Известна с древности', desc: 'Лимонно-желтый хрупкий порошок. Играет ключевую роль в химическом производстве при синтезе серной кислоты и пороха.' },
    { num: 17, symbol: 'Cl', name: 'Хлор', col: 17, row: 3, group: 'reactive-nonmetal', mass: '35.45 u', density: '3.214 г/л', melt: '-101.5 °C', discoverer: 'Карл Шееле', desc: 'Тяжелый едкий желто-зеленый газ с резким удушливым запахом. Применяется для обеззараживания питьевой воды и отбеливания.' },
    { num: 18, symbol: 'Ar', name: 'Аргон', col: 18, row: 3, group: 'noble-gas', mass: '39.948 u', density: '1.784 г/л', melt: '-189.3 °C', discoverer: 'Рэлей и Рамзай', desc: 'Самый доступный благородный газ. Создает защитную среду при сварке металлов и заполняет лампы накаливания.' }
];

// ==================== ЧАСТЬ 2: ГЕНЕРАЦИЯ СЕТКИ И НАСТРОЙКА THREE.JS ====================

const totalElementsCount = 118;
const existingSymbols = elements.map(e => e.symbol);

let currentColumn = 1;
let currentRow = 4;

for (let i = 19; i <= totalElementsCount; i++) {
    if (i === 57 || i === 89) { currentColumn = 4; }

    let mockSymbol = `El${i}`;
    if (!existingSymbols.includes(mockSymbol)) {
        let currentGroup = 'transition-metal';
        if (currentColumn >= 13 && currentColumn <= 16) currentGroup = 'post-transition';
        if (currentColumn === 17) currentGroup = 'reactive-nonmetal';
        if (currentColumn === 18) currentGroup = 'noble-gas';
        
        if (currentColumn > 18) {
            currentColumn = 1;
            currentRow++;
        }

        let finalRow = currentRow;
        let finalCol = currentColumn;
        if (i >= 57 && i <= 71) { finalRow = 9; finalCol = (i - 57) + 3; currentGroup = 'lanthanide'; }
        else if (i >= 89 && i <= 103) { finalRow = 10; finalCol = (i - 89) + 3; currentGroup = 'actinide'; }

        elements.push({
            num: i,
            symbol: `Ex${i}`,
            name: `Элемент ${i}`,
            col: finalCol,
            row: finalRow,
            group: currentGroup,
            mass: `${(i * 2.3).toFixed(2)} u`,
            density: 'Данные уточняются',
            melt: 'Высокая',
            discoverer: 'Лабораторные исследования',
            desc: `Тяжелый химический элемент номер ${i}. Свойства и стабильность искусственно синтезированных изотопов изучаются учеными.`
        });

        if (!(i >= 57 && i <= 71) && !(i >= 89 && i <= 103)) {
            currentColumn++;
        }
    }
}

function generateTable() {
    const grid = document.getElementById('table-grid');
    if (!grid) return;
    grid.innerHTML = '';

    elements.forEach(el => {
        const cell = document.createElement('div');
        cell.className = `element ${el.group}`;
        cell.style.gridColumn = el.col;
        cell.style.gridRow = el.row;
        
        cell.onclick = () => showElement(el);

        cell.innerHTML = `
            <span class="num">${el.num}</span>
            <span class="symbol">${el.symbol.startsWith('Ex') ? el.num : el.symbol}</span>
            <span class="name">${el.name}</span>
        `;
        grid.appendChild(cell);
    });
}

let scene, camera, renderer, nucleus, electrons = [];

function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionLight(0xffffff, 0.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const nucleusGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
        color: 0xea4335,
        shininess: 80
    });
    nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleus);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mousemove', (e) => {
        const deltaMove = { x: e.offsetX - previousMousePosition.x, y: e.offsetY - previousMousePosition.y };
        if (isDragging && nucleus) {
            nucleus.rotation.y += deltaMove.x * 0.01;
            nucleus.rotation.x += deltaMove.y * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });

    animate();
}

// ==================== ЧАСТЬ 3: ДВИЖЕНИЕ ЭЛЕКТРОНОВ И ИНТЕРАКТИВ ====================

function build3DAtom(electronsCount) {
    // Очищаем старые электроны со сцены
    electrons.forEach(el => scene.remove(el.mesh));
    electrons = [];

    // Находим и удаляем старые кольца орбит
    const oldOrbits = scene.children.filter(child => child.isLine);
    oldOrbits.forEach(o => scene.remove(o));

    // Распределяем электроны по слоям (максимум по 6 на один слой для наглядности)
    const maxLayers = Math.ceil(electronsCount / 6);

    for (let l = 0; l < maxLayers; l++) {
        let radius = 1.0 + (l * 0.4);
        let countInLayer = Math.min(6, electronsCount - (l * 6));

        // Отрисовка геометрии кольца орбиты
        const segments = 64;
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i <= segments; i++) {
            let theta = (i / segments) * Math.PI * 2;
            vertices.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.LineBasicMaterial({ color: 0x1a73e8, transparent: true, opacity: 0.3 });
        const orbitLine = new THREE.Line(geometry, material);

        // Наклоняем орбиты в 3D пространстве для создания хаотичного красивого эффекта
        orbitLine.rotation.x = (Math.random() * 0.6) + 0.3;
        orbitLine.rotation.z = (Math.random() * Math.PI);
        scene.add(orbitLine);

        // Добавляем сами сферы-электроны на эту орбиту
        for (let e = 0; e < countInLayer; e++) {
            const eGeo = new THREE.SphereGeometry(0.07, 16, 16);
            const eMat = new THREE.MeshPhongMaterial({ color: 0x1a73e8, emissive: 0x0a33a8 });
            const eMesh = new THREE.Mesh(eGeo, eMat);
            scene.add(eMesh);

            electrons.push({
                mesh: eMesh,
                radius: radius,
                angle: (e / countInLayer) * Math.PI * 2,
                speed: 0.01 + (Math.random() * 0.015),
                rotX: orbitLine.rotation.x,
                rotZ: orbitLine.rotation.z
            });
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (nucleus) {
        nucleus.rotation.y += 0.005;
    }

    // Вычисляем траекторию движения электронов вокруг ядра
    electrons.forEach(el => {
        el.angle += el.speed;

        let x = Math.cos(el.angle) * el.radius;
        let z = Math.sin(el.angle) * el.radius;
        let y = 0;

        let y1 = y * Math.cos(el.rotX) - z * Math.sin(el.rotX);
        let z1 = y * Math.sin(el.rotX) + z * Math.cos(el.rotX);

        let finalX = x * Math.cos(el.rotZ) - y1 * Math.sin(el.rotZ);
        let finalY = x * Math.sin(el.rotZ) + y1 * Math.cos(el.rotZ);

        el.mesh.position.set(finalX, finalY, z1);
    });

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function showElement(el) {
    document.getElementById('welcome-text').classList.add('hidden');
    document.getElementById('details-panel').classList.remove('hidden');

    document.getElementById('el-full-name').innerText = `${el.name} (${el.symbol.startsWith('Ex') ? el.num : el.symbol})`;
    
    let catText = "Элемент системы";
    if(el.group === 'reactive-nonmetal') catText = "Активный неметалл";
    if(el.group === 'noble-gas') catText = "Благородный газ";
    if(el.group === 'alkali-metal') catText = "Щелочной металл";
    if(el.group === 'alkaline-earth') catText = "Щелочноземельный металл";
    if(el.group === 'metalloid') catText = "Полуметалл";
    if(el.group === 'post-transition') catText = "Постпереходный металл";
    if(el.group === 'transition-metal') catText = "Переходный металл";
    if(el.group === 'lanthanide') catText = "Лантаноид";
    if(el.group === 'actinide') catText = "Актиноид";

    document.getElementById('el-category').innerText = catText;
    document.getElementById('el-desc').innerText = el.desc;
    document.getElementById('el-symbol').innerText = el.symbol.startsWith('Ex') ? el.num : el.symbol;
    document.getElementById('el-mass').innerText = el.mass;
    document.getElementById('el-density').innerText = el.density;
    document.getElementById('el-melt').innerText = el.melt;
    document.getElementById('el-discoverer').innerText = el.discoverer;

    if (!scene) {
        init3D();
    }

    build3DAtom(el.num);
}

// Автоматический старт генерации таблицы при загрузке страницы
window.onload = () => {
    generateTable();
};

// Поддержка адаптивности при изменении размеров экрана
window.addEventListener('resize', () => {
    if (!renderer || !camera) return;
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
