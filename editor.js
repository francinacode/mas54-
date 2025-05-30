const canvas = document.getElementById('canvas');
const sidebar = document.getElementById('sidebar');

// Insertar las 15 imágenes en el sidebar
for (let i = 1; i <= 15; i++) {
  const thumb = document.createElement('img');
  thumb.src = `images/img${i}.png`;
  thumb.dataset.imgId = i;
  thumb.draggable = true;

  // Evento dragstart para indicar qué imagen se está arrastrando
  thumb.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('imgId', i);
  });

  sidebar.appendChild(thumb);
}

// Hacer el canvas receptivo a drops
canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const imgId = e.dataTransfer.getData('imgId');
  if (!imgId) return;

  const container = document.createElement('div');
  container.className = 'object';
  container.style.left = `${e.clientX - canvas.offsetLeft}px`;
  container.style.top = `${e.clientY - canvas.offsetTop}px`;

  const img = document.createElement('img');
  img.src = `images/img${imgId}.png`;

  container.appendChild(img);
  canvas.appendChild(container);

  makeDraggableResizable(container);
});

function makeDraggableResizable(el) {
  el.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    let prevX = e.clientX;
    let prevY = e.clientY;

    function elementDrag(e) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      el.style.top = (el.offsetTop + dy) + "px";
      el.style.left = (el.offsetLeft + dx) + "px";
    }

    function stopDrag() {
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', stopDrag);
  }
}

// Fondo animado
const backgrounds = ['#E5235A', '#D9F411', '#3A3AFE', '#E5235A'];
let bgIndex = 0;
setInterval(() => {
  canvas.style.background = backgrounds[bgIndex];
  bgIndex = (bgIndex + 1) % backgrounds.length;
}, 2000);

// Prevenir menú contextual
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

function makeDraggableResizable(el) {
    // Movimiento
    el.addEventListener('mousedown', dragMouseDown);
  
    function dragMouseDown(e) {
      if (e.button !== 0 || e.target.classList.contains('resizer')) return;
      e.preventDefault();
      let prevX = e.clientX;
      let prevY = e.clientY;
  
      function elementDrag(e) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        el.style.top = (el.offsetTop + dy) + "px";
        el.style.left = (el.offsetLeft + dx) + "px";
      }
  
      function stopDrag() {
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', stopDrag);
      }
  
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', stopDrag);
    }
  
    // Redimensionar con la manija
    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    el.appendChild(resizer);
  
    resizer.addEventListener('mousedown', initResize);
  
    function initResize(e) {
      e.stopPropagation();
      e.preventDefault();
  
      let startX = e.clientX;
      let startY = e.clientY;
      let startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10);
      let startHeight = parseInt(document.defaultView.getComputedStyle(el).height, 10);
  
      function doResize(e) {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        el.style.width = newWidth + 'px';
        el.style.height = newHeight + 'px';
      }
  
      function stopResize() {
        document.removeEventListener('mousemove', doResize);
        document.removeEventListener('mouseup', stopResize);
      }
  
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    }

    
  }
  
