//=========== Micro Interactions for the Port forwarding in the new Dashboard ================\\
// to remove the disabled attribute from add port button when the user selects protocol
$("#forwarded-ports").on("change", function () {
  if ($(this).val() != "") {
    $(".portforwarding-protocol .add-btn").prop("disabled", false);
  }
});


 /*************************************************************/
  /* contact us page */
  /*************************************************************/

  // to type the name of file choosen instead of the span(upload and attachment)
  var input = $("#inputfile"),
    span = input.prev("span"),
    spanVal = span.html();

  input.on("change", function () {
    var file = input[0].files[0];

    if (file != "") {
      span.html(file.name);
      span.css("color", "#5b5863");
    } else {
      span.html(spanVal);
      span.css("color", "#8d8b92");
    }
  });

  // change the color of label when type in input field
  $(".contact-us-content .input-email, .contact-us-content .subject, .contact-us-content .message").on("keyup", function () {
    if ($(this).val()) {
      $(this).prev("label").css({
        color: "#8d8b92"
      });
    } else {
      $(this).prev("label").css({
        color: "#5b5863"
      });
    }
  });
  /******************************************************** */
  // form validation

  var inputEmail = $(".contact-us-content .input-email");
  // function to validate the email
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }

  var emailError = true;
  var departmentError = true;
  var messageError = true;

  inputEmail.on("blur", function () {
    if (!validateEmail(inputEmail.val()) || inputEmail.val() == "") {
      $(this).parent(".form-group").next(".custom-alert").fadeIn().end().css({
        border: "1px solid #F04545",
        "box-shadow": "inset 0px -3px 0px #F04545"
      });
      emailError = true;
    } else {
      $(this).parent(".form-group").next(".custom-alert").fadeOut().end().css({
        border: "1px solid #e0ded5",
        "box-shadow": "none"
      });
      emailError = false;
    }
  });

  // validation for the select box
  $("select[name=department]").on("blur", function () {
    if ($(this).val() == "") {
      $(this).parents(".group").next(".custom-alert").fadeIn();
      $(this).parent(".form-group").css({
        border: "1px solid #F04545",
        "box-shadow": "inset 0px -3px 0px #F04545"
      });
      departmentError = true;
    } else {
      $(this).parents(".group").next(".custom-alert").fadeOut();
      $(this).parent(".form-group").css({
        border: "1px solid #e0ded5",
        "box-shadow": "none"
      });
      departmentError = false;
    }
  });

  // validation for the textarea
  $("textarea#msg").on("blur", function () {
    if ($(this).val() == "") {
      $(this).parent(".form-group").next(".custom-alert").fadeIn().end().css({
        border: "1px solid #F04545",
        "box-shadow": "inset 0px -3px 0px #F04545"
      });
      messageError = true;
    } else {
      $(this).parent(".form-group").next(".custom-alert").fadeOut().end().css({
        border: "1px solid #e0ded5",
        "box-shadow": "none"
      });
      messageError = false;
    }
  });

$("#form-contact").on("submit", function (e) {
  e.preventDefault();
  if (emailError == true || departmentError == true || messageError == true) {
    $("select.department").blur();
    $(inputEmail).blur();
    $("textarea.message").blur();
  } else {
    $(".submit button").addClass("fade");
    $(".submit button").find("svg").hide();

    $(".submit button").append('<span class="spinner spinner-2"></span>');

    setTimeout(function () {
      $(".submit button").removeClass("fade");
      $(".submit button").find("svg").show();
      $(".submit button").find("span").hide();

      $(".contact-us-content").hide();
      $(".message-sent").fadeIn(800);
    }, 2000);
  }
  // }
});

// add table row when click Add New Port Button
$(".portforwarding-protocol .add-btn").on("click", function () {
  if ($("#table_body tr").length <= 4) {
    $(this).next(".spinner-border").fadeIn();
    let portForwardingProtocol = $("#forwarded-ports option:selected").val();

    setTimeout(() => {
      $(this).next(".spinner-border").fadeOut();
      $(".show_no_ports").hide();
      $("#table_body").append(`
      <tr>
        <td>${portForwardingProtocol}</td>
        <td>
          <span>21046</span>
          <span class="protocol d-md-none">${portForwardingProtocol}</span>
        </td>
        <td class="delete">
          <button class="delete-btn">
            <img data-src="imgs/dashboard/trash-icon.svg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazyload" alt="trash-icon" />
            <span data-translation-id="dash_portforwarding_delete_ports">Delete Ports</span>
          </button>
        </td>
      </tr>
    `);
    }, 2000);
  } else {
    $(".portforwarding-protocol .portforwarding_limit").fadeIn();
    $(".portforwarding-protocol .add-btn").prop("disabled", true);
  }
});

