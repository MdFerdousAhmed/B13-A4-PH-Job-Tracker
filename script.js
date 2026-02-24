(function() {
      // Get references to key elements
      const jobsContainer = document.getElementById('allJobs');
      const emptyState = document.getElementById('emptyState');
      const totalEl = document.getElementById('total');
      const total1El = document.getElementById('total1');
      const interviewEl = document.getElementById('interview');
      const rejectedEl = document.getElementById('rejected');

      // Filter buttons
      const allBtn = document.getElementById('all-filter-btn');
      const interviewBtn = document.getElementById('interview-filter-btn');
      const rejectedBtn = document.getElementById('rejected-filter-btn');

      let currentFilter = 'all';

      let jobCards = document.querySelectorAll('#allJobs > div');

      // ---------- Helper Functions ----------
      function updateStats() {
        const total = jobCards.length;
        let interview = 0;
        let rejected = 0;

        jobCards.forEach(card => {
          const statusBtn = card.querySelector('#status');
          const status = statusBtn.textContent.trim();
          if (status === 'INTERVIEW') interview++;
          if (status === 'REJECTED') rejected++;
        });

        totalEl.textContent = total;
        total1El.innerHTML = `${total} <span>jobs</span>`;
        interviewEl.textContent = interview;
        rejectedEl.textContent = rejected;
      }

      function filterJobs(filter) {
        let visibleCount = 0;

        jobCards.forEach(card => {
          const statusBtn = card.querySelector('#status');
          const status = statusBtn.textContent.trim();

          if (filter === 'all') {
            card.style.display = 'flex';
            visibleCount++;
          } else if (filter === 'interview' && status === 'INTERVIEW') {
            card.style.display = 'flex';
            visibleCount++;
          } else if (filter === 'rejected' && status === 'REJECTED') {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Show/hide empty state
        if (visibleCount === 0) {
          emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
          jobsContainer.classList.add('hidden');
        } else {
          emptyState.classList.add('hidden');
          emptyState.classList.remove('flex');
          jobsContainer.classList.remove('hidden');
        }
      }

      function updateButtonStyles() {
        // Reset all buttons to default style
        allBtn.className = 'btn text-gray-400 px-8 py-3';
        interviewBtn.className = 'btn text-gray-400 px-8 py-3';
        rejectedBtn.className = 'btn text-gray-400 px-8 py-3';

        // Set active button style
        let activeBtn = allBtn;
        if (currentFilter === 'interview') activeBtn = interviewBtn;
        if (currentFilter === 'rejected') activeBtn = rejectedBtn;
        activeBtn.className = 'btn btn-info text-white px-8 py-3';
      }

      function refreshAndFilter() {
        jobCards = document.querySelectorAll('#allJobs > div');
        updateStats();
        filterJobs(currentFilter);
      }

      // ---------- Action Handlers ----------
      function changeStatus(card, newStatus) {
        const statusBtn = card.querySelector('#status');
        statusBtn.textContent = newStatus;
        // Update button class for styling
        if (newStatus === 'INTERVIEW') {
          statusBtn.className = 'btn btn-soft btn-success';
        } else if (newStatus === 'REJECTED') {
          statusBtn.className = 'btn btn-soft btn-error';
        } else {
          statusBtn.className = 'btn btn-soft btn-primary';
        }

        refreshAndFilter(); 
      }

      function deleteJob(card) {
        card.remove();
        refreshAndFilter(); 
      }

      // ---------- Event Handlers ----------
      function handleInterview(e) {
        e.preventDefault();
        const card = e.currentTarget.closest('#allJobs > div');
        if (card) changeStatus(card, 'INTERVIEW');
      }

      function handleRejected(e) {
        e.preventDefault();
        const card = e.currentTarget.closest('#allJobs > div');
        if (card) changeStatus(card, 'REJECTED');
      }

      function handleDelete(e) {
        e.preventDefault();
        const card = e.currentTarget.closest('#allJobs > div');
        if (card) deleteJob(card);
      }

      // Attach event listeners to all interactive elements
      function attachEventListeners() {
        // INTERVIEW buttons
        document.querySelectorAll('.interview-btn').forEach(btn => {
          btn.removeEventListener('click', handleInterview);
          btn.addEventListener('click', handleInterview);
        });

        // REJECTED buttons
        document.querySelectorAll('.rejected-btn').forEach(btn => {
          btn.removeEventListener('click', handleRejected);
          btn.addEventListener('click', handleRejected);
        });

        // Trash buttons (delete)
        document.querySelectorAll('.fa-trash-can').forEach(icon => {
          const deleteBtn = icon.closest('button');
          if (deleteBtn) {
            deleteBtn.removeEventListener('click', handleDelete);
            deleteBtn.addEventListener('click', handleDelete);
          }
        });
      }

      window.toggleStyle = function(buttonId) {
        if (buttonId === 'all-filter-btn') currentFilter = 'all';
        else if (buttonId === 'interview-filter-btn') currentFilter = 'interview';
        else if (buttonId === 'rejected-filter-btn') currentFilter = 'rejected';

        updateButtonStyles();
        filterJobs(currentFilter);
      };

      function init() {
        currentFilter = 'all';
        updateButtonStyles();
        refreshAndFilter();
        attachEventListeners();
      }

      // Run when page is fully loaded
      window.addEventListener('DOMContentLoaded', init);
    })();