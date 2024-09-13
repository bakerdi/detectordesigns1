let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.querySelector('.progress');
const progressIndicator = document.querySelector('.progress-indicator');
const slider = document.querySelector('.slider');
const totalSlides = slides.length;
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const scrollBtn = document.querySelector('.scroll-btn');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const scrollRing = document.querySelector('.scroll-ring');
const body = document.body;

// تحديث شريط التقدم
function updateProgressBar() {
    const progressPercent = ((slideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const indicatorPosition = (slideIndex / (totalSlides - 1)) * 100;
    progressIndicator.style.left = `${indicatorPosition}%`;
}

// عرض الشريحة التالية
function showNextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;

    updateProgressBar();
}

// عرض الشريحة السابقة
function showPrevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;

    updateProgressBar();
}

// التعامل مع أحداث السحب
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    slider.style.transition = 'none'; // إزالة الانتقال أثناء السحب
}

function handleTouchEnd() {
    if (isDragging) {
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease'; // استعادة الانتقال بعد السحب

        const slideWidth = slider.clientWidth;
        const index = Math.round(-currentTranslate / slideWidth);
        slideIndex = Math.max(0, Math.min(index, totalSlides - 1));

        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        prevTranslate = -slideIndex * slideWidth;

        updateProgressBar();
    }
}

function handleTouchMove(e) {
    if (isDragging) {
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        currentTranslate = prevTranslate + diffX;
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
}

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchend', handleTouchEnd);
slider.addEventListener('touchmove', handleTouchMove);

// التحكم بالأزرار
nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

// تغيير الصورة تلقائيًا كل 3 ثوانٍ
setInterval(showNextSlide, 3000);

// تحديث شريط التقدم عند التحميل
updateProgressBar();

// التمرير للأعلى عند الضغط على الزر
scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// تحديث حلقة التمرير بناءً على التمرير
document.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollRing.style.transform = `scale(${scrolled / 100})`;
});

// إعداد قائمة العملات المنسدلة وتحديث العلم
document.addEventListener('DOMContentLoaded', function() {
  const currencySelector = document.querySelector('.currency-selector');
  const selectedCurrency = document.querySelector('.selected-currency');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownItems = document.querySelectorAll('.dropdown-menu li');

  // فتح/إغلاق القائمة المنسدلة عند النقر على منطقة الاختيار
  currencySelector.addEventListener('click', function() {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // تحديث العملة المختارة عند النقر على عنصر في القائمة المنسدلة
  dropdownItems.forEach(function(item) {
      item.addEventListener('click', function() {
          const newCurrency = item.getAttribute('data-currency');
          const newFlag = item.getAttribute('data-flag');

          // تحديث النص والصورة في العنصر المختار
          selectedCurrency.querySelector('.currency').textContent = newCurrency;
          selectedCurrency.querySelector('.flag').src = newFlag;

          // إغلاق القائمة المنسدلة بعد الاختيار
          dropdownMenu.style.display = 'none';
      });
  });

  // إغلاق القائمة المنسدلة عند النقر خارجها
  document.addEventListener('click', function(e) {
      if (!currencySelector.contains(e.target)) {
          dropdownMenu.style.display = 'none';
      }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const languageSelector = document.querySelector('.language-selector');

  languageSelector.addEventListener('click', function() {
      const currentLang = languageSelector.getAttribute('lang');
      
      if (currentLang === 'fr') {
          languageSelector.setAttribute('lang', 'ar');
          languageSelector.querySelector('.language').textContent = 'العربية';
          languageSelector.querySelector('.flag').src = 'img/lang/ar.png';
          document.documentElement.lang = 'ar'; // تغيير لغة الصفحة إلى العربية
      } else {
          languageSelector.setAttribute('lang', 'fr');
          languageSelector.querySelector('.language').textContent = 'Français';
          languageSelector.querySelector('.flag').src = 'img/lang/fr.png';
          document.documentElement.lang = 'fr'; // تغيير لغة الصفحة إلى الفرنسية
      }
  });
});

    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'fr', // لغة الموقع الأصلية (الفرنسية)
            includedLanguages: 'ar,fr', // اللغات المتاحة (العربية والفرنسية)
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE // تصميم بسيط لواجهة الترجمة
        }, 'google_translate_element');
    }
