//画像lazy
if ("loading" in HTMLImageElement.prototype) {
  var images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(function (img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    if(img.dataset.srcset){
      img.srcset = img.dataset.srcset;
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
  var sources = document.querySelectorAll("img[data-src], source[data-srcset]");
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var target = entry.target;

        // imgタグの場合
        if (target.tagName === "IMG") {
          if (target.dataset.src) {
            target.src = target.dataset.src;
          }
          if (target.dataset.srcset) {
            target.srcset = target.dataset.srcset;
          }
        }
        
        // sourceタグの場合
        if (target.tagName === "SOURCE") {
          if (target.dataset.srcset) {
            target.srcset = target.dataset.srcset;
          }
        }
        observer.unobserve(target); // ターゲットの監視を停止する
      }
    });
  });

  sources.forEach(function (source) {
    observer.observe(source); // ターゲットを監視する
  });
});

// スムーススクロール
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      const headerHeight = header.offsetHeight;
      if (href === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      const target = document.getElementById(href.replace('#', ''));
      const basePosition = target.getBoundingClientRect().top + window.scrollY;
      const targetPosition = basePosition - headerHeight;
      window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
      });
    });
  });

  
  const header = document.querySelector('header');
  // ページ外スクロール
  window.addEventListener('DOMContentLoaded', function(){
    const url = new URL(location.href);
    const hash = url.hash.slice(1);
    const target = document.getElementById(hash);
    const headerHeight = header.offsetHeight;
    console.log(hash);
    if (target) {
      if (hash === 'trial') {
        const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 100);
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      }
      setTimeout(function(){
        window.scrollTo({top: 0}, 0);
      });
      setTimeout(function(){
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('link[rel="preload"][as="style"]');

  links.forEach(function (link) {
    link.onload = function () {
      this.onload = null;
      this.rel = 'stylesheet';
    };
  });
});

const fixMenu = document.querySelector('.fix-menu');
const hBtn = document.querySelector('.hbtn');

hBtn.addEventListener('click', () => {
  hBtn.classList.toggle('active');
  fixMenu.classList.toggle('active');
});