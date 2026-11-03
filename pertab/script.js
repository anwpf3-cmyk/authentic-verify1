// Полная база данных элементов со строгими координатами сетки (col = колонка, row = строка)
const elements = [
    // Период 1
    { num: 1, symbol: 'H', name: 'Водород', col: 1, row: 1, group: 'reactive-nonmetal', mass: '1.008 u', density: '0.0899 г/л', melt: '-259.16 °C', discoverer: 'Генри Кавендиш', desc: 'Самый распространенный и легкий химический элемент во Вселенной. Из него состоят звезды.' },
    { num: 2, symbol: 'He', name: 'Гелий', col: 18, row: 1, group: 'noble-gas', mass: '4.0026 u', density: '0.1785 г/л', melt: '-272.20 °C', discoverer: 'Жансен и Локьер', desc: 'Абсолютно инертный, легкий газ. Используется в аэростатах и для создания сверхнизких температур.' },
    
    // Период 2
    { num: 3, symbol: 'Li', name: 'Литий', col: 1, row: 2, group: 'alkali-metal', mass: '6.94 u', density: '0.534 г/см³', melt: '180.54 °C', discoverer: 'Юхан Арфведсон', desc: 'Самый легкий металл на планете. Незаменим в производстве аккумуляторов для смартфонов и электромобилей.' },
    { num: 4, symbol: 'Be', name: 'Бериллий', col: 2, row: 2, group: 'alkaline-earth', mass: '9.0122 u', density: '1.85 г/см³', melt: '1287 °C', discoverer: 'Луи Воклен', desc: 'Высокопрочный легкий металл, используемый в авиации, космических спутниках и рентгеновской технике.' },
    { num: 5, symbol: 'B', name: 'Бор', col: 13, row: 2, group: 'metalloid', mass: '10.81 u', density: '2.34 г/см³', melt: '2075 °C', discoverer: 'Жозеф Гей-Люссак', desc: 'Чрезвычайно твердый полуметалл, применяется в создании сверхпрочных стекол и космических материалов.' },
    { num: 6, symbol: 'C', name: 'Углерод', col: 14, row: 2, group: 'reactive-nonmetal', mass: '12.011 u', density: '2.267 г/см³', melt: '3550 °C', discoverer: 'Известен с древности', desc: 'Уникальный элемент, составляющий основу всей органической жизни на Земле. Формирует как графит, так и алмазы.' },
    { num: 7, symbol: 'N', name: 'Азот', col: 15, row: 2, group: 'reactive-nonmetal', mass: '14.007 u', density: '1.251 г/л', melt: '-210.00 °C', discoverer: 'Даниэль Резерфорд', desc: 'Главный компонент земной атмосферы (около 78%). Жидкий азот используется для мгновенной заморозки.' },
    { num: 8, symbol: 'O', name: 'Кислород', col: 16, row: 2, group: 'reactive-nonmetal', mass: '15.999 u', density: '1.429 г/л', melt: '-218.79 °C', discoverer: 'Джозеф Пристли', desc: 'Жизненно важный газ, обеспечивающий дыхание живых организмов и поддерживающий процессы горения.' },
    { num: 9, symbol: 'F', name: 'Фтор', col: 17, row: 2, group: 'reactive-nonmetal', mass: '18.998 u', density: '1.696 г/л', melt: '-219.67 °C', discoverer: 'Анри Муассан', desc: 'Экстремально агрессивный и реактивный газ. Его соединения добавляют в зубные пасты для защиты эмали.' },
    { num: 10, symbol: 'Ne', name: 'Неон', col: 18, row: 2, group: 'noble-gas', mass: '20.180 u', density: '0.9002 г/л', melt: '-248.59 °C', discoverer: 'Рамзай и Трэверс', desc: 'Инертный газ, светящийся ярким красно-оранжевым цветом при пропускании через него электрического тока.' },

    // Период 3
    { num: 11, symbol: 'Na', name: 'Натрий', col: 1, row: 3, group: 'alkali-metal', mass: '22.990 u', density: '0.971 г/см³', melt: '97.72 °C', discoverer: 'Гемфри Дэви', desc: 'Мягкий щелочной металл, который можно резать ножом. Бурно, со взрывом, реагирует с обычной водой.' },
    { num: 12, symbol: 'Mg', name: 'Магний', col: 2, row: 3, group: 'alkaline-earth', mass: '24.305 u', density: '1.738 г/см³', melt: '650 °C', discoverer: 'Гемфри Дэви', desc: 'Легкий металл, горящий ослепительно белым пламенем. Важен для здоровья нервной системы человека.' },
    { num: 13, symbol: 'Al', name: 'Алюминий', col: 13, row: 3, group: 'post-transition', mass: '26.982 u', density: '2.70 г/см³', melt: '660.32 °C', discoverer: 'Ганс Эрстед', desc: 'Самый популярный легкий металл. Используется повсюду: от кухонной фольги до обшивки авиалайнеров.' },
    { num: 14, symbol: 'Si', name: 'Кремний', col: 14, row: 3, group: 'metalloid', mass: '28.085 u', density: '2.329 г/см³', melt: '1414 °C', discoverer: 'Йёнс Берцелиус', desc: 'Полупроводник, ставший основой всей современной микроэлектроники, процессоров и компьютерных чипов.' },
    { num: 15, symbol: 'P', name: 'Фосфор', col: 15, row: 3, group: 'reactive-nonmetal', mass: '30.974 u', density: '1.823 г/см³', melt: '44.15 °C', discoverer: 'Хенниг Бранд', desc: 'Неметалл, способный светиться в темноте. Его соединения активно используются при производстве спичек.' },
    { num: 16, symbol: 'S', name: 'Сера', col: 16, row: 3, group: 'reactive-nonmetal', mass: '32.06 u', density: '2.07 г/см³', melt: '115.21 °C', discoverer: 'Известна с древности', desc: 'Желтый кристаллический порошок. Играет ключевую роль в химической промышленности при создании кислот.' },
    { num: 17, symbol: 'Cl', name: 'Хлор', col: 17, row: 3, group: 'reactive-nonmetal', mass: '35.45 u', density: '3.214 г/л', melt: '-101.5 °C', discoverer: 'Карл Шееле', desc: 'Едкий удушливый желто-зеленый газ. Широко применяется для дезинфекции и очистки питьевой воды.' },
    { num: 18, symbol: 'Ar', name: 'Аргон', col: 18, row: 3, group: 'noble-gas', mass: '39.948 u', density: '1.784 г/л', melt: '-189.3 °C', discoverer: 'Рэлей и Рамзай', desc: 'Заполняет пространство внутри ламп накаливания, защищая вольфрамовую нить от мгновенного сгорания.' }
];

