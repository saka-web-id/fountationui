<script>
export default {
  mounted() {
    // Perform other actions
    let win = $(window);
    let w = win.width();

    let sidebar = $('.sidebar');

    sidebar.addClass('collapsed');

    sidebar.removeClass('mobile-hid');

    win.resize(function() {

      if (w===win.width()) {
        return;
      }

      w = win.width();

      if (w < 992 && !sidebar.hasClass('collapsed')) {
        this.toggleCloseSidebar();
      } else if (w > 992 && sidebar.hasClass('collapsed')) {
        this.toggleCloseSidebar();
      }
    });
  },
  methods: {
    toggleCloseSidebar() {

      console.log('running Close toggleSidebar');

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
  <svg @click="toggleCloseSidebar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-x" id="sidebarCloseToggle" style="color: var(--bs-danger);" >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
  </svg>
</template>

<style scoped>

</style>