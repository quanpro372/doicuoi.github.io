// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Modal functionality
  const modal = document.getElementById("exam-details-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const closeDetailsBtn = document.getElementById("close-details");
  const infoBtns = document.querySelectorAll(".info-btn");

  // Open modal when clicking on info buttons
  infoBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const examId = this.getAttribute("data-id");
      showExamDetails(examId);
      modal.style.display = "block";
    });
  });

  // Close modal when clicking on close buttons
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Print button functionality
  const printBtn = document.getElementById("print-schedule");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Download button functionality
  const downloadBtn = document.getElementById("download-schedule");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // Create a CSV content
      const table = document.querySelector(".exam-table");
      const rows = table.querySelectorAll("tr");

      let csvContent = "data:text/csv;charset=utf-8,";

      rows.forEach(function (row) {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];

        cols.forEach(function (col, index) {
          // Skip the last column (which contains the info button)
          if (index < cols.length - 1) {
            let text = col.innerText;
            // Handle cells with nested elements
            if (col.querySelector(".course-name")) {
              text = col.querySelector(".course-name").innerText.trim();
            }
            // Escape commas
            text = text.includes(",") ? `"${text}"` : text;
            rowData.push(text);
          }
        });

        csvContent += rowData.join(",") + "\r\n";
      });

      // Create a download link and trigger click
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "lich_thi.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Add Ripple Effect to Buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add Ripple CSS
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes rippleEffect {
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
    `;
  document.head.appendChild(rippleStyle);
});

// Show exam details in modal
function showExamDetails(examId) {
  // Get the detail elements
  const detailCode = document.getElementById("detail-code");
  const detailName = document.getElementById("detail-name");
  const detailTeacher = document.getElementById("detail-teacher");
  const detailFormat = document.getElementById("detail-format");
  const detailDuration = document.getElementById("detail-duration");
  const detailMaterials = document.getElementById("detail-materials");
  const detailTopics = document.getElementById("detail-topics");
  const detailNotes = document.getElementById("detail-notes");

  // Default values
  let name = "";
  let teacher = "Nguyễn Văn A";
  let format = "Trắc nghiệm";
  let duration = "120 phút";
  let materials = "Không được sử dụng tài liệu";
  let topics = "<p>Chi tiết nội dung ôn tập sẽ được hiển thị ở đây.</p>";
  let notes = "<p>Các lưu ý đặc biệt sẽ được hiển thị ở đây.</p>";

  // Update details based on exam ID
  switch (examId) {
    case "QP101":
      name = "Quốc phòng";
      teacher = "Nguyễn Văn An";
      topics =
        "<p>- Chương 1: Đường lối quốc phòng và an ninh của Đảng</p><p>- Chương 2: Công tác quốc phòng an ninh</p><p>- Chương 3: Quân sự chung</p>";
      notes =
        "<p>- Mang theo bút chì 2B và thẻ sinh viên</p><p>- Không được mang điện thoại vào phòng thi</p>";
      break;

    case "NET101":
      name = "Lập trình .NET C#";
      teacher = "Trần Bình";
      topics =
        "<p>- Cấu trúc ngôn ngữ C#</p><p>- Lập trình hướng đối tượng trong C#</p><p>- ASP.NET cơ bản</p><p>- Entity Framework</p>";
      materials = "Không được sử dụng tài liệu, không mang máy tính";
      break;

    case "IOT201":
      name = "Công nghệ IoT";
      teacher = "Lê Thị Hương";
      format = "Tiểu luận";
      duration = "Nộp trước 23:59 ngày 20/06/2023";
      topics =
        "<p>- Thiết kế hệ thống IoT cơ bản</p><p>- Ứng dụng IoT trong thực tế</p><p>- Các giao thức kết nối IoT</p>";
      materials = "Được sử dụng tài liệu tham khảo, ghi rõ nguồn";
      notes =
        "<p>- Nộp bản in và file mềm qua email</p><p>- Độ dài từ 10-15 trang A4</p><p>- Trình bày theo format đã hướng dẫn</p>";
      break;

    case "HCI101":
      name = "Tương tác người và máy";
      teacher = "Phạm Thị Mai";
      topics =
        "<p>- Nguyên lý thiết kế giao diện</p><p>- Đánh giá trải nghiệm người dùng</p><p>- Phương pháp nghiên cứu UX</p><p>- Thiết kế tương tác</p>";
      break;

    case "WEB102":
      name = "Thiết kế Web";
      teacher = "Hoàng Minh Tuấn";
      format = "Tiểu luận";
      duration = "Nộp trước 23:59 ngày 24/06/2023";
      topics =
        "<p>- HTML5 và CSS3</p><p>- Responsive Design</p><p>- JavaScript và Framework</p><p>- UX/UI cho website</p>";
      materials = "Được sử dụng tài liệu tham khảo, ghi rõ nguồn";
      notes =
        "<p>- Nộp bài trực tiếp trên hệ thống LMS</p><p>- Thiết kế ít nhất 3 trang web hoàn chỉnh</p><p>- Có tài liệu mô tả thiết kế</p>";
      break;

    case "AVCB101":
      name = "AVCB";
      teacher = "Sarah Johnson";
      topics =
        "<p>- Listening comprehension</p><p>- Reading skills</p><p>- Grammar and vocabulary</p><p>- Basic communication</p>";
      notes =
        "<p>- Mang theo tai nghe cho phần thi nghe</p><p>- Không được sử dụng từ điển</p>";
      break;

    default:
      name = "Thông tin chưa cập nhật";
      format = "Chưa xác định";
      topics = "<p>Thông tin nội dung ôn tập sẽ được cập nhật sau.</p>";
      notes = "<p>Vui lòng liên hệ giáo vụ khoa để biết thêm chi tiết.</p>";
  }

  // Update DOM elements
  if (detailCode) detailCode.textContent = examId;
  if (detailName) detailName.textContent = name;
  if (detailTeacher) detailTeacher.textContent = teacher;
  if (detailFormat) detailFormat.textContent = format;
  if (detailDuration) detailDuration.textContent = duration;
  if (detailMaterials) detailMaterials.textContent = materials;
  if (detailTopics) detailTopics.innerHTML = topics;
  if (detailNotes) detailNotes.innerHTML = notes;
}
