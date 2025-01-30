$(document).ready(function () {
  $(".ct_hamburger").click(function () {
    $(".ct_middle_navbar ul:not(.ct_dropdown_items ol) ").addClass("show");
  });
  $(".ct_close_bar").click(function () {
    $(".ct_middle_navbar ul:not(.ct_dropdown_items ol) ").removeClass("show");
  });

  // ct_recent_work_slider Brand Slider S
  $(".ct_recent_work_slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    center: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  });
  // ct_recent_work_slider Brand Slider E

  // ct_featured_slider Brand Slider S
  $(".ct_featured_slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
  });
  // ct_featured_slider Brand Slider J

  // ct_recent_work_slider Brand Slider S
  $(".ct_testimonial_slider").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  // ct_recent_work_slider Brand Slider E

  // Pricing Works Slider S
  $(".ct_pricing_works")
    .on("initialized.owl.carousel changed.owl.carousel", function (e) {
      if (!e.namespace) {
        return;
      }
      $("#counter").text(
        e.relatedTarget.relative(e.item.index) + 1 + " of " + e.item.count
      );
    })
    .owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  // Pricing Works Slider E

  // Latesh Project Slider S
  $("#ct_builder_studio_slider").owlCarousel({
    loop: true,
    margin: 100,
    nav: true,
    center: true,
    autoPlay: true,
    slideSpeed: 1000,
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  $("#ct_retaial_app_slider").owlCarousel({
    loop: true,
    margin: 50,
    nav: true,
    autoPlay: true,
    slideSpeed: 1000,
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  });
  $(".ct_latest_project_slider").owlCarousel({
    loop: true,
    margin: 100,
    nav: true,
    center: true,
    autoPlay: true,
    slideSpeed: 1000,
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  // Latesh Project Slider E

  // Related Article Slider Js S
  $(".ct_related_article").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  // Related Article Slider Js E

  // Promisses Slider S
  $(".ct_promisses_slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    center: true,
    autoPlay: true,
    slideSpeed: 1000,
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
  // Promisses Slider E

  // Happy Customer Slider S
  $(".ct_happy_customer_slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  // Happy Customer Slider E

  // Social Slider S
  $(".ct_social_slider").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  // Social Slider E
  // Trusted Brand Slider S
  $(".ct_trusted_brand").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
  // Trusted Brand Slider E
  AOS.init();
  $(window).on("load", function () {
    $(".ct_loader_main").fadeOut("slow");
  });

  var counted = 0;
  $(window).scroll(function () {
    var oTop = $("#counter").offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      counted = 1;
    }
  });

  $(".ct_dash_toggle_bar").click(function () {
    $(".ct_dash_board_main").toggleClass("ct_show_sidebar");
  });

  $(".ct_overlay_detail_icon_top").click(function () {
    $(this).hide();
    $(".ct_overlay_detail_icon_down").show();
    $(".ct_my_creative_project_overlay_main").addClass(
      "ct_project_show_section"
    );
  });
  $(".ct_overlay_detail_icon_down").click(function () {
    $(this).hide();
    $(".ct_overlay_detail_icon_top").show();
    $(".ct_my_creative_project_overlay_main").removeClass(
      "ct_project_show_section"
    );
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  //>=, not <=
  if (scroll >= 300) {
    //clearHeader, not clearheader - caps H
    $(".ct_header_main").addClass("ct_sticky_menu");
  } else {
    $(".ct_header_main").removeClass("ct_sticky_menu");
  }
}); //missing );

window.onload = function () {
  var amount = document.getElementById("amount");
  var countUp = new CountUp(amount, 0, 450, 0, 2.5, {
    useEasing: true,
    useGrouping: true,
    separator: ",",
  });

  if (!countUp.error) {
    countUp.start();
  }

  // Append 'm+' after the count
  setTimeout(function () {
    document.getElementById("funding-counter").innerHTML =
      "$" + amount.innerHTML + "m+";
  }, 2500); // Match this with the count-up animation duration
};

const rangeInput = document.getElementById("customRange3");

function updateRangeBackground() {
  const min = rangeInput.min;
  const max = rangeInput.max;
  const val = rangeInput.value;
  const percentage = ((val - min) / (max - min)) * 100;

  rangeInput.style.background = `linear-gradient(to right, #1b83c1 ${percentage}%, #ddd ${percentage}%)`;
}

rangeInput.addEventListener("input", updateRangeBackground);

// Initialize on page load
updateRangeBackground();