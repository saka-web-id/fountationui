<script>
export default {
  methods: {
    toggleOpenSidebar() {

      console.log('running Open toggleSidebar');

      if ($(window).width() < 992 || !$('.sidebar').hasClass('collapsed')) {
        $('body').animate({'padding-left':'0'},100);
      }
      else if ($(window).width() > 992 && $('.sidebar').hasClass('collapsed')) {
        $('body').animate({'padding-left':'14rem'},100);
      }

      if (!$('.sidebar').hasClass('collapsed')) {
        $('.sidebar').fadeOut(100,function(){
          $('#sidebarToggle').hide();
          $('.sidebar').addClass('collapsed');
          $('#sidebarToggle').fadeIn(100);
        });
      }
      else {
        $('.sidebar').removeClass('collapsed');
        $('.sidebar').fadeIn(100);
      }

    }
  }
}
</script>

<template>
  <svg @click="toggleOpenSidebar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-list fs-4 ms-0 ps-0 me-1 pe-0 mt-0 pt-0 mb-0 pb-0" id="sidebarToggle">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
  </svg>
</template>

<style scoped>

</style>