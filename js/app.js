document.getElementById("submitButton").addEventListener("click", function () {
  const TOKEN = "6603262764:AAEoZNNGSfXmZXOsWttnAIDrzhbWXFSF61c";
  const CHAT_ID = "-1001686824386";

  const selectedOption = document.querySelector("input[name='toigo']:checked");
  const name = document.getElementById("nameInput").value;

  if (selectedOption && name) {
    const message = `
        Келуучу: ${name}
        Выбор: ${selectedOption.value}
      `;

    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          showModal(); // Отображаем модальное окно
          // Очистите форму после успешной отправки
          document.getElementById("nameInput").value = "";
          document.querySelector("input[name='toigo']:checked").checked = false;
        } else {
          alert("Произошла ошибка при отправке сообщения в телеграм.");
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке сообщения:", error);
      });
  } else {
    alert("Пожалуйста, заполните все поля формы.");
  }
});

// Отображение модального окна
function showModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "block";
}

// Скрытие модального окна
function closeModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "none";
}

// Добавьте обработчик события для закрытия модального окна при клике на крестик
document.querySelector(".close").addEventListener("click", closeModal);

// Добавьте обработчик события для закрытия модального окна при клике вне модального окна
window.addEventListener("click", function (event) {
  const modal = document.getElementById("successModal");
  if (event.target === modal) {
    closeModal();
  }
});
