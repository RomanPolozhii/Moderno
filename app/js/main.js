$(function () {
  $(".rate-star").rateYo({
    rating: 3.6,
    starWidth: "12px",
    readOnly: true,
  });

  $(".product-slider__inner").slick({
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  });

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    from: 0,
    to: 600,
    prefix: "$"
  });

  var mixer = mixitup(".products__inner-box");
});