// Delete Port when click on Delete Port Button
$("#table_body").on("click", "td.delete", function (e) {
  if (e.target.parentElement.classList.contains("delete-btn")) {
    if (confirm("Are You Sure to delete this Port?")) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
  if ($("#table_body tr").length <= 4) {
    $(".portforwarding-protocol .portforwarding_limit").fadeOut();
    $(".portforwarding-protocol .add-btn").prop("disabled", false);
  }
});

//=========== Micro Interactions for the Port forwarding in the new Dashboard ================\\

//=========== Micro Interactions for the Wireguard in the new Dashboard ================\\

$("#wireguard-device").on("keyup", function () {
  if ($(this).val() != "") {
    $(".add-device .add-device-btn").prop("disabled", false);
  }
});

// add table row when click Add New Port Button
$(".add-device .add-device-btn").on("click", function () {
  $("#wireguard_body #no-devices").hide();
  if ($("#wireguard_body tr").length <= 5) {
    $(this).parent().siblings(".spinner").find(".spinner-border").fadeIn();
    let wireguardDevice = $("#wireguard-device").val();
    // $('.left-col .select-country').css({"height": ($('.right-col').innerHeight() + 60)})

    setTimeout(() => {
      $(this).parent().siblings(".spinner").find(".spinner-border").fadeOut();
      $(".wireguard-table tbody").append(`
          <tr>
            <td>${wireguardDevice}</td>
            <td class="cell-middle" id="deviceLocation">Toronto</td>
            <td class="btns">
              <button class="download primary__btn">
                <img data-src="imgs/dashboard/download.svg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazyload" alt="trash-icon" />
              </button>
              <button class="delete primary__btn">
                <img data-src="imgs/dashboard/trash-w.svg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazyload" alt="trash-icon" />
              </button>
            </td>
          </tr>
        `);
      $("#wireguard-device").val("");
      $(".add-device .add-device-btn").prop("disabled", true);
    }, 100);
  } else {
    $(".wireguard_limit").fadeIn();
    $("#wireguard-device").val("");
    $(".add-device .add-device-btn").prop("disabled", true);
  }
});

// delete the device on wireguard on dashboard from the client server
$(".wireguard-table tbody").on("click", "td.btns", function (e) {
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Are You Sure to delete this device?")) {
      e.target.parentElement.parentElement.parentElement.remove();
      $(".left-col .select-country").css({ height: $(".right-col").innerHeight() });
    }
  }
  if ($("#wireguard_body tr").length <= 5) {
    $(".wireguard_limit").fadeOut();
  }
  if ($("#wireguard_body tr").length == 1) {
    $("#wireguard_body #no-devices").fadeIn();
  }
});
//=========== Micro Interactions for the Wireguard in the new Dashboard ================\\

//=========== Micro Interactions for the Smart DNS in the new Dashboard ================\\

// validation the input field
function ValidateIPaddress(inputText) {
  var domainformat = /^(\d{1, 3})\.(\d{1, 3})\.(\d{1, 3})\.(\d{1, 3})$/;
  var ipformat = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  if (inputText.value.match(ipformat)) {
    $(".whishlist__content__info__ip .error,.smartdns-status.one .error").hide();
    $(".new-ip .error").hide();
    return true;
  } else if (inputText.value.match(domainformat)) {
    $(".whishlist__content__info__ip .error,.smartdns-status.one .error").hide();
    $(".new-ip .error").hide();
    return true;
  } else {
    $(".whishlist__content__info__ip .error,.smartdns-status.one .error").fadeIn();
    $(".new-ip .error").show();
  }
}

$("#form-ip,.form-ip").submit(function (e) {
  e.preventDefault();
  ValidateIPaddress(document.form1.text1);
});
$("#form-ip2,.form-ip2").submit(function (e) {
  e.preventDefault();
  ValidateIPaddress(document.form2.text2);
});

$(".smartdns-status .save-ip").on("click", function (e) {
  e.preventDefault();

  if ($("#ip-address").val() != "") {
    if (ValidateIPaddress(document.form1.text1)) {
      $(".smartdns-status.one").hide();
      $(".smartdns-status.pending").fadeIn();
      setTimeout(function () {
        $(".smartdns-status.two").fadeIn();
        $(".smartdns-status.pending").hide();
      }, 3000);
    }
  }
});

