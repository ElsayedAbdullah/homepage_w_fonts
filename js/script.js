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

});