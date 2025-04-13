document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });
  const courseData = [
    {
      id: "PHY101",
      name: "Thiết kế web",
      teacher: "Mạnh Đức",
      room: "Phòng LAB",
      fee: 1200000,
      icon: "fas fa-atom",
    },
    {
      id: "CHM101",
      name: "AVCBAVCB",
      teacher: "Thùy Linh",
      room: "Phòng Lab 3",
      fee: 1500000,
      icon: "fas fa-flask",
    },
    {
      id: "MTH101",
      name: "Quốc Phòng",
      teacher: "Đức Thanh",
      room: "Phòng 102",
      fee: 1000000,
      icon: "fas fa-square-root-alt",
    },
    {
      id: "ENG101",
      name: "Tiếng Anh",
      teacher: "Phạm Thị D",
      room: "Phòng 305",
      fee: 1800000,
      icon: "fas fa-language",
    },
    {
      id: "LIT101",
      name: "Ngữ Văn",
      teacher: "Hoàng Văn E",
      room: "Phòng 203",
      fee: 900000,
      icon: "fas fa-book",
    },
    {
      id: "PE101",
      name: "Thể Dục",
      teacher: "Vũ Thị F",
      room: "Sân trường",
      fee: 700000,
      icon: "fas fa-dumbbell",
    },
    {
      id: "BIO101",
      name: "Sinh Học",
      teacher: "Đỗ Văn G",
      room: "Phòng Lab 1",
      fee: 1300000,
      icon: "fas fa-dna",
    },
    {
      id: "HIS101",
      name: "Lịch Sử",
      teacher: "Lý Thị H",
      room: "Phòng 105",
      fee: 800000,
      icon: "fas fa-landmark",
    },
  ];

  let selectedCourses = [];
  let totalAmount = 0;
  const classSelect = document.getElementById("class-select");
  const loadCoursesBtn = document.getElementById("load-courses");
  const coursesTableBody = document.getElementById("courses-tbody");
  const totalCoursesEl = document.getElementById("total-courses");
  const selectedCoursesEl = document.getElementById("selected-courses");
  const totalAmountEl = document.getElementById("total-amount");
  const selectAllCheckbox = document.getElementById("select-all");
  const nextToPaymentBtn = document.getElementById("next-to-payment");
  const backToCoursesBtn = document.getElementById("back-to-courses");
  const proceedToConfirmBtn = document.getElementById("proceed-to-confirm");
  const backToPaymentInfoBtn = document.getElementById("back-to-payment-info");
  const completePaymentBtn = document.getElementById("complete-payment");
  const termsCheckbox = document.getElementById("terms-checkbox");
  const receiptModal = document.getElementById("receipt-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const paymentTabs = document.querySelectorAll(".payment-tabs .tab");
  const paymentSteps = document.querySelectorAll(".payment-step");
  const studentIdInput = document.getElementById("student-id");
  const semesterSelect = document.getElementById("semester-select");
  const printReceiptBtn = document.getElementById("print-receipt");
  const downloadReceiptBtn = document.getElementById("download-receipt");
  function init() {
    loadHistory();
    setupEventListeners();
    loadCourses();
  }
  function setupEventListeners() {
    selectAllCheckbox.addEventListener("change", toggleSelectAll);
    nextToPaymentBtn.addEventListener("click", goToPaymentInfo);
    backToCoursesBtn.addEventListener("click", goToSelectCourses);
    proceedToConfirmBtn.addEventListener("click", goToConfirmation);
    backToPaymentInfoBtn.addEventListener("click", goToPaymentInfo);
    completePaymentBtn.addEventListener("click", completePayment);
    closeModalBtn.addEventListener("click", closeModal);
    printReceiptBtn.addEventListener("click", printReceipt);
    downloadReceiptBtn.addEventListener("click", downloadReceipt);
    paymentMethods.forEach((method) => {
      method.addEventListener("click", selectPaymentMethod);
    });
    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const targetTab = this.getAttribute("data-tab");
        if (
          (targetTab === "payment-info" && selectedCourses.length > 0) ||
          (targetTab === "confirmation" && validatePaymentInfo())
        ) {
          activateTab(targetTab);
        } else if (targetTab === "select-courses") {
          activateTab(targetTab);
        }
      });
    });
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        filterHistory(this.getAttribute("data-filter"));
      });
    });
    const searchInput = document.getElementById("search-history");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        searchHistory(this.value);
      });
    }
  }
  function loadCourses() {
    const studentId = studentIdInput.value.trim();
    const selectedClass = classSelect.value;
    const selectedSemester = semesterSelect.value;

    if (!studentId) {
      alert("Vui lòng nhập mã học sinh");
      return;
    }
    const transferCode = `HP.${selectedClass}.${studentId}`;
    const transferCodeElement = document.getElementById("transfer-code");
    if (transferCodeElement) {
      transferCodeElement.textContent = transferCode;
    }
    const courseCheckboxes = document.querySelectorAll(".course-checkbox");
    courseCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelection);
    });
    totalCoursesEl.textContent = courseData.length;
    updateSelection();
  }
  function populateCourseTable(courses) {
    coursesTableBody.innerHTML = "";
    selectedCourses = [];

    courses.forEach((course) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="checkbox-col">
          <input type="checkbox" class="course-checkbox" data-id="${
            course.id
          }" data-fee="${course.fee}">
        </td>
        <td>
          <div class="course-name">
            <i class="${course.icon}"></i>
            ${course.name}
          </div>
        </td>
        <td>${course.id}</td>
        <td>${course.teacher}</td>
        <td>${formatCurrency(course.fee)}</td>
      `;
      coursesTableBody.appendChild(row);
    });
    const courseCheckboxes = document.querySelectorAll(".course-checkbox");
    courseCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelection);
    });

    totalCoursesEl.textContent = courses.length;
  }
  function updateSelection() {
    selectedCourses = [];
    totalAmount = 0;

    const courseCheckboxes = document.querySelectorAll(".course-checkbox");

    courseCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const courseId = checkbox.getAttribute("data-id");
        const courseFee = parseInt(checkbox.getAttribute("data-fee"));
        const course = courseData.find((c) => c.id === courseId);
        if (course) {
          selectedCourses.push({
            id: courseId,
            name: course.name,
            fee: courseFee,
            teacher: course.teacher,
          });

          totalAmount += courseFee;
        }
      }
    });

    updateSummary();
    selectAllCheckbox.checked =
      courseCheckboxes.length > 0 &&
      selectedCourses.length === courseCheckboxes.length;
  }
  function toggleSelectAll() {
    const courseCheckboxes = document.querySelectorAll(".course-checkbox");

    courseCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });

    updateSelection();
  }
  function updateSummary() {
    selectedCoursesEl.textContent = selectedCourses.length;
    totalAmountEl.textContent = formatCurrency(totalAmount);
    if (selectedCourses.length > 0) {
      nextToPaymentBtn.removeAttribute("disabled");
      nextToPaymentBtn.classList.remove("disabled");
    } else {
      nextToPaymentBtn.setAttribute("disabled", true);
      nextToPaymentBtn.classList.add("disabled");
    }
  }
  function goToPaymentInfo() {
    if (selectedCourses.length === 0) {
      alert("Vui lòng chọn ít nhất một môn học");
      return;
    }

    activateTab("payment-info");
  }
  function goToSelectCourses() {
    activateTab("select-courses");
  }
  function goToConfirmation() {
    if (!validatePaymentInfo()) {
      return;
    }
    const payerName = document.getElementById("payer-name").value;
    const payerEmail = document.getElementById("payer-email").value;
    const payerPhone = document.getElementById("payer-phone").value;
    const activeMethod = document.querySelector(".payment-method.active");
    const paymentMethod = activeMethod
      ? activeMethod.getAttribute("data-method")
      : null;
    document.getElementById("confirm-student-id").textContent =
      studentIdInput.value;
    document.getElementById("confirm-class").textContent = classSelect.value;
    document.getElementById("confirm-semester").textContent =
      document.getElementById("semester-select").options[
        semesterSelect.selectedIndex
      ].text;
    document.getElementById("confirm-payer-name").textContent = payerName;
    document.getElementById("confirm-payer-email").textContent = payerEmail;
    document.getElementById("confirm-payer-phone").textContent = payerPhone;
    document.getElementById("confirm-payment-method").textContent =
      getPaymentMethodName(paymentMethod);
    document.getElementById("confirm-total-amount").textContent =
      formatCurrency(totalAmount);
    const coursesListElement = document.getElementById("confirm-courses-list");
    coursesListElement.innerHTML = "";

    selectedCourses.forEach((course) => {
      const courseItem = document.createElement("div");
      courseItem.className = "confirm-course-item";
      courseItem.innerHTML = `
        <span>${course.name} (${course.id})</span>
        <span>${formatCurrency(course.fee)}</span>
      `;
      coursesListElement.appendChild(courseItem);
    });

    activateTab("confirmation");
  }
  function validatePaymentInfo() {
    const payerName = document.getElementById("payer-name").value.trim();
    const payerEmail = document.getElementById("payer-email").value.trim();
    const payerPhone = document.getElementById("payer-phone").value.trim();

    if (!payerName) {
      alert("Vui lòng nhập tên người thanh toán");
      return false;
    }

    if (!payerEmail) {
      alert("Vui lòng nhập địa chỉ email");
      return false;
    }

    if (!isValidEmail(payerEmail)) {
      alert("Vui lòng nhập đúng định dạng email");
      return false;
    }

    if (!payerPhone) {
      alert("Vui lòng nhập số điện thoại");
      return false;
    }
    const activeMethod = document.querySelector(".payment-method.active");
    const paymentMethod = activeMethod
      ? activeMethod.getAttribute("data-method")
      : null;

    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    if (paymentMethod === "credit-card") {
      const cardNumber = document.getElementById("card-number").value.trim();
      const cardExpiry = document.getElementById("card-expiry").value.trim();
      const cardCvv = document.getElementById("card-cvv").value.trim();
      const cardName = document.getElementById("card-name").value.trim();

      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert("Vui lòng nhập đầy đủ thông tin thẻ");
        return false;
      }
    } else if (paymentMethod === "bank-transfer") {
      const transferReceipt = document.getElementById("transfer-receipt");
      if (transferReceipt && transferReceipt.files.length === 0) {
        alert("Vui lòng tải lên biên lai chuyển khoản");
        return false;
      }
    }

    return true;
  }
  function completePayment() {
    if (!termsCheckbox.checked) {
      alert("Vui lòng đồng ý với các điều khoản và điều kiện");
      return;
    }
    completePaymentBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    completePaymentBtn.disabled = true;
    setTimeout(() => {
      const paymentId = "TT-" + Math.floor(100000 + Math.random() * 900000);
      const currentDate = new Date().toLocaleDateString("vi-VN");
      document.getElementById("receipt-id").textContent = paymentId;
      document.getElementById("receipt-date").textContent = currentDate;
      document.getElementById("receipt-student-id").textContent =
        studentIdInput.value;
      document.getElementById("receipt-class").textContent = classSelect.value;
      document.getElementById("receipt-semester").textContent =
        document.getElementById("semester-select").options[
          semesterSelect.selectedIndex
        ].text;
      document.getElementById("receipt-payer-name").textContent =
        document.getElementById("confirm-payer-name").textContent;
      document.getElementById("receipt-payment-method").textContent =
        document.getElementById("confirm-payment-method").textContent;
      document.getElementById("receipt-total").textContent =
        formatCurrency(totalAmount);
      const receiptCoursesBody = document.getElementById(
        "receipt-courses-body"
      );
      receiptCoursesBody.innerHTML = "";

      selectedCourses.forEach((course, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${course.name}</td>
          <td>${course.id}</td>
          <td>${formatCurrency(course.fee)}</td>
        `;
        receiptCoursesBody.appendChild(row);
      });
      savePaymentToHistory({
        id: paymentId,
        date: currentDate,
        studentId: studentIdInput.value,
        class: classSelect.value,
        semester:
          document.getElementById("semester-select").options[
            semesterSelect.selectedIndex
          ].text,
        courses: selectedCourses,
        totalAmount: totalAmount,
        payerName: document.getElementById("confirm-payer-name").textContent,
        paymentMethod: document.getElementById("confirm-payment-method")
          .textContent,
      });
      showReceiptModal();
      completePaymentBtn.innerHTML = "Hoàn tất thanh toán";
      completePaymentBtn.disabled = false;
    }, 2000);
  }
  function showReceiptModal() {
    receiptModal.style.display = "block";
  }
  function closeModal() {
    receiptModal.style.display = "none";
    resetForm();
  }
  function activateTab(tabId) {
    paymentTabs.forEach((tab) => {
      if (tab.getAttribute("data-tab") === tabId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
    paymentSteps.forEach((step) => {
      if (step.id === tabId) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
    const paymentContainer = document.querySelector(".payment-container");
    if (paymentContainer) {
      paymentContainer.scrollIntoView({ behavior: "smooth" });
    }
  }
  function selectPaymentMethod() {
    paymentMethods.forEach((method) => {
      method.classList.remove("active");
    });
    this.classList.add("active");
    const paymentDetails = document.querySelectorAll(".payment-details");
    paymentDetails.forEach((detail) => {
      detail.classList.add("hidden");
    });
    const method = this.getAttribute("data-method");
    const detailElement = document.getElementById(`${method}-details`);
    if (detailElement) {
      detailElement.classList.remove("hidden");
    }
  }
  function printReceipt() {
    const receiptElement = document.querySelector(".receipt");
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = receiptElement.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    init();
  }
  function downloadReceipt() {
    alert("Chức năng tải biên lai đang được phát triển");
  }
  function resetForm() {
    selectedCourses = [];
    totalAmount = 0;
    const courseCheckboxes = document.querySelectorAll(".course-checkbox");
    courseCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    updateSummary();
    const paymentForm = document.querySelector(".payment-form");
    if (paymentForm) {
      paymentForm.reset();
    }
    if (termsCheckbox) {
      termsCheckbox.checked = false;
    }
    activateTab("select-courses");
  }
  function savePaymentToHistory(payment) {
    let history = JSON.parse(localStorage.getItem("payment_history") || "[]");
    history.push(payment);
    localStorage.setItem("payment_history", JSON.stringify(history));
    loadHistory();
  }
  function loadHistory() {
    const historyTableBody = document.getElementById("history-tbody");
    if (!historyTableBody) return;

    let history = JSON.parse(localStorage.getItem("payment_history") || "[]");

    historyTableBody.innerHTML = "";

    if (history.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Chưa có lịch sử thanh toán</td>
        </tr>
      `;
      return;
    }

    history.forEach((payment, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.id}</td>
        <td>${payment.date}</td>
        <td>${payment.studentId}</td>
        <td>${payment.class}</td>
        <td>${formatCurrency(payment.totalAmount)}</td>
        <td>
          <button class="action-btn" data-index="${index}">
            <i class="fas fa-eye"></i> Xem
          </button>
        </td>
      `;
      historyTableBody.appendChild(row);
    });
    const viewButtons = historyTableBody.querySelectorAll(".action-btn");
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        viewHistoryReceipt(index);
      });
    });
  }
  function viewHistoryReceipt(index) {
    let history = JSON.parse(localStorage.getItem("payment_history") || "[]");
    const payment = history[index];
    if (!payment) return;
    document.getElementById("receipt-id").textContent = payment.id;
    document.getElementById("receipt-date").textContent = payment.date;
    document.getElementById("receipt-student-id").textContent =
      payment.studentId;
    document.getElementById("receipt-class").textContent = payment.class;
    document.getElementById("receipt-semester").textContent = payment.semester;
    document.getElementById("receipt-payer-name").textContent =
      payment.payerName;
    document.getElementById("receipt-payment-method").textContent =
      payment.paymentMethod;
    document.getElementById("receipt-total").textContent = formatCurrency(
      payment.totalAmount
    );
    const receiptCoursesBody = document.getElementById("receipt-courses-body");
    receiptCoursesBody.innerHTML = "";

    payment.courses.forEach((course, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${course.name}</td>
        <td>${course.id}</td>
        <td>${formatCurrency(course.fee)}</td>
      `;
      receiptCoursesBody.appendChild(row);
    });
    showReceiptModal();
  }
  function filterHistory(filter) {
    let history = JSON.parse(localStorage.getItem("payment_history") || "[]");
    const historyTableBody = document.getElementById("history-tbody");

    if (!historyTableBody) return;

    if (history.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Chưa có lịch sử thanh toán</td>
        </tr>
      `;
      return;
    }
    let filteredHistory = history;

    if (filter === "current-month") {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      filteredHistory = history.filter((payment) => {
        const paymentDate = new Date(
          payment.date.split("/").reverse().join("-")
        );
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      });
    } else if (filter === "current-semester") {
      const currentSemester =
        semesterSelect.options[semesterSelect.selectedIndex].text;
      filteredHistory = history.filter(
        (payment) => payment.semester === currentSemester
      );
    }
    historyTableBody.innerHTML = "";

    if (filteredHistory.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Không có kết quả phù hợp</td>
        </tr>
      `;
      return;
    }

    filteredHistory.forEach((payment, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.id}</td>
        <td>${payment.date}</td>
        <td>${payment.studentId}</td>
        <td>${payment.class}</td>
        <td>${formatCurrency(payment.totalAmount)}</td>
        <td>
          <button class="action-btn" data-index="${history.indexOf(payment)}">
            <i class="fas fa-eye"></i> Xem
          </button>
        </td>
      `;
      historyTableBody.appendChild(row);
    });
    const viewButtons = historyTableBody.querySelectorAll(".action-btn");
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        viewHistoryReceipt(index);
      });
    });
  }
  function searchHistory(query) {
    if (!query) {
      loadHistory();
      return;
    }

    query = query.toLowerCase();

    let history = JSON.parse(localStorage.getItem("payment_history") || "[]");
    const historyTableBody = document.getElementById("history-tbody");

    if (!historyTableBody) return;
    const filteredHistory = history.filter(
      (payment) =>
        payment.id.toLowerCase().includes(query) ||
        payment.studentId.toLowerCase().includes(query) ||
        payment.class.toLowerCase().includes(query)
    );
    historyTableBody.innerHTML = "";

    if (filteredHistory.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Không có kết quả phù hợp</td>
        </tr>
      `;
      return;
    }

    filteredHistory.forEach((payment, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.id}</td>
        <td>${payment.date}</td>
        <td>${payment.studentId}</td>
        <td>${payment.class}</td>
        <td>${formatCurrency(payment.totalAmount)}</td>
        <td>
          <button class="action-btn" data-index="${history.indexOf(payment)}">
            <i class="fas fa-eye"></i> Xem
          </button>
        </td>
      `;
      historyTableBody.appendChild(row);
    });
    const viewButtons = historyTableBody.querySelectorAll(".action-btn");
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        viewHistoryReceipt(index);
      });
    });
  }
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  }
  function getPaymentMethodName(method) {
    switch (method) {
      case "credit-card":
        return "Thẻ tín dụng/ghi nợ";
      case "bank-transfer":
        return "Chuyển khoản ngân hàng";
      case "e-wallet":
        return "Ví điện tử";
      default:
        return "Không xác định";
    }
  }
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function getSemesterType(semester) {
    return semester === "1" ? "Học kỳ I" : "Học kỳ II";
  }
  init();
});