$(".smartdns-status .save-ip2").on("click", function (e) {
  e.preventDefault();
  if ($("#ip-address2").val() != "") {
    if (ValidateIPaddress(document.form2.text2)) {
      $("#change-ip").modal("hide");
      $(".smartdns-status.one").hide();
      $(".smartdns-status.pending").fadeIn();
      setTimeout(function () {
        $(".smartdns-status.two").fadeIn();
        $(".smartdns-status.pending").hide();
      }, 3000);
    }
  }
});

$("#ipAddress,#ip-address").on("keyup", function () {
  ValidateIPaddress(document.form1.text1);
});
$("#ipAddress2,#ip-address2").on("keyup", function () {
  ValidateIPaddress(document.form2.text2);
});

$(".change-ip-content .change-ip").on("click", function (e) {
  e.preventDefault();
  if ($("#ipAddress2").val() != "") {
    if (ValidateIPaddress(document.form2.text2)) {
      $("#change-ip").modal("toggle");
      $(".smartdns-pending").fadeIn();
      $(".smartdns-active-ip").hide();
      setTimeout(function () {
        $(".smartdns-active-ip").fadeIn();
        $(".smartdns-pending").hide();
      }, 3000);
    }
  }
});

//=========== Micro Interactions for the Smart DNS in the new Dashboard ================\\

//=========== Micro Interactions for the WePLAY in the new Dashboard ================\\
$("#weplay_submit_btn").on("click", function (e) {
  e.preventDefault();
  $(".dashboard-weplay .weplay-submission").hide();
  $(".dashboard-weplay .weblay_submit_msg").fadeIn();
});
$("#submit_nother_weplay").on("click", function () {
  $(".dashboard-weplay .weplay-submission").fadeIn();
  $(".dashboard-weplay .weblay_submit_msg").hide();
});

//=========== Micro Interactions for the Billing in the new Dashboard ================\\
$(".auto-renewal .menu-btn").on("click", function () {
  $("#cancel-renewal").toggle();
});

$("#cancel-renewal").on("click", function () {
  $("#cancel-autorenewal .modal_body").show();
  $("#cancel-autorenewal .cancel_autorenewal").hide();
  if ($(".renewal h3").hasClass("statusOn")) {
    $(this).fadeOut();
    $("#cancel-autorenewal").modal("toggle");
  } else if ($(".renewal h3").hasClass("statusOff")) {
    $(this).fadeOut();
    $("#active-renewal").modal("toggle");
    $(".renewal h3").removeClass("statusOff").addClass("statusOn");
    $("#cancel-renewal").text("Disable Auto-renewal");
  }
});

$(".reason-info .renewal-off").on("click", function (e) {
  e.preventDefault();
  $("#cancel-autorenewal .modal_body").hide();
  $("#cancel-autorenewal .cancel_autorenewal").show();
});

$("#cancel_subscription").on("click", function (e) {
  e.preventDefault();
  $(".renewal h3").removeClass("statusOn").addClass("statusOff");
  $("#cancel-renewal").text("Enable Auto-renewal");
});

$(".reason-btns .support-link").on("click", function () {
  $("#cancel-autorenewal").modal("hide");
});

$("#check-2fa").on("click", function () {
  if ($(this).is(":checked")) {
    $("#twoFactor").modal("toggle");
    $(".modal-two-factor-body").show();
    $(".modal-two-factor-enabled").hide();
    $("#check-2fa").prop("checked", false);
  } else {
    $("#check-2fa").prop("checked", false);
  }
});

$(".two-factor-content .cancel").on("click", function () {
  $("#check-2fa").prop("checked", false);
});

$(".two-factor-content button.submit").on("click", function (e) {
  e.preventDefault();
  $(".modal-two-factor-body").hide();
  $(".modal-two-factor-enabled").show();
  $("#check-2fa").prop("checked", true);
});

// Manual Setup
$(".manual-setup .stepper--flexbox .stepper__input").on("click", function () {
  if ($(window).width() > 767) {
    $("#tab-content > div").hide();
    $($(this).data("radio")).show();
  }
});

