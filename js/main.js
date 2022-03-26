
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

  $("[data-load]").each(function () {
    $(this).load($(this).data("load"), function () {
      $("#year-now").text(new Date().getFullYear());

      const currentLocation = location.href;
      $(".platform-content .platform-list .item").each(function () {
        if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
          $(this).addClass("active");
        }
      });

      $(".nav-item .dropdown--menu ul li").each(function () {
        if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
          $(this).addClass("active");
          $(this).parents(".nav-item").addClass("active");
        }
      });

      $(".navbar-nav .nav-item").each(function () {
        if ("https://wevpn.com" + $(this).find("a").attr("href") === currentLocation) {
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

      // Bind event listener
      if ($(window).width() < 768) {
        // footer in mobile screen
        $("h4.footer-item-title").on("click", function () {
          $(this).toggleClass("active").next("ul").slideToggle();
        });
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

  $(".dropdown--menu").on("click", function (e) {
    e.stopPropagation();
  });

  $(".navbar").on("click", ".navbar-nav > li", function () {
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
  })

  $.getScript('js/smart-app-banner.js')
});