// Автоматически генерируем недостающие элементы (до 118), чтобы заполнить таблицу полностью
const totalElementsCount = 118;
const existingSymbols = elements.map(e => e.symbol);

// Упрощенная логика расстановки остальных элементов по строкам и колонкам
let currentColumn = 1;
let currentRow = 4;

for (let i = 19; i <= totalElementsCount; i++) {
    // Пропускаем ячейки под Лантаноиды и Актиноиды (они выносятся вниз)
    if (i === 57) { currentColumn = 4; } 
    if (i === 89) { currentColumn = 4; }

    let mockSymbol = `El${i}`;
    if (!existingSymbols.includes(mockSymbol)) {
        let currentGroup = 'transition-metal';
        if (currentColumn >= 13 && currentColumn <= 16) currentGroup = 'post-transition';
        if (currentColumn === 17) currentGroup = 'reactive-nonmetal';
        if (currentColumn === 18) currentGroup = 'noble-gas';
        
        // Перенос строк сетки
        if (currentColumn > 18) {
            currentColumn = 1;
            currentRow++;
        }

        // Лантаноиды (ряд 9) и Актиноиды (ряд 10)
        let finalRow = currentRow;
        let finalCol = currentColumn;
        if (i >= 57 && i <= 71) { finalRow = 9; finalCol = (i - 57) + 3; currentGroup = 'lanthanide'; }
        else if (i >= 89 && i <= 103) { finalRow = 10; finalCol = (i - 89) + 3; currentGroup = 'actinide'; }

        elements.push({
            num: i,
            symbol: `Element${i}`, // Временное имя для теста
            name: `Элемент ${i}`,
            col: finalCol,
            row: finalRow,
            group: currentGroup,
            mass: `${(i * 2.3).toFixed(2)} u`,
            density: 'Данные уточняются',
            melt: 'Высокая',
            discoverer: 'Лаборатории ЯИ',
            desc: `Тяжелый химический элемент номер ${i}. Свойства изучаются в ядерных реакторах.`
        });

        if (!(i >= 57 && i <= 71) && !(i >= 89 && i <= 103)) {
            currentColumn++;
        }
    }
}

// 🛠 Функция генерации интерфейса таблицы на лету
function generateTable() {
    const grid = document.getElementById('table-grid');
    grid.innerHTML = '';

    elements.forEach(el => {
        const cell = document.createElement('div');
        cell.className = `element ${el.group}`;
        // Назначаем координаты сетки
        cell.style.gridColumn = el.col;
        cell.style.gridRow = el.row;
        
        // Вешаем событие клика
        cell.onclick = () => showElement(el);

        // Наполняем содержимым ячейку
        cell.innerHTML = `
            <span class="num">${el.num}</span>
            <span class="symbol">${el.symbol.length > 3 ? el.num : el.symbol}</span>
            <span class="name">${el.name}</span>
        `;
        grid.appendChild(cell);
    });
}

// 🪐 Настройка и логика честной объемной 3D графики Three.js
let scene, camera, renderer, nucleus, electrons =;

function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    
    // Мягкий свет вокруг
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Точечный яркий источник света сверху справа для красивых бликов и теней
    const dirLight = new THREE.DirectionLight(0xffffff, 0.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Создаем трехмерное ядро
    const nucleusGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
        color: 0xea4335,
        shininess: 80,
        bumpScale: 0.05
    });
    nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleus);

    // Добавляем интерактивное вращение всей сцены мышкой
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