$(".manual-setup .stepper .stepper__input").on("click", function () {
  $(this).parents(".stepper").find(".stepper__step").find(".arrow").removeClass("active");
  $(this).next(".stepper__step").find(".arrow").addClass("active");
  if ($(this).hasClass("first")) {
    $(".stepper__step.two").removeClass("active");
    $(".stepper__step.one").removeClass("darken active");
  }
  if ($(this).hasClass("second")) {
    $(".stepper__step.one").addClass("active");
    $(".stepper__step.two").removeClass("active");
  }
  if ($(this).hasClass("last")) {
    $(".stepper__step.two").addClass("active");
    $(".stepper__step.one").addClass("darken active");
  }
});

$(".next_step_two, #stepper-1, #stepper-2 ,#stepper-11, #stepper-22").on("click", function () {
  var protocol_selected = $(".protocol-select input[name='protocol']:checked").next("label").text();
  $(".stepper__button .protocol_selected").text(protocol_selected);
  $(".stepper__button .protocol_selected").css("opacity", 1);
  $(".stepper__button .protocol_title").css("opacity", 0.8);
});

$(".protocol-select input[name='protocol']").change(function () {
  if (this.value == "socks5") {
    $(".continent").hide();
    $(".socks_continent").show();
  } else {
    $(".continent").show();
    $(".socks_continent").hide();
  }
});

$(".next_step_two").on("click", function () {
  if ($(window).width() > 767) {
    $("#stepper-1").click();
  } else {
    $("#stepper-11").click();
  }
});

$("#stepper-0, #stepper-00").on("click", function () {
  $(".stepper__button .protocol_selected").text("Select the protocol you’d like use");
  $(".stepper__button .location_selected").text("Select a location");
});

$(".next_step_three, #stepper-2, #stepper-22").on("click", function () {
  let location_selected = $(".continent input[name='country']:checked").next("label").text();
  $(".stepper__button .location_selected").text(location_selected);
  $(".stepper__button .location_selected").css("opacity", 1);
  $(".stepper__button .location_title").css("opacity", 0.8);
  if ($("input[name='protocol']:checked").val() == "socks5") {
    let location_selected = $(".socks_continent input[name='socks_country']:checked").next("label").text();
    $(".stepper__button .location_selected").text(location_selected);
  }
});

$(".next_step_three, .continent input[name='country'],.socks_continent input[name='socks_country']").on("click", function () {
  if ($(window).width() > 767) {
    $("#stepper-2").click();
  } else {
    $("#stepper-22").click();
  }
});

$("#stepper-1,#stepper-11").on("click", function () {
  $(".stepper__button .location_selected").text("Select a location");
});

$(".back_step_one").on("click", function () {
  if ($(window).width() > 767) {
    $("#stepper-0").click();
  } else {
    $("#stepper-00").click();
  }
});

$(".back_step_two").on("click", function () {
  if ($(window).width() > 767) {
    $("#stepper-1").click();
  } else {
    $("#stepper-11").click();
  }
});

$(".protocol-select .list-item input:radio").change(function () {
  // to show the appropriate content based on the user choice
  if ($("input[name='protocol']:checked").val() == "udp") {
    $("#configuration > div.config_content").hide();
    $("#configuration #udp_content").show();
    $("#protocol .weblock").show();
  }
  if ($("input[name='protocol']:checked").val() == "tcp") {
    $("#configuration > div.config_content").hide();
    $("#configuration #tcp_content").show();
    $("#protocol .weblock").show();
  }
  if ($("input[name='protocol']:checked").val() == "ikev2") {
    $("#configuration > div.config_content").hide();
    $("#configuration #ikev2_content").show();
    $("#protocol .weblock").hide();
  }
  if ($("input[name='protocol']:checked").val() == "wireguard") {
    $("#configuration > div.config_content").hide();
    $("#configuration #wireguard_content").show();
    $("#protocol .weblock").hide();
  }
  if ($("input[name='protocol']:checked").val() == "httpsProxy") {
    $("#configuration > div.config_content").hide();
    $("#configuration #httpsProxy_content").show();
    $("#protocol .weblock").hide();
  }
  if ($("input[name='protocol']:checked").val() == "socks5") {
    $("#configuration > div.config_content").hide();
    $("#configuration #socks5_content").show();
    $("#protocol .weblock").hide();
  }
  if ($("input[name='protocol']:checked").val() == "shadowsocks") {
    $("#configuration > div.config_content").hide();
    $("#configuration #shadowsocks_content").show();
    $("#protocol .weblock").show();
  }
});

