const ui = {
  player: document.querySelector('#player'),
  cardContent: document.querySelector('#cardContent'),
  result: document.querySelector('#result'),
  reload: document.querySelector('#reload'),
}
 
const defaultPhoto = '/card.png';
let selectIndex = '';
let shuffleItems = [];

const items = [
  {
      photo: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRJyP_C2LcT1wwrFmQGl-voYUVj__tXKDSebQp6VW8kQxELcLKIXrFa86XpVYI0xL5OvD0nFDGuTjq5YBQ',
      name:'Messi'
  },
  {
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s',
      name:'Ronaldo'
  },
  {
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Bra-Cos_%281%29.jpg/800px-Bra-Cos_%281%29.jpg',
      name:'Neymar'
  },
  {
      photo: 'https://assets.goal.com/images/v3/bltde1b5888be594cca/3e947186d512164cf8dbe0987a865dd2b714eea6.png?auto=webp&format=pjpg&width=3840&quality=60',
      name:'Beckham'
  },
  {
      photo: 'https://www.usatoday.com/gcdn/-mm-/0a015f5e27f7d4ab57db1c374b7efdca09c64fee/c=0-27-727-996/local/-/media/2018/01/17/USATODAY/USATODAY/636518268389723579-AFP-AFP-WY4L3-96648265.JPG?width=660&height=880&fit=crop&format=pjpg&auto=webp',
      name:'Ronaldinho'
  },
  {
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Antoine_Griezmann_in_2017_%28cropped%29.jpg/1367px-Antoine_Griezmann_in_2017_%28cropped%29.jpg',
      name:'Grizmann'
  },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const randomIndex = () => {
  return Math.floor(Math.random() * 6);
};

const selectPlayer = () => {
  return items[randomIndex()];
};

const cardTemplate = (index) => {
  return `
  <div data-index="${index}" class="border animate__animated cursor-pointer border-2 h-[207px] cursor-pointer rounded-lg overflow-hidden">
      <img src="./card.png" class=" size-full object-cover" alt="card">
  </div>
  `;
};

const createUI = () => {
  ui.cardContent.innerHTML = '';
  shuffleItems = shuffle(items);  // Kartları qarışdırmaq

  // Rastgələ  oyunçu seçmək
  const player = selectPlayer();
  
  // Seçilən oyunçunun qarşılaşdırılmış siradaki indeksini tapmaq
  selectIndex = shuffleItems.findIndex(item => item.name === player.name);
  ui.player.textContent = player.name;  // Seçilən oyunçunun adını göstermək

  // Kartları göstərmək
  for (let index in shuffleItems) {
      ui.cardContent.innerHTML += cardTemplate(index);
  }
};

const disabledCard = () => {
  for (let el of ui.cardContent.children) {
      el.style.pointerEvents = 'none';
  }
};

ui.cardContent.addEventListener('click', function (e) {
  const obj = e.target.closest('[data-index]') ? e.target.closest('[data-index]') : e.target;
  if (obj.dataset.index) {
      const index = obj.dataset.index;
      const photo = obj.querySelector('img');
      const player = shuffleItems[index];
      photo.src = player.photo;  // Kartdaki  şəkli göstərmək

      obj.classList.add('animate__flipInY');  // çevirmək animasiyası

      if (parseInt(index) === selectIndex) {
          // Düz kart seçiləndə
          disabledCard();  // digər kartları tıklamaq olmasin 
          ui.result.textContent = 'Tebrikler!';
          ui.reload.classList.remove('hidden');  // Yeniden başla butonunu göstərmək
      } else {
          ui.result.textContent = 'Sehv secim, bir daha yoxla :)';
      }
  }
});

ui.reload.addEventListener('click', () => {
  window.location.reload();  // Səyfəni yenidən yükləmək
});

createUI(); 
