///========================\\\\
  // Start wedns landing page
  ///========================\\\\
  $(".select-protocol p.other-protocol").on("click", function () {
    $(this).hide();
    if ($("input[name='os']:checked").val() == "windows_os" || $("input[name='os']:checked").val() == "linux_os") {
      $(".protocol.anonymous_protocol").fadeIn();
    } else {
      $(".protocol.anonymous_protocol").hide();
    }
    $(".protocol.doh_protocol").fadeIn();
  });

  $(".select-protocol p.other-protocol").hide();

  // tooltip in wedns landing page
  $(".dns_url_input").on("click", function () {
    $(this).select();
    document.execCommand("copy");
    $(this).next(".tooltiptext").text("Copied!");
    $(".tooltiptext").addClass("changed");
  });

  $(".dns_url_input").on("mouseleave", function () {
    $(this).next(".tooltiptext").text("Copy");
    $(".tooltiptext").removeClass("changed");
  });

  function checkSelectedOS() {
    $("input[name='os']").change(function () {
      $(".protocol.anonymous_protocol,.select-protocol p.other-protocol").hide();
      if (this.value == "tvos_os") {
        $(".select_os_protocol").addClass("tvos_selected");
        $(".select-protocol p.other-protocol,.dot_protocol").show();
        $(".doh_protocol,.select-location").hide();
        $("#dot_protocol,#us_west").prop("checked", true);
        $("#doh_protocol").prop("checked", false);
      } else if (this.value == "windows_os" || this.value == "linux_os") {
        $(".select_os_protocol").addClass("tvos_selected");
        $(".dot_protocol,.select-location").show();
        $(".doh_protocol,.select-protocol p.other-protocol").hide();
        $("#dot_protocol,#us_west").prop("checked", true);
        $("#doh_protocol").prop("checked", false);
      } else if (this.value == "ios_os" || this.value == "macos_os" || this.value == "android_os") {
        $(".select_os_protocol").removeClass("tvos_selected");
        $(".dot_protocol").show();
        $(".doh_protocol,.select-location,.select-protocol p.other-protocol").hide();
        $("#dot_protocol,#big_sur,#ios_14,#android_lg_9,#us_west").prop("checked", true);
        $("#doh_protocol").prop("checked", false);
      } else if (this.value == "chrome_os" || this.value == "edge_os" || this.value == "brave_os" || this.value == "firefox_os") {
        $(".select_os_protocol").addClass("tvos_selected");
        $(".select-protocol p.other-protocol,.dot_protocol,.select-location").hide();
        $(".doh_protocol").show();
        $("#doh_protocol,#us_west").prop("checked", true);
        $("#dot_protocol").prop("checked", false);
      }
    });
  }

  checkSelectedOS();

  $(".next-step2, #step_two").on("click", function () {
    var wedns_app = $(".apps input[name='os']:checked").next("label").find(".os_name").text();
    $(".app_selected").text(wedns_app);
    $(".step-header#headingOne .true_icon").show();
    $(".step-header#headingTwo h2").removeClass("folded");
    $("#headingThree h2").addClass("folded");
  });

  $(".step2_btns .back_step1, #step_one").on("click", function () {
    $(".firewall_selected,.protocol_selected,.os_selected, .country_selected").text("");
    $(".step-header#headingTwo .true_icon_one,.step-header#headingTwo .true_icon_two,.step-header#headingTwo .true_icon_three, .step-header#headingTwo .true_icon_four").hide();
    $("#headingTwo h2,#headingThree h2").addClass("folded");
  });

  // when the user clicked on back-step2 button
  $(".step_body_footer .back_step2, #step_two").on("click", function () {
    $("#headingTwo h2").removeClass("folded");
    $("#headingThree h2").addClass("folded");
  });

  $(".step1_body .apps input:radio").change(function () {
    // to show the appropriate content based on the user choice
    if ($("input[name='os']:checked").val() == "ios_os") {
      $(".select-os > div").hide();
      $(".select-os .ios_version").show();
    }
    if ($("input[name='os']:checked").val() == "macos_os") {
      $(".select-os > div").hide();
      $(".select-os .mac_version").show();
    }
    if ($("input[name='os']:checked").val() == "android_os") {
      $(".select-os > div").hide();
      $(".select-os .android_version").show();
    }
  });

  $(".select-os .os input[type='radio']").change(function () {
    if ($(this).val() == "ios_ls_14" || $(this).val() == "mac_ls_big_sur" || $(this).val() == "android_ls_9") {
      $(".select-location").show();
    } else if ($(this).val() == "ios_14" || $(this).val() == "big_sur" || $(this).val() == "android_lg_9") {
      $(".select-location").hide();
    }
  });

  $(".show_tutorial, #step_three").on("click", function () {
    var wedns_firewall = $(".wedns-checker #check-wedns:checked").parent().siblings().find(".wedns-title").text();
    var ios_version = $(".select-os input[name='ios_version']:checked").next("label").text();
    var mac_version = $(".select-os input[name='mac_version']:checked").next("label").text();
    var android_version = $(".select-os input[name='android_version']:checked").next("label").text();
    var wedns_country = $(".select-location input[name='location']:checked").next("label").text();
    var wedns_protocol = $(".select-protocol input[name='dot_protocol']:checked").next("label").find(".selected_protocol").text();
    $(".firewall_selected").text(wedns_firewall);
    $(".protocol_selected").text(wedns_protocol);
    $(".country_selected").text(wedns_country);
    if ($("#check-wedns").is(":checked")) {
      $(".step-header#headingTwo .true_icon_one").show();
      $(".android9_tutorial .host_name").text("dns-weblock.wevpn.com");
    } else {
      $(".step-header#headingTwo .true_icon_one").hide();
      $(".android9_tutorial .host_name").text("dns.wevpn.com");
    }
    $(".step-header#headingTwo .true_icon_three, .step-header#headingTwo .true_icon_four").show();
    $(".step-header#headingTwo h2, .step-header#headingThree h2").removeClass("folded");
    if ($("input[name='os']:checked").val() == "tvos_os") {
      $(".os_selected,.country_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step-header#headingTwo .true_icon_two,.step3_body > div").hide();
      $(".tutorial.tvos_tutorial").show();
    } else if ($("input[name='os']:checked").val() == "windows_os") {
      $(".os_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step3_body > div").hide();
      $(".tutorial.windows_tutorial,.step-header#headingTwo .true_icon_two").show();
    } else if ($("input[name='os']:checked").val() == "linux_os") {
      $(".os_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step3_body > div").hide();
      $(".tutorial.linux_tutorial,.step-header#headingTwo .true_icon_two").show();
    } else if ($("input[name='os']:checked").val() == "chrome_os") {
      $(".os_selected,.country_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step-header#headingTwo .true_icon_two").hide();
      $(".step3_body > div").hide();
      $(".tutorial.chrome_tutorial").show();
    } else if ($("input[name='os']:checked").val() == "edge_os") {
      $(".os_selected,.country_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step-header#headingTwo .true_icon_two").hide();
      $(".step3_body > div").hide();
      $(".tutorial.edge_tutorial").show();
    } else if ($("input[name='os']:checked").val() == "brave_os") {
      $(".os_selected,.country_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step-header#headingTwo .true_icon_two").hide();
      $(".step3_body > div").hide();
      $(".tutorial.brave_tutorial").show();
    } else if ($("input[name='os']:checked").val() == "firefox_os") {
      $(".os_selected,.country_selected").text("");
      $(".step-header#headingTwo .true_icon_three,.step-header#headingTwo .true_icon_two").hide();
      $(".step3_body > div").hide();
      $(".tutorial.firefox_tutorial").show();
    } else if ($("input[name='os']:checked").val() == "ios_os") {
      $(".step-header#headingTwo .true_icon_three").show();
      $(".os_selected").text(ios_version);
      $(".step3_body > div").hide();
      $(".tutorial.ios_tutorial").show();

      if ($(".select-os input[name='ios_version']:checked").val() == "ios_ls_14") {
        $(".tutorial.ios_tutorial").hide();
        $(".ios_tutorial_lowerthan14,.step-header#headingTwo .true_icon_two").show();
        $(".country_selected").text(wedns_country);
      }

      if ($(".select-os input[name='ios_version']:checked").val() == "ios_14") {
        $(".tutorial.ios_tutorial").show();
        $(".ios_tutorial_lowerthan14,.step-header#headingTwo .true_icon_two").hide();
        $(".country_selected").text("");
      }
    } else if ($("input[name='os']:checked").val() == "macos_os") {
      $(".step-header#headingTwo .true_icon_three").show();
      $(".os_selected").text(mac_version);
      $(".step3_body > div").hide();
      $(".tutorial.macos_bigSur_tutorial").show();

      if ($(".select-os input[name='mac_version']:checked").val() == "big_sur") {
        $(".tutorial.macos_tutorial_lowerthan_bigSur,.step-header#headingTwo .true_icon_two").hide();
        $(".tutorial.macos_bigSur_tutorial").show();
        $(".country_selected").text("");
      }

      if ($(".select-os input[name='mac_version']:checked").val() == "mac_ls_big_sur") {
        $(".tutorial.macos_tutorial_lowerthan_bigSur,.step-header#headingTwo .true_icon_two").show();
        $(".macos_bigSur_tutorial").hide();
        $(".country_selected").text(wedns_country);
      }
    } else if ($("input[name='os']:checked").val() == "android_os") {
      $(".step-header#headingTwo .true_icon_three").show();
      $(".os_selected").text(android_version);
      $(".step3_body > div").hide();
      $(".tutorial.android9_tutorial").show();

      if ($(".select-os input[name='android_version']:checked").val() == "android_lg_9") {
        $(".tutorial.android_tutorial_lowerthan9,.step-header#headingTwo .true_icon_two").hide();
        $(".android9_tutorial").show();
        $(".country_selected").text("");
      }

      if ($(".select-os input[name='android_version']:checked").val() == "android_ls_9") {
        $(".tutorial.android_tutorial_lowerthan9,.step-header#headingTwo .true_icon_two").show();
        $(".android9_tutorial").hide();
        $(".country_selected").text(wedns_country);
      }
    }

    // to show the ip depend on the user select
    // in case of the DNS Firewall ON && DoT Protocol is selected
    if ($("#check-wedns").is(":checked") && $("#us_west").is(":checked")) {
      $(".tutorial .dns-ip").text("72.11.134.91");
    } else if ($("#check-wedns").is(":checked") && $("#europe").is(":checked")) {
      $(".tutorial .dns-ip").text("216.119.155.49");
    } else if ($("#check-wedns").is(":checked") && $("#us_east").is(":checked")) {
      $(".tutorial .dns-ip").text("23.226.134.243");
    } else if ($("#check-wedns").is(":checked") && $("#asia").is(":checked")) {
      $(".tutorial .dns-ip").text("143.244.33.90");
    }

    // in case of the DNS Firewall OFF && DoT Protocol is selected
    if (!$("#check-wedns").is(":checked") && $("#us_west").is(":checked")) {
      $(".tutorial .dns-ip").text("72.11.134.90");
    } else if (!$("#check-wedns").is(":checked") && $("#europe").is(":checked")) {
      $(".tutorial .dns-ip").text("212.78.94.40");
    } else if (!$("#check-wedns").is(":checked") && $("#us_east").is(":checked")) {
      $(".tutorial .dns-ip").text("23.226.134.242");
    } else if (!$("#check-wedns").is(":checked") && $("#asia").is(":checked")) {
      $(".tutorial .dns-ip").text("143.244.33.74");
    }

    // download button depend on user selection
    if ($("#check-wedns").is(":checked") && $("#dot_protocol").is(":checked")) {
      $(".tutorial .download-button").attr("href", "WeDNS_Config/WeDNS_DoT_Firewall.mobileconfig");
    } else if (!$("#check-wedns").is(":checked") && $("#dot_protocol").is(":checked")) {
      $(".tutorial .download-button").attr("href", "WeDNS_Config/WeDNS_DoT.mobileconfig");
    } else if ($("#check-wedns").is(":checked") && $("#doh_protocol").is(":checked")) {
      $(".tutorial .download-button").attr("href", "WeDNS_Config/WeDNS_DoH_Firewall.mobileconfig");
    } else if (!$("#check-wedns").is(":checked") && $("#doh_protocol").is(":checked")) {
      $(".tutorial .download-button").attr("href", "WeDNS_Config/WeDNS_DoH.mobileconfig");
    }
  });

  $("#check-dns-dot").on("change", function () {
    if ($(this).is(":checked")) {
      $("td.dot-hostname").find("input").val("dns-weblock.wevpn.com");
    } else {
      $("td.dot-hostname").find("input").val("dns.wevpn.com");
    }
  });

  $("#check-dns-doh").on("change", function () {
    if ($(this).is(":checked")) {
      $("td.doh-hostname").find("input").val("https://dns-weblock.wevpn.com/dns-query");
    } else {
      $("td.doh-hostname").find("input").val("https://dns.wevpn.com/dns-query");
    }
  });

  $("#check-dns-anonymyzed").on("change", function () {
    if ($(this).is(":checked")) {
      $("td.anonymyzed-hostname.us-east").find("input").val("sdns://AQcAAAAAAAAAFDIzLjIyNi4xMzQuMjQzOjE1MzUzIBf1guPReaoN_V7w-UelcO4YnvqoXnDGsxRPIRc6uSjsHzIuZG5zY3J5cHQtY2VydC5zZWN1cmUuZG5zLnRlc3Q");
      $("td.anonymyzed-hostname.us-west").find("input").val("sdns://AQcAAAAAAAAAEjcyLjExLjEzNC45MToxNTM1MyBV2R9ORyXQIRO7dlT0F2mYeEdvXEuBOWMdFkripZcN9B8yLmRuc2NyeXB0LWNlcnQuc2VjdXJlLmRucy50ZXN0");
      $("td.anonymyzed-hostname.europe").find("input").val("sdns://AQcAAAAAAAAAFDIxNi4xMTkuMTU1LjQ5OjE1MzUzIF2QDfN8-gL0x3IyXgqgrawgSxKm7A80BgexEH7WghsBHzIuZG5zY3J5cHQtY2VydC5zZWN1cmUuZG5zLnRlc3Q");
      $("td.anonymyzed-hostname.asia").find("input").val("sdns://AQcAAAAAAAAAEzE0My4yNDQuMzMuOTA6MTUzNTMgufWZBK6y8zr6mDW3z47IASY0jQoaoRFSBaB8i1GHng8fMi5kbnNjcnlwdC1jZXJ0LnNlY3VyZS5kbnMudGVzdA");
    } else {
      $("td.anonymyzed-hostname.us-east").find("input").val("sdns://AQcAAAAAAAAAFDIzLjIyNi4xMzQuMjQyOjE1MzUzII_Le5DiGa3AfdRxR7DRt52ZaexL_22aLfjDJwp5saIsHzIuZG5zY3J5cHQtY2VydC5zZWN1cmUuZG5zLnRlc3Q");
      $("td.anonymyzed-hostname.us-west").find("input").val("sdns://AQcAAAAAAAAAEjcyLjExLjEzNC45MDoxNTM1MyAKLsInrJLgKMxBqSL1VvH74T3wwp1bn5wkvPwUlea3Kh8yLmRuc2NyeXB0LWNlcnQuc2VjdXJlLmRucy50ZXN0");
      $("td.anonymyzed-hostname.europe").find("input").val("sdns://AQcAAAAAAAAAEjIxMi43OC45NC40MDoxNTM1MyCAw5p4sJ073gZnQ5jy00DHU3r7Y9mopz-_idDV_HHuuR8yLmRuc2NyeXB0LWNlcnQuc2VjdXJlLmRucy50ZXN0");
      $("td.anonymyzed-hostname.asia").find("input").val("sdns://AQcAAAAAAAAAEzE0My4yNDQuMzMuNzQ6MTUzNTMgFTXwu5MfYkBOrRpDeoB-yOWEjCnf-l3yixhtuzuPBskfMi5kbnNjcnlwdC1jZXJ0LnNlY3VyZS5kbnMudGVzdA");
    }
  });

  $(".setup-wedns li a").on("click", function () {
    let appValue = $(this).attr("data-value");
    $('#wednsAccordion .apps li  input[name="os"]').each(function () {
      if ($(this).val() == appValue) {
        $(this).click();
      }
    });
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

  ///========================\\\\
  // End wedns landing page
  ///========================\\\\