// to rearrange the order of smartdns-tutorials section in mobile screen above the smartdns-servers section
$(window).on("resize", function () {
  orderSmartDnsTutorials();
});

function orderSmartDnsTutorials() {
  if ($(window).width() < 1199) {
    $(".smartdns-tutorials").insertBefore(".smartdns-servers");
  } else {
    $("#smartdns_tutorials").append($(".smartdns-tutorials"));
  }
}
orderSmartDnsTutorials();

// to show message in announcement box every 5 seconds
var i = 1;
var sampleMessages = ["New SOCKS5 Location: UK - London", "New Location: Taiwan - Taipei"];
setInterval(function () {
  var newText = sampleMessages[i++ % sampleMessages.length];
  $("#announcement-msg").fadeOut(500, function () {
    $(this).text(newText).fadeIn(500);
  });
}, 1 * 5000);

// show or hide password when click on eye icon
$(".showOrHide").click(function (e) {
  var target = e.currentTarget;
  $(target).hasClass("show") ? hidePassword($(target)) : showPassword($(target));
});
function hidePassword(e) {
  e.removeClass("show").addClass("hide");
  e.prev("input").attr("type", "password");
  e.find(".eye-hide").show();
  e.find(".eye").hide();
}
function showPassword(e) {
  e.removeClass("hide").addClass("show");
  e.prev("input").attr("type", "text");
  e.find(".eye-hide").hide();
  e.find(".eye").show();
}
// Micro-interctions for Email Monitor
$(".alert-emails-content .email-top").on("click", function () {
  $(".alert-emails-content .email").removeClass("active");
  $(this).parent().addClass("active");
  $(".email-status-content > div").hide();
  $($(this).data("email")).fadeIn();
  $(".alert-archive-content .box").removeClass("active");
  $(".alert-archive-content .box.breaches").click();
});

$(".alert-archive-content .box").on("click", function () {
  $(".alert-archive-content .box").removeClass("active");
  $(this).addClass("active");
  $(".archive-tab-content > div").hide();
  $($(this).data("archive")).fadeIn();
});

$(".alert-emails-content .new-email").on("click", function () {
  $("#addingNewEmail .adding-new-email").show();
  $("#addingNewEmail .verify-your-email").hide();
  $(".modal-new-email-body #new_email").val("");
});

var newEmail = $(".modal-new-email-body #new_email");
// function to validate the email
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}

var emailError = true;
newEmail.on("blur", function () {
  if (!validateEmail(newEmail.val()) || newEmail.val() == "") {
    $(this).parent(".form-group").next(".custom-alert").fadeIn().end().css({
      border: "1px solid #F04545",
      "box-shadow": "inset 0px -3px 0px #F04545"
    });
    emailError = true;
  } else {
    $(this).parent(".form-group").next(".custom-alert").fadeOut().end().css({
      border: "1px solid #e0ded5",
      "box-shadow": "none"
    });
    emailError = false;
  }
});

$(".modal-new-email-body .submit").on("click", function (e) {
  e.preventDefault();
  if (emailError == true) {
    newEmail.blur();
  } else {
    $("#addingNewEmail .adding-new-email").hide();
    $("#addingNewEmail .verify-your-email").show();
    var emailValue = newEmail.val();
    $(".alert-emails-content .owl-carousel")
      .trigger("add.owl.carousel", [
        `
      <div class="email monitoring">
        <div class="email-top" data-email=".email-pending">
          <div class="status pending text-center">
            <span class="bull"></span>
            PENDING VERIFICATION
          </div>
          <div class="email-info">
            <h5>${emailValue}</h5>
          </div>
        </div>
        <div class="email-bottom d-flex justify-content-between align-items-center">
          <button class="resend">
            <img src="imgs/dashboard/resend-verification.svg" alt="resend-verification" />
            <span>Resend Verification</span>
          </button>
          <div class="remove">
            <button class="white_btn remove-pending">
              <img class="mr-0" src="imgs/dashboard/delete-icon.svg" alt="delete-icon" />
            </button>
          </div>
        </div>
      </div>
    `
      ])
      .trigger("refresh.owl.carousel");
  }
});

// delete email from the emails row in Monitor emails section
$(document).on("click", ".email-bottom .remove button", function (e) {
  if (confirm("Are You Sure to delete this Email")) {
    var index = $(this).parents(".owl-item").index();
    $(this).parents(".owl-item").remove();
    console.log("index =", index);
    $(".alert-emails-content .owl-carousel").trigger("remove.owl.carousel", index).trigger("refresh.owl.carousel");
  }
});

