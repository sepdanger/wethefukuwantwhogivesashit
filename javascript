(function($){

       $( document ).ready(function() {

           function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

           function autoCompleteAjax(search) {
               $.ajax({
                    url: pacificoVars.ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'rk_ajax_search_autocomplete',
                        search: search,
                    },
                    beforeSend : function ( xhr ) {
                        $(document).find('.ajax-autocomplete-modal').empty().append('<div class="autocomplete-loading"><img src="/wp-content/themes/houzez/css/ajax-loader.gif" /> Searching...</div>');
                    },
                    success: function (response) {

                        data = JSON.parse(response);
                        $(document).find('.ajax-autocomplete-modal').empty().append(data);


                    }
                });
           }

           function autoCompleteListings() {

                   $('.houzez-keyword-autocomplete').attr('autocomplete', 'off');
                   $('<div class="ajax-autocomplete-modal" style="display:none;"></div>').insertAfter('#auto_complete_ajax');

                   var keyword_input = $('.houzez-keyword-autocomplete');
                   if ( !keyword_input.parents('.advanced-search-half-map').length ) {
                       keyword_input.on('keyup', debounce(function() {
                           var search = $(this).val();
                           if ( search.length > 0 ) {
                               $('.ajax-autocomplete-modal').show();
                               autoCompleteAjax(search);
                           } else {
                               $('.ajax-autocomplete-modal').hide();
                           }
                       }, 500));
                    }

           }

           autoCompleteListings();

           /**
            * Populate the keyword search term on the map page
            * @return {[type]} [description]
            */
           function populate_keyword_on_search_page() {
               const queryString = window.location.search;
               const urlParams = new URLSearchParams(queryString);
               const keyword = urlParams.get('keyword')
               if (keyword) {
                   $('#search_location').val(keyword);
               }

           }

           //populate_keyword_on_search_page();

            /**
             *  Add shrink class to header on scroll
             */
            function shrinkHeaderOnScroll() {
                var $threshold = 1,
                    $window = $(window),
                    $height = $window.scrollTop();

                $window.scroll(function() {
                    $scroll_position = $window.scrollTop();
                    if ($scroll_position > $threshold) {
                        $("body").addClass("shrink");
                    } else {
                        $("body").removeClass("shrink");
                    }
                });

                // if the scroll position is greater than 0, add the shrink class. This handles a refresh in the middle of the page.
                if ($height > 0) {
                    $("body").addClass("shrink");
                }

            }

            shrinkHeaderOnScroll();



           /**
            * Home Slider elementor element
            */
           $('.pp--home-slider').each(function(e) {
               slider = $(this).find('.pp--home-slider_slider');


                 slider.slick({
                    lazyLoad: 'ondemand',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    speed: 1000,
                  });
             });


           /**
            * Communities Slider
            */
           $('.rew--communities-slider').each(function(e) {
               slider = $(this).find('.rew--communities-slider_slider');


                 slider.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    fade: false,
                    infinite: true,
                    autoplay: false,
                    responsive: [
                        {
                          breakpoint: 500,
                          settings: {
                            slidesToShow: 2,
                          }
                        }
                      ]
                  });
             });

           /**
            * Single developments slider
            */
            $('.single-developments--gallery_slider').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              fade: true,
              asNavFor: '.single-developments--gallery_nav'
            });
            $('.single-developments--gallery_nav').slick({
              slidesToShow: 5,
              slidesToScroll: 1,
              asNavFor: '.single-developments--gallery_slider',
              dots: true,
              centerMode: true,
              focusOnSelect: true
            });

            /**
             * Popup form, select the proper radio button for form submission
             */

             $('.get-guides').on('click', function(e) {

                 $('.guides-radio input').prop("checked", false);

                 if ( $(this).hasClass('buyers') ) {
                   $('.guides-radio input[value="Buyers"]').prop("checked", true);
                 } else if ( $(this).hasClass('sellers') ) {
                   $('.guides-radio input[value="Sellers"]').prop("checked", true);

                 } else if ( $(this).hasClass('relocation') ) {
                   $('.guides-radio input[value="Relocation"]').prop("checked", true);
                 }

             });

             /**
              * Community sort dropdown
              */
             
             $('.post-by-comm--select').on('change', function(e) {

                value = $(this).find(":selected").val();

                const params = new URLSearchParams(location.search);
                params.set('property_sort', value);

                window.location.href = location.pathname + '?' + params;
                //window.history.replaceState({}, '', `${location.pathname}?${params}`);

                

             });

        });
 })(jQuery); 
