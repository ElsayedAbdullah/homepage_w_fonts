$(function () {
  /*************************************************************/

  // global variables
  var serversNumber = 66;
  var serversCountries = 48;
  var streamingServices = "400+";
  // put the src of trustpilot image in hero section in a variable to change from here
  const trustpilotInHero = document.querySelector(".trustpilot_img a img");
  const trustpilotInOrder = document.querySelector(".trustpilot_img_one a img");
  if (trustpilotInHero) {
    trustpilotInHero.src = "imgs/trustpilot/trustpilot_lg_4.3_w.svg";
  }
  if (trustpilotInOrder) {
    trustpilotInOrder.src = "imgs/trustpilot/trustpilot_sm_4.3.svg";
  }

  $("span.serversCountries").text(serversCountries);

  // check the code is correct on stack commerce page
  const stackCode = document.querySelector(".access-code #code");
  const codeErrorMsg = document.querySelector(".coder-error");
  const RightCode = "SADF-20OL-24HG-2DF4";

  const codeInitialState = function () {
    codeErrorMsg.classList.remove("active");
    document.querySelector(".error-icon").style.display = "none";
    document.querySelector(".success-icon").style.display = "none";
  };
  if (stackCode) {
    stackCode.addEventListener("keyup", eo => {
      if (stackCode.value) {
        if (eo.target.value === RightCode) {
          codeInitialState();
          document.querySelector(".success-icon").style.display = "block";
        } else {
          codeErrorMsg.classList.add("active");
          document.querySelector(".error-icon").style.display = "block";
          document.querySelector(".success-icon").style.display = "none";
        }
      } else {
        codeInitialState();
      }
    });
  }

  // jobs page
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

  $(window).on("resize", function () {
    orderWevpnPlanFeatures();
  });

  function orderWevpnPlanFeatures() {
    if ($(window).width() < 992) {
      $(".wevpn-plan-features").insertAfter("#wevpn-payment");
    } else {
      $("#wevpn-plan-features").append($(".wevpn-plan-features"));
    }
  }
  orderWevpnPlanFeatures();

  $("[data-load]").each(function () {
    $(this).load($(this).data("load"), function () {
      // add class active on navbar link and remove from siblings

      $("#year-now").text(new Date().getFullYear());
      // to load the trustpilot inside the footer
      // var element = document.getElementsByClassName("trustpilot-widget");
      // for (var i = 0; i < element.length; i++) {
      //   window.Trustpilot.loadFromElement(element[i]);
      // }

      const currentLocation = location.href;
      $(".platform-content .platform-list .item").each(function () {
        if ("http://localhost:8080" + $(this).find("a").attr("href") + ".html" === currentLocation) {
          $(this).addClass("active");
        } else if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
          $(this).addClass("active");
        }
      });

      $(".nav-item .dropdown--menu ul li").each(function () {
        if ("http://localhost:8080" + $(this).find("a").attr("href") + ".html" === currentLocation) {
          $(this).addClass("active");
          $(this).parents(".nav-item").addClass("active");
        } else if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
          $(this).addClass("active");
          $(this).parents(".nav-item").addClass("active");
        }
      });

      $(".navbar-nav .nav-item").each(function () {
        if ("http://localhost:8080" + $(this).find("a").attr("href") + ".html" === currentLocation) {
          $(this).addClass("active");
        } else if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
          $(this).addClass("active");
        }
      });

      $(".languageButton").dropdown();

      $(".dropdown-menu a").on("click", function (e) {
        e.preventDefault();
        $(".languageButton").html($(this).html());
        $(".languageButton").find("img").attr("src", $(this).find("img").attr("src"));
        $(".dropdown-menu").removeClass("show");
        $(".lang-collapse").removeClass("show");
        $("body, html").removeClass("overlay");
        var language = $(this).find("span").text();
        $.ajax({
          url: "https://wevpn.com/billing/index.php?m=dashboard&action=language",
          data: { lang: language },
          success: function (d) {
            $.ajax({
              url: "/lang.php",
              data: "",
              success: function (d) {
                if (d.result == "success") {
                  $.each(d.translations, function (index, value) {
                    var element = $(document).find("span[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("h1[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("h2[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("h3[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("h4[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("h6[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("p[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("button[data-translation-id='" + index + "']");
                    element.text(value);
                    element = $(document).find("option[data-translation-id='" + index + "']");
                    element.text(value);
                  });
                }
              },
              dataType: "json",
              error: function () {}
            });
          },
          dataType: "json",
          error: function () {}
        });
      });

      $("span.streamingServices").text(streamingServices);
      $("span.serversNumber").text(serversNumber);

      $(".open-intercom-chat,#my_custom_link").on("click", function () {
        $(".chat-button").click();
      });

      // Assign variables for the price in wevpn button
      $(".wevpn-price").text("$2.59/mo");
      // Assign variables for the plan prices
      $(".price-card.two .bill-month .value").text("2");
      $(".price-card.two .bill-month .cent").text("59");
      $(".price-card.two .offer").text("Save 74%");
      $(".price-card.three .bill-month .value").text("4");
      $(".price-card.three .bill-month .cent").text("16");
      $(".price-card.three .offer").text("Save 58%");
      $(".price-card.four .offer").text("Save 50%");
      $(".wevpn-total-price-2year").text("69.95");
      $(".wevpn-total-price-1year").text("49.95");
      $(".wevpn-total-price-6month").text("29.95");
      $(".plan.plan-12 .savings").text("Savings: 74%");
      $(".plan.plan-6 .savings").text("Savings: 58%");
      $(".plan.plan-6mo .savings").text("Savings: 50%");

    });
  });

   // Bind event listener
  if ($(window).width() < 768) {
    // footer in mobile screen
    $("h4.footer-item-title").on("click", function () {
      $(this).toggleClass("active").next("ul").slideToggle();
    });
  }

  // geolocation code
  $.ajax({
    url: "https://ipcheck.wevpn.com/api/v1/ip",
    data: "",
    success: function (data) {
      $.ajax({
        url: "/includes/g.php?data=" + btoa(data),
        data: "",
        success: function (data) {
          $("#ip").html(data.ip);
          $("#isp").html(data.isp);
          $(".ip-info .ip-value").text(data.ip);
          $(".ip-info .isp-value").text(data.isp);
          $(".ip-info .location-value").text(data.country + " - " + data.city);
          if (data.city) {
            $("#location").html(data.city + " (" + data.country + ")");
          } else {
            $(".top-header ul li:nth-child(1)").remove();
          }
          //Openmap
          var zoom = 11;
          tileX = Math.floor(((data.longitude + 180) / 360) * Math.pow(2, zoom));
          tileY = Math.floor(((1 - Math.log(Math.tan((data.latitude * Math.PI) / 180) + 1 / Math.cos((data.latitude * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom));
          zoomUrl = "https://tile.openstreetmap.org/" + zoom + "/" + tileX + "/" + tileY + ".png";
          $(".map-picture").attr("src", zoomUrl);
          $(".ip-address-info .loader-wrapper").hide();
          $(".ip-address-info-content.whats-my-ip").removeClass("d-none");
          if (data.protected === true) {
            $(".ip-address-info-content.whats-my-ip").addClass("ip-protected");
            $(".ip-address-info-content.dns-info").addClass("dns-protected");
            $(".exposed").html("Protected");
            $(".get-protected").hide();
            if ($(".exposed").length) {
              $(".top-header a").hide();
            } else {
              $(".top-header a").replaceWith("<strong>Protected</strong>");
            }
          } else {
            $(".exposed").html("Exposed");
            $(".top-header a").show();
            $(".ip-address-info-content.whats-my-ip").removeClass("ip-protected");
            $(".ip-address-info-content.dns-info").removeClass("dns-protected");
          }
        },
        dataType: "json",
        error: function () {}
      });
    },
    error: function () {}
  });

  // Update header login buttons
  $.getJSON("https://wevpn.com/billing/index.php?m=dashboard&action=islogged", function (data) {
    if (data.message == true) {
      $(".get-started-login").show();
      $(".header-white .login").hide();
    }
  });

  //Translate site if parameter lang set
  searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("lang")) {
    $.ajax({
      url: "https://wevpn.com/billing/index.php?m=dashboard&action=language",
      data: { lang: searchParams.get("lang") },
      success: function (d) {
        $.ajax({
          url: "/lang.php",
          data: "",
          success: function (d) {
            if (d.result == "success") {
              $.each(d.translations, function (index, value) {
                var element = $(document).find("span[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("h1[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("h2[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("h3[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("h4[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("h6[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("p[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("button[data-translation-id='" + index + "']");
                element.text(value);
                element = $(document).find("option[data-translation-id='" + index + "']");
                element.text(value);
              });
            }
          },
          dataType: "json",
          error: function () {}
        });
      },
      dataType: "json",
      error: function () {}
    });
  }

  //Hide app store buttons if adsense parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const adsenseTag = urlParams.get("as");
  if (adsenseTag == "h") {
    $(".app-hero-btns div:last").hide();
  }

  /* Header */
  /*************************************************************/

  /*************************************************************/
  /* Dashboard page */
  /*************************************************************/

  // switch between tabs in dashboard page
  $(".dashboard-list li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".list-content > div").hide();
    $($(this).data("content")).fadeIn();
    $(".payment-features").hide();
    $(".upgrade-plan-content").hide();
    $(".dashboard h2").text($(this).find("a").text());
  });

  // dashboard tab
  $(".configuration-info .close").on("click", function () {
    $(".light-box").removeClass("is-visible");
  });

  // show credentials
  $(".configuration-info .show-credentials").on("click", function () {
    $(".light-box.one").addClass("is-visible");
  });
  // show credentials
  $(".configuration-info .show-profile").on("click", function () {
    $(".light-box.two").addClass("is-visible");
  });

  // tooltip in credentials in dashboard page
  $(".my-tooltip button").on("click", function () {
    $(this).parent().prev().find("input").select();
    document.execCommand("copy");

    $(this).find(".tooltiptext").text("Copied!");
    $(".tooltiptext").css("background-color", "#08ae7e");
    $(".tooltiptext").addClass("changed");
  });

  $(".my-tooltip button").on("mouseleave", function () {
    $(this).find(".tooltiptext").text("Copy");
    $(".tooltiptext").css("background-color", "#4f4f4f");
    $(".tooltiptext").removeClass("changed");
  });

  // when click menu button in subscription settings tab open cancel button
  // subscription popup
  $(".list li .list-item-text .menu-btn").on("click", function () {
    $(".list li .cancel").fadeToggle(200);
  });

  // hide Cancel Automatic Renewal button when click on it
  $(".list li .cancel").on("click", function () {
    $(this).fadeOut();
  });

  // change password tab in dashboard
  // Checking the complexity rules
  $(".change-password-content form .input-password").keyup(function () {
    var pswd = $(this).val();
    //validate the length
    if (pswd.length < 8 || pswd.length > 20) {
      $(".check-password ul #length").removeClass("valid").addClass("invalid");
    } else {
      $(".check-password ul #length").removeClass("invalid").addClass("valid");
    }

    //validate number
    if (pswd.match(/\d/)) {
      $(".check-password ul #number").removeClass("invalid").addClass("valid");
    } else {
      $(".check-password ul #number").removeClass("valid").addClass("invalid");
    }

    //validate symbol
    if (pswd.match(/(?=.*[!@#$%^&*~()_+=./{}<>?'":])/)) {
      $(".check-password ul #symbol").removeClass("invalid").addClass("valid");
    } else {
      $(".check-password ul #symbol").removeClass("valid").addClass("invalid");
    }
  });

  // when click on save new password
  $(".left-col form .save_password,.save_email").on("click", function (e) {
    e.preventDefault();
    // if($('#currentPassword').val() == '') {
    //   console.log("Enter your current password");
    // } else if($('.input-password').val() == '') {
    //   console.log("Enter your new password");
    // } else if ($(".input-password").val() != "") {
    //   if ($(".input-password").val() != $(".input-confirm-password").val()) {
    //     console.log("password not matched");
    //   }
    // } else if ($('#currentPassword').val() != '' && $('.input-password').val() != '' && $(".input-password").val() == $(".input-confirm-password").val()){
    //   $('#change-password').modal('toggle')
    // }
  });

  // weplay tab in dahsboard page
  // switch between weplay thanks message and submit form
  $(".weplay-content .submit button").on("click", function (e) {
    e.preventDefault();
    $(this).parents(".weplay-content").hide();
    $(".thanks-for-submission").show();
  });

  $(".toggle-item .check").on("click", function () {
    if (this.checked == true) {
      $(this).parents(".toggle-item").siblings(".item").addClass("checked");
    } else {
      $(this).parents(".toggle-item").siblings(".item").removeClass("checked");
    }
  });

  $(".invoices > .cell, .requests .ip-address .ip-value").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    $(this).next(".toggle").slideToggle();
    $(".toggle").not($(this).next(".toggle")).slideUp();
  });

  /*************************************************************/
  /* Servers page */
  /*************************************************************/

  // dots animation on the map in the server page
  setRandomClass();
  setInterval(function () {
    setRandomClass();
  }, 4000);

  function setRandomClass() {
    var ul = $("#dots");
    var items = ul.find(".dot");
    var number = items.length;
    var random = Math.floor(Math.random() * number);
    items.removeClass("pulsing");
    items.eq(random).addClass("pulsing");
  }

  $(document).on("click", ".panel-country-header.has-cluster", function () {
    $(this).next(".has-clusters").slideToggle();
    $(this).parent().find(".panel-country-body").slideToggle();
  });

  $(document).on("click", ".panel-country-header", function () {
    $(this).toggleClass("active").next(".panel-country-body").slideToggle();
  });

  $(document).on("click", ".panel-cluster-header", function () {
    $(this).toggleClass("active").next(".panel-cluster-body").slideToggle();
  });

  $(".americas").on("click", "tr#canada", function () {
    $(this).siblings(".canada-city").slideToggle(100);
  });
  $(document).on("click", "tr#usa", function () {
    $(this).siblings(".usa-city").slideToggle(100);
  });
  $(document).on("click", "tr#uk", function () {
    $(this).siblings(".uk-city").slideToggle(100);
  });
  $(document).on("click", "tr#australia", function () {
    $(this).siblings(".australia-city").slideToggle(100);
  });
  $(document).on("click", "tr#russia", function () {
    $(this).siblings(".russia-city").slideToggle(100);
  });
  $(document).on("click", "tr#finland", function () {
    $(this).siblings(".finland-city").slideToggle(100);
  });
  $(document).on("click", "tr#israel", function () {
    $(this).siblings(".israel-city").slideToggle(100);
  });

  // filter search on server page
  $(document).on("keyup", "#myInput", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable1 tbody tr, #myTable2 tbody tr, #myTable3 tbody tr,#myTable4 tbody tr,  #panel1 .panel-country-header, #panel2 .panel-country-header, #panel3 .panel-country-header,#panel4 .panel-country-header").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  //----search for the streaming service-----//
  // filter search on streaming services page
  $("#countrySearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("html, body").animate(
      {
        scrollTop: $(".streaming-countries-content").offset().top - 360
      },
      700
    );
    $(".service").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    $(".country-block").show();
    $(".country-block").each(function () {
      if (!$(this).find(".service:visible").length) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  // when click on instructions button it will show the setup step
  $(".instuctions-btn button").on("click", function () {
    $(this).parent().next(".setup-steps").slideToggle();
    $(this).find("svg").toggleClass("active");
  });

  // show the setup step two when click on the plan the user selected
  $("#first-step .price-link, #first-step .continue-payment").on("click", function (e) {
    e.preventDefault();
    $(this).next("input").prop("checked", true);
    $(this).next().find("input").prop("checked", true);
    $("#second-step").slideToggle(400);
    $("#first-step").slideToggle(400);
    window.scrollTo(0, 0);
  });

  $(".plan-one").on("click", function () {
    $(".marked").addClass("pale-color");
    $(".plan").css("display", "none");
    $(".plan.plan-1").css("display", "flex");
  });
  $(".plan-six").on("click", function () {
    $(".marked").addClass("pale-color");
    $(".plan").css("display", "none");
    $(".plan.plan-6").css("display", "flex");
  });

  $(".plan-6mo").on("click", function () {
    $(".marked").addClass("pale-color");
    $(".plan").css("display", "none");
    $(".plan.plan-6mo").css("display", "flex");
  });

  $(".plan-twelve").on("click", function () {
    $(".marked").removeClass("pale-color");
    $(".plan").css("display", "none");
    $(".plan.plan-12").css("display", "flex");
  });

  $(".backplans").on("click", function (e) {
    e.preventDefault();
    $("#second-step").slideToggle(400);
    $("#first-step").slideToggle(400);
  });

  // switch between search icon and close icon when typing in input search
  $("#myInput, #countrySearch").on("keyup", function () {
    if ($(this).val() != "") {
      $(".search-btn").find(".search-icon").hide();
      $(".search-btn").find(".close-icon").show();
    } else {
      $(".search-btn").find(".search-icon").show();
      $(".search-btn").find(".close-icon").hide();
    }
  });

  // when click on the close button in search input empty the content
  $("form .search-btn").on("click", function (e) {
    e.preventDefault();
    $(this).prev("input").val("").keyup().focus();
    $(this).find(".search-icon").show();
    $(this).find(".close-icon").hide();
  });

  /*************************************************************/
  /* weplay page */
  /*************************************************************/

  // the arrow scroll to the features section
  $(".hero-img.weplay-page .arrow-down").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".weplay-info").offset().top
      },
      800
    );
  });

  $(".dropdown--menu").on("click", function (e) {
    e.stopPropagation();
  });

  /*************************************************************/
  /* confirmation page */
  /*************************************************************/

  // remove disabled attibute on submit btn in confirmation page
  var checkboxes = $("#select-devices-form input[type='checkbox']"),
    submitButt = $("#select-devices-form button[type='submit']");

  checkboxes.click(function () {
    submitButt.attr("disabled", !checkboxes.is(":checked"));
  });

  var $window = $(window);
  var $label = $(".footer-item-list li .coming-soon");

  /*************************************************************/
  /*  get started page */
  /*************************************************************/

  // toggle between credit card and paypal
  $(".payment--method .label-radio").on("click", function () {
    $(this).parents(".payment--method").addClass("no-border-radius-bottom").next(".card-info").slideDown();

    $(".card-info").not($(this).parents(".payment--method").next(".card-info")).slideUp();

    // add class
    $(".payment--method").not($(this).parents(".payment--method")).removeClass("no-border-radius-bottom");
  });

  // when click on join now in credit card payment
  $("#join-now").on("click", function () {
    $(this).addClass("fade");
    $(this).find("span").text("Processing...");
    $(this).find("svg").show();
    $("#three_d_secure").modal("show");
    setTimeout(function () {
      $("#join-now").removeClass("fade");
      $("#join-now").find("span").text("Join Now");
      $("#join-now").find("svg").hide();
    }, 2000);
  });

  //fixed navbar in get started page
  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= 60) {
      $("header .navbar").addClass("nav-fixed");
    } else {
      $("header .navbar").removeClass("nav-fixed");
    }

    if ($(this).scrollTop() >= 1200) {
      $(".arrow-up").fadeIn(500);
    } else {
      $(".arrow-up").fadeOut(500);
    }
  });

  /*************************************************************/
  /*  Press page */
  /*************************************************************/

  // switch between tabs in press page logo and media assets section
  $(".press-assets-logo.logo .logo-assets-header ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".press-assets-logo-content.logo > div").hide();
    $(".press-assets-logo.logo .dropdown .btn").text($(this).text());
    $($(this).data("content")).fadeIn();
  });

  $(".press-assets-logo.media-assets .logo-assets-header ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".press-assets-logo-content.media-assets > div").hide();
    $(".press-assets-logo.media-assets .dropdown .btn").text($(this).text());
    $($(this).data("content")).fadeIn();
  });

  // share btn in ios tuts page
  // if ($(window).innerWidth() > 767) {
  //   $(".share .icon").on("click", function () {
  //     $(this).siblings(".social-icons").toggle().end().next("span").toggle();
  //   });
  // }

  $(".whishlist__content__info__ip-controls .save-ip").on("click", function () {
    if ($("#ipAddress").val() != "") {
      if (ValidateIPaddress(document.form1.text1)) {
        $(".smartdns-first-step").fadeOut();
        $(".smartdns-pending").fadeIn();
        setTimeout(function () {
          $(".smartdns-active-ip").fadeIn();
          $(".smartdns-pending").hide();
        }, 3000);
      }
    }
  });

  // tooltip in smartDNS tab in dashboard page
  $(".copy-ip").on("click", function () {
    $(this).prev().select();
    document.execCommand("copy");
    $(this).find(".tooltiptext").text("Copied!");
    $(".tooltiptext").addClass("changed");
  });

  $(".copy-ip").on("mouseleave", function () {
    $(this).find(".tooltiptext").text("Copy");
    $(".tooltiptext").removeClass("changed");
  });

  // scroll to top
  $(".arrow-up").click(function () {
    $("html, body").animate(
      {
        scrollTop: "400px"
      },
      1000
    );
  });

  //

  $("#protocols").on("change", function () {
    if ($(this).val() == "ikev2" || $(this).val() == "https") {
      $(".download-config,.show-credentials,.version-select,.port-select,.add-device,.socks_locations,.wireguard_devices").hide();
      $(".show-profile,.location-select").show();
    } else if ($(this).val() == "socks5") {
      $(".download-config,.show-credentials,.version-select,.port-select,.add-device, .location-select,.wireguard_devices").hide();
      $(".show-profile,.socks_locations").show();
    } else if ($(this).val() == "udp" || $(this).val() == "tcp") {
      $(".version-select, .port-select,.download-config,.show-credentials,.location-select").show();
      $(".show-profile,.add-device,.socks_locations,.wireguard_devices").hide();
    } else if ($(this).val() == "wireguard") {
      $(".download-config,.show-credentials,.version-select,.port-select,.show-profile,.socks_locations").hide();
      $(".add-device,.location-select,.wireguard_devices").show();
    }
  });

  $("#ports").on("change", function () {
    if ($(this).val() != "") {
      $(".download-config,.show-credentials").removeClass("button-disabled");
    }
  });

  $("#location").on("change", function () {
    var locationName = $(this).find(":selected").text().toLowerCase();
    $("#myInput-hostname").val(`http://${locationName}.wevpn.com`);
  });

  // toggle between reason for cancel autorenewal subscription
  $(".reason-item .label-radio").on("click", function () {
    $(this).parents(".reason-item").addClass("no-border-radius-bottom").next(".reason-info").slideDown();

    $(".reason-info").not($(this).parents(".reason-item").next(".reason-info")).slideUp();

    // add class
    $(".reason-item").not($(this).parents(".reason-item")).removeClass("no-border-radius-bottom");
  });

  /********************************************* */
  // Start Refer Friends
  /********************************************* */

  // make the send invite button disabled until I click the checkbox
  $("#agree-tos").on("change", function () {
    var len = $("#agree-tos:checked").length;
    if (len == 0) $("#send-invite").prop("disabled", true);
    else $("#send-invite").removeAttr("disabled");
  });
  $("#agree-tos").trigger("change");

  // validation for the email input when sending the invite
  var inviteEmail = $("#invite-email");
  var inviteUser = $("#inviteUser");
  var inviteEmailError = true;

  inviteEmail.on("blur", function () {
    if (!validateEmail(inviteEmail.val()) || inviteEmail.val() == "") {
      $(this).parent(".form-group").next(".custom-alert").fadeIn().end().css({
        border: "1px solid #F04545",
        "box-shadow": "inset 0px -3px 0px #F04545"
      });
      inviteEmailError = true;
    } else {
      $(this).parent(".form-group").next(".custom-alert").fadeOut().end().css({
        border: "1px solid #e0ded5",
        "box-shadow": "none"
      });
      inviteEmailError = false;
    }
  });

  // sending invitation state
  $("#invit-form").on("submit", function (e) {
    if (inviteEmailError == true) {
      e.preventDefault();
      inviteEmail.blur();
    } else {
      $("#send-invite").addClass("fade").text("Sending");
      setTimeout(function () {
        $("#send-invite").removeClass("fade").text("Send");
        inviteEmail.val("");
        inviteUser.val("");
        $(".no-invite").hide();
        $(".invites-list").fadeIn();
        // $("#invit-form").submit();
      }, 2000);
      e.preventDefault();
      inviteEmailError = true;
    }
  });
  /***************** */
  // End Refer Friends
  /***************** */

  $(".navbar").on("click", ".navbar-nav > li", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  $(".platform-content").on("click", ".platform-content .platform-list li", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
  });
  // when click on the menu button it open the menu links
  $(".navbar").on("click", ".navbar-toggler", function (event) {
    if (!event.detail || event.detail == 1) {
      //activate on first click only to avoid hiding again on double clicks
      $(this).toggleClass("open");
      if ($("body, html").hasClass("overlay") && $(".navbar-collapse").hasClass("show")) {
        $("body, html").removeClass("overlay");
        $(".lang-collapse").removeClass("show");
      } else {
        $("body, html").addClass("overlay");
        $(".lang-collapse").addClass("show");
      }
      $(".navbar-collapse").toggleClass("show");
      $(".lang-collapse").removeClass("show");
      $(".nav-item").removeClass("active");
    }
    return false;
  });
  // when click on the menu button it open the menu links
  $(".navbar").on("click", ".lang-toggler", function (event) {
    if (!event.detail || event.detail == 1) {
      //activate on first click only to avoid hiding again on double clicks
      $(".navbar-collapse").removeClass("show");
      if ($("body, html").hasClass("overlay") && $(".lang-collapse").hasClass("show")) {
        $("body, html").removeClass("overlay");
        $(".lang-collapse").removeClass("show");
      } else {
        $("body, html").addClass("overlay");
        $(".lang-collapse").addClass("show");
      }
    }
    return false;
  });

  // when click in anywhere in document close the navbar menu and clear the overlay from the body
  $("body").on("click", function (e) {
    var $currEl = $(e.currentTarget);
    if (!$currEl.is(".navbar") && !$currEl.closest(".navbar").length) {
      $(".navbar .navbar-toggler").removeClass("open");
      $("html,body").removeClass("overlay");
      $(".navbar-collapse").removeClass("show");
      $(".lang-collapse").removeClass("show");
      $(".navbar").removeClass("navbar-show-mobile");
    }
  });
  // stop propagation (closing navbar when click inside it) when click on navbar when the menu open in mobile screen
  $(".navbar,.aside-content").on("click", function (e) {
    e.stopPropagation();
  });

  $(".nav-link.dropdown-toggle").on("click", function (e) {
    e.preventDefault();
  });

  // service-details page
  $(".other-channels button.more").on("click", function () {
    $(this).toggleClass("active");
    var spanText = $(this).find("span");
    if (spanText.text() == "more channels") {
      spanText.text("less channels");
    } else {
      spanText.text("more channels");
    }
    $(".other-channels ul li.hide").slideToggle();
  });

  // coupon in the new order page
  $(".coupon-btn").on("click", function (e) {
    e.preventDefault();
    if ($("input[name='couponcode']").val() == "FPT") {
      $(".coupon-success").show();
      $(".coupon-error").hide();
    } else {
      $(".coupon-error").show();
      $(".coupon-success").hide();
      $(".coupon-box").toggleClass("error");
    }
  });

  $(".instructions h3").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("open");
  });

  $("#manual-setup-protocol").on("change", function () {
    if ($(this).val() == "udp") {
      $(".tcp-port-select").show();
    } else {
      $(".tcp-port-select").hide();
    }
  });

  $("#manual-setup-protocol").on("change", function () {
    $(".tab-content > div").hide();
    $("#" + $(this).val()).fadeIn();
  });

  $("#openvpn-tcp-version").on("change", function () {
    if ($(this).val() !== "") {
      $(".tcp-port-select").show();
    } else {
      $(".tcp-port-select").hide();
    }
  });

  $("#openvpn-udp-version").on("change", function () {
    if ($(this).val() !== "") {
      $(".udp-port-select").show();
    } else {
      $(".udp-port-select").hide();
    }
  });

  $(".dashboard-items ul li:not(.weblock-item), .account-items ul li").on("click", function () {
    if ($(window).width() < 992) {
      $(".aside-content").toggleClass("show");
      $("body, html").removeClass("overlay");
      $(".navbar-toggler").removeClass("open");
    }
    $(".dashboard-items ul li, .account-items ul li").removeClass("active");
    $(".dashboard-main .main-content, html, body").scrollTop(0);
    $(this).addClass("active");
    $(".main-content .dashboard-content > div").hide();
    $($(this).data("content")).fadeIn();
    $(".header-content h2").text($(this).find("p span").text());
  });

  $(".dashboard-items > ul li, .account-items > ul li").on("click", function () {
    $(".dashboard-items .collapse").collapse("hide");
  });

  $(".alert-item").on("click", function () {
    $(this).toggleClass("selected");
    $("#alertCollapse").slideToggle(200);
  });

  $(".protocol-select li input").on("click", function () {
    $(".tab-content > div").hide();
    $($(this).data("radio")).fadeIn();
  });

  $(".smartdns-servers__list .country").on("click", function () {
    if ($(window).width() < 768) {
      $(this).toggleClass("active").siblings(".country").removeClass("active");
      $(this).next(".country-ip").slideToggle(300);
      $(".smartdns-servers__list .country-ip").not($(this).next(".country-ip")).slideUp(300);
    }
  });

  $(".wireguard-devices .device").on("click", function () {
    $(this).toggleClass("active").siblings(".device").removeClass("active");
    $(this).next(".device-details").slideToggle(200);
    $(".wireguard-devices .device-details").not($(this).next(".device-details")).slideUp(200);
  });

  $(".show-crendentials.udp-settings").on("click", function () {
    if ($(this).find("span").text() == "Show Credentials") {
      $(this).find("span").text("Hide Credentials");
    } else {
      $(this).find("span").text("Show Credentials");
    }
    $(".your-credentials.udp-credentials").fadeToggle();
  });

  $("#sock5 .generate_profile").on("click", function () {
    $(".profile-details.sock5_details").fadeIn();
  });

  $(".show-crendentials.tcp-settings").on("click", function () {
    if ($(this).find("span").text() == "Show Credentials") {
      $(this).find("span").text("Hide Credentials");
    } else {
      $(this).find("span").text("Show Credentials");
    }
    $(".your-credentials.tcp-credentials").fadeToggle();
  });

  $(".udp-port-select .udp-port").on("change", function () {
    if ($(this).val() !== "") {
      $(".download-config.udp-settings, .show-crendentials.udp-settings").prop("disabled", false);
    }
  });

  $(".tcp-port-select .tcp-port").on("change", function () {
    if ($(this).val() !== "") {
      $(".download-config.tcp-settings, .show-crendentials.tcp-settings").prop("disabled", false);
    }
  });

  $("#sock5 .sock5-location").on("change", function () {
    if ($(this).val() !== "") {
      $(".generate_profile").prop("disabled", false);
    }
  });

  // links inside dropdown in Dns Leak Test page
  $(".ip-address-hero .dropdown .dropdown-menu")
    .find("a")
    .on("click", function () {
      window.location = $(this).attr("href");
    });

  //Password generator page

  $("#multiple-passwords").on("change", function () {
    var len = $("#multiple-passwords:checked").length;
    if (len !== 0) {
      $(".password-info").hide();
      $(".password-range").show();
      $(".multi-passwords").show();
    } else {
      $(".password-info").show();
      $(".password-range").hide();
      $(".multi-passwords").hide();
    }
  });
  $("#multiple-passwords").trigger("change");

  $(".password-info .copy-clipboard").click(function (e) {
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = $(".password-info h2").text();
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  });

  $(document).on("click", ".passowrd .copy-icon", function (e) {
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = $(this).parent().parent().find("p").text();
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  });

  function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
  const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
  const NUMBER_CODES = arrayFromLowToHigh(48, 57);
  const SYMBOL_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));

  let generatePassword = (characterAmount, includeUppercase, includeNumbers, includeSymbols) => {
    let charCodes = LOWERCASE_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
  };

  $(".regenerate-password").click(function (e) {
    e.preventDefault();
    generateRandomPassword();

    var multiLength = $(".multi-password-input").val();
    $(".passowrd").not(":first").remove();
    for (let i = 1; i < multiLength; i++) {
      $(".passowrd").first().clone().insertAfter("div.multi-passwords-content .passowrd:last");
    }
    $(".passowrd p").each(function (e) {
      var password = generateRandomPassword(false);
      $(this).text(password);
    });
  });

  function generateRandomPassword(render = true) {
    $(".password-info h2").text("");
    const characterAmount = $("#length").val();
    const includeUppercase = $("#uppercase").is(":checked");
    const includeNumbers = $("#numbers").is(":checked");
    const includeSymbols = $("#symbols").is(":checked");
    password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    $(".password-info h2").text(password);
    return password;
  }

  $(".random-password-content #length").change(function (e) {
    const characterAmount = $("#length").val();
    const includeUppercase = $("#uppercase").is(":checked");
    const includeNumbers = $("#numbers").is(":checked");
    const includeSymbols = $("#symbols").is(":checked");
    const multiplePasswords = $("#multiple-passwords").is(":checked");
    var password = "";
    password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    var strength = zxcvbn(password);

    var text = "";
    if ($(this).val() < 8) {
      text = "Terrible! Crackable in " + strength.crack_times_display.offline_slow_hashing_1e4_per_second;
    } else if ($(this).val() < 10) {
      text = "Weak! Crackable in " + strength.crack_times_display.offline_slow_hashing_1e4_per_second;
    } else if ($(this).val() < 13) {
      text = "Good! Could take " + strength.crack_times_display.offline_slow_hashing_1e4_per_second + " to crack. ";
    } else if ($(this).val() >= 13) {
      text = "Strong! Could take " + strength.crack_times_display.offline_slow_hashing_1e4_per_second + " to crack. ";
    }
    $(".crack-period").text(text);
  });

});