// function to detect the first letter of the website name on Monitoring email
$(".combo-list-heading").each(function () {
  var website = $(this).next(".combo-list-inner").find("h4").text();
  $(this).text(website.charAt(0).toUpperCase());
});

$(function () {
  // trigger owl carousel
  $(".email-carousel").owlCarousel({
    nav: true,
    margin: 25,
    dots: true,
    dotsEach: true,
    stagePadding:5,
    navText: ["Previous", "Next"],
    responsive: {
      0: {
        items: 1,
        dots: false,
        dotsEach: false
      },
      768: {
        items: 2
      },
      1100: {
        items: 3
      },
      1450: {
        items: 4
      }
    }
  });

  $(".alert-carousel").owlCarousel({
    nav: true,
    dots: true,
    dotsEach: true,
    animateOut: 'fadeOut',
    items: 1,
    responsive: {
      0: {
        navText: [
          `<svg class="arrow-svg" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="#5B5863" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
          , `<svg class="arrow-svg" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `],
      },
      700: {
        navText: ["Previous", "Next"]
      }
    }
  });
  
  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    var baseUrl = "imgs/flags";
    var $state = $('<span><img src="' + baseUrl + "/" + state.element.value.toLowerCase() + '.svg" class="img-flag" /> ' + state.text + "</span>");
    return $state;
  }

  function formatOutput(item) {
    var baseUrl = "imgs/flags";
    var $state = $('<span><img src="' + baseUrl + "/" + $(item.element).data("flag") + '.svg" class="img-flag" /> ' + item.text + "</span>");
    return $state;
  }

  $(".weplay-countries").select2({
    placeholder: "Select a country",
    templateResult: formatState,
    dropdownParent: $(".weplay-form")
  });
  $(".udp-port, .tcp-port").select2({
    placeholder: "Port",
    minimumResultsForSearch: Infinity,
    dropdownParent: $("#tab-content")
  });
  $(".openvpn-udp-version, .openvpn-tcp-version").select2({
    placeholder: "OpenVPN Version",
    minimumResultsForSearch: Infinity,
    dropdownParent: $("#tab-content")
  });
  $(".sock5-location").select2({
    placeholder: "Select location",
    minimumResultsForSearch: Infinity,
    dropdownParent: $("#tab-content")
  });
  $(".forwarded-ports").select2({
    placeholder: "Select Protocol",
    minimumResultsForSearch: Infinity,
    dropdownParent: $(".portforwarding-protocol")
  });
  $(".payment-card").select2({
    placeholder: "Credit or Debit Card",
    minimumResultsForSearch: Infinity,
    dropdownParent: $(".update-payment-method")
  });
  $(".breach-report-frequency").select2({
    placeholder: "Breach Report Frequency",
    minimumResultsForSearch: Infinity,
    dropdownParent: $(".breach-frequency")
  });
  $("#manual-setup-protocol").select2({
    minimumResultsForSearch: Infinity,
    dropdownParent: $(".setup-configuration")
  });
  var cleaveYear = new Cleave(".input-expiry", {
    date: true,
    datePattern: ["m", "y"]
  });

  var cleaveCard = new Cleave(".input-card-number", {
    creditCard: true,
    delimiter: " "
  });
});


$(document).on('click',".box-style.breach .trash-btn, .combo-content .custom-btn2", function() {
  var index = $(this).parents(".owl-item").index();
  console.log("index =", index);
  var itemsLength = ($(this).parents('.item').find('.breach').length);
  $(this).parents('.box-style.breach').remove();
  if (itemsLength == 1) {
    $(".alert-carousel").trigger("remove.owl.carousel", index).trigger("refresh.owl.carousel");
  }
})


// rename device box in device management model
var newDeviceName;
var device_name;

$(".devices .device input:radio").change(function () {
  $('#device-name').focus().select()
  if ($('input[name=device]:checked')) {
    device_name = $('input[name=device]:checked').next('label').find('h3').text()
    $('#device-name').val(device_name)
  }
  newDeviceName = device_name
})


$('#device-name').on('keyup', function(e) {
  newDeviceName = e.target.value;
})

$('.rename-device .rename-btn').on('click', function (e) {
  e.preventDefault()
  if(!$('#device-name').val() == '') {
    $('input[name=device]:checked').next('label').find('h3').text(newDeviceName)
  }
})