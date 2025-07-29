$(document).ready(function() {
  let $projectView = $('.select_view > ul > li');
  let $projectTabs = $('.project_tabs');
  let projectActive = '_active';
  let $projectList = $('.customer_list');
  let viewDefault = winW > checkMo ? '_view_4' : '_view_2';
  let viewClass = [];

  $projectView.each(function() {
    let $_view = $(this);
    let name = $_view.attr('class');
    $projectView.siblings(`.${viewDefault}`).find('a').addClass(projectActive);

    viewClass.push(name);
    $_view.find('a').on('click', function() {
      let has = $(this).parents('li').attr('class');
      let index = has.split('_view_')[1];
      $projectList = $(`.customer_list._active`);
      $projectList.attr('data-view', index);
      let action = () => {
        $('.select_view').find('a').removeClass(projectActive);
        $(this).addClass(projectActive);
        $projectList.removeClass(viewClass).addClass(has);
      };
      if (!isActive) {
        if (has !== '_view_1') {
          action();
        }
      } else {
        action();
      }
    });
  });

  let isActive = true;
  let checkActive = project => {
    let prod = project;
    if (project == null) {
      prod = $projectTabs.find('._active').attr('data-name');
    }
    if (winW > checkMo) {
      if (prod == '공간') {
        isActive = false;
      } else {
        isActive = true;
      }
      $('html').removeClass('_mo');
      if (!$('html').hasClass('_pc')) {
        $projectView.siblings(`.${viewDefault}`).find('a').trigger('click');
      }
      if (!$('html').hasClass('_pc')) {
        $('html').addClass('_pc');
      }
    } else {
      isActive = true;
      $('html').removeClass('_pc');
      if (!$('html').hasClass('_mo')) {
        $projectView.siblings(`.${viewDefault}`).find('a').trigger('click');
      }
      if (!$('html').hasClass('_mo')) {
        $('html').addClass('_mo');
      }
    }
  };

  let isDefault = null;
  $(window).on('resize', function() {
    console.log(isActive);
    viewDefault = winW > checkMo ? '_view_4' : '_view_2';
    clearTimeout(isDefault);
    isDefault = setTimeout(function() {
      winW = $(window).width();
      checkActive();
    }, 200);
  });

  let saveClass;
  $projectTabs.each(function() {
    let $_tabs = $(this).find('ul > li');
    $_tabs.find('a').on('click', function() {
      let prod = $(this).attr('data-name');

      let projectList = $(`.customer_list[data-name="${prod}"]`);
      $(`.project_tabs li a:not([data-name="${prod}"])`).removeClass(projectActive);
      $(`.project_tabs li a[data-name="${prod}"]`).addClass(projectActive);
      $(`.project_content :not([data-name="${prod}"])`).removeClass(projectActive);
      $(`.project_content [data-name="${prod}"]`).addClass(projectActive);
      $(`.customer_total:not([data-name="${prod}"])`).removeClass(projectActive);
      $(`.customer_total[data-name="${prod}"]`).addClass(projectActive);

      let view = projectList.attr('data-view');
      if (view) {
        saveClass = `_view_${view}`;
      } else {
        saveClass = viewDefault;
      }
      $projectView.find('a').removeClass(projectActive);
      $projectView.siblings(`.${saveClass}`).find(`a`).addClass(projectActive);

      let isMB = window.innerWidth <= 960;
      if (prod == '프로젝트') {
        isActive = true;
        $('.select_view ._view_1').removeClass('_hidden');
        isMB && window.scrollTo(0, 0);
      } else if (prod == '공간') {
        $('.select_view ._view_1').addClass('_hidden');
        isMB && window.scrollTo(0, 0);
      }
      console.log('prod', prod);
    });
  });

  let $filterList = $('.filter_list');
  $filterList.each(function(idx) {
    let $_this = $(this);
    let types = $_this.attr('data-name');
    let $_list = $_this.find('ul');
    let $_customer = $(`.customer_list[data-name="${types}"]`);
    let $_box = $_customer.find('.customer_box');
    let $_reset = $_this.find('.bt_reload');

    let filterTotal = totalList => {
      let customerList = [].slice.call(totalList);
      let displayShow = customerList.filter(function(el) {
        return getComputedStyle(el).display !== 'none';
      });
      let sumTotal = displayShow.length;
      $(`.customer_total[data-name="${types}"] .total`).html(sumTotal);

      if (sumTotal !== 0) {
        $_customer.find('.data_none').removeClass('active');
      } else {
        $_customer.find('.data_none').addClass('active');
      }
    };

    let filterCategory = () => {
      let checkList = [];
      let checkTotal = [];
      let useList = [];
      let selector = '';

      $_list.each(function(idx) {
        checkList[idx] = new Array();
        let input = $(this).find('input[type=checkbox]:checked');
        input.each(function() {
          checkTotal.push($(this).val());
          checkList[idx].push($(this).val());
        });
      });

      if (checkTotal.length === 0) {
        $_box.addClass('active');
      } else {
        $_box.removeClass('active');
      }

      checkList.forEach((items, keys) => {
        if (Array.isArray(items) && items.length !== 0) {
          useList.push(items);
        }
      });

      if (Array.isArray(useList) && useList.length !== 0) {
        for (let i = 0; i < useList[0].length; i++) {
          let data1 = useList[0][i];
          if (useList[0].length > 1 && i !== 0) {
            selector += ', ';
          }
          if (useList.length > 1) {
            for (let j = 0; j < useList[1].length; j++) {
              let data2 = useList[1][j];
              if (useList[1].length > 1 && j !== 0) {
                selector += ', ';
              }
              //end two depth
              if (useList.length > 2) {
                for (let k = 0; k < useList[2].length; k++) {
                  let data3 = useList[2][k];
                  if (useList[2].length > 1 && k !== 0) {
                    selector += ', ';
                  }
                  selector += `.${data1}.${data2}.${data3}`;
                }
              } else {
                selector += `.${data1}.${data2}`;
              }
              //end three depth
            }
          } else {
            selector += `.${data1}`;
          }
        }
        $(selector).addClass('active');
      }
      filterTotal($_box);

      if (checkTotal.length === 0) {
        $_reset.attr('disabled', true);
      } else {
        $_reset.attr('disabled', false);
      }

      let rePosition = () => {
        let target = $('.customer_list._active');
        let targetTop = target.length ? target.offset().top : 0;
        let targetHeight = target.outerHeight();
        let pos = parseInt(targetTop - winH / 3);
        if (winScroll > targetHeight) {
          $(window).scrollTop(pos);
        }
      };
      rePosition();
    };

    $_reset.on('click', function() {
      $(this).attr('disabled', true);
      $_this.find('input').prop('checked', false);
      $_box.addClass('active');
      filterTotal($_box);
    });
    $_this.find(':checkbox').change(function() {
      filterCategory();
    });
  });

  let moSearch = () => {
    let $_button = $('.select_view .bt_search');
    let $_layer = $('.project_filter');
    let $_close = $_layer.find('.bt_close, .bt_confirm');

    let searchClose = () => {
      scrollAble();
      $_layer.removeClass(projectActive);
    };
    $_button.on('click', function() {
      scrollDisabled();
      $_layer.addClass(projectActive);
    });
    $_close.on('click', function() {
      searchClose();
    });
    $_layer.on('click', function(e) {
      let target = e.target;
      if ($(target).hasClass('project_filter') && !$('.filter_list_wrap').has(target).length) {
        searchClose();
      }
    });
  };
  moSearch();
});

function imageError(target) {
  $(target).parents('.thumbs').html('<div class="no_img"></div>');
}
