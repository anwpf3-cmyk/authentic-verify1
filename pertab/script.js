// База данных элементов на русском языке
const elementsData = {
    'H': {
        name: 'Водород',
        category: 'Активный неметалл',
        desc: 'Самый простой и распространенный химический элемент во Вселенной. Из него в основном состоят звезды.',
        mass: '1.008 u',
        density: '0.07099 г/см³',
        melt: '-259.16 °C',
        discoverer: 'Генри Кавендиш (1766 г.)'
    },
    'He': {
        name: 'Гелий',
        category: 'Благородный газ',
        desc: 'Бесцветный газ без запаха и вкуса. Второй по распространенности элемент во Вселенной. Не вступает в реакции.',
        mass: '4.0026 u',
        density: '0.1785 г/л',
        melt: '-272.2 °C',
        discoverer: 'Жансен и Локьер (1868 г.)'
    },
    'Li': {
        name: 'Литий',
        category: 'Щелочной металл',
        desc: 'Мягкий серебристо-белый металл. Самый легкий твердый элемент. Активно используется в аккумуляторах.',
        mass: '6.94 u',
        density: '0.534 г/см³',
        melt: '180.54 °C',
        discoverer: 'Юхан Арфведсон (1817 г.)'
    },
    'Be': {
        name: 'Бериллий',
        category: 'Щелочноземельный металл',
        desc: 'Относительно твердый, легкий металл светло-серого цвета. Очень токсичен в виде пыли.',
        mass: '9.0122 u',
        density: '1.85 г/см³',
        melt: '1287 °C',
        discoverer: 'Луи Воклен (1798 г.)'
    },
    'C': {
        name: 'Углерод',
        category: 'Активный неметалл',
        desc: 'Основа органической жизни на Земле. Может существовать как в виде мягкого графита, так и в виде сверхтвердого алмаза.',
        mass: '12.011 u',
        density: '2.267 г/см³',
        melt: '3550 °C',
        discoverer: 'Известен с древности'
    },
    'O': {
        name: 'Кислород',
        category: 'Активный неметалл',
        desc: 'Газ, необходимый для дыхания большинства живых организмов. Составляет около 21% объема воздуха Земли.',
        mass: '15.999 u',
        density: '1.429 г/л',
        melt: '-218.79 °C',
        discoverer: 'Джозеф Пристли (1774 г.)'
    }
};

// Функция, которая срабатывает при клике на элемент
function showElement(symbol) {
    const data = elementsData[symbol];
    
    if (data) {
        // Скрываем стартовый текст и показываем панель
        document.getElementById('welcome-text').classList.add('hidden');
        document.getElementById('details-panel').classList.remove('hidden');
        
        // Подставляем данные в текстовые поля
        document.getElementById('el-full-name').innerText = `${data.name} (${symbol})`;
        document.getElementById('el-category').innerText = data.category;
        document.getElementById('el-desc').innerText = data.desc;
        document.getElementById('el-mass').innerText = data.mass;
        document.getElementById('el-density').innerText = data.density;
        document.getElementById('el-melt').innerText = data.melt;
        document.getElementById('el-discoverer').innerText = data.discoverer;
    }
}
