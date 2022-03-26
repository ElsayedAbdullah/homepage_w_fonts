$(function () {
  /*************************************************************/
  $("[data-load]").each(function () {
    $(this).load($(this).data("load"), function () {
      // add class active on navbar link and remove from siblings

      $("#year-now").text(new Date().getFullYear());
      // to load the trustpilot inside the footer
      var element = document.getElementsByClassName("trustpilot-widget");
      for (var i = 0; i < element.length; i++) {
        window.Trustpilot.loadFromElement(element[i]);
      }
    });
  });
  
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
          if (data.city) {
            $("#location").html(data.city + " (" + data.country + ")");
          } else {
            $(".top-header-content ul li:nth-child(1)").remove();
          }
          //Openmap
          var zoom = 13;
          tileX = Math.floor(((data.longitude + 180) / 360) * Math.pow(2, zoom));
          tileY = Math.floor(((1 - Math.log(Math.tan((data.latitude * Math.PI) / 180) + 1 / Math.cos((data.latitude * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom));
          zoomUrl = "https://tile.openstreetmap.org/" + zoom + "/" + tileX + "/" + tileY + ".png";
          $(".map-picture").attr("src", zoomUrl);
          if (data.protected === true) {
            $(".exposed").html("Protected");
            $(".get-protected").hide();
            if ($(".exposed").length) {
              $(".top-header-content a").hide();
            } else {
              $(".top-header-content a").replaceWith("<strong>Protected</strong>");
            }
          } else {
            $(".exposed").html("Exposed");
            $(".top-header-content a").show();
          }
        },
        dataType: "json",
        error: function () {}
      });
    },
    error: function () {}
  });

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

  $(".invoices .cell").on("click", function () {
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
  // accordion in server page in mobile screen
  $(".panel-country-header.has-cluster").on("click", function () {
    $(this).next(".has-clusters").slideToggle();
    $(this).parent().find(".panel-country-body").slideToggle();
  });
  $(".panel-country-header").on("click", function () {
    $(this).toggleClass("active").next(".panel-country-body").slideToggle();
  });

  $(".panel-cluster-header").on("click", function () {
    $(this).toggleClass("active").next(".panel-cluster-body").slideToggle();
  });

  $("tr#canada").on("click", function () {
    $(this).toggleClass("active").siblings(".canada-city").slideToggle(100);
  });
  $("tr#usa").on("click", function () {
    $(this).toggleClass("active").siblings(".usa-city").slideToggle(100);
  });
  $("tr#uk").on("click", function () {
    $(this).toggleClass("active").siblings(".uk-city").slideToggle(100);
  });
  $("tr#australia").on("click", function () {
    $(this).toggleClass("active").siblings(".australia-city").slideToggle(100);
  });
  $("tr#russia").on("click", function () {
    $(this).toggleClass("active").siblings(".russia-city").slideToggle(100);
  });
  $("tr#finland").on("click", function () {
    $(this).toggleClass("active").siblings(".finland-city").slideToggle(100);
  });
  $("tr#israel").on("click", function () {
    $(this).toggleClass("active").siblings(".israel-city").slideToggle(100);
  });

  // filter search on server page
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable1 tbody tr, #myTable2 tbody tr, #myTable3 tbody tr,#myTable4 tbody tr,  #panel1 .panel-country-header, #panel2 .panel-country-header, #panel3 .panel-country-header,#panel4 .panel-country-header").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  //----search for the streaming service-----//
  // filter search on streaming services page
  $("#countrySearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $('html, body').animate({
			scrollTop: $(".streaming-countries-content").offset().top - 360
		}, 700);
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

  // footer in all pages
  // change the text of coming soon in small screen to soon
  function checkWidth() {
    var windowsize = $window.width();
    if (windowsize < 768) {
      //if the window is less than 992px
      $label.text("soon");
    } else {
      $label.text("coming soon");
    }
  }
  // Execute on load
  checkWidth();
  // Bind event listener
  $(window).resize(checkWidth);

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
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
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

  $("#protocols").change(function () {
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

  $("#ports").change(function () {
    if ($(this).val() != "") {
      $(".download-config,.show-credentials").removeClass("button-disabled");
    }
  });

  $("#location").change(function () {
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
  $("#agree-tos").change(function () {
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

    const currentLocation = location.href;
    $(".platform-content .platform-list .item").each(function () {
      if ("http://localhost:8080" + $(this).find("a").attr("href") + ".html" === currentLocation) {
        $(this).addClass("active");
      } else if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
        $(this).addClass("active");
      }
    });

    $(".navbar").on("click",".navbar-nav > li", function () {
      $(this).toggleClass("active").siblings().removeClass("active");
    });

    $(".platform-content").on("click",".platform-content .platform-list li", function () {
      $(this).toggleClass("active").siblings().removeClass("active");
    });
    // when click on the menu button it open the menu links
    $(".navbar").on("click",".navbar-toggler", function (event) {
      if (!event.detail || event.detail == 1) {
        //activate on first click only to avoid hiding again on double clicks
        $(".navbar").toggleClass("navbar-show-mobile");
        $(this).toggleClass("open");
        $("body, html").toggleClass("overlay");
        $(".navbar-collapse").toggleClass("show");
        $(".nav-item").removeClass("active");
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
        $(".navbar").removeClass("navbar-show-mobile");
      }
    });
    // stop propagation (closing navbar when click inside it) when click on navbar when the menu open in mobile screen
    $(".navbar").on("click", function (e) {
      e.stopPropagation();
    });

    $(".nav-link.dropdown-toggle").on("click", function (e) {
      e.preventDefault();
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
  $(".coupon-btn").click(function (e) {
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

  // $(".languages .dropdown-menu .dropdown-item").on("click", function () {
  //   var linkText = $(this).html();
  //   $(".languages .btn.dropdown-toggle").html(linkText);
  // });

  

  $(".instructions h3").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("open");
  });

  $("#manual-setup-protocol").change(function () {
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

  $("#openvpn-tcp-version").change(function () {
    if ($(this).val() !== "") {
      $(".tcp-port-select").show();
    } else {
      $(".tcp-port-select").hide();
    }
  });

  $("#openvpn-udp-version").change(function () {
    if ($(this).val() !== "") {
      $(".udp-port-select").show();
    } else {
      $(".udp-port-select").hide();
    }
  });

  $(".dashboard-items ul li, .account-items ul li").on("click", function () {
    $(".dashboard-items ul li, .account-items ul li").removeClass("active");
    $(".dashboard-main .main-content, html, body").scrollTop(0);
    $(this).addClass("active");
    $(".main-content .dashboard-content > div").hide();
    $($(this).data("content")).fadeIn();
    // $(".aside-content").toggleClass("show");
    $(".header-content h2").text($(this).find("p span").text());
  });

  $(".dashboard-items > ul li, .account-items > ul li").on("click", function () {
    $(".dashboard-items .collapse").collapse("hide");
  });

  $(".alert-item").on("click", function () {
    $(this).toggleClass("selected");
  });

  $(".protocol-select li input").on("click", function () {
    $(".tab-content > div").hide();
    $($(this).data("radio")).fadeIn();
  });

  $(".select-country li, .select-country .cities p").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".right-col .pick-country").hide();
    $(".right-col .setup-configuration").show();
  });
  $(".select-country .cities p").on("click", function () {
    $(this).addClass("active").parents(".cities").siblings().find("p").removeClass("active");
    $(this).parents(".cities").siblings(".cities").slideUp();
    $(".right-col .pick-country").hide();
    $(".right-col .setup-configuration").show();
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

  $(".udp-port-select .udp-port").change(function () {
    if ($(this).val() !== "") {
      $(".download-config.udp-settings, .show-crendentials.udp-settings").prop("disabled", false);
    }
  });

  $(".tcp-port-select .tcp-port").change(function () {
    if ($(this).val() !== "") {
      $(".download-config.tcp-settings, .show-crendentials.tcp-settings").prop("disabled", false);
    }
  });

  $("#sock5 .sock5-location").change(function () {
    if ($(this).val() !== "") {
      $(".generate_profile").prop("disabled", false);
    }
  });
});

(function () {
  function loadZendeskChat(callback) {
    var zdscript = document.createElement("script");
    zdscript.setAttribute("id", "ze-snippet");
    zdscript.src = "https://static.zdassets.com/ekr/snippet.js?key=a96b1539-2a18-4b46-a131-8d827a19b486";
    document.getElementsByTagName("body")[0].appendChild(zdscript);

    window.zdonload = setInterval(
      function () {
        if (typeof zE !== "undefined" && typeof zE.activate !== "undefined") {
          clearInterval(window.zdonload);
          callback();
        }
      },
      50,
      null
    );
  }
  window.loadAndOpenZendeskChat = function () {
    var button = document.getElementById("zdbutton");
    localStorage.setItem("ff_zd_hasOpened", true);
    button.innerHTML = "Loading...";
    loadZendeskChat(function () {
      window.setTimeout(function () {
        zE.activate();
        button.parentNode.removeChild(button);
      }, 1000);
    });
  };
  if (localStorage.getItem("ff_zd_hasOpened")) {
    loadZendeskChat(function () {});
  } else {
    $("body").not(".wedns_page, .helpdesck_page")[0].insertAdjacentHTML("beforeend", '<button id="zdbutton" aria-label="Launch Help Chat Window" onClick="window.loadAndOpenZendeskChat();">Help</button>');
  }
})();
