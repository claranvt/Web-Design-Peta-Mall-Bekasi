// Saat ini tidak ada interaksi JS berdasarkan gambar yang diberikan.
// Jika ada fungsionalitas seperti klik tombol Explore atau navigasi dinamis, berikut contoh penanganan sederhana:

document.querySelector('.btn-explore').addEventListener('click', function() {
    alert('Explore button clicked! Navigate to the map or next section.');
});

// Jika Anda ingin menambahkan fungsionalitas tambahan, tambahkan kode di sini.


    // Smooth scroll on navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElem = document.getElementById(targetId);
        if(targetElem) {
          targetElem.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update focus for accessibility after scroll
          setTimeout(() => {
            targetElem.focus({preventScroll:true});
          }, 500);
        }
      });
    });

    const exploreBtn = document.getElementById('explore-btn');
    exploreBtn.addEventListener('click', () => {
      // Smooth scroll to Map / Shopping banner section
      const mapSection = document.getElementById('shopping-banner');
      mapSection.scrollIntoView({behavior: 'smooth', block: 'start'});
      mapSection.focus({ preventScroll: true });
    });
  



// RATING & REVIEW LOGIC
  const stars = document.querySelectorAll('.rating-input .star');
  const commentInput = document.getElementById('comment');
  const submitBtn = document.getElementById('submitReview');
  const reviewsList = document.getElementById('reviewsList');

  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      highlightStars(star.dataset.value);
    });
    star.addEventListener('mouseout', () => {
      highlightStars(selectedRating);
    });
    star.addEventListener('click', () => {
      selectedRating = star.dataset.value;
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      star.classList.toggle('selected', star.dataset.value <= rating);
      star.classList.toggle('hover', star.dataset.value <= rating);
    });
  }

  // Load reviews from localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  renderReviews();

  submitBtn.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (selectedRating === 0) {
      alert('Silakan pilih rating bintang.');
      return;
    }
    if (comment.length < 5) {
      alert('Tulis ulasan minimal 5 karakter.');
      return;
    }
    const newReview = {
      rating: selectedRating,
      comment,
      date: new Date().toLocaleString()
    };
    reviews.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
    // Reset form
    selectedRating = 0;
    highlightStars(0);
    commentInput.value = '';
  });

  function renderReviews() {
    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p>Belum ada ulasan. Jadilah yang pertama!</p>';
      return;
    }
    reviewsList.innerHTML = '';
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.classList.add('review-item');
      div.innerHTML = `
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <div class="review-comment">${escapeHtml(r.comment)}</div>
        <small style="color:#666;">${r.date}</small>
      `;
      reviewsList.appendChild(div);
    });
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ARTICLE MODAL LOGIC
  const articlesData = {
    1: {
      title: "5 Tips Berbelanja Hemat di Mall Bekasi",
      image: "https://picsum.photos/700/400?random=11",
      content: "Pelajari cara mendapatkan diskon dan promo terbaik saat berbelanja di mall Bekasi. Mulai dari memanfaatkan kartu member, mengikuti event promo, hingga memilih waktu yang tepat untuk berbelanja."
    },
    2: {
      title: "Event Seru di Mall Bekasi Bulan Ini",
      image: "https://picsum.photos/700/400?random=12",
      content: "Jangan lewatkan event menarik dan hiburan yang diadakan di mall Bekasi bulan ini. Ada konser musik, bazar kuliner, dan berbagai aktivitas seru lainnya untuk keluarga."
    },
    3: {
      title: "Restoran Favorit di Mall Bekasi",
      image: "https://picsum.photos/700/400?random=13",
      content: "Temukan tempat makan terbaik dan rekomendasi kuliner di mall Bekasi. Mulai dari makanan lokal hingga internasional, semua ada di sini."
    }
  };

  const modal = document.getElementById('articleModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = modal.querySelector('.close-btn');

  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const articleId = e.target.closest('.article-card').dataset.id;
      const data = articlesData[articleId];
      if (data) {
        modalTitle.textContent = data.title;
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalContent.textContent = data.content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // disable scroll
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close modal on outside click
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });