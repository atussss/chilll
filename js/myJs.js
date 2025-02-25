const textConfig = {
  text1: "He luu cậu!",
  text2: "Tớ có điều này muốn hỏi cậu nhớ phải trả lời thật lòng nhaaa :3333",
  text3: "Cậu đang thích thầm tớ phải không nào ._.",
  text4: "Nếu cậu ko trả lời mà thoát ra tức là muốn làm NY tớ rùi đó nha :v",
  text5: "Cậu mơ à???",
  text6: "OKK <3",
  text7: "Cho tớ 1 lí do cậu thích tớ đi :vvvv",
  text8: "Gửi cho tớ",
  text9: "Vì cậu đẹp trai và dễ thương đó :>>",
  text10: "Tớ biết mà ^.^ Yêu cậu x100",
  text11: "Tối nay tớ qua đón cậu đi chơi nhaa :v. Còn giờ thì chờ gì nữa mà ko inbox cho tớ đi nàooo",
  text12: "Okii lunn <3",
};

$(document).ready(function () {
  // Preloader
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").css({ overflow: "visible" });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: "#fff",
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").fadeIn(200);
    });
  }

  // Đổi vị trí nút "Không"
  function switchButton() {
    let audio = new Audio("sound/duck.mp3");
    audio.play();

    let noButton = $("#no");
    let yesButton = $("#yes");

    let noPos = { left: noButton.css("left"), top: noButton.css("top") };
    let yesPos = { left: yesButton.css("left"), top: yesButton.css("top") };

    noButton.css({ left: yesPos.left, top: yesPos.top });
    yesButton.css({ left: noPos.left, top: noPos.top });
  }

  // Di chuyển nút "Không" ngẫu nhiên
  function moveButton() {
    let audio = new Audio("sound/Swish1.mp3");
    audio.play();

    let maxWidth = $(window).width() - $("#no").width();
    let maxHeight = $(window).height() - $("#no").height();

    let x = Math.random() * maxWidth;
    let y = Math.random() * maxHeight;

    $("#no").css({ left: x + "px", top: y + "px" });
  }

  let moveCount = 0;
  $("#no").mousemove(function () {
    if (moveCount < 1) switchButton();
    if (moveCount > 1) moveButton();
    moveCount++;
  });

  $("#no").click(() => {
    if ($(window).width() >= 900) switchButton();
  });

  // Tự động điền lý do yêu
  function textGenerate() {
    let reasonInput = $("#txtReason");
    let reasonText = textConfig.text9;
    let currentText = reasonInput.val();
    let count = currentText.length;

    if (count < reasonText.length) {
      reasonInput.val(reasonText.substring(0, count + 1));
    }
  }

  // Hiển thị popup khi chọn "OKK <3"
  $("#yes").click(function () {
    let audio = new Audio("sound/tick.mp3");
    audio.play();

    Swal.fire({
      title: textConfig.text7,
      width: $(window).width() > 600 ? 900 : "90%",
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason' placeholder='Whyyy'>",
      background: "#fff",
      backdrop: `
        rgba(0,0,123,0.4)
        url("img/giphy2.gif")
        left top
        no-repeat
      `,
      showCancelButton: false,
      confirmButtonColor: "#fe8a71",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          confirmButtonText: textConfig.text12,
          onClose: () => {
            window.location = "https://fb.com/nguyenphan299";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      let handleWriteText = setInterval(textGenerate, 10);
      $("#txtReason").blur(() => clearInterval(handleWriteText));
    });
  });
});
